import { type LucideIcon, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import type { ModuleDef } from '../config/modules'

interface InfoModuleProps {
  module: ModuleDef
}

interface FeatureItem {
  icon: LucideIcon
  title: string
  description: string
}

const moduleFeatures: Record<string, FeatureItem[]> = {
  roles: [
    { icon: CheckCircle2, title: 'إدارة الأدوار', description: 'إنشاء وتعيين أدوار مخصصة للمستخدمين' },
    { icon: CheckCircle2, title: 'الصلاحيات', description: 'تحديد صلاحيات الوصول لكل دور في النظام' },
    { icon: CheckCircle2, title: 'تفعيل/إلغاء الحسابات', description: 'التحكم في حالة حسابات المستخدمين' },
    { icon: CheckCircle2, title: 'سجل النشاط', description: 'تتبع آخر نشاط لكل حساب' },
  ],
  resources: [
    { icon: CheckCircle2, title: 'تخزين الملفات', description: 'رفع وتنظيم ملفات الدروس والوثائق' },
    { icon: CheckCircle2, title: 'العروض التقديمية', description: 'إدارة شرائح العرض المرتبطة بالدروس' },
    { icon: CheckCircle2, title: 'الصور والوسائط', description: 'تخزين الصور والموارد التعليمية' },
    { icon: CheckCircle2, title: 'التحكم في الوصول', description: 'تقييد الوصول للموارد حسب الدورة' },
  ],
  grades: [
    { icon: CheckCircle2, title: 'تسجيل الدرجات', description: 'إدخال وتخزين درجات الطلاب' },
    { icon: CheckCircle2, title: 'حساب التقدم', description: 'حساب نسبة إنجاز كل دورة' },
    { icon: CheckCircle2, title: 'ملاحظات المدرب', description: 'تقديم تغذية راجعة للطلاب' },
    { icon: CheckCircle2, title: 'تقارير الأداء', description: 'عرض ملخص أداء الطلاب' },
  ],
  'live-rooms': [
    { icon: CheckCircle2, title: 'اتصال صوتي/مرئي', description: 'بث مباشر للصوت والفيديو' },
    { icon: CheckCircle2, title: 'رموز الدخول', description: 'إصدار رموز دخول آمنة للغرف' },
    { icon: CheckCircle2, title: 'مشاركة الشاشة', description: 'عرض شاشة المدرب للطلاب' },
    { icon: CheckCircle2, title: 'إدارة المشاركين', description: 'التحكم في أذونات المشاركين' },
  ],
  whiteboard: [
    { icon: CheckCircle2, title: 'لوح تفاعلي مشترك', description: 'مساحة رسم مشتركة بين المدرب والطلاب' },
    { icon: CheckCircle2, title: 'التعليق التفاعلي', description: 'توضيح المفاهيم بشكل بصري' },
    { icon: CheckCircle2, title: 'حفظ المحتوى', description: 'حفظ ما يكتب على اللوح للرجوع إليه' },
    { icon: CheckCircle2, title: 'تعاون متعدد المستخدمين', description: 'مزامنة لحظية بين المشاركين' },
  ],
  recordings: [
    { icon: CheckCircle2, title: 'تسجيل الدروس', description: 'تسجيل وإعادة تشغيل الدروس المسجلة' },
    { icon: CheckCircle2, title: 'البيانات الوصفية', description: 'ربط التسجيلات بالدورات والجلسات' },
    { icon: CheckCircle2, title: 'التحكم في الوصول', description: 'تقييد الوصول للتسجيلات حسب العضوية' },
    { icon: CheckCircle2, title: 'مكتبة منظمة', description: 'تصنيف وبحث التسجيلات' },
  ],
  'exam-builder': [
    { icon: CheckCircle2, title: 'تجميع الاختبارات', description: 'بناء اختبارات من بنك الأسئلة' },
    { icon: CheckCircle2, title: 'تعليمات التصحيح', description: 'تحديد قواعد التصحيح والدرجات' },
    { icon: CheckCircle2, title: 'إصدارات متعددة', description: 'إنشاء نسخ مختلفة من الاختبار' },
    { icon: CheckCircle2, title: 'التحقق والمراجعة', description: 'مراجعة الاختبار قبل النشر' },
  ],
  arrangements: [
    { icon: CheckCircle2, title: 'تسهيلات معتمدة', description: 'تسجيل التسهيلات المعتمدة لكل طالب' },
    { icon: CheckCircle2, title: 'وقت إضافي', description: 'منح وقت إضافي لمن يحتاجه' },
    { icon: CheckCircle2, title: 'تنسيقات متاحة', description: 'توفير تنسيقات اختبار بديلة' },
    { icon: CheckCircle2, title: 'احترام الترتيبات', description: 'ضمان احترام التسهيلات أثناء الاختبار' },
  ],
  monitoring: [
    { icon: CheckCircle2, title: 'إشراف معتمد', description: 'مراقبة معتمدة للاختبارات النشطة' },
    { icon: CheckCircle2, title: 'جدول أحداث', description: 'تتبع الأحداث أثناء الاختبار' },
    { icon: CheckCircle2, title: 'عملية بشرية', description: 'مراجعة بشرية للملاحظات' },
    { icon: CheckCircle2, title: 'تدقيق قابل للتتبع', description: 'سجل كامل لجميع الإجراءات' },
  ],
  marking: [
    { icon: CheckCircle2, title: 'تصحيح التسليمات', description: 'مراجعة وتصحيح إجابات الطلاب' },
    { icon: CheckCircle2, title: 'مراجعة النتائج', description: 'فحص النتائج قبل النشر' },
    { icon: CheckCircle2, title: 'حل الخلافات', description: 'معالجة التباينات في الدرجات' },
    { icon: CheckCircle2, title: 'إدارة الطعون', description: 'استقبال والنظر في طعون الطلاب' },
  ],
  proctoring: [
    { icon: AlertCircle, title: 'تسجيل الحوادث', description: 'تسجيل الحوادث المحتملة أثناء الاختبار' },
    { icon: AlertCircle, title: 'توجيه للمراجعة', description: 'إرسال الحوادث لمراجعة بشرية' },
    { icon: AlertCircle, title: 'إدارة الأدلة', description: 'تخزين وإدارة الأدلة بشكل آمن' },
    { icon: AlertCircle, title: 'مسار الطعن', description: 'توفير مسار للطعن في القرارات' },
  ],
  finance: [
    { icon: CheckCircle2, title: 'الفواتير', description: 'إنشاء وإدارة الفواتير' },
    { icon: CheckCircle2, title: 'حالة الدفع', description: 'تتبع حالة المدفوعات' },
    { icon: CheckCircle2, title: 'الإيصالات', description: 'إصدار إيصالات الدفع' },
    { icon: CheckCircle2, title: 'التقارير المالية', description: 'تقارير الإيرادات والمصروفات' },
  ],
  reports: [
    { icon: CheckCircle2, title: 'مؤشرات مؤسسية', description: 'عرض مؤشرات الأداء المؤسسي' },
    { icon: CheckCircle2, title: 'مؤشرات أكاديمية', description: 'عرض النتائج الأكاديمية' },
    { icon: CheckCircle2, title: 'تصدير CSV', description: 'تصدير البيانات بصيغة CSV' },
    { icon: CheckCircle2, title: 'تقارير مجدولة', description: 'جدولة تقارير دورية' },
  ],
  integration: [
    { icon: CheckCircle2, title: 'حالة الخدمات', description: 'فحص حالة الخدمات المتصلة' },
    { icon: CheckCircle2, title: 'النسخ الاحتياطي', description: 'إدارة النسخ الاحتياطية' },
    { icon: CheckCircle2, title: 'الاستعادة', description: 'استعادة البيانات من النسخ' },
    { icon: CheckCircle2, title: 'المراقبة', description: 'مراقبة أداء النظام' },
  ],
  help: [
    { icon: CheckCircle2, title: 'إرشادات المستخدم', description: 'أدلة استخدام النظام' },
    { icon: CheckCircle2, title: 'الأسئلة الشائعة', description: 'إجابات للأسئلة المتكررة' },
    { icon: CheckCircle2, title: 'معلومات الدعم', description: 'طرق التواصل مع الدعم' },
    { icon: CheckCircle2, title: 'فيديوهات تعليمية', description: 'شروحات مرئية للنظام' },
  ],
}

export default function InfoModule({ module }: InfoModuleProps) {
  const features = moduleFeatures[module.id] || []
  const Icon = module.icon

  return (
    <div>
      <div className="info-hero">
        <div className="info-hero-icon">
          <Icon size={28} />
        </div>
        <h2>{module.label}</h2>
        <p>{module.description}</p>
      </div>

      <div className="info-status warning">
        <Clock size={18} />
        <span>هذه الوحدة قيد التطوير — يتم عرض الميزات المخططة والإمكانيات المقصودة.</span>
      </div>

      {features.length > 0 && (
        <div className="info-features">
          {features.map((feature, idx) => {
            const FeatureIcon = feature.icon
            return (
              <div key={idx} className="info-feature">
                <div className="info-feature-icon">
                  <FeatureIcon size={20} />
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
