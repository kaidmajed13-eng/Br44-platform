import type { CrudConfig } from '../components/CrudPage'

const statusBadges: Record<string, { label: string; class: string }> = {
  active: { label: 'نشط', class: 'badge-success' },
  inactive: { label: 'غير نشط', class: 'badge-neutral' },
  on_leave: { label: 'في إجازة', class: 'badge-warning' },
  suspended: { label: 'موقوف', class: 'badge-error' },
  graduated: { label: 'متخرج', class: 'badge-info' },
  withdrawn: { label: 'منسحب', class: 'badge-neutral' },
  pending: { label: 'قيد الانتظار', class: 'badge-warning' },
  review: { label: 'قيد المراجعة', class: 'badge-info' },
  accepted: { label: 'مقبول', class: 'badge-success' },
  rejected: { label: 'مرفوض', class: 'badge-error' },
  enrolled: { label: 'مسجل', class: 'badge-success' },
  draft: { label: 'مسودة', class: 'badge-neutral' },
  archived: { label: 'مؤرشف', class: 'badge-neutral' },
  published: { label: 'منشور', class: 'badge-success' },
  closed: { label: 'مغلق', class: 'badge-neutral' },
  scheduled: { label: 'مجدول', class: 'badge-info' },
  completed: { label: 'مكتمل', class: 'badge-success' },
  open: { label: 'مفتوحة', class: 'badge-error' },
  in_progress: { label: 'قيد المعالجة', class: 'badge-warning' },
  resolved: { label: 'تم الحل', class: 'badge-success' },
  dropped: { label: 'منسحب', class: 'badge-neutral' },
}

function StatusBadge({ status }: { status: string }) {
  const badge = statusBadges[status] || { label: status, class: 'badge-neutral' }
  return <span className={`badge ${badge.class}`}>{badge.label}</span>
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    low: 'badge-neutral', medium: 'badge-info', high: 'badge-warning', urgent: 'badge-error',
  }
  const labels: Record<string, string> = { low: 'منخفضة', medium: 'متوسطة', high: 'عالية', urgent: 'عاجلة' }
  return <span className={`badge ${map[priority] || 'badge-neutral'}`}>{labels[priority] || priority}</span>
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const map: Record<string, string> = { easy: 'badge-success', medium: 'badge-warning', hard: 'badge-error' }
  const labels: Record<string, string> = { easy: 'سهل', medium: 'متوسط', hard: 'صعب' }
  return <span className={`badge ${map[difficulty] || 'badge-neutral'}`}>{labels[difficulty] || difficulty}</span>
}

