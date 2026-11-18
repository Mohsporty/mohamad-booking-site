import React from 'react';
import { Briefcase, Award, Milestone } from 'lucide-react';

export default function Journey() {
  const steps = [
    {
      period: 'الحاضر',
      title: 'Solutions Architect Manager',
      company: 'المؤسسات المالية والتقنية الكبرى',
      desc: 'قيادة فرق مهندسي المعمارية والحلول، اعتماد القرارات التقنية الاستراتيجية الكبرى، والإشراف على البنية التحتية السحابية متعددة المناطق مع الإدارة التنفيذية.',
      active: true,
    },
    {
      period: 'مرحلة سابقة',
      title: 'Senior Solutions Architect',
      company: 'التحول السحابي والأنظمة الموزعة',
      desc: 'تصميم أنظمة سحابية فائقة التوافر (99.99%) تخدم مئات آلاف العمليات اليومية، وقيادة مشاريع تفكيك الأنظمة التقليدية ونقلها للسحابة بنجاح.',
      active: false,
    },
    {
      period: 'البدايات',
      title: 'Senior Software Engineer / Tech Lead',
      company: 'هندسة البرمجيات والتطوير',
      desc: 'بناء أساس برمجي وهندسي عميق — من كتابة الكود عالي الكفاءة وتحسين استعلامات قواعد البيانات، إلى إدارة خطوط النشر الآلي وتصميم واجهات API.',
      active: false,
    },
  ];

  return (
    <section id="journey" className="py-16 border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono-data font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
            المسيرة والخبرة المهنية
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mb-3">
            محطات في القيادة الهندسية والمعمارية
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            مسيرة متدرجة تجمع بين العمق التقني في كتابة الأكواد والتشغيل، والنضج القيادي في توجيه المؤسسات.
          </p>
        </div>

        <div className="relative border-r-2 border-zinc-200 dark:border-zinc-800 pr-6 space-y-10 max-w-3xl">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on the timeline line */}
              <div
                className={`absolute -right-[31px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                  step.active
                    ? 'bg-teal-500 border-white dark:border-[#09090b] shadow-md shadow-teal-500/50'
                    : 'bg-zinc-300 dark:bg-zinc-700 border-white dark:border-[#09090b]'
                }`}
              />

              <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-mono-data font-semibold px-2 py-0.5 rounded-full ${
                      step.active
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {step.period}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    {step.company}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
