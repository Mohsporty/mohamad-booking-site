import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'كم تبلغ مدة الجلسة الاستشارية وماذا تشمل؟',
      a: 'المدة الافتراضية للجلسة 45 دقيقة مركزة، ويمكن ضبطها حتى 90 دقيقة. تشمل مناقشة التحدي التقني أو المعماري، تحليل الخيارات والبدائل، وتقديم توصيات عملية واضحة قابلة للتنفيذ مباشرة.',
    },
    {
      q: 'هل الحجز فوري ومؤكد؟',
      a: 'نعم، النظام يقوم بفحص الأوقات المتاحة وحجز الفترة فورياً لمنع أي تعارض. تظهر الجلسة فوراً في جدول الأعمال مع إشعار بالموعد.',
    },
    {
      q: 'هل الجلسات مشمولة باتفاقيات السرية وعدم الإفصاح (NDA)؟',
      a: 'نعم بالتأكيد. جميع التفاصيل التقنية، والمعمارية، والبيانات الخاصة بالأنظمة والمؤسسات تعامل بسرية تامة واحترافية مطلقة.',
    },
    {
      q: 'ماذا لو احتجت موعداً خارج الساعات المتاحة بالجدول؟',
      a: 'يمكنك التواصل المباشر عبر وسائل الاتصال المذكورة، وسنعمل على التنسيق لموعد استثنائي يلائم جدول أعمال الطرفين.',
    },
    {
      q: 'هل يمكن إلغاء أو إعادة جدولة الموعد؟',
      a: 'نعم، بإمكانك مراسلتي قبل الموعد بوقت كافٍ لتعديل التاريخ أو إلغائه لإتاحة الفترة للمستفيدين الآخرين.',
    },
  ];

  return (
    <section id="faq" className="py-16 border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono-data font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
            الأسئلة الشائعة
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mb-3">
            إجابات على الأسئلة الأكثر تكراراً
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            كل ما تحتاج معرفته قبل حجز جلستك المعمارية الاستشارية.
          </p>
        </div>

        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full text-right rtl:text-right p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
