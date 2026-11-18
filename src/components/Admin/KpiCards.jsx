import React from 'react';
import { CalendarCheck, Users, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export default function KpiCards({ analytics }) {
  const cards = [
    {
      title: 'إجمالي الجلسات المسجلة',
      value: analytics.total,
      sublabel: `${analytics.confirmed} جلسة مؤكدة`,
      icon: Users,
      trend: '+18.2%',
      trendPositive: true,
      trendLabel: 'مقارنة بالشهر السابق',
      progress: Math.min(100, Math.round((analytics.confirmed / (analytics.total || 1)) * 100)),
      progressColor: 'bg-emerald-500',
    },
    {
      title: 'معدل استغلال المواعيد المتاحة',
      value: `${analytics.utilizationRate}%`,
      sublabel: `من أصل ${analytics.totalAvailableSlots} فترة متاحة`,
      icon: TrendingUp,
      trend: '+5.4%',
      trendPositive: true,
      trendLabel: 'كفاءة الجدول الزمني',
      progress: analytics.utilizationRate,
      progressColor: analytics.utilizationRate > 75 ? 'bg-emerald-500' : 'bg-blue-500',
    },
    {
      title: 'الجلسات القادمة النشطة',
      value: analytics.upcoming,
      sublabel: `${analytics.todayCount} مواعيد مجدولة لليوم`,
      icon: CalendarCheck,
      trend: `${analytics.todayCount > 0 ? 'نشط اليوم' : 'لا مواعيد اليوم'}`,
      trendPositive: analytics.todayCount > 0,
      trendLabel: 'جدول الأسبوع القادم',
      progress: Math.min(100, (analytics.upcoming / 15) * 100),
      progressColor: 'bg-teal-500',
    },
    {
      title: 'طلبات بانتظار التأكيد',
      value: analytics.pending,
      sublabel: `${analytics.confirmationRate}% معدل التأكيد العام`,
      icon: analytics.pending > 0 ? AlertCircle : Clock,
      trend: analytics.pending > 0 ? `${analytics.pending} طلب جديد` : 'مكتمل بالكامل',
      trendPositive: analytics.pending === 0,
      trendLabel: analytics.pending > 0 ? 'يتطلب إجراء' : 'جميعها مؤكدة',
      progress: analytics.confirmationRate,
      progressColor: analytics.pending > 0 ? 'bg-amber-500' : 'bg-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {card.title}
                </span>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-extrabold font-mono-data tracking-tight text-zinc-950 dark:text-zinc-50">
                  {card.value}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-mono-data font-semibold px-2 py-0.5 rounded-full ${
                    card.trendPositive
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'
                  }`}
                >
                  {card.trendPositive ? '↗' : '↘'} {card.trend}
                </span>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                {card.sublabel}
              </p>
            </div>

            {/* Sparkline Progress */}
            <div>
              <div className="flex justify-between items-center text-[10px] text-zinc-400 dark:text-zinc-500 font-mono-data mb-1">
                <span>{card.trendLabel}</span>
                <span>{Math.round(card.progress)}%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${card.progressColor} rounded-full transition-all duration-500`}
                  style={{ width: `${card.progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
