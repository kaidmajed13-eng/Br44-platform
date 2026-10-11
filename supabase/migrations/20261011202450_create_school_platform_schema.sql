/*
# First British Center — Core Platform Schema

## Overview
Creates the foundational database tables for the First British Center institutional
education platform. This is a single-tenant demo/institutional platform without
user authentication — all data is shared and accessible via the anon key.

## New Tables
1. `branches` — Institutional branches/departments
2. `academic_terms` — Academic periods and terms
3. `admissions` — Student applicants and application status
4. `students` — Enrolled student profiles
5. `trainers` — Staff/teacher directory
6. `courses` — Courses and curriculum
7. `course_enrollments` — Student-course enrollment links
8. `schedules` — Lesson/session scheduling
9. `attendance` — Attendance records per session
10. `assignments` — Course assignments
11. `exam_questions` — Reusable question bank
12. `exams` — Exams built from questions
13. `support_tickets` — Support request tracking
14. `audit_log` — Action audit trail
15. `notifications` — Platform notifications/announcements

## Security
- RLS enabled on all tables.
- All policies use `TO anon, authenticated` since this is a no-auth shared platform.
- All CRUD operations are allowed for anon + authenticated roles.
*/

-- ============ BRANCHES ============
CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  address text,
  phone text,
  email text,
  manager_name text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_crud_branches" ON branches;
CREATE POLICY "anon_select_branches" ON branches FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_branches" ON branches FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_branches" ON branches FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_branches" ON branches FOR DELETE TO anon, authenticated USING (true);

-- ============ ACADEMIC TERMS ============
CREATE TABLE IF NOT EXISTS academic_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  is_current boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE academic_terms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_terms" ON academic_terms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_terms" ON academic_terms FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_terms" ON academic_terms FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_terms" ON academic_terms FOR DELETE TO anon, authenticated USING (true);

-- ============ TRAINERS ============
CREATE TABLE IF NOT EXISTS trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text,
  phone text,
  qualification text,
  specialization text,
  status text DEFAULT 'active' CHECK (status IN ('active','inactive','on_leave')),
  hire_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_trainers" ON trainers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_trainers" ON trainers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_trainers" ON trainers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_trainers" ON trainers FOR DELETE TO anon, authenticated USING (true);

-- ============ STUDENTS ============
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text,
  phone text,
  date_of_birth date,
  gender text CHECK (gender IN ('male','female','other')),
  address text,
  enrollment_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'active' CHECK (status IN ('active','suspended','graduated','withdrawn')),
  branch_id uuid REFERENCES branches(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_students" ON students FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_students" ON students FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_students" ON students FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_students" ON students FOR DELETE TO anon, authenticated USING (true);

-- ============ ADMISSIONS ============
CREATE TABLE IF NOT EXISTS admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text NOT NULL,
  email text,
  phone text,
  applied_program text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','review','accepted','rejected','enrolled')),
  application_date date DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_admissions" ON admissions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_admissions" ON admissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_admissions" ON admissions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_admissions" ON admissions FOR DELETE TO anon, authenticated USING (true);

-- ============ COURSES ============
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  credits integer DEFAULT 1,
  trainer_id uuid REFERENCES trainers(id) ON DELETE SET NULL,
  term_id uuid REFERENCES academic_terms(id) ON DELETE SET NULL,
  status text DEFAULT 'active' CHECK (status IN ('active','draft','archived')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_courses" ON courses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_courses" ON courses FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_courses" ON courses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_courses" ON courses FOR DELETE TO anon, authenticated USING (true);

-- ============ COURSE ENROLLMENTS ============
CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'enrolled' CHECK (status IN ('enrolled','completed','dropped')),
  final_grade text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id)
);

ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_enrollments" ON course_enrollments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_enrollments" ON course_enrollments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_enrollments" ON course_enrollments FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_enrollments" ON course_enrollments FOR DELETE TO anon, authenticated USING (true);

-- ============ SCHEDULES ============
CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  trainer_id uuid REFERENCES trainers(id) ON DELETE SET NULL,
  room text,
  day_of_week integer CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_schedules" ON schedules FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_schedules" ON schedules FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_schedules" ON schedules FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_schedules" ON schedules FOR DELETE TO anon, authenticated USING (true);

-- ============ ATTENDANCE ============
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  schedule_id uuid REFERENCES schedules(id) ON DELETE SET NULL,
  session_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present','absent','late','excused')),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_attendance" ON attendance FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_attendance" ON attendance FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_attendance" ON attendance FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_attendance" ON attendance FOR DELETE TO anon, authenticated USING (true);

