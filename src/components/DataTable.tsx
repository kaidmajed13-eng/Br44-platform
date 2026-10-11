import { type ReactNode } from 'react'
import { Inbox } from 'lucide-react'

export interface Column<T> {
  key: string
  label: string
  render?: (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  actions?: (row: T) => ReactNode
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading,
  emptyMessage = 'لا توجد بيانات',
  actions,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Inbox size={28} />
        </div>
        <h3>لا توجد سجلات</h3>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  const allColumns = actions ? [...columns, { key: '_actions', label: 'إجراءات' }] : columns

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {allColumns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id as string}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '—')}
                </td>
              ))}
              {actions && <td>{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
