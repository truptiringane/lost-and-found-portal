import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MapPin, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-icon"><MapPin size={26} /></div>
        <h2>Welcome Back!</h2>
        <p className="sub">Login to your account</p>

        {error && (
          <p style={{ background: '#fdeef3', color: 'var(--pink)', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <div className="input-wrap">
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <span className="eye" onClick={() => setShowPw((s) => !s)}>
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </span>
            </div>
          </div>

          <div className="field-row">
            <label className="remember">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-foot">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}
