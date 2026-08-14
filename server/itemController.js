import Item from './Item.model.js'

// @desc  Get all items
// @route GET /api/items
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 })
    res.json(items)
  } catch (error) {
    next(error)
  }
}

// @desc  Get single item
// @route GET /api/items/:id
export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      res.status(404)
      throw new Error('Item not found')
    }
    res.json(item)
  } catch (error) {
    next(error)
  }
}

// @desc  Create item
// @route POST /api/items
export const createItem = async (req, res, next) => {
  try {
    const { name, description } = req.body
    const item = await Item.create({ name, description })
    res.status(201).json(item)
  } catch (error) {
    next(error)
  }
}

// @desc  Update item
// @route PUT /api/items/:id
export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) {
      res.status(404)
      throw new Error('Item not found')
    }
    res.json(item)
  } catch (error) {
    next(error)
  }
}

// @desc  Delete item
// @route DELETE /api/items/:id
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) {
      res.status(404)
      throw new Error('Item not found')
    }
    res.json({ message: 'Item deleted' })
  } catch (error) {
    next(error)
  }
}
