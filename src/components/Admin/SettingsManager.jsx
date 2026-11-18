import React, { useState } from 'react';
import { Download, Upload, RotateCcw, Shield, Clock, Check, AlertTriangle } from 'lucide-react';

export default function SettingsManager({
  settings,
  onUpdateSettings,
  onExportJSON,
  onImportJSON,
  onResetDB,
}) {
  const [formData, setFormData] = useState({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.pin || formData.pin.length < 4) {
      alert('رمز الحماية يجب ألا يقل عن 4 أرقام أو خانات');
      return;
    }
    onUpdateSettings(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed || !parsed.settings || !parsed.availability) {
          throw new Error('Invalid format');
        }
        onImportJSON(parsed);
      } catch (err) {
        alert('الملف غير صالح! تأكد من استخدام ملف JSON مصدّر من هذه المنصة.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            إعدادات النظام والنسخ الاحتياطي
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            تخصيص قواعد الحجز الفني، حماية لوحة التحكم، وإدارة النسخ الاحتياطية.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Booking Rules Card */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <Clock className="w-4 h-4 text-teal-500" />
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              قواعد الجلسات والمواعيد
            </h4>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              مدة الجلسة الاستشارية
            </label>
            <select
              value={formData.slotMinutes}
              onChange={(e) => setFormData({ ...formData, slotMinutes: Number(e.target.value) })}
              className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs font-mono-data text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value={30}>30 دقيقة</option>
              <option value={45}>45 دقيقة (الموصى به)</option>
              <option value={60}>60 دقيقة (ساعة كاملة)</option>
              <option value={90}>90 دقيقة (جلسة معمّقة)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              أقصى مدى حجز مسبقاً (بالأيام)
            </label>
            <input
              type="number"
              min={7}
              max={60}
              value={formData.windowDays}
              onChange={(e) => setFormData({ ...formData, windowDays: Number(e.target.value) })}
              className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs font-mono-data text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">
              العملاء يمكنهم حجز مواعيد حتى {formData.windowDays} يوماً في المستقبل.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              أقل مهلة إشعار قبل بدء الموعد
            </label>
            <select
              value={formData.minNoticeMin}
              onChange={(e) => setFormData({ ...formData, minNoticeMin: Number(e.target.value) })}
              className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs font-mono-data text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value={0}>بدون مهلة (حجز فوري)</option>
              <option value={60}>ساعة واحدة قبل الموعد</option>
              <option value={120}>ساعتان قبل الموعد (الموصى به)</option>
              <option value={240}>4 ساعات قبل الموعد</option>
              <option value={480}>8 ساعات قبل الموعد</option>
            </select>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              <input
                type="checkbox"
                checked={formData.autoConfirm}
                onChange={(e) => setFormData({ ...formData, autoConfirm: e.target.checked })}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800"
              />
              <span>تأكيد الحجوزات تلقائياً فور تسجيل العميل</span>
            </label>
          </div>
        </div>

        {/* Security & Data Backup Card */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <Shield className="w-4 h-4 text-blue-500" />
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              الحماية والبيانات
            </h4>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              رمز دخول لوحة التحكم (PIN)
            </label>
            <input
              type="text"
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs font-mono-data tracking-widest text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              النسخ الاحتياطي ونقل البيانات
            </label>
            
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onExportJSON}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-teal-500" />
                تصدير نسخة JSON
              </button>

              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-blue-500" />
                استيراد نسخة احتياطية
                <input
                  type="file"
                  accept="application/json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('تحذير: سيتم مسح جميع الحجوزات واستعادة الإعدادات والبيانات الأولية. هل أنت متأكد؟')) {
                    onResetDB();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                استعادة الضبط
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
              البيانات محفوظة محلياً في متصفحك. ننصح بتصدير نسخة JSON بشكل دوري.
            </p>
          </div>
        </div>

        {/* Save button row */}
        <div className="md:col-span-2 flex items-center justify-between pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-500/20 transition-all"
          >
            حفظ وتطبيق الإعدادات
          </button>

          {savedNotice && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4" />
              تم حفظ الإعدادات بنجاح
            </span>
          )}
        </div>

      </form>
    </div>
  );
}
