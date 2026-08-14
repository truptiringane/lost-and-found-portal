import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Image as ImageIcon } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { EmptyState } from '../components/Ui.jsx'
import { api, resolveImage } from '../api/client.js'

export default function SavedItems() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get('/items/saved')
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleUnsave(id) {
    try {
      await api.post(`/items/${id}/save`)
      setItems((prev) => prev.filter((i) => i._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <DashboardLayout title="Saved Items" subtitle="Items you've bookmarked for later.">
      {error && (
        <p style={{ background: '#fdeef3', color: 'var(--pink)', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, marginBottom: 16 }}>
          {error}
        </p>
      )}

      {loading ? (
        <div className="card"><p style={{ textAlign: 'center', color: 'var(--muted)', padding: 30 }}>Loading...</p></div>
      ) : items.length === 0 ? (
        <div className="card">
          <EmptyState icon={Heart} title="No saved items." text="Items you save will appear here." />
        </div>
      ) : (
        <div className="item-grid">
          {items.map((item) => (
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
                    {item.type === 'found' ? 'Found' : 'Lost'}
                  </span>
                  <button onClick={() => handleUnsave(item._id)} style={{ background: 'none' }} aria-label="Unsave">
                    <Heart size={15} fill="var(--pink)" color="var(--pink)" />
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
