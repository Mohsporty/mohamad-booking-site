import React, { useState, useEffect } from 'react';
import { UNLOCK_KEY } from '../../services/storage';
import { calculateAnalytics } from '../../services/analytics';
import PinGate from './PinGate';
import KpiCards from './KpiCards';
import AnalyticsCharts from './AnalyticsCharts';
import PrimaryDataTable from './PrimaryDataTable';
import InvestigationPanel from './InvestigationPanel';
import ScheduleManager from './ScheduleManager';
import BlackoutsManager from './BlackoutsManager';
import SettingsManager from './SettingsManager';
import {
  LayoutDashboard,
  CalendarDays,
  CalendarX,
  Settings,
  TableProperties,
  Lock,
  ExternalLink,
  BarChart2,
} from 'lucide-react';

export default function AdminDashboard({
  db,
  onUpdateDB,
  onBackToPublic,
}) {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(UNLOCK_KEY) === '1';
    } catch (e) {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'table' | 'schedule' | 'blackouts' | 'settings'
  const [selectedBooking, setSelectedBooking] = useState(null);

  const analytics = calculateAnalytics(db);

  const handleUnlock = () => {
    try {
      sessionStorage.setItem(UNLOCK_KEY, '1');
    } catch (e) {}
    setIsUnlocked(true);
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem(UNLOCK_KEY);
    } catch (e) {}
    setIsUnlocked(false);
    setSelectedBooking(null);
  };

  // Status updates
  const handleUpdateStatus = (bookingId, newStatus) => {
    const updatedBookings = db.bookings.map((b) =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    const updatedDB = { ...db, bookings: updatedBookings };
    onUpdateDB(updatedDB);

    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  const handleDeleteBooking = (bookingId) => {
    const updatedBookings = db.bookings.filter((b) => b.id !== bookingId);
    const updatedDB = { ...db, bookings: updatedBookings };
    onUpdateDB(updatedDB);
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(null);
    }
  };

  // Schedule updates
  const handleUpdateAvailability = (newAvailability) => {
    onUpdateDB({ ...db, availability: newAvailability });
  };

  // Blackouts updates
  const handleUpdateBlackouts = (newBlackouts) => {
    onUpdateDB({ ...db, blackouts: newBlackouts });
  };

  // Settings updates
  const handleUpdateSettings = (newSettings) => {
    onUpdateDB({ ...db, settings: newSettings });
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mohamad-booking-data-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (importedData) => {
    onUpdateDB(importedData);
    alert('تم استيراد البيانات وتحديث النظام بنجاح!');
  };

  // Reset to default
  const handleResetDB = () => {
    localStorage.removeItem('sam_site_data_v2');
    window.location.reload();
  };

  if (!isUnlocked) {
    return (
      <PinGate
        correctPin={db.settings.pin || '1234'}
        onUnlock={handleUnlock}
        onBackToPublic={onBackToPublic}
      />
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-8">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-zinc-50">
              لوحة تحليلات وإدارة الاستشارات
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-data font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60">
              Live Analytics
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            متابعة دقيقة لمؤشرات الأداء، استغلال فترات الحجز، إدارة أيام العمل، وتفاصيل العملاء.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToPublic}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-teal-500 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>عرض الموقع للجمهور</span>
          </button>

          <button
            onClick={handleLock}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>قفل اللوحة</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 mb-6 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>نظرة عامة والتحليلات</span>
        </button>

        <button
          onClick={() => setActiveTab('table')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'table'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <TableProperties className="w-4 h-4" />
          <span>سجل الحجوزات والعملاء ({db.bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'schedule'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>جدول الأوقات الأسبوعي</span>
        </button>

        <button
          onClick={() => setActiveTab('blackouts')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'blackouts'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <CalendarX className="w-4 h-4" />
          <span>الأيام المحظورة ({db.blackouts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'settings'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>الإعدادات والنسخ الاحتياطي</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div>
          {/* KPI Cards Row */}
          <KpiCards analytics={analytics} />

          {/* ECharts Visualizations */}
          <AnalyticsCharts analytics={analytics} />

          {/* Quick Preview Table */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                أحدث الجلسات المسجلة
              </h3>
              <button
                onClick={() => setActiveTab('table')}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                عرض السجل الكامل مع التفاصيل ←
              </button>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 transition-all duration-300">
              <div className={`transition-all duration-300 ${selectedBooking ? 'w-full lg:w-2/3' : 'w-full'}`}>
                <PrimaryDataTable
                  bookings={db.bookings}
                  selectedBooking={selectedBooking}
                  onSelectBooking={setSelectedBooking}
                  onUpdateStatus={handleUpdateStatus}
                  slotMinutes={db.settings.slotMinutes}
                />
              </div>

              {selectedBooking && (
                <div className="w-full lg:w-1/3">
                  <InvestigationPanel
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    onUpdateStatus={handleUpdateStatus}
                    onDeleteBooking={handleDeleteBooking}
                    slotMinutes={db.settings.slotMinutes}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'table' && (
        <div className="flex flex-col lg:flex-row gap-6 transition-all duration-300">
          <div className={`transition-all duration-300 ${selectedBooking ? 'w-full lg:w-2/3' : 'w-full'}`}>
            <PrimaryDataTable
              bookings={db.bookings}
              selectedBooking={selectedBooking}
              onSelectBooking={setSelectedBooking}
              onUpdateStatus={handleUpdateStatus}
              slotMinutes={db.settings.slotMinutes}
            />
          </div>

          {selectedBooking && (
            <div className="w-full lg:w-1/3">
              <InvestigationPanel
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
                onUpdateStatus={handleUpdateStatus}
                onDeleteBooking={handleDeleteBooking}
                slotMinutes={db.settings.slotMinutes}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'schedule' && (
        <ScheduleManager
          availability={db.availability}
          slotMinutes={db.settings.slotMinutes}
          onUpdateAvailability={handleUpdateAvailability}
        />
      )}

      {activeTab === 'blackouts' && (
        <BlackoutsManager
          blackouts={db.blackouts}
          onUpdateBlackouts={handleUpdateBlackouts}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsManager
          settings={db.settings}
          onUpdateSettings={handleUpdateSettings}
          onExportJSON={handleExportJSON}
          onImportJSON={handleImportJSON}
          onResetDB={handleResetDB}
        />
      )}

    </div>
  );
}
