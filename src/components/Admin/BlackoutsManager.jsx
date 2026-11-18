import React, { useState } from 'react';
import { Plus, X, CalendarOff, AlertTriangle } from 'lucide-react';

export default function BlackoutsManager({ blackouts, onUpdateBlackouts }) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!selectedDate) return;
    if (!blackouts.includes(selectedDate)) {
      const updated = [...blackouts, selectedDate].sort();
      onUpdateBlackouts(updated);
    }
    setSelectedDate('');
  };

  const handleRemove = (dateToRemove) => {
    const updated = blackouts.filter((d) => d !== dateToRemove);
    onUpdateBlackouts(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            إدارة الأيام المحظورة والإجازات
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            الأيام المضافة هنا (مثل الأعياد والإجازات والالتزامات الطارئة) تختفي تماماً من جدول حجز العملاء.
          </p>
        </div>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-wrap items-end gap-3 max-w-lg">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            اختر تاريخ الإجازة / الحظر
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-mono-data text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          disabled={!selectedDate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-50 transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          حظر هذا التاريخ
        </button>
      </form>

      {/* Chip list */}
      <div>
        <h4 className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-3">
          التواريخ المحظورة حالياً ({blackouts.length})
        </h4>

        {blackouts.length === 0 ? (
          <div className="bg-white dark:bg-[#0c0c0f] border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center text-zinc-400 text-xs">
            <CalendarOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
            لا توجد أيام محظورة حالياً. جميع الأيام المجدولة تعمل بالوضع الطبيعي.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {blackouts.map((dateStr) => (
              <span
                key={dateStr}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono-data bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400"
              >
                <span>📅 {dateStr}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(dateStr)}
                  title="إلغاء الحظر"
                  className="w-4 h-4 rounded-full hover:bg-rose-200 dark:hover:bg-rose-900 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
