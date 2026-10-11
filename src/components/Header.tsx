import { Search, Bell, Settings } from 'lucide-react'
import { modules } from '../config/modules'
import { useLocation, Link } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const currentModule = modules.find((m) => location.pathname === `/${m.id}`)
  const title = currentModule?.label || 'لوحة المؤسسة'
  const titleEn = currentModule?.labelEn || 'Institutional Dashboard'

  return (
    <header className="header">
      <div className="header-title">
        <h1>{title}</h1>
        <span className="header-subtitle">{titleEn}</span>
      </div>

      <div className="header-actions">
        <div className="header-search">
          <Search size={18} className="header-search-icon" />
          <input type="text" placeholder="بحث..." className="header-search-input" />
        </div>
        <button className="header-icon-btn" aria-label="الإشعارات">
          <Bell size={20} />
          <span className="header-badge" />
        </button>
        <Link to="/help" className="header-icon-btn" aria-label="الإعدادات">
          <Settings size={20} />
        </Link>
        <div className="header-user">
          <div className="header-user-avatar">
            <span>م</span>
          </div>
          <div className="header-user-info">
            <span className="header-user-name">المدير العام</span>
            <span className="header-user-role">admin@fbc.edu</span>
          </div>
        </div>
      </div>
    </header>
  )
}
