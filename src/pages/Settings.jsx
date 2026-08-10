import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout.jsx'

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 46, height: 26, borderRadius: 999, padding: 3,
        background: checked ? 'var(--pink)' : '#e6dde2',
        display: 'flex', justifyContent: checked ? 'flex-end' : 'flex-start',
        transition: 'background 0.15s ease',
      }}
    >
      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', display: 'block' }} />
    </button>
  )
}

export default function Settings() {
  const [prefs, setPrefs] = useState({
    email: true,
    push: true,
    matches: true,
    marketing: false,
  })

  const toggle = (key) => () => setPrefs({ ...prefs, [key]: !prefs[key] })

  const items = [
    { key: 'email', label: 'Email Notifications', text: 'Receive updates about your reports via email.' },
    { key: 'push', label: 'Push Notifications', text: 'Get notified in-app about activity on your items.' },
    { key: 'matches', label: 'Match Alerts', text: 'Be alerted when a possible match is found.' },
    { key: 'marketing', label: 'Marketing Emails', text: 'Occasional tips, news and product updates.' },
  ]

  return (
    <DashboardLayout title="Settings" subtitle="Manage how Lost & Found keeps in touch with you.">
      <div className="card" style={{ maxWidth: 620 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Notification Preferences</h3>
        {items.map(({ key, label, text }) => (
          <div key={key} className="info-row" style={{ alignItems: 'center' }}>
            <div>
              <div className="value" style={{ marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{text}</div>
            </div>
            <Toggle checked={prefs[key]} onChange={toggle(key)} />
          </div>
        ))}
      </div>

      <div className="card" style={{ maxWidth: 620, marginTop: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }}>Danger Zone</h3>
        <p style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 14 }}>
          Deleting your account will permanently remove all your reports and saved items.
        </p>
        <button className="btn btn-outline btn-sm">Delete Account</button>
      </div>
    </DashboardLayout>
  )
}
