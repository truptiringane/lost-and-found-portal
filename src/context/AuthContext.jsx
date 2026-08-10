import { createContext, useContext, useEffect, useState } from 'react'
import { api, setToken } from '../api/client.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('lf_token')
    if (!token) {
      setLoading(false)
      return
    }
    api.get('/auth/me')
      .then(setUser)
      .catch(() => setToken(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const data = await api.post('/auth/login', { email, password }, { auth: false })
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  async function register({ name, email, phone, password }) {
    const data = await api.post('/auth/register', { name, email, phone, password }, { auth: false })
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    setToken(null)
    setUser(null)
  }

  function updateUser(updated) {
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
