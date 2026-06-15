const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export function getToken(){ return localStorage.getItem('sdc_token') }
function authHeaders(){
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, options = {}){
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {})
    }
  })

  if(!res.ok){
    const contentType = res.headers.get('content-type') || ''
    let message = res.statusText || 'Request failed'
    if(contentType.includes('application/json')){
      const data = await res.json().catch(() => null)
      message = data?.detail || data?.message || data?.error || JSON.stringify(data)
    } else {
      message = await res.text().catch(() => message)
    }
    throw new Error(message || 'Request failed')
  }

  if(res.status === 204) return null
  return res.json()
}

export const register = (payload) => request('/api/auth/register', { method:'POST', body: JSON.stringify(payload) })
export const login = (payload) => request('/api/auth/login', { method:'POST', body: JSON.stringify(payload) })
export const getMe = () => request('/api/users/me')
export const getAllUsers = () => request('/api/admin/users')
export const updateUser = (id, payload) => request(`/api/admin/users/${id}`, { method:'PUT', body: JSON.stringify(payload) })
export const deleteUser = (id) => request(`/api/admin/users/${id}`, { method:'DELETE' })

export function normalizeRole(role, username = ''){
  if(String(username).toLowerCase() === 'admin') return 'ROLE_ADMIN'
  const value = String(role || '').toUpperCase()
  if(value.includes('ADMIN')) return 'ROLE_ADMIN'
  if(value.includes('MANAGER')) return 'ROLE_MANAGER'
  return 'ROLE_USER'
}

export function saveSession(data, roleOverride){
  localStorage.setItem('sdc_token', data.token)
  localStorage.setItem('sdc_user', JSON.stringify({ username:data.username, role:normalizeRole(roleOverride || data.role, data.username) }))
}
export function getSession(){
  if(!getToken()) return null
  const raw = localStorage.getItem('sdc_user')
  if(!raw) return null
  try{
    const user = JSON.parse(raw)
    return {...user, role: normalizeRole(user.role, user.username)}
  }catch{
    clearSession()
    return null
  }
}
export function clearSession(){
  localStorage.removeItem('sdc_token')
  localStorage.removeItem('sdc_user')
}
