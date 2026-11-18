import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Award, Zap, Server } from 'lucide-react';

export default function Hero({ onBookClick, onExploreClick, todaySlotsCount }) {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Subtle ambient light gradient background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/80 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          <span className="tracking-wider uppercase font-mono-data text-[11px]">
            Solutions Architect Manager
          </span>
        </div>

        {/* Main Content & Avatar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          <div className="lg:col-span-8 space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.25]">
              أحوّل التحديات المعقدة إلى{' '}
              <span className="bg-gradient-to-r from-teal-500 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                حلول معمارية مؤسسية
              </span>{' '}
              قابلة للتوسع والاستدامة
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              أكثر من عقد في هندسة وتصميم الأنظمة السحابية المعقدة، وقيادة فرق التطوير عالية الأداء
              في القطاعات المالية والمؤسسية — من الرؤية الاستراتيجية إلى التنفيذ والتشغيل الموثوق.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>احجز جلسة استشارية معي</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] text-zinc-800 dark:text-zinc-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
              >
                تعرّف على الخدمات والخبرات
              </button>

              {todaySlotsCount > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-data bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  متاح اليوم: {todaySlotsCount} فترات
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-data bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
                  مواعيد اليوم مكتملة — اختر من الأيام القادمة
                </span>
              )}
            </div>
          </div>

          {/* Avatar and Persona Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-teal-500 via-blue-600 to-indigo-600 p-1 shadow-2xl shadow-teal-500/20 rotate-1 hover:rotate-0 transition-transform">
                <div className="w-full h-full rounded-[22px] bg-[#0c0c0f] flex flex-col items-center justify-center text-center p-4">
                  <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-teal-400 font-extrabold text-4xl mb-3 shadow-inner">
                    M
                  </div>
                  <span className="font-bold text-sm text-zinc-100">م. محمد</span>
                  <span className="text-[11px] font-mono-data text-teal-400">Solution Architect Lead</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Executive Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center shadow-sm">
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono-data text-teal-600 dark:text-teal-400 mb-0.5">
              +12 سنة
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">خبرة هندسية وتصميم معماري</span>
          </div>

          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center shadow-sm">
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono-data text-blue-600 dark:text-blue-400 mb-0.5">
              +40 مشروعاً
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">أنظمة مؤسسية وسحابية ناجحة</span>
          </div>

          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center shadow-sm">
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono-data text-purple-600 dark:text-purple-400 mb-0.5">
              8 فرق
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">فرق هندسية قُدت بنجاح</span>
          </div>

          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center shadow-sm">
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono-data text-emerald-600 dark:text-emerald-400 mb-0.5">
              99.99%
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">جاهزية وتوافر للأنظمة المصممة</span>
          </div>
        </div>

      </div>
    </section>
  );
}
