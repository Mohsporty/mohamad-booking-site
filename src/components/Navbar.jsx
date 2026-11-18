import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LayoutDashboard, Calendar, Sparkles } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, todaySlotsCount }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#070c16]/85 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView('public')}
            className="flex items-center gap-3 text-left rtl:text-right group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="font-bold text-sm tracking-wide text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <span>Eng. Mohamad</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono-data font-semibold rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60">
                  Solutions Architect Manager
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">منصة الاستشارات المعمارية والتحليلات</p>
            </div>
          </button>

          {/* Public Nav anchors */}
          {currentView === 'public' && (
            <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <a href="#services" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">الخدمات</a>
              <a href="#skills" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">الخبرات</a>
              <a href="#journey" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">المسيرة</a>
              <a href="#booking" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">حجز موعد</a>
            </nav>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Today indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-data border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0c0c0f]">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-zinc-600 dark:text-zinc-400">
              متاح اليوم: <b className="text-teal-600 dark:text-teal-400">{todaySlotsCount} فترات</b>
            </span>
          </div>

          {/* View Toggle Button */}
          {currentView === 'public' ? (
            <button
              onClick={() => setCurrentView('admin')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white shadow-sm transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>لوحة التحليلات والإدارة</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('public')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] text-zinc-700 dark:text-zinc-200 hover:border-teal-500 transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-500" />
              <span>عرض صفحة الحجز</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="تبديل المظهر"
            className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-[#0c0c0f]"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>

      </div>
    </header>
  );
}
