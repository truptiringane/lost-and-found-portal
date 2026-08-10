import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Menu, User } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function DashboardLayout({ title, subtitle, children }) {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="app-layout">
      <Sidebar open={open} />
      <div className="main-area">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              className="icon-btn"
              style={{ display: 'none' }}
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
            <div>
              <h2>{title}</h2>
              {subtitle && <p style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 3 }}>{subtitle}</p>}
            </div>
          </div>
          <div className="topbar-icons">
            <button className="icon-btn" aria-label="Notifications" onClick={() => navigate('/notifications')}>
              <Bell size={18} />
            </button>
            <button className="avatar" aria-label="Profile" onClick={() => navigate('/profile')} style={{ border: 'none' }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
            </button>
          </div>
        </header>
        <div className="page-body">{children}</div>
      </div>
    </div>
  )
}
