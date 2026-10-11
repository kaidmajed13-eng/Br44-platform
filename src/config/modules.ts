import {
  LayoutDashboard, Building2, CalendarDays, UserPlus, Users, GraduationCap,
  ShieldCheck, BookOpen, FolderOpen, Clock, ClipboardCheck, FileText,
  TrendingUp, Video, PenTool, Film, MessageSquare, HelpCircle, Database,
  FileEdit, CalendarClock, Accessibility, Monitor, CheckSquare, Eye,
  DollarSign, LifeBuoy, BarChart3, History, HeartPulse, BookMarked,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ModuleDef {
  id: string
  label: string
  labelEn: string
  icon: LucideIcon
  category: string
  categoryEn: string
  description: string
  type: 'crud' | 'info'
  table?: string
}

export interface ModuleCategory {
  id: string
  label: string
  labelEn: string
  icon: LucideIcon
}

export const moduleCategories: ModuleCategory[] = [
  { id: 'admin', label: 'الإدارة المؤسسية', labelEn: 'Institutional Administration', icon: LayoutDashboard },
  { id: 'users', label: 'القبول والحسابات', labelEn: 'Admissions & Accounts', icon: Users },
  { id: 'teaching', label: 'التدريس والتعلم', labelEn: 'Teaching & Learning', icon: BookOpen },
  { id: 'virtual', label: 'الفصول الافتراضية', labelEn: 'Virtual Classrooms', icon: Video },
  { id: 'exams', label: 'الاختبارات والتقييم', labelEn: 'Examinations & Assessment', icon: FileEdit },
  { id: 'operations', label: 'العمليات والإشراف', labelEn: 'Operations & Oversight', icon: BarChart3 },
]

export const modules: ModuleDef[] = [
  // A. Institutional administration
  { id: 'overview', label: 'لوحة المؤسسة', labelEn: 'Institutional Dashboard', icon: LayoutDashboard, category: 'admin', categoryEn: 'Institutional Administration', description: 'نظرة عامة على المؤسسة: أعداد الطلاب والمدربين، نشاط الدورات، الدروس القادمة، والمؤشرات التشغيلية.', type: 'crud', table: 'overview' },
  { id: 'branches', label: 'الفروع', labelEn: 'Branches', icon: Building2, category: 'admin', categoryEn: 'Institutional Administration', description: 'إدارة فروع وأقسام المؤسسة، إعداداتها، والموظفين المعينين.', type: 'crud', table: 'branches' },
  { id: 'terms', label: 'الفصول الدراسية والإعدادات', labelEn: 'Academic Terms & Settings', icon: CalendarDays, category: 'admin', categoryEn: 'Institutional Administration', description: 'تكوين الفصول الدراسية، الفترات الأكاديمية، والإعدادات المؤسسية.', type: 'crud', table: 'academic_terms' },

  // B. Admissions, users and accounts
  { id: 'admissions', label: 'القبول والتسجيل', labelEn: 'Admissions', icon: UserPlus, category: 'users', categoryEn: 'Admissions & Accounts', description: 'تسجيل المتقدمين، مراجعة الطلبات، وتحويل المقبولين إلى طلاب مسجلين.', type: 'crud', table: 'admissions' },
  { id: 'students', label: 'ملفات الطلاب', labelEn: 'Student Profiles', icon: Users, category: 'users', categoryEn: 'Admissions & Accounts', description: 'إدارة هوية الطالب، التسجيل، سجل الدورات، الحضور، الدرجات، والتقدم.', type: 'crud', table: 'students' },
  { id: 'trainers', label: 'دليل المدربين والموظفين', labelEn: 'Trainer & Staff Directory', icon: GraduationCap, category: 'users', categoryEn: 'Admissions & Accounts', description: 'إدارة ملفات الموظفين، المسؤوليات، المؤهلات، وتكليفات الدورات.', type: 'crud', table: 'trainers' },
  { id: 'roles', label: 'الأدوار وإدارة الحسابات', labelEn: 'Roles & Account Administration', icon: ShieldCheck, category: 'users', categoryEn: 'Admissions & Accounts', description: 'إنشاء الحسابات، تعيين الأدوار، تفعيل أو إلغاء الوصول، وإدارة دورة الحساب.', type: 'info' },

  // C. Teaching and learning management
  { id: 'courses', label: 'الدورات والمناهج', labelEn: 'Courses & Curriculum', icon: BookOpen, category: 'teaching', categoryEn: 'Teaching & Learning', description: 'تنظيم الدورات، الوحدات، الدروس، الأهداف التعليمية، وتكليف المدربين.', type: 'crud', table: 'courses' },
  { id: 'resources', label: 'موارد الدروس', labelEn: 'Lesson Resources', icon: FolderOpen, category: 'teaching', categoryEn: 'Teaching & Learning', description: 'تخزين أو الإشارة إلى ملفات الدروس، العروض التقديمية، والوثائق.', type: 'info' },
  { id: 'schedules', label: 'الجداول', labelEn: 'Schedules', icon: Clock, category: 'teaching', categoryEn: 'Teaching & Learning', description: 'تخطيط الدروس، الجلسات، المدربين، الفصول، وتخصيص القاعات.', type: 'crud', table: 'schedules' },
  { id: 'attendance', label: 'الحضور والغياب', labelEn: 'Attendance', icon: ClipboardCheck, category: 'teaching', categoryEn: 'Teaching & Learning', description: 'تسجيل الحضور، التأخير، والغياب وربطها بالدورة والجلسة.', type: 'crud', table: 'attendance' },
  { id: 'assignments', label: 'الواجبات والتسليمات', labelEn: 'Assignments & Submissions', icon: FileText, category: 'teaching', categoryEn: 'Teaching & Learning', description: 'نشر الواجبات، تحديد التعليمات والمواعيد النهائية، واستلام عمل الطلاب.', type: 'crud', table: 'assignments' },
  { id: 'grades', label: 'الدرجات والتقدم', labelEn: 'Grades & Progress', icon: TrendingUp, category: 'teaching', categoryEn: 'Teaching & Learning', description: 'تخزين الدرجات والملاحظات، حساب تقدم الدورة، وعرض ملخص الأداء.', type: 'info' },

  // D. Virtual classrooms and communication
  { id: 'live-rooms', label: 'الغرف الافتراضية المباشرة', labelEn: 'Live Virtual Rooms', icon: Video, category: 'virtual', categoryEn: 'Virtual Classrooms', description: 'أساس الاتصال الصوتي/المرئي وإصدار رموز الدخول للغرف.', type: 'info' },
  { id: 'whiteboard', label: 'اللوح التفاعلي والتعاون', labelEn: 'Whiteboard & Collaboration', icon: PenTool, category: 'virtual', categoryEn: 'Virtual Classrooms', description: 'مساحة مشتركة لشرح المفاهيم والتعاون أثناء الدرس.', type: 'info' },
  { id: 'recordings', label: 'مكتبة التسجيلات', labelEn: 'Recording Library', icon: Film, category: 'virtual', categoryEn: 'Virtual Classrooms', description: 'تنظيم تسجيلات الدروس والبيانات المرتبطة بها.', type: 'info' },
  { id: 'communication', label: 'التواصل والإعلانات', labelEn: 'Communication', icon: MessageSquare, category: 'virtual', categoryEn: 'Virtual Classrooms', description: 'مكان مركزي لإعلانات الدورات والرسائل والإشعارات.', type: 'crud', table: 'notifications' },

  // E. Examinations and assessment
  { id: 'question-bank', label: 'بنك الأسئلة', labelEn: 'Question Bank', icon: Database, category: 'exams', categoryEn: 'Examinations & Assessment', description: 'تخزين الأسئلة القابلة لإعادة الاستخدام وتنظيمها حسب الموضوع والصعوبة.', type: 'crud', table: 'exam_questions' },
  { id: 'exam-builder', label: 'منشئ الاختبارات', labelEn: 'Exam Builder', icon: FileEdit, category: 'exams', categoryEn: 'Examinations & Assessment', description: 'تجميع الاختبارات من الأسئلة، تكوين التعليمات والتصحيح.', type: 'info' },
  { id: 'exam-windows', label: 'مواعيد الاختبارات', labelEn: 'Exam Windows & Attempts', icon: CalendarClock, category: 'exams', categoryEn: 'Examinations & Assessment', description: 'جدولة الاختبارات، التحكم في المحاولات المسموح بها.', type: 'crud', table: 'exams' },
  { id: 'arrangements', label: 'الترتيبات الخاصة', labelEn: 'Special Arrangements', icon: Accessibility, category: 'exams', categoryEn: 'Examinations & Assessment', description: 'تسجيل التسهيلات المعتمدة مثل الوقت الإضافي أو التنسيقات المتاحة.', type: 'info' },
  { id: 'monitoring', label: 'مراقبة الاختبارات', labelEn: 'Live Exam Monitoring', icon: Monitor, category: 'exams', categoryEn: 'Examinations & Assessment', description: 'دعم الإشراف المصرح به على الاختبارات النشطة بجدول أحداث قابل للتدقيق.', type: 'info' },
  { id: 'marking', label: 'التصحيح ومراجعة النتائج', labelEn: 'Marking & Result Review', icon: CheckSquare, category: 'exams', categoryEn: 'Examinations & Assessment', description: 'مسار عمل مخطط لتصحيح التسليمات ومراجعة النتائج والطعون.', type: 'info' },

  // F. Institutional operations and oversight
  { id: 'proctoring', label: 'قائمة مراجعة المراقبة', labelEn: 'Proctoring Review Queue', icon: Eye, category: 'operations', categoryEn: 'Operations & Oversight', description: 'تسجيل حوادث الاختبارات المحتملة وتوجيهها للمراجعة البشرية.', type: 'info' },
  { id: 'finance', label: 'المالية والفواتير', labelEn: 'Finance & Invoices', icon: DollarSign, category: 'operations', categoryEn: 'Operations & Oversight', description: 'أساس للفواتير والسجلات المالية. معالجة المدفوعات غير مكتملة بعد.', type: 'info' },
  { id: 'support', label: 'تذاكر الدعم', labelEn: 'Support Tickets', icon: LifeBuoy, category: 'operations', categoryEn: 'Operations & Oversight', description: 'تتبع طلبات الدعم الفني أو الأكاديمي وتعيينها للموظفين.', type: 'crud', table: 'support_tickets' },
  { id: 'reports', label: 'التقارير والتحليلات', labelEn: 'Reports & Analytics', icon: BarChart3, category: 'operations', categoryEn: 'Operations & Oversight', description: 'مؤشرات مؤسسية وأكاديمية مع تصدير CSV للجداول.', type: 'info' },
  { id: 'audit', label: 'سجل التدقيق', labelEn: 'Audit Trail', icon: History, category: 'operations', categoryEn: 'Operations & Oversight', description: 'سجلات قابلة للتتبع للإجراءات المهمة مثل تغييرات الحسابات والقرارات الإدارية.', type: 'crud', table: 'audit_log' },
  { id: 'integration', label: 'حالة التكامل والنسخ الاحتياطي', labelEn: 'Integration Health & Backups', icon: HeartPulse, category: 'operations', categoryEn: 'Operations & Oversight', description: 'منطقة تشغيلية لفحص الخدمات المتصلة والنسخ الاحتياطي.', type: 'info' },
  { id: 'help', label: 'مركز المساعدة', labelEn: 'Help Center', icon: BookMarked, category: 'operations', categoryEn: 'Operations & Oversight', description: 'منطقة مركزية لإرشادات المستخدم والأسئلة الشائعة ومعلومات الدعم.', type: 'info' },
]
