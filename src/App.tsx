import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Overview from './pages/Overview'
import CrudPage from './components/CrudPage'
import InfoModule from './components/InfoModule'
import { modules } from './config/modules'
import { crudConfigs } from './config/crudConfigs'
import './styles/app.css'

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved === 'true') setSidebarCollapsed(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(sidebarCollapsed))
  }, [sidebarCollapsed])

  const toggleCollapse = () => setSidebarCollapsed((prev) => !prev)

  return (
    <div className="app-layout">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleCollapse} />
      <div className={`app-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            {modules.map((mod) => {
              if (mod.type === 'crud' && mod.id !== 'overview') {
                const config = crudConfigs[mod.id]
                if (config) {
                  return <Route key={mod.id} path={`/${mod.id}`} element={<CrudPage config={config} />} />
                }
              }
              if (mod.type === 'info') {
                return <Route key={mod.id} path={`/${mod.id}`} element={<InfoModule module={mod} />} />
              }
              return null
            })}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
