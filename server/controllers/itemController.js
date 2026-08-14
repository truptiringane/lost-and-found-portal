import Item from '../models/Item.js'
import User from '../models/User.js'

// POST /api/items  (type comes from body: 'lost' | 'found')
export async function createItem(req, res) {
  try {
    const { type, name, category, location, date, description, keptLocation } = req.body
    if (!['lost', 'found'].includes(type)) {
      return res.status(400).json({ message: "type must be 'lost' or 'found'" })
    }
    if (!name || !category || !location || !date || !description) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const images = (req.files || []).map((f) => `/uploads/${f.filename}`)

    const item = await Item.create({
      type,
      name,
      category,
      location,
      date,
      description,
      keptLocation: keptLocation || '',
      images,
      owner: req.user._id,
    })

    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/items?type=lost&category=Bags&location=park&status=active&search=wallet
export async function getItems(req, res) {
  try {
    const { type, category, location, status, search } = req.query
    const filter = {}

    if (type) filter.type = type
    if (category) filter.category = category
    if (location) filter.location = { $regex: location, $options: 'i' }
    if (status) filter.status = status
    if (search) filter.$text = { $search: search }

    const items = await Item.find(filter).sort({ createdAt: -1 }).populate('owner', 'name email phone')
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/items/mine
export async function getMyItems(req, res) {
  try {
    const items = await Item.find({ owner: req.user._id }).sort({ createdAt: -1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/items/stats
export async function getStats(req, res) {
  try {
    const [lostCount, foundCount, myReports, returned] = await Promise.all([
      Item.countDocuments({ type: 'lost' }),
      Item.countDocuments({ type: 'found' }),
      Item.countDocuments({ owner: req.user._id }),
      Item.countDocuments({ owner: req.user._id, status: 'returned' }),
    ])
    res.json({ lostCount, foundCount, myReports, returned })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/items/saved
export async function getSavedItems(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('savedItems')
    res.json(user.savedItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/items/:id/save  (toggles save/unsave)
export async function toggleSaveItem(req, res) {
  try {
    const user = await User.findById(req.user._id)
    const itemId = req.params.id
    const isSaved = user.savedItems.some((id) => id.toString() === itemId)

    if (isSaved) {
      user.savedItems = user.savedItems.filter((id) => id.toString() !== itemId)
    } else {
      const exists = await Item.findById(itemId)
      if (!exists) return res.status(404).json({ message: 'Item not found' })
      user.savedItems.push(itemId)
    }

    await user.save()
    res.json({ saved: !isSaved })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/items/:id
export async function getItemById(req, res) {
  try {
    const item = await Item.findById(req.params.id).populate('owner', 'name email phone')
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/items/:id
export async function deleteItem(req, res) {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' })
    }
    await item.deleteOne()
    res.json({ message: 'Item deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/items/:id/status  { status: 'returned' | 'active' }
export async function updateItemStatus(req, res) {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' })
    }
    item.status = req.body.status === 'returned' ? 'returned' : 'active'
    await item.save()
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
