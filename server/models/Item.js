import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['lost', 'found'], required: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    keptLocation: { type: String, default: '' }, // only used for found items
    images: [{ type: String }],
    status: { type: String, enum: ['active', 'returned'], default: 'active' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

itemSchema.index({ name: 'text', description: 'text', location: 'text' })

export default mongoose.model('Item', itemSchema)
