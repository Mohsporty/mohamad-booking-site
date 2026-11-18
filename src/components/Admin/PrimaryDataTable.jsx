import React, { useState, useMemo } from 'react';
import { formatTime12, formatDateISO } from '../../services/storage';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  Calendar,
  User,
  SlidersHorizontal,
} from 'lucide-react';

export default function PrimaryDataTable({
  bookings,
  selectedBooking,
  onSelectBooking,
  onUpdateStatus,
  slotMinutes,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const todayStr = formatDateISO(new Date());

  // Filtering
  const filteredRows = useMemo(() => {
    return bookings.filter((b) => {
      // Search
      const matchSearch =
        !searchTerm ||
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.contact.toLowerCase().includes(searchTerm.toLowerCase());

      // Status
      const matchStatus = statusFilter === 'all' || b.status === statusFilter;

      // Time horizon
      const matchTime =
        timeFilter === 'all'
          ? true
          : timeFilter === 'upcoming'
          ? b.date >= todayStr && b.status !== 'cancelled'
          : b.date < todayStr || b.status === 'cancelled';

      return matchSearch && matchStatus && matchTime;
    }).sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`));
  }, [bookings, searchTerm, statusFilter, timeFilter, todayStr]);

  // Pagination
  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3 h-3" />
            مؤكدة
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
            <Clock className="w-3 h-3" />
            بانتظار التأكيد
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            <XCircle className="w-3 h-3" />
            ملغاة
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
      
      {/* Table Toolbar */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 relative z-30">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="بحث بالاسم، الموضوع، البريد..."
            className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg ps-9 pe-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap relative z-30">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 text-xs relative z-30">
            <Filter className="w-3 h-3 text-zinc-400 ms-1.5" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs focus:outline-none border-none py-0.5 pe-2"
            >
              <option value="all">كل الحالات</option>
              <option value="confirmed">المؤكدة فقط</option>
              <option value="pending">بانتظار التأكيد</option>
              <option value="cancelled">الملغاة</option>
            </select>
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-1 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 text-xs">
            <Calendar className="w-3 h-3 text-zinc-400 ms-1.5" />
            <select
              value={timeFilter}
              onChange={(e) => {
                setTimeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs focus:outline-none border-none py-0.5 pe-2"
            >
              <option value="upcoming">المواعيد القادمة</option>
              <option value="all">جميع السجلات</option>
              <option value="past">السابقة والملغاة</option>
            </select>
          </div>

          <span className="text-xs font-mono-data text-zinc-400 ms-1">
            {filteredRows.length} نتيجة
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-right rtl:text-right border-collapse">
          <thead>
            <tr className="sticky top-0 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-sm z-10 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              <th className="py-3 px-4">العميل / جهة الاتصال</th>
              <th className="py-3 px-4">موضوع الاستشارة</th>
              <th className="py-3 px-4">تاريخ وموعد الجلسة</th>
              <th className="py-3 px-4">الحالة</th>
              <th className="py-3 px-4">المؤشر</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-xs">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-400">
                  لا توجد حجوزات مطابقة لمعايير البحث الحالية
                </td>
              </tr>
            ) : (
              paginatedRows.map((b) => {
                const isSelected = selectedBooking?.id === b.id;
                const isPast = b.date < todayStr || b.status === 'cancelled';

                return (
                  <tr
                    key={b.id}
                    onClick={() => onSelectBooking(b)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-blue-950/40 border-s-4 border-blue-600 dark:border-blue-400'
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    } ${isPast ? 'opacity-70' : ''}`}
                  >
                    {/* Client */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500/20 to-blue-500/20 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xs">
                          {b.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {b.name}
                          </div>
                          <div className="text-[11px] font-mono-data text-zinc-400 dir-ltr text-left">
                            {b.contact}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Topic */}
                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="font-medium text-zinc-800 dark:text-zinc-200 truncate">
                        {b.topic}
                      </div>
                      {b.notes && (
                        <div className="text-[11px] text-zinc-400 truncate">
                          {b.notes}
                        </div>
                      )}
                    </td>

                    {/* Date / Time */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono-data text-zinc-900 dark:text-zinc-200">
                        {b.date}
                      </div>
                      <div className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold font-mono-data">
                        {formatTime12(b.time)} ({slotMinutes} د)
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(b.status)}
                    </td>

                    {/* Sparkline score bar */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="w-16 bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-500 w-full'
                              : b.status === 'pending'
                              ? 'bg-amber-400 w-2/3'
                              : 'bg-rose-500 w-1/4'
                          }`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls with Icon-only Buttons */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4 text-xs">
        <span className="text-zinc-500 font-mono-data text-[11px]">
          صفحة {currentPage} من {totalPages}
        </span>

        <div className="flex items-center gap-1">
          {/* RTL Order: First page */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title="الصفحة الأولى"
            className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
          
          {/* Previous page */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="السابق"
            className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Next page */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="التالي"
            className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Last page */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="الصفحة الأخيرة"
            className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
