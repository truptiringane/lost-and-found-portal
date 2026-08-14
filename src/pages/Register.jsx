import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MapPin, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await register(form)
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
        <h2>Create Account</h2>
        <p className="sub">Join us and help others find what they lost.</p>

        {error && (
          <p style={{ background: '#fdeef3', color: 'var(--pink)', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <div className="input-wrap">
              <input placeholder="Enter your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <div className="input-wrap">
              <input type="email" placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
          </div>

          <div className="field">
            <label>Phone Number</label>
            <div className="input-wrap">
              <input placeholder="Enter your phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
              <span className="eye" onClick={() => setShowPw((s) => !s)}>
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </span>
            </div>
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <div className="input-wrap">
              <input
                type={showPw2 ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
              />
              <span className="eye" onClick={() => setShowPw2((s) => !s)}>
                {showPw2 ? <EyeOff size={17} /> : <Eye size={17} />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 4 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-foot">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}
