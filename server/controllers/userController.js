import User from '../models/User.js'

export async function updateProfile(req, res) {
  try {
    const { name, email, phone, avatar } = req.body
    const user = await User.findById(req.user._id)

    if (!user) return res.status(404).json({ message: 'User not found' })

    if (email && email.toLowerCase() !== user.email) {
      const taken = await User.findOne({ email: email.toLowerCase() })
      if (taken) return res.status(400).json({ message: 'Email already in use' })
      user.email = email.toLowerCase()
    }

    if (name) user.name = name
    if (phone !== undefined) user.phone = phone
    if (avatar !== undefined) user.avatar = avatar

    await user.save()
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' })
    }

    const user = await User.findById(req.user._id)
    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()
    res.json({ message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
