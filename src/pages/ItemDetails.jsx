import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Share2, Heart, Image as ImageIcon, Tag, MapPin, Calendar, AlignLeft } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { api, resolveImage } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [item, setItem] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get(`/items/${id}`)
      .then((data) => {
        setItem(data)
        if (user) setSaved(user.savedItems?.some((sid) => sid === data._id || sid?._id === data._id))
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, user])

  async function handleSave() {
    if (!user) return navigate('/login')
    try {
      const res = await api.post(`/items/${id}/save`)
      setSaved(res.saved)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Item Details">
        <p style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>Loading item...</p>
      </DashboardLayout>
    )
  }

  if (error || !item) {
    return (
      <DashboardLayout title="Item Details">
        <p style={{ textAlign: 'center', color: 'var(--pink)', padding: 40 }}>{error || 'Item not found.'}</p>
      </DashboardLayout>
    )
  }

  const images = item.images?.length ? item.images : []

  return (
    <DashboardLayout title="Item Details">
      <a className="back-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/browse') }}>
        <ArrowLeft size={16} /> Back to Browse
      </a>

      <div className="card-title-row">
        <div />
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="icon-btn"><Share2 size={16} /></button>
          <button className="icon-btn" onClick={handleSave} style={{ color: saved ? 'var(--pink)' : undefined }}>
            <Heart size={16} fill={saved ? 'var(--pink)' : 'none'} />
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div>
          <div className="detail-thumb">
            {images[activeImg] ? (
              <img src={resolveImage(images[activeImg])} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
            ) : (
              <ImageIcon size={48} />
            )}
          </div>
          {images.length > 1 && (
            <div className="detail-thumb-row">
              {images.map((img, i) => (
                <div key={img} onClick={() => setActiveImg(i)} style={{ cursor: 'pointer', overflow: 'hidden' }}>
                  <img src={resolveImage(img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="card-title-row" style={{ marginBottom: 4 }}>
            <h2 style={{ fontSize: 22 }}>{item.name}</h2>
            <span className={`badge ${item.type === 'found' ? 'badge-found' : 'badge-lost'}`}>
              {item.type === 'found' ? 'Found' : 'Lost'}
            </span>
          </div>

          <div className="detail-info-row">
            <span className="label"><Tag size={15} /> Category</span>
            <span className="value">{item.category}</span>
          </div>
          <div className="detail-info-row">
            <span className="label"><MapPin size={15} /> Location</span>
            <span className="value">{item.location}</span>
          </div>
          <div className="detail-info-row">
            <span className="label"><Calendar size={15} /> Date</span>
            <span className="value">{new Date(item.date).toLocaleDateString()}</span>
          </div>
          <div className="detail-info-row" style={{ alignItems: 'flex-start' }}>
            <span className="label"><AlignLeft size={15} /> Description</span>
            <span className="value">{item.description}</span>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 16, marginBottom: 6 }}>Contact {item.type === 'found' ? 'Finder' : 'Owner'}</h3>
            {user ? (
              <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>
                <p><strong style={{ color: 'var(--ink)' }}>{item.owner?.name}</strong></p>
                <p>{item.owner?.email}</p>
                {item.owner?.phone && <p>{item.owner.phone}</p>}
              </div>
            ) : (
              <>
                <p style={{ color: 'var(--muted)', fontSize: 13.5, marginBottom: 14 }}>Please login to contact the {item.type === 'found' ? 'finder' : 'owner'}.</p>
                <button className="btn btn-secondary btn-block" onClick={() => navigate('/login')}>Login to Contact</button>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
