import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { modules, moduleCategories } from '../config/modules'

export default function Sidebar({ collapsed, onToggleCollapse }: { collapsed: boolean; onToggleCollapse: () => void }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      {/* Mobile toggle button */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="القائمة"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={() => setMobileOpen(false)}>
            <div className="sidebar-logo-icon">
              <span>FBC</span>
            </div>
            {!collapsed && (
              <div className="sidebar-logo-text">
                <span className="sidebar-logo-title">First British Center</span>
                <span className="sidebar-logo-subtitle">منصة المؤسسة</span>
              </div>
            )}
          </Link>
          <button
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label="طي القائمة"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {moduleCategories.map((cat) => {
            const catModules = modules.filter((m) => m.category === cat.id)
            return (
              <div key={cat.id} className="sidebar-category">
                {!collapsed && (
                  <div className="sidebar-category-label">
                    <cat.icon size={14} />
                    <span>{cat.label}</span>
                  </div>
                )}
                <ul>
                  {catModules.map((mod) => {
                    const isActive = location.pathname === `/${mod.id}`
                    return (
                      <li key={mod.id}>
                        <Link
                          to={`/${mod.id}`}
                          className={`sidebar-item ${isActive ? 'active' : ''}`}
                          title={mod.label}
                        >
                          <mod.icon size={20} className="sidebar-item-icon" />
                          {!collapsed && <span className="sidebar-item-label">{mod.label}</span>}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          {!collapsed && (
            <div className="sidebar-footer-text">
              <span>الإصدار 3.0 — مؤسسي</span>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
