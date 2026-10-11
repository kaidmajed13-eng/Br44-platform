export interface Branch {
  id: string
  name: string
  code: string
  address: string | null
  phone: string | null
  email: string | null
  manager_name: string | null
  is_active: boolean
  created_at: string
}

export interface AcademicTerm {
  id: string
  name: string
  start_date: string
  end_date: string
  is_current: boolean
  is_active: boolean
  created_at: string
}

export interface Trainer {
  id: string
  full_name: string
  email: string | null
  phone: string | null
  qualification: string | null
  specialization: string | null
  status: string
  hire_date: string | null
  created_at: string
}

export interface Student {
  id: string
  full_name: string
  email: string | null
  phone: string | null
  date_of_birth: string | null
  gender: string | null
  address: string | null
  enrollment_date: string
  status: string
  branch_id: string | null
  created_at: string
}

export interface Admission {
  id: string
  applicant_name: string
  email: string | null
  phone: string | null
  applied_program: string | null
  status: string
  application_date: string
  notes: string | null
  created_at: string
}

export interface Course {
  id: string
  title: string
  code: string
  description: string | null
  credits: number
  trainer_id: string | null
  term_id: string | null
  status: string
  created_at: string
}

export interface CourseEnrollment {
  id: string
  student_id: string
  course_id: string
  enrolled_date: string
  status: string
  final_grade: string | null
  created_at: string
}

export interface Schedule {
  id: string
  course_id: string
  trainer_id: string | null
  room: string | null
  day_of_week: number | null
  start_time: string
  end_time: string
  is_active: boolean
  created_at: string
}

export interface Attendance {
  id: string
  student_id: string
  schedule_id: string | null
  session_date: string
  status: string
  notes: string | null
  created_at: string
}

export interface Assignment {
  id: string
  course_id: string
  title: string
  description: string | null
  due_date: string
  max_score: number
  status: string
  created_at: string
}

export interface ExamQuestion {
  id: string
  question_text: string
  question_type: string
  difficulty: string
  topic: string | null
  points: number
  created_at: string
}

export interface Exam {
  id: string
  title: string
  course_id: string | null
  exam_date: string | null
  duration_minutes: number
  total_points: number
  status: string
  created_at: string
}

export interface SupportTicket {
  id: string
  subject: string
  description: string | null
  submitted_by: string | null
  priority: string
  status: string
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  title: string
  body: string | null
  audience: string
  priority: string
  is_published: boolean
  created_at: string
}

export interface AuditLog {
  id: string
  action: string
  entity_type: string | null
  entity_id: string | null
  description: string | null
  performed_by: string
  created_at: string
}
