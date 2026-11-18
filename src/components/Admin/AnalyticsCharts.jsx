import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../context/ThemeContext';
import { WD_AR } from '../../services/storage';
import { BarChart3, PieChart, Activity, Clock } from 'lucide-react';

export default function AnalyticsCharts({ analytics }) {
  const { isDark } = useTheme();

  // Consistent Theme Palette matching Zinc & SaaS guidelines
  const textColor = isDark ? '#f4f4f5' : '#18181b';
  const mutedTextColor = isDark ? '#a1a1aa' : '#71717a';
  const splitLineColor = isDark ? '#27272a' : '#e4e4e7';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  const tooltipBorder = isDark ? '#334155' : '#cbd5e1';

  // Chart 1: Daily Volume Trends Over Time
  const trendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      textStyle: { color: textColor, fontFamily: 'IBM Plex Sans Arabic, DM Sans' },
      padding: [8, 12],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: analytics.volumeTrend.dates.length ? analytics.volumeTrend.dates : ['اليوم'],
      axisLine: { lineStyle: { color: splitLineColor } },
      axisLabel: { color: mutedTextColor, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } },
      axisLabel: { color: mutedTextColor, fontFamily: 'JetBrains Mono, monospace' },
    },
    series: [
      {
        name: 'عدد الجلسات',
        type: 'line',
        smooth: true,
        data: analytics.volumeTrend.counts.length ? analytics.volumeTrend.counts : [0],
        itemStyle: { color: '#2dd4bf' },
        lineStyle: { width: 3, color: '#2dd4bf' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(45, 212, 191, 0.4)' },
              { offset: 1, color: 'rgba(45, 212, 191, 0.01)' },
            ],
          },
        },
      },
    ],
  };

  // Chart 2: Day-of-Week Demand Distribution
  const daysOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      textStyle: { color: textColor },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: WD_AR,
      axisLine: { lineStyle: { color: splitLineColor } },
      axisLabel: { color: mutedTextColor, fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } },
      axisLabel: { color: mutedTextColor, fontFamily: 'JetBrains Mono, monospace' },
    },
    series: [
      {
        name: 'الجلسات المجدولة',
        type: 'bar',
        barWidth: '40%',
        data: analytics.dayDistribution,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#1d4ed8' },
            ],
          },
        },
      },
    ],
  };

  // Chart 3: Topic Breakdown (Donut Chart)
  const topicData = Object.entries(analytics.topicCategories)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({ name, value }));

  const topicOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      textStyle: { color: textColor },
      formatter: '{b}: <b>{c}</b> ({d}%)',
    },
    legend: {
      orient: 'horizontal',
      bottom: '0%',
      textStyle: { color: mutedTextColor, fontSize: 11 },
    },
    series: [
      {
        name: 'المجال الاستشاري',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: isDark ? '#0c0c0f' : '#ffffff',
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
            color: textColor,
          },
        },
        data: topicData.length ? topicData : [{ name: 'معمارية النظم', value: 1 }],
        color: ['#2dd4bf', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981'],
      },
    ],
  };

  // Chart 4: Time-of-day Slot Distribution
  const timeBucketsData = Object.entries(analytics.timeBuckets).map(([name, value]) => ({ name, value }));
  const timeOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      textStyle: { color: textColor },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } },
      axisLabel: { color: mutedTextColor, fontFamily: 'JetBrains Mono, monospace' },
    },
    yAxis: {
      type: 'category',
      data: timeBucketsData.map((d) => d.name),
      axisLine: { lineStyle: { color: splitLineColor } },
      axisLabel: { color: mutedTextColor, fontSize: 11 },
    },
    series: [
      {
        name: 'حجوزات الفترة',
        type: 'bar',
        barWidth: '50%',
        data: timeBucketsData.map((d) => d.value),
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: '#10b981',
        },
      },
    ],
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Chart Row 1: Volume Trend & Day-of-Week */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-500" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                منحنى الإقبال والطلب الزمني
              </h3>
            </div>
            <span className="text-[11px] font-mono-data text-zinc-400">Time-Series Volume</span>
          </div>
          <div className="h-[280px]">
            <ReactECharts option={trendOption} style={{ height: '100%', width: '100%' }} notMerge={true} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                توزيع الإقبال حسب أيام الأسبوع
              </h3>
            </div>
            <span className="text-[11px] font-mono-data text-zinc-400">Day-of-Week Demand</span>
          </div>
          <div className="h-[280px]">
            <ReactECharts option={daysOption} style={{ height: '100%', width: '100%' }} notMerge={true} />
          </div>
        </div>

      </div>

      {/* Chart Row 2: Topics Breakdown & Hourly Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Card 3 */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                المجالات الاستشارية الأكثر طلباً
              </h3>
            </div>
            <span className="text-[11px] font-mono-data text-zinc-400">Topic Categorization</span>
          </div>
          <div className="h-[280px]">
            <ReactECharts option={topicOption} style={{ height: '100%', width: '100%' }} notMerge={true} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                تفضيل فترات اليوم (الصباح vs المساء)
              </h3>
            </div>
            <span className="text-[11px] font-mono-data text-zinc-400">Time-Slot Preferences</span>
          </div>
          <div className="h-[280px]">
            <ReactECharts option={timeOption} style={{ height: '100%', width: '100%' }} notMerge={true} />
          </div>
        </div>

      </div>
    </div>
  );
}
