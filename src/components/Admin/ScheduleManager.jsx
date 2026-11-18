import React from 'react';
import { WD_AR, toMinutes } from '../../services/storage';
import { Plus, Trash2, Clock, Check, AlertCircle } from 'lucide-react';

export default function ScheduleManager({ availability, slotMinutes, onUpdateAvailability }) {
  const handleToggleDay = (dayIndex) => {
    const updated = { ...availability };
    const cur = updated[dayIndex] || { on: false, ranges: [] };
    const nextOn = !cur.on;
    updated[dayIndex] = {
      ...cur,
      on: nextOn,
      ranges: nextOn && cur.ranges.length === 0 ? [['09:00', '13:00']] : cur.ranges,
    };
    onUpdateAvailability(updated);
  };

  const handleAddRange = (dayIndex) => {
    const updated = { ...availability };
    const cur = updated[dayIndex] || { on: true, ranges: [] };
    updated[dayIndex] = {
      ...cur,
      ranges: [...cur.ranges, ['14:30', '17:00']],
    };
    onUpdateAvailability(updated);
  };

  const handleDeleteRange = (dayIndex, rangeIndex) => {
    const updated = { ...availability };
    const cur = updated[dayIndex];
    const newRanges = [...cur.ranges];
    newRanges.splice(rangeIndex, 1);
    updated[dayIndex] = { ...cur, ranges: newRanges };
    onUpdateAvailability(updated);
  };

  const handleTimeChange = (dayIndex, rangeIndex, startOrEnd, value) => {
    const updated = { ...availability };
    const cur = updated[dayIndex];
    const newRanges = cur.ranges.map((r, idx) => {
      if (idx !== rangeIndex) return r;
      const copy = [...r];
      copy[startOrEnd] = value;
      return copy;
    });
    updated[dayIndex] = { ...cur, ranges: newRanges };
    onUpdateAvailability(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            جدول أوقات الاستقبال الأسبوعي
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            حدد الأيام المفعلة وساعات العمل المتاحة لكل يوم. الفترات الزمنية تُحتسب تلقائياً بمدة {slotMinutes} دقيقة.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {WD_AR.map((dayName, dayIndex) => {
          const dayConfig = availability[dayIndex] || { on: false, ranges: [] };
          
          // Calculate slots generated
          let slotsCount = 0;
          if (dayConfig.on) {
            dayConfig.ranges.forEach(([st, en]) => {
              const span = toMinutes(en) - toMinutes(st);
              if (span > 0) slotsCount += Math.floor(span / slotMinutes);
            });
          }

          return (
            <div
              key={dayIndex}
              className={`bg-white dark:bg-[#0c0c0f] border rounded-xl p-4 transition-all ${
                dayConfig.on
                  ? 'border-zinc-200 dark:border-zinc-800 shadow-sm'
                  : 'border-zinc-100 dark:border-zinc-900 opacity-60'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {/* Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dayConfig.on}
                      onChange={() => handleToggleDay(dayIndex)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-teal-500"></div>
                  </label>

                  <div>
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {dayName}
                    </span>
                    <span className="text-[11px] font-mono-data text-zinc-400 ms-2">
                      {dayConfig.on ? `${slotsCount} فترة متاحة` : 'معطل'}
                    </span>
                  </div>
                </div>

                {dayConfig.on && (
                  <button
                    onClick={() => handleAddRange(dayIndex)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 text-zinc-700 dark:text-zinc-300 hover:text-teal-600 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    إضافة فترة عمل
                  </button>
                )}
              </div>

              {/* Time ranges */}
              {dayConfig.on && (
                <div className="flex flex-wrap gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  {dayConfig.ranges.length === 0 ? (
                    <span className="text-xs text-amber-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      لا توجد فترات عمل محددة لهذا اليوم. أضف فترة ليتمكن العملاء من الحجز.
                    </span>
                  ) : (
                    dayConfig.ranges.map(([start, end], rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-1.5 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs font-mono-data"
                      >
                        <Clock className="w-3 h-3 text-teal-500" />
                        <input
                          type="time"
                          value={start}
                          onChange={(e) => handleTimeChange(dayIndex, rIdx, 0, e.target.value)}
                          className="bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none"
                        />
                        <span className="text-zinc-400">←</span>
                        <input
                          type="time"
                          value={end}
                          onChange={(e) => handleTimeChange(dayIndex, rIdx, 1, e.target.value)}
                          className="bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none"
                        />
                        <button
                          onClick={() => handleDeleteRange(dayIndex, rIdx)}
                          title="حذف الفترة"
                          className="text-zinc-400 hover:text-rose-500 ms-1 p-0.5 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
