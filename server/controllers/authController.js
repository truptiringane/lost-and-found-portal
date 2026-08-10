import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export async function register(req, res) {
  try {
    const { name, email, phone, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists' })
    }

    const user = await User.create({ name, email, phone, password })

    res.status(201).json({
      user,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      user,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getMe(req, res) {
  res.json(req.user)
}
