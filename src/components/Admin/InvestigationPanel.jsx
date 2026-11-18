import React from 'react';
import { formatTime12 } from '../../services/storage';
import { X, Check, Ban, Trash2, Calendar, Mail, FileText, Clock, ExternalLink } from 'lucide-react';

export default function InvestigationPanel({
  booking,
  onClose,
  onUpdateStatus,
  onDeleteBooking,
  slotMinutes,
}) {
  if (!booking) return null;

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-lg flex flex-col justify-between animate-in fade-in slide-in-from-right duration-200">
      
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <span className="text-[10px] font-mono-data font-semibold uppercase text-teal-600 dark:text-teal-400">
              ملف الجلسة والاستشارة
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              تفاصيل الحجز
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق اللوحة"
            className="w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Client Card Block */}
        <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 rounded-lg p-3.5 mb-3.5">
          <span className="text-[10px] font-medium text-zinc-400 block mb-1">
            بيانات العميل
          </span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              {booking.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                {booking.name}
              </div>
              <div className="text-xs font-mono-data text-blue-600 dark:text-blue-400 dir-ltr text-left">
                {booking.contact}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Info Block */}
        <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 rounded-lg p-3.5 mb-3.5">
          <span className="text-[10px] font-medium text-zinc-400 block mb-1">
            توقيت وموعد الجلسة
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-teal-500" />
              <span className="font-mono-data font-semibold">{booking.date}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-mono-data font-semibold text-teal-600 dark:text-teal-400">
                {formatTime12(booking.time)} ({slotMinutes} دقيقة)
              </span>
            </div>
          </div>
        </div>

        {/* Consultation Topic & Notes Block */}
        <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 rounded-lg p-3.5 mb-4">
          <span className="text-[10px] font-medium text-zinc-400 block mb-1">
            موضوع الاستشارة
          </span>
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-2 leading-relaxed">
            {booking.topic}
          </p>
          
          <span className="text-[10px] font-medium text-zinc-400 block mb-1">
            ملاحظات وتحضيرات
          </span>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded p-2 min-h-[50px] leading-relaxed">
            {booking.notes || 'لا توجد ملاحظات إضافية مقدمة من العميل.'}
          </p>

          <div className="mt-2 text-[10px] font-mono-data text-zinc-400">
            سُجل بتاريخ: {new Date(booking.createdAt).toLocaleString('ar-KW')}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
        {booking.status === 'pending' && (
          <button
            onClick={() => onUpdateStatus(booking.id, 'confirmed')}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            تأكيد وقبول الحجز
          </button>
        )}

        {booking.status !== 'cancelled' && (
          <button
            onClick={() => onUpdateStatus(booking.id, 'cancelled')}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border border-amber-300 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all"
          >
            <Ban className="w-3.5 h-3.5" />
            إلغاء الموعد
          </button>
        )}

        {booking.status === 'cancelled' && (
          <button
            onClick={() => onUpdateStatus(booking.id, 'confirmed')}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border border-teal-300 dark:border-teal-800/60 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            إعادة تفعيل وتأكيد الموعد
          </button>
        )}

        <button
          onClick={() => {
            if (window.confirm('هل أنت متأكد من حذف هذا السجل نهائياً؟')) {
              onDeleteBooking(booking.id);
            }
          }}
          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          حذف الحجز نهائياً
        </button>
      </div>

    </div>
  );
}
