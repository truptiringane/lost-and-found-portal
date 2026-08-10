import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardX, Image as ImageIcon, Trash2 } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { EmptyState } from '../components/Ui.jsx'
import { api, resolveImage } from '../api/client.js'

export default function MyReports() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('lost')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get('/items/mine')
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    try {
      await api.del(`/items/${id}`)
      setItems((prev) => prev.filter((i) => i._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const filtered = items.filter((i) => i.type === tab)

  return (
    <DashboardLayout title="My Reports" subtitle="Track everything you've reported.">
      <div className="tabs">
        <button className={`tab ${tab === 'lost' ? 'active' : ''}`} onClick={() => setTab('lost')}>Lost Items</button>
        <button className={`tab ${tab === 'found' ? 'active' : ''}`} onClick={() => setTab('found')}>Found Items</button>
      </div>

      {error && (
        <p style={{ background: '#fdeef3', color: 'var(--pink)', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, marginBottom: 16 }}>
          {error}
        </p>
      )}

      {loading ? (
        <div className="card"><p style={{ textAlign: 'center', color: 'var(--muted)', padding: 30 }}>Loading...</p></div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={ClipboardX}
            title="No reports yet."
            text="You haven't reported any items."
            action={
              <button className="btn btn-primary" onClick={() => navigate(tab === 'lost' ? '/report-lost' : '/report-found')}>
                Report an Item
              </button>
            }
          />
        </div>
      ) : (
        <div className="item-grid">
          {filtered.map((item) => (
            <div key={item._id} className="item-card">
              <div className={`thumb ${item.type === 'found' ? 'found' : ''}`} onClick={() => navigate(`/items/${item._id}`)} style={{ cursor: 'pointer' }}>
                {item.images?.[0] ? (
                  <img src={resolveImage(item.images[0])} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageIcon size={32} />
                )}
              </div>
              <div className="body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className={`badge ${item.type === 'found' ? 'badge-found' : 'badge-lost'}`}>
                    {item.status === 'returned' ? 'Returned' : item.type === 'found' ? 'Found' : 'Lost'}
                  </span>
                  <button onClick={() => handleDelete(item._id)} style={{ background: 'none', color: 'var(--muted)' }} aria-label="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
                <h4>{item.name}</h4>
                <p className="meta">{item.category} · {item.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
