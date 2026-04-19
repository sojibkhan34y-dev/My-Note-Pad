import { format } from 'date-fns';

export interface Holiday {
  date: string; // MM-dd
  name: string;
  type: 'muslim' | 'hindu' | 'christian' | 'buddhist' | 'national';
  description: string;
  color: string;
  emoji: string;
}

// Fixed and some specific years dates
export const HOLIDAYS: Holiday[] = [
  { date: '02-21', name: 'Shaheed Dibash', type: 'national', description: 'International Mother Language Day', color: 'from-neutral-800 to-neutral-600', emoji: '🇧🇩' },
  { date: '03-17', name: 'Sheikh Mujib\'s Birthday', type: 'national', description: 'National Children\'s Day', color: 'from-emerald-600 to-emerald-400', emoji: '🎂' },
  { date: '03-26', name: 'Independence Day', type: 'national', description: 'National Day of Bangladesh', color: 'from-red-600 to-red-400', emoji: '🎆' },
  { date: '04-14', name: 'Pohela Boishakh', type: 'national', description: 'Bengali New Year', color: 'from-orange-500 to-red-500', emoji: '🎊' },
  { date: '05-01', name: 'May Day', type: 'national', description: 'International Workers\' Day', color: 'from-blue-600 to-blue-400', emoji: '🛠️' },
  { date: '08-15', name: 'National Mourning Day', type: 'national', description: 'Tribute to Bangabandhu Sheikh Mujibur Rahman', color: 'from-neutral-900 to-neutral-700', emoji: '🖤' },
  { date: '12-16', name: 'Victory Day', type: 'national', description: 'Commemorating victory in 1971', color: 'from-red-600 to-emerald-700', emoji: '🎖️' },
  { date: '12-25', name: 'Christmas Day', type: 'christian', description: 'Birth of Jesus Christ', color: 'from-red-500 to-emerald-600', emoji: '🎄' },
  
  // Specific 2026 Shiftable Dates (These change every year)
  { date: '2026-03-20', name: 'Eid-ul-Fitr (2026)', type: 'muslim', description: 'Festival of Breaking the Fast', color: 'from-primary to-emerald-400', emoji: '🌙' },
  { date: '2026-05-27', name: 'Eid-ul-Adha (2026)', type: 'muslim', description: 'Festival of Sacrifice', color: 'from-emerald-700 to-emerald-500', emoji: '🕋' },
  { date: '2026-08-26', name: 'Janmashtami (2026)', type: 'hindu', description: 'Birthday of Lord Krishna', color: 'from-purple-600 to-indigo-500', emoji: '🪈' },
  { date: '2026-10-21', name: 'Durga Puja (2026)', type: 'hindu', description: 'Victory of Goddess Durga', color: 'from-red-700 to-orange-600', emoji: '🔱' },
];

export const getHoliday = (date: Date): Holiday | undefined => {
  const keyMD = format(date, 'MM-dd');
  const keyFull = format(date, 'yyyy-MM-dd');
  return HOLIDAYS.find(h => h.date === keyMD || h.date === keyFull);
};
