export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
// Root URL (no /api) for resolving uploaded image paths like /uploads/xyz.jpg
export const SERVER_ROOT = API_BASE.replace(/\/api\/?$/, '')

function getToken() {
  return localStorage.getItem('lf_token')
}

export function setToken(token) {
  if (token) localStorage.setItem('lf_token', token)
  else localStorage.removeItem('lf_token')
}

async function request(path, { method = 'GET', body, isForm = false, auth = true } = {}) {
  const headers = {}
  if (!isForm) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`)
  }

  return data
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body, opts = {}) => request(path, { method: 'POST', body, ...opts }),
  put: (path, body, opts = {}) => request(path, { method: 'PUT', body, ...opts }),
  del: (path) => request(path, { method: 'DELETE' }),
}

export function resolveImage(pathOrUrl) {
  if (!pathOrUrl) return null
  if (pathOrUrl.startsWith('http')) return pathOrUrl
  return `${SERVER_ROOT}${pathOrUrl}`
}
