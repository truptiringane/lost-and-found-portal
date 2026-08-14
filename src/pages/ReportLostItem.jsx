import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { api } from '../api/client.js'

export default function ReportLostItem() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', category: '', location: '', date: '', description: '',
  })
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files).slice(0, 5))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = new FormData()
      data.append('type', 'lost')
      Object.entries(form).forEach(([key, value]) => data.append(key, value))
      files.forEach((file) => data.append('images', file))

      await api.post('/items', data, { isForm: true })
      navigate('/my-reports')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout title="Report Lost Item" subtitle="Fill in the details about your lost item.">
      <form className="card form-card" onSubmit={handleSubmit}>
        {error && (
          <p style={{ background: '#fdeef3', color: 'var(--pink)', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <div className="form-grid">
          <div className="field">
            <label>Item Name</label>
            <div className="input-wrap">
              <input placeholder="Enter item name" value={form.name} onChange={update('name')} required />
            </div>
          </div>
          <div className="field">
            <label>Category</label>
            <select value={form.category} onChange={update('category')} required>
              <option value="">Select category</option>
              <option>Electronics</option>
              <option>Bags</option>
              <option>Wallets</option>
              <option>Keys</option>
              <option>Accessories</option>
              <option>Others</option>
            </select>
          </div>

          <div className="field">
            <label>Location Lost</label>
            <div className="input-wrap">
              <input placeholder="Enter location" value={form.location} onChange={update('location')} required />
            </div>
          </div>
          <div className="field">
            <label>Date Lost</label>
            <div className="input-wrap">
              <input type="date" value={form.date} onChange={update('date')} required />
            </div>
          </div>

          <div className="field full">
            <label>Description</label>
            <textarea placeholder="Describe the item" value={form.description} onChange={update('description')} required />
          </div>

          <div className="field full">
            <label>Upload Images (Max 5)</label>
            <label className="upload-box" style={{ display: 'block', cursor: 'pointer' }}>
              <UploadCloud size={22} />
              <div>{files.length ? `${files.length} image(s) selected` : 'Click or drag images here to upload'}</div>
              <input type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 6 }} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </DashboardLayout>
  )
}
