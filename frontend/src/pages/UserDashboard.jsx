import React, {useState} from 'react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { clearSession } from '../services/authService'
import { categories, getNewsItems } from '../services/newsStore'

export default function UserDashboard({user, onLogout}){
  const [active, setActive] = useState('Overview')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const news = getNewsItems().filter(item => item.published)
  const visibleNews = selectedCategory === 'All' ? news : news.filter(item => item.category === selectedCategory)
  const logout = () => { clearSession(); onLogout() }

  return (
    <div className="dashboard-layout">
      <Sidebar role={user?.role || 'ROLE_USER'} active={active} setActive={setActive} onLogout={logout}/>
      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <p className="eyebrow">Hello, {user?.username || 'User'}</p>
            <h1>{active}</h1>
          </div>
          <div className="role-pill">{user?.role || 'ROLE_USER'}</div>
        </div>

        {active === 'Overview' && (
          <>
            <section className="stats-grid">
              <StatCard label="Articles Read" value="24" hint="This week" />
              <StatCard label="Bookmarks" value="7" hint="Saved articles" />
              <StatCard label="Total News" value={news.length} hint="Published today" />
              <StatCard label="Categories" value={categories.length} hint="Available sections" />
            </section>
            <section className="panel">
              <div className="panel-title-row">
                <h2>Today's Headlines</h2>
                <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              </div>
              <div className="cards-list">{visibleNews.map(item => <ArticleCard key={item.id} item={item} onRead={setSelectedArticle}/>)}</div>
            </section>
          </>
        )}

        {active === 'My Feed' && (
          <section className="panel">
            <div className="panel-title-row">
              <h2>My Personalized Feed</h2>
              <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className="cards-list">{visibleNews.map(item => <ArticleCard key={item.id} item={item} onRead={setSelectedArticle}/>)}</div>
          </section>
        )}
        {active === 'Bookmarks' && <section className="panel"><h2>Bookmarks</h2><p>You saved important stories from Sports, Cinema, and Politics.</p>{news.slice(0,2).map(item => <ArticleCard key={item.id} item={item} onRead={setSelectedArticle}/>)}</section>}
        {active === 'Profile' && <section className="panel profile-card"><h2>Profile Details</h2><p><b>Username:</b> {user?.username}</p><p><b>Role:</b> {user?.role}</p><p><b>Preferences:</b> Sports, Cinema, Crime, Politics, Cooking</p><p><b>Goal:</b> Read published news with clear categories and visuals.</p></section>}
        {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      </main>
    </div>
  )
}

function CategoryFilter({selectedCategory, setSelectedCategory}){
  return (
    <div className="category-filter">
      {['All', ...categories].map(category => <button key={category} className={selectedCategory === category ? 'active' : ''} onClick={() => setSelectedCategory(category)}>{category}</button>)}
    </div>
  )
}

function ArticleCard({item, onRead}){
  return (
    <article className="article-card">
      <img className="article-thumb" src={item.image} alt="" />
      <div className="article-copy">
        <span className="mini-pill">{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.source} | {item.time}</p>
        <span>{item.summary}</span>
      </div>
      <button className="pill dark read-btn" onClick={() => onRead(item)}>Read <span>&rarr;</span></button>
    </article>
  )
}

function ArticleModal({article, onClose}){
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article className="article-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>Close</button>
        <img src={article.image} alt="" />
        <span className="mini-pill">{article.category}</span>
        <h2>{article.title}</h2>
        <p className="article-meta">{article.source} | {article.time}</p>
        <p>{article.content}</p>
      </article>
    </div>
  )
}
