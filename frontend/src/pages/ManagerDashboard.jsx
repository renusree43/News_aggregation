import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { clearSession, getAllUsers } from '../services/authService'
import { categories, getNewsItems, saveNewsItems } from '../services/newsStore'

export default function ManagerDashboard({ user, onLogout }) {
  const [active, setActive] = useState('News Manager')
  const [news, setNews] = useState(getNewsItems())
  const [emails, setEmails] = useState([])
  const [emailsLoaded, setEmailsLoaded] = useState(false)
  const [emailsError, setEmailsError] = useState('')
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    source: 'SDC Newsroom',
    image: '',
    summary: '',
    content: ''
  })

  const logout = () => { clearSession(); onLogout() }
  const publishedNews = news.filter(item => item.published)

  useEffect(() => {
    if (active !== 'Users' || emailsLoaded) return
    getAllUsers()
      .then(data => {
        setEmails(data.map(u => u.email))
        setEmailsLoaded(true)
        setEmailsError('')
      })
      .catch(err => {
        setEmailsLoaded(true)
        setEmailsError('Unable to load user emails. Check your manager access.')
        console.warn(err.message)
      })
  }, [active, emailsLoaded])

  const addNews = (e) => {
    e.preventDefault()
    const nextItem = {
      id: Date.now(),
      ...form,
      time: `Today, ${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`,
      image: form.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=640&q=80',
      published: true
    }
    const nextNews = [nextItem, ...news]
    setNews(nextNews)
    saveNewsItems(nextNews)
    setForm({ title:'', category:categories[0], source:'SDC Newsroom', image:'', summary:'', content:'' })
    setActive('Articles')
  }

  const removeNews = (id) => {
    const nextNews = news.filter(item => item.id !== id)
    setNews(nextNews)
    saveNewsItems(nextNews)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="ROLE_MANAGER" active={active} setActive={setActive} onLogout={logout}/>
      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <p className="eyebrow">Welcome back, {user?.username || 'Manager'}</p>
            <h1>{active}</h1>
          </div>
          <div className="role-pill">ROLE_MANAGER</div>
        </div>

        {active === 'News Manager' && (
          <section className="two-col">
            <section className="panel">
              <h2>Add Breaking News</h2>
              <form className="news-form" onSubmit={addNews}>
                <label>Headline<input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></label>
                <label>Category<select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>{categories.map(category => <option key={category}>{category}</option>)}</select></label>
                <label>Source<input value={form.source} onChange={e => setForm({...form, source: e.target.value})} required /></label>
                <label>Image URL<input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="Optional" /></label>
                <label>Short Preview<textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} required /></label>
                <label>Full News<textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} required /></label>
                <button className="submit" type="submit">Publish News</button>
              </form>
            </section>
            <section className="panel">
              <h2>Manage Published News</h2>
              <div className="admin-news-grid single">
                {publishedNews.map(item => (
                  <article className="admin-news-card" key={item.id}>
                    <img src={item.image} alt="" />
                    <div>
                      <span className="mini-pill">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      <button className="danger" onClick={() => removeNews(item.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}

        {active === 'Overview' && (
          <>
            <section className="stats-grid">
              <StatCard label="Published News" value={publishedNews.length.toString()} hint="Current stories" />
              <StatCard label="Categories" value={categories.length.toString()} hint="Available sections" />
              <StatCard label="Tasks" value="Add/Delete" hint="News management" />
              <StatCard label="Access" value="Manager only" hint="No user management" />
            </section>
            <section className="panel">
              <h2>Manager Notes</h2>
              <p>As a manager, you can publish and remove stories for users to read. You do not have access to user administration.</p>
            </section>
          </>
        )}

        {active === 'Users' && (
          <section className="panel">
            <h2>Logged-in User Emails</h2>
            {emailsError && <div className="msg error">{emailsError}</div>}
            {!emailsLoaded ? (
              <p>Loading user emails...</p>
            ) : (
              <ul className="email-list">
                {emails.map(email => <li key={email}>{email}</li>)}
              </ul>
            )}
          </section>
        )}

        {active === 'Reports' && (
          <section className="panel">
            <h2>Editorial Report</h2>
            <p>Top categories today are Sports and Cinema. Prioritize high-engagement stories and keep the newsroom updated.</p>
            <div className="progress"><span style={{width:'68%'}}></span></div>
            <p>Content readiness: 68%</p>
          </section>
        )}
      </main>
    </div>
  )
}
