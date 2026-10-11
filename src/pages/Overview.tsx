import { useState, useEffect } from 'react'
import { Users, GraduationCap, BookOpen, LifeBuoy, Building2, FileEdit, TrendingUp, Bell } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import { modules } from '../config/modules'

interface Stats {
  students: number
  trainers: number
  courses: number
  tickets: number
  branches: number
  exams: number
  admissions: number
  enrollments: number
}

const statConfig = [
  { key: 'students', label: 'الطلاب المسجلون', icon: Users, color: 'var(--navy-600)', link: '/students' },
  { key: 'trainers', label: 'المدربون', icon: GraduationCap, color: 'var(--gold-600)', link: '/trainers' },
  { key: 'courses', label: 'الدورات النشطة', icon: BookOpen, color: 'var(--info-500)', link: '/courses' },
  { key: 'admissions', label: 'طلبات القبول', icon: FileEdit, color: 'var(--purple-500)', link: '/admissions' },
  { key: 'enrollments', label: 'التسجيلات', icon: TrendingUp, color: 'var(--success-500)', link: '/courses' },
  { key: 'branches', label: 'الفروع', icon: Building2, color: 'var(--navy-700)', link: '/branches' },
  { key: 'exams', label: 'الاختبارات', icon: FileEdit, color: 'var(--warning-500)', link: '/exam-windows' },
  { key: 'tickets', label: 'تذاكر الدعم', icon: LifeBuoy, color: 'var(--error-500)', link: '/support' },
] as const

export default function Overview() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentTickets, setRecentTickets] = useState<Record<string, unknown>[]>([])
  const [recentNotifications, setRecentNotifications] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    async function loadAll() {
      const [students, trainers, courses, tickets, branches, exams, admissions, enrollments, notifs] = await Promise.all([
        supabase.from('students').select('*', { count: 'exact', head: true }),
        supabase.from('trainers').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('support_tickets').select('*', { count: 'exact', head: true }),
        supabase.from('branches').select('*', { count: 'exact', head: true }),
        supabase.from('exams').select('*', { count: 'exact', head: true }),
        supabase.from('admissions').select('*', { count: 'exact', head: true }),
        supabase.from('course_enrollments').select('*', { count: 'exact', head: true }),
        supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(3),
      ])

      setStats({
        students: students.count || 0,
        trainers: trainers.count || 0,
        courses: courses.count || 0,
        tickets: tickets.count || 0,
        branches: branches.count || 0,
        exams: exams.count || 0,
        admissions: admissions.count || 0,
        enrollments: enrollments.count || 0,
      })
      setRecentNotifications(notifs.data || [])
      setLoading(false)

      const { data: ticketData } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      setRecentTickets(ticketData || [])
    }
    loadAll()
  }, [])

  if (loading) {
    return <div className="loading"><div className="spinner" /></div>
  }

  const moduleLinks = modules.filter((m) => m.id !== 'overview')

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h2>لوحة المؤسسة</h2>
          <p>نظرة عامة على المؤسسة: أعداد الطلاب والمدربين، نشاط الدورات، والمؤشرات التشغيلية.</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="stat-grid">
        {statConfig.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.key} to={stat.link} className="stat-card" style={{ color: stat.color }}>
              <div className="stat-card-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                <Icon size={22} />
              </div>
              <div className="stat-card-value">{stats?.[stat.key as keyof Stats] ?? 0}</div>
              <div className="stat-card-label">{stat.label}</div>
            </Link>
          )
        })}
      </div>

      {/* Two-column: recent tickets + notifications */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <h3>أحدث تذاكر الدعم</h3>
            <Link to="/support" className="btn btn-outline btn-sm">عرض الكل</Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {recentTickets.length === 0 ? (
              <div className="empty-state"><p>لا توجد تذاكر</p></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {recentTickets.map((ticket) => (
                  <div key={ticket.id as string} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--gray-100)' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-800)' }}>{ticket.subject as string}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{ticket.submitted_by as string || '—'}</div>
                    </div>
                    <span className={`badge ${
                      ticket.status === 'open' ? 'badge-error' :
                      ticket.status === 'in_progress' ? 'badge-warning' :
                      ticket.status === 'resolved' ? 'badge-success' : 'badge-neutral'
                    }`}>
                      {ticket.status === 'open' ? 'مفتوحة' : ticket.status === 'in_progress' ? 'قيد المعالجة' : ticket.status === 'resolved' ? 'تم الحل' : 'مغلقة'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>الإشعارات الأخيرة</h3>
            <Link to="/communication" className="btn btn-outline btn-sm">عرض الكل</Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {recentNotifications.length === 0 ? (
              <div className="empty-state"><p>لا توجد إشعارات</p></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {recentNotifications.map((notif) => (
                  <div key={notif.id as string} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--gray-100)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--navy-50)', color: 'var(--navy-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bell size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-800)' }}>{notif.title as string}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '2px', lineHeight: 1.4 }}>{notif.body as string}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Module navigation grid */}
      <div className="card">
        <div className="card-header">
          <h3>وحدات النظام</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
            {moduleLinks.map((mod) => {
              const Icon = mod.icon
              return (
                <Link key={mod.id} to={`/${mod.id}`} style={{
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', transition: 'all var(--transition)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--navy-300)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--navy-50)', color: 'var(--navy-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-800)' }}>{mod.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
