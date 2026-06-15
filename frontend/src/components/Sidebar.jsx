import React from 'react'

export default function Sidebar({role, active, setActive, onLogout}){
  const adminItems = ['News Manager','Overview','Users','Sources','Articles','Reports']
  const managerItems = ['News Manager','Overview','Users','Reports']
  const userItems = ['Overview','My Feed','Bookmarks','Profile']
  const items = role === 'ROLE_ADMIN' ? adminItems : role === 'ROLE_MANAGER' ? managerItems : userItems
  const icons = {
    Overview: '01',
    'News Manager': '01',
    Users: '02',
    Sources: '03',
    Articles: '04',
    Reports: '05',
    'My Feed': '02',
    Bookmarks: '03',
    Profile: '04'
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">S</div>
        <div>
          <h3>SDC News</h3>
          <p>{role === 'ROLE_ADMIN' ? 'Admin Panel' : role === 'ROLE_MANAGER' ? 'Manager Portal' : 'User Portal'}</p>
        </div>
      </div>
      <nav>
        {items.map(item => (
          <button key={item} className={active === item ? 'nav-active' : ''} onClick={() => setActive(item)}>
            <span className="nav-icon">{icons[item]}</span>
            <span>{item}</span>
          </button>
        ))}
      </nav>
      <button className="logout" onClick={onLogout}>Logout</button>
    </aside>
  )
}
