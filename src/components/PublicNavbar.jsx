import { NavLink, useNavigate } from 'react-router-dom'
import Brand from './Brand.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function PublicNavbar() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <header className="public-nav">
      <Brand />
      <nav className="public-nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/browse" className={({ isActive }) => (isActive ? 'active' : '')}>Browse Items</NavLink>
        <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? 'active' : '')}>How It Works</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
      </nav>
      <div className="public-nav-actions">
        {user ? (
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        ) : (
          <>
            <button className="btn-ghost" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>Register</button>
          </>
        )}
      </div>
    </header>
  )
}
