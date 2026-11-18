import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PinGate({ correctPin, onUnlock, onBackToPublic }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      onUnlock();
    } else {
      setError('رمز الدخول غير صحيح، حاول مرة أخرى');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPin('');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div
        className={`bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 max-w-sm w-full shadow-xl text-center transition-transform ${
          isShaking ? 'animate-bounce' : ''
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 flex items-center justify-center text-teal-600 dark:text-teal-400 mx-auto mb-4 shadow-sm">
          <Lock className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          لوحة تحليلات وإدارة المواعيد
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          هذه المنطقة مخصصة للمهندس محمد فقط. أدخل رمز الحماية للمتابعة.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              inputMode="numeric"
              maxLength={8}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••"
              className="w-full text-center tracking-[12px] font-mono-data text-2xl py-2.5 px-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-zinc-900 dark:text-zinc-50 transition-all placeholder:tracking-normal placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
            {error && (
              <p className="text-xs text-rose-500 mt-2 font-medium">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-500/20 transition-all"
          >
            دخول للوحة الإدارة
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <button
            type="button"
            onClick={onBackToPublic}
            className="inline-flex items-center gap-1 hover:text-teal-500 transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            العودة لصفحة الحجز العامة
          </button>
          <span className="font-mono-data text-[10px] text-zinc-400">الرمز الافتراضي: 1234</span>
        </div>
      </div>
    </div>
  );
}
