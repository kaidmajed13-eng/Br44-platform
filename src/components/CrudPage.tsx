import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2, Download, RefreshCw } from 'lucide-react'
import { supabase } from '../lib/supabase'
import DataTable, { type Column } from './DataTable'
import Modal from './Modal'

export interface FieldDef {
  key: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'number'
  options?: { value: string; label: string }[]
  required?: boolean
  defaultValue?: string | number | boolean
}

export interface CrudConfig {
  table: string
  title: string
  description: string
  fields: FieldDef[]
  columns: Column<Record<string, unknown>>[]
  emptyMessage?: string
}

interface CrudPageProps {
  config: CrudConfig
}

export default function CrudPage({ config }: CrudPageProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data: rows, error: err } = await supabase
      .from(config.table)
      .select('*')
      .order('created_at', { ascending: false })

    if (err) {
      setError(err.message)
    } else {
      setData(rows || [])
    }
    setLoading(false)
  }, [config.table])

  useEffect(() => {
    loadData()
  }, [loadData])

  const openAdd = () => {
    setEditingId(null)
    const defaults: Record<string, unknown> = {}
    config.fields.forEach((f) => {
      if (f.defaultValue !== undefined) defaults[f.key] = f.defaultValue
    })
    setFormData(defaults)
    setModalOpen(true)
  }

  const openEdit = (row: Record<string, unknown>) => {
    setEditingId(row.id as string)
    const values: Record<string, unknown> = {}
    config.fields.forEach((f) => {
      values[f.key] = row[f.key] ?? f.defaultValue ?? ''
    })
    setFormData(values)
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload: Record<string, unknown> = {}
    config.fields.forEach((f) => {
      const val = formData[f.key]
      if (val !== '' && val !== undefined && val !== null) {
        payload[f.key] = f.type === 'number' ? Number(val) : val
      }
    })

    if (editingId) {
      const { error: err } = await supabase.from(config.table).update(payload).eq('id', editingId)
      if (err) setError(err.message)
    } else {
      const { error: err } = await supabase.from(config.table).insert(payload)
      if (err) setError(err.message)
    }

    setSaving(false)
    setModalOpen(false)
    loadData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    const { error: err } = await supabase.from(config.table).delete().eq('id', id)
    if (err) {
      setError(err.message)
    } else {
      loadData()
    }
  }

  const exportCSV = () => {
    if (data.length === 0) return
    const headers = config.columns.map((c) => c.label)
    const rows = data.map((row) =>
      config.columns.map((col) => {
        const val = col.render ? '' : String(row[col.key] ?? '')
        return `"${val.replace(/"/g, '""')}"`
      })
    )
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${config.table}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const setField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h2>{config.title}</h2>
          <p>{config.description}</p>
        </div>
      </div>

      {error && (
        <div className="info-status warning" style={{ marginBottom: 'var(--space-5)' }}>
          <span>{error}</span>
        </div>
      )}

      <div className="toolbar">
        <div className="toolbar-left">
          <button className="btn btn-outline btn-sm" onClick={loadData}>
            <RefreshCw size={14} />
            تحديث
          </button>
          <button className="btn btn-outline btn-sm" onClick={exportCSV} disabled={data.length === 0}>
            <Download size={14} />
            تصدير CSV
          </button>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={16} />
            إضافة جديد
          </button>
        </div>
      </div>

      <DataTable
        columns={config.columns}
        data={data}
        loading={loading}
        emptyMessage={config.emptyMessage}
        actions={(row) => (
          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            <button className="btn-icon" onClick={() => openEdit(row)} aria-label="تعديل">
              <Pencil size={16} />
            </button>
            <button className="btn-icon danger" onClick={() => handleDelete(row.id as string)} aria-label="حذف">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'تعديل السجل' : 'إضافة سجل جديد'}
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>
              إلغاء
            </button>
            <button className="btn btn-gold" onClick={handleSave} disabled={saving}>
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
          </>
        }
      >
        <div className="form-row" style={{ gridTemplateColumns: '1fr' }}>
          {config.fields.map((field) => {
            const isRow = ['text', 'email', 'tel', 'date', 'number'].includes(field.type) && config.fields.length > 4
            return (
              <div key={field.key} className={isRow ? 'form-group' : 'form-group'} style={isRow ? {} : {}}>
                <label className="form-label">
                  {field.label}
                  {field.required && <span style={{ color: 'var(--error-500)' }}> *</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    className="form-select"
                    value={String(formData[field.key] ?? '')}
                    onChange={(e) => setField(field.key, e.target.value)}
                  >
                    <option value="">— اختر —</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="form-textarea"
                    value={String(formData[field.key] ?? '')}
                    onChange={(e) => setField(field.key, e.target.value)}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="form-input"
                    value={String(formData[field.key] ?? '')}
                    onChange={(e) => setField(field.key, e.target.value)}
                  />
                )}
              </div>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}
