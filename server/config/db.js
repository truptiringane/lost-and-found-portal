import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      console.error('ERROR: MONGO_URI is not loaded from .env')
      process.exit(1)
    }

    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`)
    process.exit(1)
  }
}