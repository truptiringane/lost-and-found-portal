import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileWarning, PackageCheck, Search, ClipboardList,
  Heart, Bell, User, Settings, LogOut, MapPin,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/report-lost', label: 'Report Lost Item', icon: FileWarning },
  { to: '/report-found', label: 'Report Found Item', icon: PackageCheck },
  { to: '/browse', label: 'Browse Items', icon: Search },
  { to: '/my-reports', label: 'My Reports', icon: ClipboardList },
  { to: '/saved-items', label: 'Saved Items', icon: Heart },
  { to: '/notifications', label: 'Notifications', icon: Bell },
]

const links2 = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <span className="brand-icon"><MapPin size={16} /></span>
        Lost &amp; Found
      </div>
      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
        <div className="sidebar-divider" />
        {links2.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
        <button
          className="sidebar-link"
          style={{ background: 'transparent', width: '100%', textAlign: 'left' }}
          onClick={handleLogout}
        >
          <LogOut size={17} />
          Logout
        </button>
      </nav>
    </aside>
  )
}
