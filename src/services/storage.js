// Local storage keys and defaults
export const STORAGE_KEY = 'sam_site_data_v2';
export const THEME_KEY = 'sam_site_theme';
export const UNLOCK_KEY = 'sam_admin_unlock';

export const WD_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
export const WD_SHORT_AR = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

export function toMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export function fromMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatDateISO(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatTime12(timeStr) {
  if (!timeStr) return '';
  let [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'م' : 'ص';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${period}`;
}

export function getDefaultData() {
  const data = {
    settings: {
      slotMinutes: 45,
      windowDays: 28,
      minNoticeMin: 120,
      autoConfirm: true,
      pin: '1234',
    },
    availability: {
      0: { on: true, ranges: [['09:00', '13:00'], ['14:30', '17:00']] }, // Sunday
      1: { on: true, ranges: [['09:00', '13:00'], ['14:30', '17:00']] }, // Monday
      2: { on: true, ranges: [['09:00', '13:00'], ['14:30', '17:00']] }, // Tuesday
      3: { on: true, ranges: [['09:00', '13:00'], ['14:30', '17:00']] }, // Wednesday
      4: { on: true, ranges: [['09:00', '14:00']] },                     // Thursday
      5: { on: false, ranges: [] },                                      // Friday
      6: { on: false, ranges: [] },                                      // Saturday
    },
    blackouts: [],
    bookings: [],
    version: 2,
  };

  return data;
}

// Generate realistic mock consultation data for rich analytics
export function getSeededData() {
  const base = getDefaultData();
  const now = new Date();

  const mockClients = [
    { name: 'عبدالله الراشد', contact: 'abdullah.alrashid@fintech.kw', topic: 'تصميم معمارية السحابة لبنك رقمي', notes: 'التركيز على توافر 99.99% والتوافق مع متطلبات البنك المركزي', offset: -14, time: '10:00', status: 'confirmed' },
    { name: 'سارة المنصور', contact: 'sara.almansoor@logistics.com', topic: 'استراتيجية التحول إلى مايكروسيرفسز', notes: 'نظام شحن قديم يحتاج تفكيك متدرج بالنمط Strangler Fig', offset: -10, time: '11:30', status: 'confirmed' },
    { name: 'فهد المطيري', contact: '+965 9988 7766', topic: 'تقييم مخاطر أمنية وترحيل إلى AWS', notes: 'مراجعة أمن قواعد البيانات وIAM', offset: -7, time: '09:00', status: 'confirmed' },
    { name: 'د. خالد العتيبي', contact: 'dr.khaled@healthtech.org', topic: 'معمارية منصة التطبيب عن بُعد وتكامل HL7', notes: 'التكامل مع السجلات الطبية الإلكترونية', offset: -5, time: '15:00', status: 'confirmed' },
    { name: 'ريم الدوسري', contact: 'reem.d@enterprise.co', topic: 'استشارات تقنية تنفيذية لتخفيض تكاليف السحابة FinOps', notes: 'تكلفة AWS الحالية تتجاوز الميزانية بـ 35%', offset: -3, time: '10:30', status: 'confirmed' },
    { name: 'مشاري الصباح', contact: '+965 5544 3322', topic: 'مراجعة المعمارية لمنصة تجارة إلكترونية سريعة النمو', notes: 'مشاكل في فترات الحمل العالي (Black Friday)', offset: -1, time: '14:30', status: 'confirmed' },
    { name: 'نورا السالم', contact: 'noura@retailhub.io', topic: 'تأسيس ثقافة وفرق هندسية عالية الأداء', notes: 'إعادة هيكلة فرق التطوير إلى Stream-aligned teams', offset: 0, time: '11:00', status: 'confirmed' },
    { name: 'فيصل الغانم', contact: 'faisal.g@capital.com', topic: 'تصميم حلول البيانات الضخمة وبحيرة البيانات', notes: 'بناء Data Lakehouse على Google Cloud BigQuery', offset: 2, time: '09:30', status: 'confirmed' },
    { name: 'منى الهاجري', contact: '+965 6655 4433', topic: 'مراجعة معمارية تطبيق مدفوعات رقمية', notes: 'نحتاج تدقيق لمعايير PCI-DSS قبل الإطلاق', offset: 3, time: '15:30', status: 'pending' },
    { name: 'حمد الصقر', contact: 'hamad.alsaqer@ventures.kw', topic: 'استشارة فنية استثمارية في معمارية شركة ناشئة', notes: 'الفحص النافي للجهالة التقني (Technical Due Diligence)', offset: 5, time: '10:00', status: 'pending' },
    { name: 'بدر الزامل', contact: 'bader@energycorp.com', topic: 'خطة ترحيل أنظمة ERP القديمة إلى السحابة الهجينة', notes: 'تكامل مع مراكز البيانات المحلية', offset: 7, time: '12:00', status: 'confirmed' },
    { name: 'جاسم الكندري', contact: 'jassim@devops.co', topic: 'أتمتة خطوط النشر CI/CD والبنية التحتية ككود IaC', notes: 'تعارض في المواعيد واعتذر العميل', offset: -4, time: '16:00', status: 'cancelled' },
  ];

  base.bookings = mockClients.map((client, idx) => {
    const targetDate = formatDateISO(addDays(now, client.offset));
    return {
      id: `seed-${idx + 1}-${Date.now().toString(36)}`,
      date: targetDate,
      time: client.time,
      name: client.name,
      contact: client.contact,
      topic: client.topic,
      notes: client.notes,
      status: client.status,
      createdAt: new Date(Date.now() - (15 - idx) * 86400000).toISOString(),
    };
  });

  return base;
}

export function loadDatabase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Check legacy key v1
      const legacyRaw = localStorage.getItem('sam_site_data_v1');
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw);
        if (legacy && legacy.settings && legacy.availability) {
          saveDatabase(legacy);
          return legacy;
        }
      }
      const seeded = getSeededData();
      saveDatabase(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.settings || !parsed.availability) {
      const seeded = getSeededData();
      saveDatabase(seeded);
      return seeded;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load database:', err);
    return getSeededData();
  }
}

export function saveDatabase(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save database to localStorage:', err);
  }
}

// Compute available slots for a given date
export function computeAvailableSlots(dateStr, db) {
  if (!db || !dateStr) return [];
  const targetDate = new Date(`${dateStr}T12:00:00`);
  const dayOfWeek = targetDate.getDay();
  const dayConfig = db.availability[dayOfWeek];

  if (!dayConfig || !dayConfig.on) return [];
  if (db.blackouts && db.blackouts.includes(dateStr)) return [];

  const slotMinutes = db.settings.slotMinutes || 45;
  const bookedRanges = (db.bookings || [])
    .filter((b) => b.date === dateStr && b.status !== 'cancelled')
    .map((b) => [toMinutes(b.time), toMinutes(b.time) + slotMinutes]);

  const now = new Date();
  const isToday = dateStr === formatDateISO(now);
  const minEarliestMinutes = isToday
    ? now.getHours() * 60 + now.getMinutes() + (db.settings.minNoticeMin || 120)
    : -1;

  const validSlots = new Set();

  for (const range of dayConfig.ranges || []) {
    const rangeStart = toMinutes(range[0]);
    const rangeEnd = toMinutes(range[1]);

    for (let t = rangeStart; t + slotMinutes <= rangeEnd; t += slotMinutes) {
      if (t < minEarliestMinutes) continue;

      // Check collision with any existing confirmed or pending booking
      const slotStart = t;
      const slotEnd = t + slotMinutes;
      const hasOverlap = bookedRanges.some(([bStart, bEnd]) => slotStart < bEnd && bStart < slotEnd);

      if (!hasOverlap) {
        validSlots.add(fromMinutes(t));
      }
    }
  }

  return Array.from(validSlots).sort();
}
