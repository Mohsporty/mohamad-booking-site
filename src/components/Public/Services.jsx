import React from 'react';
import { Layers, Cloud, Users2, Cpu, ShieldAlert, Compass } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'تصميم المعمارية المؤسسية',
      desc: 'بناء معمارية أنظمة متينة وقابلة للتوسع (Scalable & Resilient) توازن بدقة بين سرعة الوصول للإنتاج، والتكلفة التشغيلية، وموثوقية الأداء.',
      icon: Layers,
      tag: 'Architecture Design',
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    },
    {
      title: 'السحابة والترحيل الآمن',
      desc: 'استراتيجيات وخطط ترحيل سلسة وبدون توقف للخدمات (Zero-Downtime Migration) إلى AWS و Azure مع حوكمة أمنية وضبط الإنفاق السحابي (FinOps).',
      icon: Cloud,
      tag: 'Cloud & FinOps',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'قيادة وتمكين الفرق الهندسية',
      desc: 'تأسيس الثقافة التقنية، معايير الجودة ومراجعة الكود، ونمذجة الهياكل الهندسية (Team Topologies) لتمكين فرق التطوير من الإنتاجية المستمرة.',
      icon: Users2,
      tag: 'Engineering Leadership',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'التحول الرقمي والمايكروسيرفس',
      desc: 'تفكيك الأنظمة القديمة المتجانسة (Monolith Decoupling) بنمط Strangler Fig، وبناء معمارية موجهة بالأحداث (Event-Driven Architecture).',
      icon: Cpu,
      tag: 'Digital Transformation',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'مراجعة المعمارية والتدقيق الفني',
      desc: 'تقييم محايد وشامل للأنظمة الحالية لكشف نقاط الاختناق ومخاطر الفشل الأمني والأدائي قبل إطلاق المشاريع الكبرى للمستخدمين.',
      icon: ShieldAlert,
      tag: 'Architecture Review',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'استشارات تقنية تنفيذية لمجالس الإدارة',
      desc: 'جلسات استشارية مركزة لمساعدة القيادات والمستثمرين في اتخاذ قرارات الشراء أو البناء (Build vs. Buy) والفحص التقني النافي للجهالة.',
      icon: Compass,
      tag: 'Executive Advisory',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <section id="services" className="py-16 border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono-data font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
            مجالات العمل والخدمات
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mb-3">
            كيف أساعد مؤسستك وفريقك التقني؟
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            من مراجعة التصاميم المعمارية الدقيقة إلى وضع خارطة الطريق الاستراتيجية للتحول الرقمي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${srv.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono-data text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-full">
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
