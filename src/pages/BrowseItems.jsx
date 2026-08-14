import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, PackageSearch, Image as ImageIcon } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { EmptyState } from '../components/Ui.jsx'
import { api, resolveImage } from '../api/client.js'

const tabs = [
  { label: 'All Items', value: '' },
  { label: 'Lost Items', value: 'lost' },
  { label: 'Found Items', value: 'found' },
]

export default function BrowseItems() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchItems() {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (tab) params.set('type', tab)
      if (category) params.set('category', category)
      if (location) params.set('location', location)
      if (search) params.set('search', search)
      const data = await api.get(`/items?${params.toString()}`)
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <DashboardLayout title="Browse Items" subtitle="Search through reported lost and found items">
      <form
        className="filters-row"
        onSubmit={(e) => { e.preventDefault(); fetchItems() }}
      >
        <div className="search-input">
          <Search size={16} color="var(--muted)" />
          <input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option>Electronics</option>
          <option>Bags</option>
          <option>Wallets</option>
          <option>Keys</option>
          <option>Accessories</option>
          <option>Others</option>
        </select>
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ maxWidth: 170, padding: '0 14px', border: '1.5px solid var(--border)', borderRadius: 10, background: 'var(--white)' }}
        />
        <button type="submit" className="btn btn-primary btn-sm">Search</button>
      </form>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.label} className={`tab ${tab === t.value ? 'active' : ''}`} onClick={() => setTab(t.value)}>
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <p style={{ background: '#fdeef3', color: 'var(--pink)', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, marginBottom: 16 }}>
          {error}
        </p>
      )}

      {loading ? (
        <div className="card"><p style={{ textAlign: 'center', color: 'var(--muted)', padding: 30 }}>Loading items...</p></div>
      ) : items.length === 0 ? (
        <div className="card">
          <EmptyState icon={PackageSearch} title="No items found." text="Try adjusting your search or filters." />
        </div>
      ) : (
        <div className="item-grid">
          {items.map((item) => (
            <div key={item._id} className="item-card" onClick={() => navigate(`/items/${item._id}`)} style={{ cursor: 'pointer' }}>
              <div className={`thumb ${item.type === 'found' ? 'found' : ''}`}>
                {item.images?.[0] ? (
                  <img src={resolveImage(item.images[0])} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageIcon size={32} />
                )}
              </div>
              <div className="body">
                <span className={`badge ${item.type === 'found' ? 'badge-found' : 'badge-lost'}`}>
                  {item.type === 'found' ? 'Found' : 'Lost'}
                </span>
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
