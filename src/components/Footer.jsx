import React from 'react';
import { LayoutDashboard, Shield, Heart } from 'lucide-react';

export default function Footer({ onAdminClick }) {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-[#070c16]/50 py-8 text-xs text-zinc-500 dark:text-zinc-400">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        
        <div>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            © 2026 Eng. Mohamad
          </span>{' '}
          — جميع الحقوق محفوظة لمهندس الحلول المعمارية
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onAdminClick}
            className="inline-flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>لوحة التحليلات والإدارة</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
