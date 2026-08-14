import { useState } from 'react'
import { User, Eye, EyeOff } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { api } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileMsg, setProfileMsg] = useState('')

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwMsg, setPwMsg] = useState('')
  const [pwLoading, setPwLoading] = useState(false)

  async function handleSaveProfile() {
    if (!editing) {
      setEditing(true)
      return
    }
    setSavingProfile(true)
    setProfileMsg('')
    try {
      const updated = await api.put('/users/me', profile)
      updateUser(updated)
      setEditing(false)
      setProfileMsg('Profile updated.')
    } catch (err) {
      setProfileMsg(err.message)
    } finally {
      setSavingProfile(false)
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    setPwMsg('')
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg('New passwords do not match')
      return
    }
    setPwLoading(true)
    try {
      await api.put('/users/me/password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      })
      setPwMsg('Password updated successfully.')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setPwMsg(err.message)
    } finally {
      setPwLoading(false)
    }
  }

  return (
    <DashboardLayout title="Profile Information" subtitle="Manage your personal details.">
      <div className="card" style={{ maxWidth: 620, marginBottom: 20 }}>
        <div className="profile-header">
          <div className="profile-avatar"><User size={34} /></div>
          <div>
            <button className="btn btn-outline btn-sm">Change Photo</button>
          </div>
        </div>

        {profileMsg && <p style={{ fontSize: 13, color: profileMsg.includes('updated') ? 'var(--green)' : 'var(--pink)', marginBottom: 12 }}>{profileMsg}</p>}

        {editing ? (
          <div className="form-grid">
            <div className="field full">
              <label>Full Name</label>
              <input placeholder="Full name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div className="field full">
              <label>Email</label>
              <input placeholder="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div className="field full">
              <label>Phone Number</label>
              <input placeholder="Phone number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </div>
          </div>
        ) : (
          <>
            <div className="info-row"><span className="label">Full Name</span><span className="value">{profile.name || '—'}</span></div>
            <div className="info-row"><span className="label">Email</span><span className="value">{profile.email || '—'}</span></div>
            <div className="info-row"><span className="label">Phone Number</span><span className="value">{profile.phone || '—'}</span></div>
          </>
        )}

        <button className="btn btn-primary btn-sm" style={{ marginTop: 18 }} onClick={handleSaveProfile} disabled={savingProfile}>
          {savingProfile ? 'Saving...' : editing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      <form className="card" style={{ maxWidth: 620 }} onSubmit={handleChangePassword}>
        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Change Password</h3>

        {pwMsg && <p style={{ fontSize: 13, color: pwMsg.includes('successfully') ? 'var(--green)' : 'var(--pink)', marginBottom: 12 }}>{pwMsg}</p>}

        <div className="field">
          <label>Current Password</label>
          <div className="input-wrap">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Enter current password"
              value={pwForm.currentPassword}
              onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
              required
            />
            <span className="eye" onClick={() => setShowPw((s) => !s)}>
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </span>
          </div>
        </div>
        <div className="field">
          <label>New Password</label>
          <div className="input-wrap">
            <input
              type="password"
              placeholder="Enter new password"
              value={pwForm.newPassword}
              onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
              required
              minLength={6}
            />
          </div>
        </div>
        <div className="field">
          <label>Confirm New Password</label>
          <div className="input-wrap">
            <input
              type="password"
              placeholder="Confirm new password"
              value={pwForm.confirmPassword}
              onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-secondary btn-block" disabled={pwLoading}>
          {pwLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </DashboardLayout>
  )
}
