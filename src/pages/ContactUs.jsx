import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { api } from '../api/client.js'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('')
    setLoading(true)
    try {
      await api.post('/contact', form, { auth: false })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout title="Contact Us" subtitle="Have any questions or need help? We'd love to hear from you.">
      <div className="contact-grid">
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18 }}>Get in Touch</h3>
          <div className="contact-item">
            <div className="icon"><Mail size={18} /></div>
            <div>
              <h4>Email</h4>
              <p>support@lostandfound.example</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon"><Phone size={18} /></div>
            <div>
              <h4>Phone</h4>
              <p>+1 (555) 010-0100</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon"><MapPin size={18} /></div>
            <div>
              <h4>Address</h4>
              <p>123 Main Street, Your City</p>
            </div>
          </div>
        </div>

        <form className="card" onSubmit={handleSubmit}>
          {status === 'success' && (
            <p style={{ background: 'var(--green-light)', color: 'var(--green)', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, marginBottom: 16 }}>
              Message sent successfully. We'll get back to you soon.
            </p>
          )}
          {status && status !== 'success' && (
            <p style={{ background: '#fdeef3', color: 'var(--pink)', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, marginBottom: 16 }}>
              {status}
            </p>
          )}

          <div className="field">
            <label>Your Name</label>
            <input placeholder="Enter your name" value={form.name} onChange={update('name')} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={form.email} onChange={update('email')} required />
          </div>
          <div className="field">
            <label>Subject</label>
            <input placeholder="Enter subject" value={form.subject} onChange={update('subject')} required />
          </div>
          <div className="field">
            <label>Message</label>
            <textarea placeholder="Type your message..." value={form.message} onChange={update('message')} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}
