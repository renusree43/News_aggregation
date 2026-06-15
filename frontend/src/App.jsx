import React, {useEffect, useState} from 'react'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import ManagerDashboard from './pages/ManagerDashboard'
import UserDashboard from './pages/UserDashboard'
import { clearSession, getMe, getSession, getToken, normalizeRole } from './services/authService'
import './styles.css'

// Clear session for fresh login page during development
if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('fresh') === '1') {
  clearSession()
}

export default function App(){
  const [user, setUser] = useState(getSession())
  const [checkingSession, setCheckingSession] = useState(Boolean(getToken()))

  useEffect(() => {
    if(!getToken()){
      setUser(null)
      setCheckingSession(false)
      return
    }

    let cancelled = false
    getMe()
      .then(data => {
        if(cancelled) return
        setUser({
          username: data.username,
          email: data.email,
          role: normalizeRole(data.role, data.username)
        })
      })
      .catch(() => {
        if(cancelled) return
        clearSession()
        setUser(null)
      })
      .finally(() => {
        if(!cancelled) setCheckingSession(false)
      })

    return () => { cancelled = true }
  }, [])

  const handleLogout = () => {
    clearSession()
    setUser(null)
  }

  if(checkingSession) return (
    <div className="session-check">
      <div className="session-check-box">Checking login...</div>
    </div>
  )

  if(!user) return <Home onLogin={setUser} />
  const userRole = normalizeRole(user.role, user.username)
  if(userRole === 'ROLE_ADMIN') return <AdminDashboard user={{...user, role:'ROLE_ADMIN'}} onLogout={handleLogout} />
  if(userRole === 'ROLE_MANAGER') return <ManagerDashboard user={{...user, role:'ROLE_MANAGER'}} onLogout={handleLogout} />
  return <UserDashboard user={{...user, role:userRole}} onLogout={handleLogout} />
}
