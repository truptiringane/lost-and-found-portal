import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileWarning, PackageCheck, ClipboardList, RotateCcw, Inbox, Bell, UserPlus, Image as ImageIcon } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { StatCard, EmptyState } from '../components/Ui.jsx'
import { api, resolveImage } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [stats, setStats] = useState({ lostCount: 0, foundCount: 0, myReports: 0, returned: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.get('/items/stats'), api.get('/items/mine')])
      .then(([statsData, mine]) => {
        setStats(statsData)
        setRecent(mine.slice(0, 3))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <DashboardLayout title="Dashboard" subtitle={`Welcome back${user?.name ? ', ' + user.name.split(' ')[0] : ''}!`}>
      <div className="stat-grid">
        <StatCard icon={FileWarning} label="Lost Items" value={loading ? '—' : stats.lostCount} bg="var(--pink-light)" color="var(--pink)" />
        <StatCard icon={PackageCheck} label="Found Items" value={loading ? '—' : stats.foundCount} bg="var(--green-light)" color="var(--green)" />
        <StatCard icon={ClipboardList} label="My Reports" value={loading ? '—' : stats.myReports} bg="#fff2e0" color="#c9821f" />
        <StatCard icon={RotateCcw} label="Items Returned" value={loading ? '—' : stats.returned} bg="#f1ecff" color="#7b5fd6" />
      </div>

      <div className="card-title-row" style={{ marginBottom: 14 }}>
        <h3>Quick Actions</h3>
      </div>
      <div className="quick-actions">
        <button className="btn btn-primary" onClick={() => navigate('/report-lost')}>
          <UserPlus size={16} /> Report Lost Item
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/report-found')}>
          <UserPlus size={16} /> Report Found Item
        </button>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-title-row">
            <h3>Recent Reports</h3>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/my-reports') }}>View All</a>
          </div>
          {recent.length === 0 ? (
            <EmptyState icon={Inbox} title="No reports yet." text="Your reported items will appear here." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recent.map((item) => (
                <div key={item._id} onClick={() => navigate(`/items/${item._id}`)} style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', padding: '8px 6px', borderRadius: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: item.type === 'found' ? 'var(--green-light)' : 'var(--pink-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.type === 'found' ? 'var(--green)' : 'var(--pink)', overflow: 'hidden' }}>
                    {item.images?.[0] ? <img src={resolveImage(item.images[0])} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={18} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.type === 'found' ? 'Found' : 'Lost'} · {item.category}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <div className="card-title-row">
            <h3>Notifications</h3>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/notifications') }}>View All</a>
          </div>
          <EmptyState icon={Bell} title="No notifications yet." text="You will see updates here." />
        </div>
      </div>
    </DashboardLayout>
  )
}
