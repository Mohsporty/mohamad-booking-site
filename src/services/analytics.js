import { formatDateISO, toMinutes } from './storage';

export function calculateAnalytics(db) {
  const bookings = db.bookings || [];
  const todayStr = formatDateISO(new Date());

  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
  const pending = bookings.filter((b) => b.status === 'pending').length;
  const cancelled = bookings.filter((b) => b.status === 'cancelled').length;

  const upcoming = bookings.filter(
    (b) => b.date >= todayStr && b.status !== 'cancelled'
  ).length;

  const todayCount = bookings.filter(
    (b) => b.date === todayStr && b.status !== 'cancelled'
  ).length;

  const confirmationRate = total > 0 ? Math.round((confirmed / (total - cancelled || 1)) * 100) : 100;

  // Slot utilization calculation across the active window (21-28 days)
  let totalAvailableSlots = 0;
  const windowDays = db.settings.windowDays || 28;
  const startDate = new Date();

  for (let i = 0; i < windowDays; i++) {
    const curDate = new Date(startDate);
    curDate.setDate(curDate.getDate() + i);
    const dayOfWeek = curDate.getDay();
    const dayConfig = db.availability[dayOfWeek];

    if (dayConfig && dayConfig.on) {
      for (const range of dayConfig.ranges || []) {
        const span = toMinutes(range[1]) - toMinutes(range[0]);
        totalAvailableSlots += Math.floor(span / (db.settings.slotMinutes || 45));
      }
    }
  }

  const bookedInWindow = bookings.filter(
    (b) => b.date >= todayStr && b.status !== 'cancelled'
  ).length;

  const utilizationRate =
    totalAvailableSlots > 0
      ? Math.min(100, Math.round((bookedInWindow / totalAvailableSlots) * 100))
      : 0;

  // Daily volume trend over chronological booking dates
  const dateCounts = {};
  bookings.forEach((b) => {
    dateCounts[b.date] = (dateCounts[b.date] || 0) + 1;
  });

  const sortedDates = Object.keys(dateCounts).sort();
  const volumeTrend = {
    dates: sortedDates,
    counts: sortedDates.map((d) => dateCounts[d]),
  };

  // Day of week distribution
  const dayDistribution = [0, 0, 0, 0, 0, 0, 0]; // Sun - Sat
  bookings.forEach((b) => {
    if (b.status !== 'cancelled') {
      const d = new Date(`${b.date}T12:00:00`);
      dayDistribution[d.getDay()]++;
    }
  });

  // Topic clustering analysis
  const topicCategories = {
    'تصميم المعمارية': 0,
    'السحابة والترحيل': 0,
    'التحول الرقمي والمايكروسيرفس': 0,
    'قيادة الفرق الهندسية': 0,
    'تحسين التكاليف والأمن (FinOps)': 0,
    'استشارات أخرى': 0,
  };

  bookings.forEach((b) => {
    const t = (b.topic || '').toLowerCase();
    if (t.includes('معمار') || t.includes('تصميم') || t.includes('حلول')) {
      topicCategories['تصميم المعمارية']++;
    } else if (t.includes('سحاب') || t.includes('ترحيل') || t.includes('aws') || t.includes('azure') || t.includes('cloud')) {
      topicCategories['السحابة والترحيل']++;
    } else if (t.includes('مايكرو') || t.includes('تحول') || t.includes('تفكيك') || t.includes('بيانات')) {
      topicCategories['التحول الرقمي والمايكروسيرفس']++;
    } else if (t.includes('فرق') || t.includes('ثقافة') || t.includes('هندسي') || t.includes('قياد')) {
      topicCategories['قيادة الفرق الهندسية']++;
    } else if (t.includes('تكلف') || t.includes('أمن') || t.includes('finops') || t.includes('مخاطر')) {
      topicCategories['تحسين التكاليف والأمن (FinOps)']++;
    } else {
      topicCategories['استشارات أخرى']++;
    }
  });

  // Time-of-day slots distribution (Morning vs Afternoon)
  const timeBuckets = {
    '09:00 - 11:00 (صباحاً)': 0,
    '11:00 - 13:00 (ظهراً)': 0,
    '14:30 - 16:00 (عصراً)': 0,
    '16:00 - 18:00 (مساءً)': 0,
  };

  bookings.forEach((b) => {
    if (b.status !== 'cancelled') {
      const mins = toMinutes(b.time);
      if (mins < 660) timeBuckets['09:00 - 11:00 (صباحاً)']++;
      else if (mins < 780) timeBuckets['11:00 - 13:00 (ظهراً)']++;
      else if (mins < 960) timeBuckets['14:30 - 16:00 (عصراً)']++;
      else timeBuckets['16:00 - 18:00 (مساءً)']++;
    }
  });

  return {
    total,
    confirmed,
    pending,
    cancelled,
    upcoming,
    todayCount,
    confirmationRate,
    utilizationRate,
    totalAvailableSlots,
    volumeTrend,
    dayDistribution,
    topicCategories,
    timeBuckets,
  };
}
