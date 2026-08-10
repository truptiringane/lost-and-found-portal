import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

// Connect to MongoDB
connectDB()

const app = express()

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
  })
)

// JSON middleware
app.use(express.json())

// Static uploads folder
app.use('/uploads', express.static(path.resolve('uploads')))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/contact', contactRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)

  res.status(err.status || 500).json({
    message: err.message || 'Server error'
  })
})

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})