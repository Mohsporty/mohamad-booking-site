import React, { useState } from 'react';
import {
  WD_AR,
  WD_SHORT_AR,
  formatDateISO,
  addDays,
  formatTime12,
  computeAvailableSlots,
} from '../../services/storage';
import { Calendar, Clock, Check, AlertCircle, X, CheckCircle2 } from 'lucide-react';

export default function BookingSection({ db, onNewBooking }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    // Find first date with available slots
    const today = new Date();
    for (let i = 0; i < (db.settings.windowDays || 21); i++) {
      const d = formatDateISO(addDays(today, i));
      if (computeAvailableSlots(d, db).length > 0) return d;
    }
    return formatDateISO(today);
  });

  const [bookingModal, setBookingModal] = useState(null); // { time: '10:00', date: '2026-11-18' }
  const [successInfo, setSuccessInfo] = useState(null);
  const [formData, setFormData] = useState({ name: '', contact: '', topic: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const windowDays = db.settings.windowDays || 21;
  const daysList = [];
  const today = new Date();

  for (let i = 0; i < windowDays; i++) {
    const curDate = addDays(today, i);
    const dateStr = formatDateISO(curDate);
    const slots = computeAvailableSlots(dateStr, db);
    daysList.push({
      dateStr,
      dateObj: curDate,
      dayNum: curDate.getDate(),
      monthName: curDate.toLocaleDateString('ar-KW', { month: 'short' }),
      weekdayName: WD_SHORT_AR[curDate.getDay()],
      slotsCount: slots.length,
      isAvailable: slots.length > 0,
    });
  }

  const currentAvailableSlots = selectedDate ? computeAvailableSlots(selectedDate, db) : [];

  const handleOpenModal = (time) => {
    setBookingModal({ date: selectedDate, time });
    setFormData({ name: '', contact: '', topic: '', notes: '' });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.topic.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBookingObj = {
        id: `bk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        date: bookingModal.date,
        time: bookingModal.time,
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        topic: formData.topic.trim(),
        notes: formData.notes.trim(),
        status: db.settings.autoConfirm ? 'confirmed' : 'pending',
        createdAt: new Date().toISOString(),
      };

      onNewBooking(newBookingObj);
      setIsSubmitting(false);
      setBookingModal(null);
      setSuccessInfo(newBookingObj);
    }, 400);
  };

  return (
    <section id="booking" className="py-16 border-t border-zinc-200/60 dark:border-zinc-800/60 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-mono-data font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
            جدول المواعيد المباشر
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mb-3">
            احجز جلسة استشارية مباشرة
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            اختر اليوم والوقت الملائم لك. الأوقات المعروضة أدناه متاحة فعلياً ومربوطة بجدول الأعمال بدقة لمنع أي تعارض.
          </p>
        </div>

        {/* Booking Card Container */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Metadata banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-100 dark:border-zinc-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-teal-500" />
                مدة الجلسة: <b className="text-zinc-900 dark:text-zinc-100 font-mono-data">{db.settings.slotMinutes} دقيقة</b>
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-blue-500" />
                التوقيت: <b className="text-zinc-900 dark:text-zinc-100 font-mono-data">الكويت (UTC+3)</b>
              </span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              تأكيد فوري وحجز متزامن
            </div>
          </div>

          {/* Date Selector Row */}
          <div className="mb-8">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-3">
              1. اختر تاريخ اليوم المناسب:
            </span>

            <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin">
              {daysList.map((item) => {
                const isSelected = selectedDate === item.dateStr;
                return (
                  <button
                    key={item.dateStr}
                    type="button"
                    disabled={!item.isAvailable}
                    onClick={() => setSelectedDate(item.dateStr)}
                    className={`flex-shrink-0 min-w-[85px] py-3 px-2 rounded-xl text-center border transition-all ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/80 dark:bg-teal-950/40 shadow-sm ring-2 ring-teal-500/20'
                        : item.isAvailable
                        ? 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700'
                        : 'border-zinc-100 dark:border-zinc-900 opacity-40 cursor-not-allowed bg-transparent'
                    }`}
                  >
                    <span className={`block text-[11px] font-semibold mb-1 ${isSelected ? 'text-teal-700 dark:text-teal-400' : 'text-zinc-400'}`}>
                      {item.weekdayName}
                    </span>
                    <span className="block text-lg font-extrabold font-mono-data text-zinc-900 dark:text-zinc-100 leading-tight">
                      {item.dayNum}
                    </span>
                    <span className="block text-[10px] text-zinc-400 mb-1">
                      {item.monthName}
                    </span>
                    <span
                      className={`block text-[10px] font-mono-data font-semibold ${
                        item.isAvailable
                          ? isSelected
                            ? 'text-teal-600 dark:text-teal-400'
                            : 'text-zinc-500 dark:text-zinc-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      {item.isAvailable ? `${item.slotsCount} فترة` : 'مكتمل'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots Area */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                2. اختر وقت الجلسة المتاح:
              </span>
              <span className="text-[11px] font-mono-data text-zinc-400">
                التاريخ المختار: {selectedDate}
              </span>
            </div>

            {currentAvailableSlots.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/30">
                لا توجد فترات متاحة في هذا اليوم — يرجى اختيار تاريخ آخر من الأعلى.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {currentAvailableSlots.map((timeStr) => (
                  <button
                    key={timeStr}
                    type="button"
                    onClick={() => handleOpenModal(timeStr)}
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:border-teal-500 dark:hover:border-teal-500/80 text-zinc-900 dark:text-zinc-100 font-mono-data font-bold text-xs text-center transition-all shadow-sm hover:scale-[1.02]"
                  >
                    {formatTime12(timeStr)}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Booking Form Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-mono-data font-bold uppercase text-teal-600 dark:text-teal-400">
                  تأكيد موعد الجلسة
                </span>
                <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                  حجز جلسة استشارية
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBookingModal(null)}
                className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 rounded-xl p-3.5 mb-5 flex items-center justify-between text-xs font-mono-data">
              <span className="text-teal-900 dark:text-teal-200 font-semibold">
                📅 {bookingModal.date}
              </span>
              <span className="text-teal-700 dark:text-teal-400 font-bold">
                ⏰ {formatTime12(bookingModal.time)} ({db.settings.slotMinutes} د)
              </span>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  الاسم الكريم *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عبدالله الراشد"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  البريد الإلكتروني أو الهاتف *
                </label>
                <input
                  type="text"
                  required
                  placeholder="example@company.com أو +965..."
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  موضوع الاستشارة أو المشروع *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مراجعة معمارية لترحيل السحابة الهجينة"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  ملاحظات أو أسئلة محددة (اختياري)
                </label>
                <textarea
                  rows={2}
                  placeholder="أي تفاصيل تود أن أطلع عليها قبل الجلسة..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-500/20 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? 'جارٍ تسجيل الحجز...' : 'تأكيد الحجز النهائي'}
                </button>
                <button
                  type="button"
                  onClick={() => setBookingModal(null)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Success Dialog */}
      {successInfo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
              تم استلام حجزك بنجاح!
            </h3>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
              أهلاً بك <b>{successInfo.name}</b>. تم تثبيت موعدك في جدول الجلسات الاستشارية.
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-mono-data mb-6 space-y-1 text-zinc-700 dark:text-zinc-300">
              <div>📅 {successInfo.date}</div>
              <div className="text-teal-600 dark:text-teal-400 font-bold">
                ⏰ {formatTime12(successInfo.time)} ({db.settings.slotMinutes} د)
              </div>
              <div className="text-[11px] text-zinc-400 truncate">{successInfo.topic}</div>
            </div>

            <button
              type="button"
              onClick={() => setSuccessInfo(null)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-500/20 transition-all"
            >
              تم، شكراً لك
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