-- ============ ASSIGNMENTS ============
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date date NOT NULL,
  max_score integer DEFAULT 100,
  status text DEFAULT 'published' CHECK (status IN ('draft','published','closed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_assignments" ON assignments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_assignments" ON assignments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_assignments" ON assignments FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_assignments" ON assignments FOR DELETE TO anon, authenticated USING (true);

-- ============ EXAM QUESTIONS ============
CREATE TABLE IF NOT EXISTS exam_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  question_type text DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice','true_false','short_answer','essay')),
  difficulty text DEFAULT 'medium' CHECK (difficulty IN ('easy','medium','hard')),
  topic text,
  points integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_exam_questions" ON exam_questions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_exam_questions" ON exam_questions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_exam_questions" ON exam_questions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_exam_questions" ON exam_questions FOR DELETE TO anon, authenticated USING (true);

-- ============ EXAMS ============
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  exam_date date,
  duration_minutes integer DEFAULT 60,
  total_points integer DEFAULT 100,
  status text DEFAULT 'draft' CHECK (status IN ('draft','scheduled','active','completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_exams" ON exams FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_exams" ON exams FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_exams" ON exams FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_exams" ON exams FOR DELETE TO anon, authenticated USING (true);

-- ============ SUPPORT TICKETS ============
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  description text,
  submitted_by text,
  priority text DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  status text DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved','closed')),
  assigned_to text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_tickets" ON support_tickets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_tickets" ON support_tickets FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_tickets" ON support_tickets FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_tickets" ON support_tickets FOR DELETE TO anon, authenticated USING (true);

-- ============ NOTIFICATIONS ============
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text,
  audience text DEFAULT 'all' CHECK (audience IN ('all','students','trainers','admins')),
  priority text DEFAULT 'normal' CHECK (priority IN ('normal','important','urgent')),
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_notifications" ON notifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_notifications" ON notifications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_notifications" ON notifications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_notifications" ON notifications FOR DELETE TO anon, authenticated USING (true);

-- ============ AUDIT LOG ============
CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  entity_type text,
  entity_id text,
  description text,
  performed_by text DEFAULT 'system',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_audit" ON audit_log FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_audit" ON audit_log FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_audit" ON audit_log FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_audit" ON audit_log FOR DELETE TO anon, authenticated USING (true);

-- ============ INDEXES ============
CREATE INDEX IF NOT EXISTS idx_students_branch ON students(branch_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_courses_trainer ON courses(trainer_id);
CREATE INDEX IF NOT EXISTS idx_courses_term ON courses(term_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON course_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(session_date);
CREATE INDEX IF NOT EXISTS idx_assignments_course ON assignments(course_id);
CREATE INDEX IF NOT EXISTS idx_schedules_course ON schedules(course_id);
CREATE INDEX IF NOT EXISTS idx_exams_course ON exams(course_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at);

-- ============ SEED DATA ============
INSERT INTO branches (name, code, address, phone, email, manager_name) VALUES
  ('الفرع الرئيسي', 'MAIN', 'الرياض، حي العليا', '011-4567890', 'main@fbc.edu', 'د. أحمد العتيبي'),
  ('فرع جدة', 'JED', 'جدة، حي الروضة', '012-9876543', 'jed@fbc.edu', 'د. سارة الغامدي')
ON CONFLICT (code) DO NOTHING;

INSERT INTO academic_terms (name, start_date, end_date, is_current, is_active) VALUES
  ('الفصل الدراسي الأول 2026', '2026-01-15', '2026-05-30', true, true),
  ('الفصل الدراسي الثاني 2026', '2026-09-01', '2026-12-20', false, true)
ON CONFLICT DO NOTHING;

INSERT INTO trainers (full_name, email, phone, qualification, specialization) VALUES
  ('أ. محمد الشهري', 'm.shahri@fbc.edu', '055-1234567', 'ماجستير لغويات', 'اللغة الإنجليزية'),
  ('أ. خالد الدوسري', 'k.dosari@fbc.edu', '055-2345678', 'دكتوراه تربية', 'إدارة أعمال'),
  ('أ. نورة القحطاني', 'n.qahtani@fbc.edu', '055-3456789', 'ماجستير تكنولوجيا تعليم', 'تقنية المعلومات')
ON CONFLICT DO NOTHING;

INSERT INTO students (full_name, email, phone, gender, status, branch_id) VALUES
  ('فهد المطيري', 'f.mutairi@student.fbc.edu', '056-1111111', 'male', 'active', (SELECT id FROM branches WHERE code='MAIN')),
  ('لطيفة السبيعي', 'l.subaiei@student.fbc.edu', '056-2222222', 'female', 'active', (SELECT id FROM branches WHERE code='MAIN')),
  ('عبدالله الحربي', 'a.harbi@student.fbc.edu', '056-3333333', 'male', 'active', (SELECT id FROM branches WHERE code='JED')),
  ('مها العنزي', 'm.anzi@student.fbc.edu', '056-4444444', 'female', 'active', (SELECT id FROM branches WHERE code='JED')),
  ('سلمان البقمي', 's.bagami@student.fbc.edu', '056-5555555', 'male', 'suspended', (SELECT id FROM branches WHERE code='MAIN'))
ON CONFLICT DO NOTHING;

INSERT INTO courses (title, code, description, credits, trainer_id, term_id, status) VALUES
  ('اللغة الإنجليزية - المستوى المتقدم', 'ENG301', 'مهارات اللغة الإنجليزية المتقدمة', 3, (SELECT id FROM trainers LIMIT 1), (SELECT id FROM academic_terms WHERE is_current=true LIMIT 1), 'active'),
  ('مبادئ إدارة الأعمال', 'BUS101', 'أساسيات الإدارة والتخطيط', 3, (SELECT id FROM trainers OFFSET 1 LIMIT 1), (SELECT id FROM academic_terms WHERE is_current=true LIMIT 1), 'active'),
  ('تقنية المعلومات في التعليم', 'IT200', 'استخدام التقنية في البيئة التعليمية', 2, (SELECT id FROM trainers OFFSET 2 LIMIT 1), (SELECT id FROM academic_terms WHERE is_current=true LIMIT 1), 'active')
ON CONFLICT (code) DO NOTHING;

INSERT INTO course_enrollments (student_id, course_id, status) VALUES
  ((SELECT id FROM students LIMIT 1), (SELECT id FROM courses LIMIT 1), 'enrolled'),
  ((SELECT id FROM students LIMIT 1), (SELECT id FROM courses OFFSET 1 LIMIT 1), 'enrolled'),
  ((SELECT id FROM students OFFSET 1 LIMIT 1), (SELECT id FROM courses LIMIT 1), 'enrolled'),
  ((SELECT id FROM students OFFSET 2 LIMIT 1), (SELECT id FROM courses OFFSET 1 LIMIT 1), 'enrolled'),
  ((SELECT id FROM students OFFSET 3 LIMIT 1), (SELECT id FROM courses OFFSET 2 LIMIT 1), 'enrolled')
ON CONFLICT DO NOTHING;

INSERT INTO exam_questions (question_text, question_type, difficulty, topic, points) VALUES
  ('What is the past participle of the verb "write"?', 'short_answer', 'easy', 'Grammar', 5),
  ('Business management is the same as leadership.', 'true_false', 'medium', 'Management', 5),
  ('Which protocol is used for secure web communication?', 'multiple_choice', 'medium', 'IT', 10),
  ('Write an essay about the importance of effective communication in business.', 'essay', 'hard', 'Communication', 20)
ON CONFLICT DO NOTHING;

INSERT INTO support_tickets (subject, description, submitted_by, priority, status, assigned_to) VALUES
  ('مشكلة في الدخول للصف الافتراضي', 'لا أستطيع الدخول لغرفة اللغة الإنجليزية', 'فهد المطيري', 'high', 'open', 'أ. نورة القحطاني'),
  ('طلب استرجاع كلمة المرور', 'نسيت كلمة المرور الخاصة بي', 'عبدالله الحربي', 'medium', 'in_progress', 'الدعم الفني')
ON CONFLICT DO NOTHING;

INSERT INTO notifications (title, body, audience, priority) VALUES
  ('بداية الفصل الدراسي الأول 2026', 'نبدأ الفصل الدراسي الأول يوم 15 يناير 2026. يرجى الحضور قبل الموعد بـ 15 دقيقة.', 'all', 'important'),
  ('تذكير: موعد اختبار اللغة الإنجليزية', 'سيتم إجراء اختبار منتصف الفصل يوم 1 مارس 2026.', 'students', 'normal')
ON CONFLICT DO NOTHING;

INSERT INTO audit_log (action, entity_type, description, performed_by) VALUES
  ('create', 'branch', 'تم إنشاء الفرع الرئيسي', 'النظام'),
  ('create', 'branch', 'تم إنشاء فرع جدة', 'النظام'),
  ('create', 'student', 'تم تسجيل 5 طلاب جدد', 'النظام'),
  ('create', 'course', 'تم إنشاء 3 دورات تدريبية', 'النظام')
ON CONFLICT DO NOTHING;