export const crudConfigs: Record<string, CrudConfig> = {
  branches: {
    table: 'branches',
    title: 'الفروع',
    description: 'إدارة فروع وأقسام المؤسسة، إعداداتها، والموظفين المعينين.',
    emptyMessage: 'لا توجد فروع مسجلة بعد.',
    fields: [
      { key: 'name', label: 'اسم الفرع', type: 'text', required: true },
      { key: 'code', label: 'رمز الفرع', type: 'text', required: true },
      { key: 'address', label: 'العنوان', type: 'text' },
      { key: 'phone', label: 'الهاتف', type: 'tel' },
      { key: 'email', label: 'البريد الإلكتروني', type: 'email' },
      { key: 'manager_name', label: 'اسم المدير', type: 'text' },
      { key: 'is_active', label: 'نشط', type: 'select', options: [{ value: 'true', label: 'نعم' }, { value: 'false', label: 'لا' }], defaultValue: 'true' },
    ],
    columns: [
      { key: 'name', label: 'الفرع' },
      { key: 'code', label: 'الرمز' },
      { key: 'manager_name', label: 'المدير' },
      { key: 'phone', label: 'الهاتف' },
      { key: 'is_active', label: 'الحالة', render: (row) => <StatusBadge status={row.is_active ? 'active' : 'inactive'} /> },
    ],
  },

  terms: {
    table: 'academic_terms',
    title: 'الفصول الدراسية والإعدادات',
    description: 'تكوين الفصول الدراسية، الفترات الأكاديمية، والإعدادات المؤسسية.',
    emptyMessage: 'لا توجد فصول دراسية مسجلة.',
    fields: [
      { key: 'name', label: 'اسم الفصل', type: 'text', required: true },
      { key: 'start_date', label: 'تاريخ البداية', type: 'date', required: true },
      { key: 'end_date', label: 'تاريخ النهاية', type: 'date', required: true },
      { key: 'is_current', label: 'الفصل الحالي', type: 'select', options: [{ value: 'true', label: 'نعم' }, { value: 'false', label: 'لا' }], defaultValue: 'false' },
      { key: 'is_active', label: 'نشط', type: 'select', options: [{ value: 'true', label: 'نعم' }, { value: 'false', label: 'لا' }], defaultValue: 'true' },
    ],
    columns: [
      { key: 'name', label: 'الفصل' },
      { key: 'start_date', label: 'البداية' },
      { key: 'end_date', label: 'النهاية' },
      { key: 'is_current', label: 'الحالي', render: (row) => <StatusBadge status={row.is_current ? 'active' : 'inactive'} /> },
      { key: 'is_active', label: 'الحالة', render: (row) => <StatusBadge status={row.is_active ? 'active' : 'inactive'} /> },
    ],
  },

  admissions: {
    table: 'admissions',
    title: 'القبول والتسجيل',
    description: 'تسجيل المتقدمين، مراجعة الطلبات، وتحويل المقبولين إلى طلاب مسجلين.',
    emptyMessage: 'لا توجد طلبات قبول.',
    fields: [
      { key: 'applicant_name', label: 'اسم المتقدم', type: 'text', required: true },
      { key: 'email', label: 'البريد الإلكتروني', type: 'email' },
      { key: 'phone', label: 'الهاتف', type: 'tel' },
      { key: 'applied_program', label: 'البرنامج المتقدم له', type: 'text' },
      { key: 'status', label: 'الحالة', type: 'select', options: [
        { value: 'pending', label: 'قيد الانتظار' }, { value: 'review', label: 'قيد المراجعة' },
        { value: 'accepted', label: 'مقبول' }, { value: 'rejected', label: 'مرفوض' },
        { value: 'enrolled', label: 'مسجل' },
      ], defaultValue: 'pending' },
      { key: 'notes', label: 'ملاحظات', type: 'textarea' },
    ],
    columns: [
      { key: 'applicant_name', label: 'المتقدم' },
      { key: 'applied_program', label: 'البرنامج' },
      { key: 'phone', label: 'الهاتف' },
      { key: 'application_date', label: 'تاريخ الطلب' },
      { key: 'status', label: 'الحالة', render: (row) => <StatusBadge status={row.status as string} /> },
    ],
  },

  students: {
    table: 'students',
    title: 'ملفات الطلاب',
    description: 'إدارة هوية الطالب، التسجيل، سجل الدورات، الحضور، الدرجات، والتقدم.',
    emptyMessage: 'لا يوجد طلاب مسجلون.',
    fields: [
      { key: 'full_name', label: 'الاسم الكامل', type: 'text', required: true },
      { key: 'email', label: 'البريد الإلكتروني', type: 'email' },
      { key: 'phone', label: 'الهاتف', type: 'tel' },
      { key: 'date_of_birth', label: 'تاريخ الميلاد', type: 'date' },
      { key: 'gender', label: 'الجنس', type: 'select', options: [
        { value: 'male', label: 'ذكر' }, { value: 'female', label: 'أنثى' }, { value: 'other', label: 'أخرى' },
      ] },
      { key: 'address', label: 'العنوان', type: 'text' },
      { key: 'status', label: 'الحالة', type: 'select', options: [
        { value: 'active', label: 'نشط' }, { value: 'suspended', label: 'موقوف' },
        { value: 'graduated', label: 'متخرج' }, { value: 'withdrawn', label: 'منسحب' },
      ], defaultValue: 'active' },
    ],
    columns: [
      { key: 'full_name', label: 'الاسم' },
      { key: 'email', label: 'البريد' },
      { key: 'phone', label: 'الهاتف' },
      { key: 'enrollment_date', label: 'تاريخ التسجيل' },
      { key: 'status', label: 'الحالة', render: (row) => <StatusBadge status={row.status as string} /> },
    ],
  },

  trainers: {
    table: 'trainers',
    title: 'دليل المدربين والموظفين',
    description: 'إدارة ملفات الموظفين، المسؤوليات، المؤهلات، وتكليفات الدورات.',
    emptyMessage: 'لا يوجد مدربون مسجلون.',
    fields: [
      { key: 'full_name', label: 'الاسم الكامل', type: 'text', required: true },
      { key: 'email', label: 'البريد الإلكتروني', type: 'email' },
      { key: 'phone', label: 'الهاتف', type: 'tel' },
      { key: 'qualification', label: 'المؤهل', type: 'text' },
      { key: 'specialization', label: 'التخصص', type: 'text' },
      { key: 'status', label: 'الحالة', type: 'select', options: [
        { value: 'active', label: 'نشط' }, { value: 'inactive', label: 'غير نشط' }, { value: 'on_leave', label: 'في إجازة' },
      ], defaultValue: 'active' },
      { key: 'hire_date', label: 'تاريخ التعيين', type: 'date' },
    ],
    columns: [
      { key: 'full_name', label: 'الاسم' },
      { key: 'specialization', label: 'التخصص' },
      { key: 'qualification', label: 'المؤهل' },
      { key: 'phone', label: 'الهاتف' },
      { key: 'status', label: 'الحالة', render: (row) => <StatusBadge status={row.status as string} /> },
    ],
  },

  courses: {
    table: 'courses',
    title: 'الدورات والمناهج',
    description: 'تنظيم الدورات، الوحدات، الدروس، الأهداف التعليمية، وتكليف المدربين.',
    emptyMessage: 'لا توجد دورات مسجلة.',
    fields: [
      { key: 'title', label: 'عنوان الدورة', type: 'text', required: true },
      { key: 'code', label: 'رمز الدورة', type: 'text', required: true },
      { key: 'description', label: 'الوصف', type: 'textarea' },
      { key: 'credits', label: 'الساعات المعتمدة', type: 'number', defaultValue: 1 },
      { key: 'status', label: 'الحالة', type: 'select', options: [
        { value: 'active', label: 'نشط' }, { value: 'draft', label: 'مسودة' }, { value: 'archived', label: 'مؤرشف' },
      ], defaultValue: 'active' },
    ],
    columns: [
      { key: 'title', label: 'الدورة' },
      { key: 'code', label: 'الرمز' },
      { key: 'credits', label: 'الساعات' },
      { key: 'status', label: 'الحالة', render: (row) => <StatusBadge status={row.status as string} /> },
    ],
  },

  schedules: {
    table: 'schedules',
    title: 'الجداول',
    description: 'تخطيط الدروس، الجلسات، المدربين، الفصول، وتخصيص القاعات.',
    emptyMessage: 'لا توجد جداول مجدولة.',
    fields: [
      { key: 'course_id', label: 'الدورة', type: 'text', required: true },
      { key: 'room', label: 'القاعة', type: 'text' },
      { key: 'day_of_week', label: 'اليوم', type: 'select', options: [
        { value: '0', label: 'الأحد' }, { value: '1', label: 'الإثنين' }, { value: '2', label: 'الثلاثاء' },
        { value: '3', label: 'الأربعاء' }, { value: '4', label: 'الخميس' }, { value: '5', label: 'الجمعة' },
        { value: '6', label: 'السبت' },
      ] },
      { key: 'start_time', label: 'وقت البداية', type: 'text', required: true },
      { key: 'end_time', label: 'وقت النهاية', type: 'text', required: true },
      { key: 'is_active', label: 'نشط', type: 'select', options: [{ value: 'true', label: 'نعم' }, { value: 'false', label: 'لا' }], defaultValue: 'true' },
    ],
    columns: [
      { key: 'room', label: 'القاعة' },
      { key: 'day_of_week', label: 'اليوم', render: (row) => {
        const days = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']
        return days[(row.day_of_week as number) ?? 0] || '—'
      }},
      { key: 'start_time', label: 'البداية' },
      { key: 'end_time', label: 'النهاية' },
      { key: 'is_active', label: 'الحالة', render: (row) => <StatusBadge status={row.is_active ? 'active' : 'inactive'} /> },
    ],
  },

  attendance: {
    table: 'attendance',
    title: 'الحضور والغياب',
    description: 'تسجيل الحضور، التأخير، والغياب وربطها بالدورة والجلسة.',
    emptyMessage: 'لا توجد سجلات حضور.',
    fields: [
      { key: 'student_id', label: 'الطالب', type: 'text', required: true },
      { key: 'session_date', label: 'تاريخ الجلسة', type: 'date', required: true },
      { key: 'status', label: 'الحالة', type: 'select', options: [
        { value: 'present', label: 'حاضر' }, { value: 'absent', label: 'غائب' },
        { value: 'late', label: 'متأخر' }, { value: 'excused', label: 'بعذر' },
      ], defaultValue: 'present', required: true },
      { key: 'notes', label: 'ملاحظات', type: 'textarea' },
    ],
    columns: [
      { key: 'session_date', label: 'التاريخ' },
      { key: 'status', label: 'الحالة', render: (row) => {
        const map: Record<string, { label: string; class: string }> = {
          present: { label: 'حاضر', class: 'badge-success' },
          absent: { label: 'غائب', class: 'badge-error' },
          late: { label: 'متأخر', class: 'badge-warning' },
          excused: { label: 'بعذر', class: 'badge-info' },
        }
        const b = map[row.status as string] || { label: row.status, class: 'badge-neutral' }
        return <span className={`badge ${b.class}`}>{b.label}</span>
      }},
      { key: 'notes', label: 'ملاحظات' },
    ],
  },

  assignments: {
    table: 'assignments',
    title: 'الواجبات والتسليمات',
    description: 'نشر الواجبات، تحديد التعليمات والمواعيد النهائية، واستلام عمل الطلاب.',
    emptyMessage: 'لا توجد واجبات.',
    fields: [
      { key: 'course_id', label: 'الدورة', type: 'text', required: true },
      { key: 'title', label: 'عنوان الواجب', type: 'text', required: true },
      { key: 'description', label: 'الوصف', type: 'textarea' },
      { key: 'due_date', label: 'تاريخ التسليم', type: 'date', required: true },
      { key: 'max_score', label: 'الدرجة القصوى', type: 'number', defaultValue: 100 },
      { key: 'status', label: 'الحالة', type: 'select', options: [
        { value: 'draft', label: 'مسودة' }, { value: 'published', label: 'منشور' }, { value: 'closed', label: 'مغلق' },
      ], defaultValue: 'published' },
    ],
    columns: [
      { key: 'title', label: 'الواجب' },
      { key: 'due_date', label: 'تاريخ التسليم' },
      { key: 'max_score', label: 'الدرجة' },
      { key: 'status', label: 'الحالة', render: (row) => <StatusBadge status={row.status as string} /> },
    ],
  },

  'question-bank': {
    table: 'exam_questions',
    title: 'بنك الأسئلة',
    description: 'تخزين الأسئلة القابلة لإعادة الاستخدام وتنظيمها حسب الموضوع والصعوبة.',
    emptyMessage: 'لا توجد أسئلة في البنك.',
    fields: [
      { key: 'question_text', label: 'نص السؤال', type: 'textarea', required: true },
      { key: 'question_type', label: 'نوع السؤال', type: 'select', options: [
        { value: 'multiple_choice', label: 'اختيار من متعدد' }, { value: 'true_false', label: 'صح/خطأ' },
        { value: 'short_answer', label: 'إجابة قصيرة' }, { value: 'essay', label: 'مقال' },
      ], defaultValue: 'multiple_choice' },
      { key: 'difficulty', label: 'الصعوبة', type: 'select', options: [
        { value: 'easy', label: 'سهل' }, { value: 'medium', label: 'متوسط' }, { value: 'hard', label: 'صعب' },
      ], defaultValue: 'medium' },
      { key: 'topic', label: 'الموضوع', type: 'text' },
      { key: 'points', label: 'الدرجات', type: 'number', defaultValue: 1 },
    ],
    columns: [
      { key: 'question_text', label: 'السؤال', render: (row) => <span style={{ whiteSpace: 'normal', maxWidth: '300px', display: 'inline-block' }}>{row.question_text as string}</span> },
      { key: 'question_type', label: 'النوع' },
      { key: 'topic', label: 'الموضوع' },
      { key: 'difficulty', label: 'الصعوبة', render: (row) => <DifficultyBadge difficulty={row.difficulty as string} /> },
      { key: 'points', label: 'الدرجات' },
    ],
  },

  'exam-windows': {
    table: 'exams',
    title: 'مواعيد الاختبارات',
    description: 'جدولة الاختبارات، التحكم في المحاولات المسموح بها.',
    emptyMessage: 'لا توجد اختبارات مجدولة.',
    fields: [
      { key: 'title', label: 'عنوان الاختبار', type: 'text', required: true },
      { key: 'course_id', label: 'الدورة', type: 'text' },
      { key: 'exam_date', label: 'تاريخ الاختبار', type: 'date' },
      { key: 'duration_minutes', label: 'المدة (دقيقة)', type: 'number', defaultValue: 60 },
      { key: 'total_points', label: 'إجمالي الدرجات', type: 'number', defaultValue: 100 },
      { key: 'status', label: 'الحالة', type: 'select', options: [
        { value: 'draft', label: 'مسودة' }, { value: 'scheduled', label: 'مجدول' },
        { value: 'active', label: 'نشط' }, { value: 'completed', label: 'مكتمل' },
      ], defaultValue: 'draft' },
    ],
    columns: [
      { key: 'title', label: 'الاختبار' },
      { key: 'exam_date', label: 'التاريخ' },
      { key: 'duration_minutes', label: 'المدة' },
      { key: 'total_points', label: 'الدرجات' },
      { key: 'status', label: 'الحالة', render: (row) => <StatusBadge status={row.status as string} /> },
    ],
  },

  support: {
    table: 'support_tickets',
    title: 'تذاكر الدعم',
    description: 'تتبع طلبات الدعم الفني أو الأكاديمي وتعيينها للموظفين.',
    emptyMessage: 'لا توجد تذاكر دعم.',
    fields: [
      { key: 'subject', label: 'الموضوع', type: 'text', required: true },
      { key: 'description', label: 'الوصف', type: 'textarea' },
      { key: 'submitted_by', label: 'مُقدِّم الطلب', type: 'text' },
      { key: 'priority', label: 'الأولوية', type: 'select', options: [
        { value: 'low', label: 'منخفضة' }, { value: 'medium', label: 'متوسطة' },
        { value: 'high', label: 'عالية' }, { value: 'urgent', label: 'عاجلة' },
      ], defaultValue: 'medium' },
      { key: 'status', label: 'الحالة', type: 'select', options: [
        { value: 'open', label: 'مفتوحة' }, { value: 'in_progress', label: 'قيد المعالجة' },
        { value: 'resolved', label: 'تم الحل' }, { value: 'closed', label: 'مغلقة' },
      ], defaultValue: 'open' },
      { key: 'assigned_to', label: 'مُسند إلى', type: 'text' },
    ],
    columns: [
      { key: 'subject', label: 'الموضوع' },
      { key: 'submitted_by', label: 'مُقدِّم الطلب' },
      { key: 'priority', label: 'الأولوية', render: (row) => <PriorityBadge priority={row.priority as string} /> },
      { key: 'status', label: 'الحالة', render: (row) => <StatusBadge status={row.status as string} /> },
      { key: 'assigned_to', label: 'مُسند إلى' },
    ],
  },

  communication: {
    table: 'notifications',
    title: 'التواصل والإعلانات',
    description: 'مكان مركزي لإعلانات الدورات والرسائل والإشعارات.',
    emptyMessage: 'لا توجد إشعارات.',
    fields: [
      { key: 'title', label: 'العنوان', type: 'text', required: true },
      { key: 'body', label: 'المحتوى', type: 'textarea' },
      { key: 'audience', label: 'الجمهور', type: 'select', options: [
        { value: 'all', label: 'الجميع' }, { value: 'students', label: 'الطلاب' },
        { value: 'trainers', label: 'المدربون' }, { value: 'admins', label: 'الإدارة' },
      ], defaultValue: 'all' },
      { key: 'priority', label: 'الأولوية', type: 'select', options: [
        { value: 'normal', label: 'عادية' }, { value: 'important', label: 'مهمة' }, { value: 'urgent', label: 'عاجلة' },
      ], defaultValue: 'normal' },
      { key: 'is_published', label: 'منشور', type: 'select', options: [{ value: 'true', label: 'نعم' }, { value: 'false', label: 'لا' }], defaultValue: 'true' },
    ],
    columns: [
      { key: 'title', label: 'العنوان' },
      { key: 'audience', label: 'الجمهور', render: (row) => {
        const map: Record<string, string> = { all: 'الجميع', students: 'الطلاب', trainers: 'المدربون', admins: 'الإدارة' }
        return map[row.audience as string] || (row.audience as string)
      }},
      { key: 'priority', label: 'الأولوية', render: (row) => <PriorityBadge priority={row.priority as string} /> },
      { key: 'is_published', label: 'منشور', render: (row) => <StatusBadge status={row.is_published ? 'published' : 'draft'} /> },
    ],
  },

  audit: {
    table: 'audit_log',
    title: 'سجل التدقيق',
    description: 'سجلات قابلة للتتبع للإجراءات المهمة مثل تغييرات الحسابات والقرارات الإدارية.',
    emptyMessage: 'لا توجد سجلات تدقيق.',
    fields: [
      { key: 'action', label: 'الإجراء', type: 'text', required: true },
      { key: 'entity_type', label: 'نوع الكيان', type: 'text' },
      { key: 'description', label: 'الوصف', type: 'textarea' },
      { key: 'performed_by', label: 'بواسطة', type: 'text', defaultValue: 'النظام' },
    ],
    columns: [
      { key: 'action', label: 'الإجراء' },
      { key: 'entity_type', label: 'النوع' },
      { key: 'description', label: 'الوصف' },
      { key: 'performed_by', label: 'بواسطة' },
      { key: 'created_at', label: 'التاريخ', render: (row) => new Date(row.created_at as string).toLocaleString('ar-SA') },
    ],
  },
}
