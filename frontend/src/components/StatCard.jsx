import React from 'react'

export default function StatCard({label, value, hint}){
  return (
    <div className="stat-card">
      <p>{label}</p>
      <h2>{value}</h2>
      <span>{hint}</span>
    </div>
  )
}
