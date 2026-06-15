import React, {useState} from 'react'
import { register, login, saveSession, normalizeRole } from '../services/authService'

export default function Home({onLogin}){
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try{
      if(mode === 'signup'){
        // Public signup always creates a normal user; admin accounts can only be created by admins.
        const data = await register({ username, email: identifier, password, role: 'ROLE_USER' })
        saveSession(data)
        onLogin({ username: data.username, role: normalizeRole(data.role, data.username) })
      } else {
        const payload = identifier.includes('@')
          ? { email: identifier, password }
          : { username: identifier, password }
        const data = await login(payload)
        saveSession(data)
        onLogin({ username: data.username, role: normalizeRole(data.role, data.username) })
      }
      setIdentifier('')
      setUsername('')
      setPassword('')
    }catch(err){
      const text = err?.message || 'Request failed'
      setMessage({type:'error', text})
    }finally{ setLoading(false) }
  }

  return (
    <div className="hero">
      <div className="overlay">
        <header className="topbar">
          <div className="logo">SDC News</div>
        </header>
        <div className="content">
          <div className="left">
            <div className="badge">PS-18 NEWS AGGREGATION PLATFORM</div>
            <h1>Read, organize, and discover news by role.</h1>
            <p className="lead">Sources, categories, article activity, and semantic discovery are routed through FastAPI and stored through the Spring Boot service.</p>
           
          </div>

          <div className="authBox">
            <div className="tabs">
              <button className={mode==='login'? 'active':''} onClick={()=>setMode('login')}>Login</button>
              <button className={mode==='signup'? 'active':''} onClick={()=>setMode('signup')}>Signup</button>
            </div>
            <form onSubmit={handleSubmit} className="authForm">
              {mode === 'signup' && (
                <label>Username
                  <input type="text" value={username} onChange={e=>setUsername(e.target.value)} required />
                </label>
              )}
              <label>{mode === 'login' ? 'Username or Email' : 'Email'}
                <input type={mode === 'login' ? 'text' : 'email'} value={identifier} onChange={e=>setIdentifier(e.target.value)} required />
              </label>
              <label>Password
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
              </label>
              {mode === 'signup' && (
                <div className="note">Signing up creates a standard user account. Admin and Manager accounts can only be created by an existing administrator.</div>
              )}
              {mode === 'login' && (
                <div className="note">If you have an Admin or Manager account, sign in with those credentials and your role will be detected automatically.</div>
              )}
              <button className="submit" disabled={loading}>{loading? 'Please wait...': (mode==='login'?'Login':'Sign up')}</button>
            </form>
            {message && <div className={`msg ${message.type}`}>{message.text}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
