import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { clearSession, getAllUsers, deleteUser, register, updateUser } from '../services/authService'
import { categories, getNewsItems, saveNewsItems } from '../services/newsStore'

const sourceRows = [
  {name:'Sports Desk', category:'Sports', status:'Active', articles:42},
  {name:'Entertainment Wire', category:'Cinema', status:'Active', articles:31},
  {name:'City Bureau', category:'Crime', status:'Active', articles:18},
  {name:'Food Journal', category:'Cooking', status:'Review', articles:12}
]

export default function AdminDashboard({user, onLogout}){
  const [active, setActive] = useState('News Manager')
  const [users, setUsers] = useState([])
  const [usersError, setUsersError] = useState('')
  const [usersLoaded, setUsersLoaded] = useState(false)
  const [newUser, setNewUser] = useState({ username:'', email:'', password:'', role:'ROLE_USER' })
  const [news, setNews] = useState(getNewsItems())
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    source: 'SDC Newsroom',
    image: '',
    summary: '',
    content: ''
  })

  useEffect(() => {
    if(active !== 'Users' || usersLoaded) return
    getAllUsers()
      .then(data => {
        setUsers(data)
        setUsersLoaded(true)
        setUsersError('')
      })
      .catch(err => {
        setUsersLoaded(true)
        setUsersError('User management requires a real ROLE_ADMIN backend token. News add/delete is still available.')
        console.warn(err.message)
      })
  }, [active, usersLoaded])

  const logout = () => { clearSession(); onLogout() }
  const publishedNews = news.filter(item => item.published)

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
    setForm({title:'', category:categories[0], source:'SDC Newsroom', image:'', summary:'', content:''})
    setActive('Articles')
  }

  const removeNews = (id) => {
    const nextNews = news.filter(item => item.id !== id)
    setNews(nextNews)
    saveNewsItems(nextNews)
  }

  const removeUser = async (id) => {
    try{
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
    }catch(err){ setUsersError(err.message) }
  }

  const createUser = async (e) => {
    e.preventDefault()
    setUsersError('')
    try{
      const payload = { username: newUser.username, email: newUser.email, password: newUser.password, role: newUser.role }
      await register(payload)
      // refresh users list
      const data = await getAllUsers()
      setUsers(data)
      setNewUser({ username:'', email:'', password:'', role:'ROLE_USER' })
    }catch(err){ setUsersError(err.message) }
  }

  const promoteUser = async (id) => {
    setUsersError('')
    try{
      await updateUser(id, { role: 'ROLE_ADMIN' })
      const data = await getAllUsers()
      setUsers(data)
    }catch(err){ setUsersError(err.message) }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="ROLE_ADMIN" active={active} setActive={setActive} onLogout={logout}/>
      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <p className="eyebrow">Welcome back, {user?.username || 'Admin'}</p>
            <h1>{active}</h1>
          </div>
          <div className="role-pill">ROLE_ADMIN</div>
        </div>
        {active === 'News Manager' && (
          <section className="two-col">
            <NewsForm form={form} setForm={setForm} addNews={addNews} />
            <section className="panel">
              <h2>Delete News</h2>
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
              <StatCard label="Total Users" value={users.length || 3} hint="Registered platform users" />
              <StatCard label="Today's Headlines" value={publishedNews.length} hint="Published today" />
              <StatCard label="Categories" value={categories.length} hint="Available sections" />
              <StatCard label="Admin Tools" value="2" hint="Add and delete news" />
            </section>
            <section className="two-col">
              <div className="panel">
                <h2>Today's Headlines</h2>
                <div className="headline-stack">
                  {publishedNews.slice(0, 5).map(item => (
                    <div className="headline-row" key={item.id}>
                      <span>{item.category}</span>
                      <strong>{item.title}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel"><h2>Admin Details</h2><p><b>Username:</b> {user?.username}</p><p><b>Role:</b> {user?.role}</p><p><b>Permissions:</b> Add news, delete news, manage users, review sources.</p></div>
            </section>
          </>
        )}

        {active === 'Users' && (
          <section className="panel">
            <h2>User Management</h2>
            {usersError && <div className="msg error">{usersError}</div>}

            <div className="two-col">
              <section className="panel">
                <h3>Create User</h3>
                <form className="news-form" onSubmit={createUser}>
                  <label>Username<input value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} required /></label>
                  <label>Email<input type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required /></label>
                  <label>Password<input type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required /></label>
                  <label>Role<select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                    <option value="ROLE_USER">User</option>
                    <option value="ROLE_MANAGER">Manager</option>
                    <option value="ROLE_ADMIN">Admin</option>
                  </select></label>
                  <button className="submit" type="submit">Create</button>
                </form>
              </section>

              <section className="panel">
                <h3>Existing Users</h3>
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.username}</td>
                          <td>{u.email}</td>
                          <td><span className="mini-pill">{u.role}</span></td>
                          <td>
                            {u.role !== 'ROLE_ADMIN' && <button className="pill" onClick={() => promoteUser(u.id)}>Promote to Admin</button>}
                            <button className="danger" onClick={() => removeUser(u.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </section>
        )}

        {active === 'Sources' && <DataTable title="News Sources" rows={sourceRows} columns={['name','category','status','articles']} />}
        {active === 'Articles' && (
          <section className="panel">
            <h2>Published News</h2>
            <div className="admin-news-grid">
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
        )}
        {active === 'Reports' && <section className="panel"><h2>Reports</h2><p>Sports and Cinema have the strongest headline engagement today. Cooking and Celebrity have room for more published stories.</p><div className="progress"><span style={{width:'76%'}}></span></div><p>Overall publishing health: 76%</p></section>}
      </main>
    </div>
  )
}

function NewsForm({form, setForm, addNews}){
  const update = (field, value) => setForm({...form, [field]: value})

  return (
    <section className="panel">
      <h2>Add News</h2>
      <form className="news-form" onSubmit={addNews}>
        <label>Headline<input value={form.title} onChange={e => update('title', e.target.value)} required /></label>
        <label>Category<select value={form.category} onChange={e => update('category', e.target.value)}>{categories.map(category => <option key={category}>{category}</option>)}</select></label>
        <label>Source<input value={form.source} onChange={e => update('source', e.target.value)} required /></label>
        <label>Image URL<input value={form.image} onChange={e => update('image', e.target.value)} placeholder="Optional" /></label>
        <label>Short Preview<textarea value={form.summary} onChange={e => update('summary', e.target.value)} required /></label>
        <label>Full News<textarea value={form.content} onChange={e => update('content', e.target.value)} required /></label>
        <button className="submit" type="submit">Publish News</button>
      </form>
    </section>
  )
}

function DataTable({title, rows, columns}){
  return <section className="panel"><h2>{title}</h2><div className="table-wrap"><table><thead><tr>{columns.map(c => <th key={c}>{c.toUpperCase()}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{columns.map(c => <td key={c}>{row[c]}</td>)}</tr>)}</tbody></table></div></section>
}
