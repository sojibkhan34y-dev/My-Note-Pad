import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalIcon, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Droplets, 
  Apple, 
  Activity, 
  Plus, 
  X 
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  startOfWeek, 
  endOfWeek,
  isToday 
} from 'date-fns';
import { cn } from '../../lib/utils';
import { getBengaliDate, toBengaliDigits } from '../../lib/bengali-date';
import { getHoliday, Holiday } from '../../lib/holidays';

const STORAGE_KEY = 'bloom_fitness_data';

interface FitnessData {
  stats: Record<string, {
    sleep: number;
    water: number;
    food: number;
    activity: number;
    weight: number;
  }>;
}

export const CalendarView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({
    start: startOfWeek(monthStart),
    end: endOfWeek(monthEnd),
  });

  const bnDate = getBengaliDate(selectedDate);
  const holiday = getHoliday(selectedDate);

  return (
    <div className="p-6 pb-32">
      <header className="mb-12 flex justify-between items-start">
        <div className="relative">
          <span className="text-[120px] font-serif font-black text-neutral-100 absolute -top-16 -left-4 leading-none select-none italic">
            {format(selectedDate, 'd')}
          </span>
          <div className="relative z-10 pt-4">
            <h1 className="text-3xl font-bold text-neutral-800">{format(selectedDate, 'MMMM')}</h1>
            <p className="text-primary font-medium tracking-wide">
              {bnDate.day} {bnDate.month}, {bnDate.year} (BS)
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{format(selectedDate, 'EEEE')}</p>
          <p className="text-[10px] text-neutral-300 font-mono mt-1">GREGORIAN {format(selectedDate, 'yyyy')}</p>
        </div>
      </header>

      <div className="bg-white rounded-[40px] custom-shadow p-6 mb-10 border border-neutral-50">
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="font-bold text-lg">{format(currentMonth, 'MMMM yyyy')}</h3>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-neutral-50 rounded-xl transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-neutral-50 rounded-xl transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={`${d}-${i}`} className="text-center text-[10px] font-black text-neutral-300 pb-4 uppercase tracking-tighter italic">
              {d}
            </div>
          ))}
          {days.map((day, i) => {
            const isSelected = isSameDay(day, selectedDate);
            const isCurrMonth = day.getMonth() === currentMonth.getMonth();
            const holidayInfo = getHoliday(day);
            const isTdy = isToday(day);
            const bn = getBengaliDate(day);
            
            // Season colors based on Bengali months
            const seasonColor = 
              ['বৈশাখ', 'জ্যৈষ্ঠ'].includes(bn.month) ? "bg-orange-50/50" : // Summer
              ['আষাঢ়', 'শ্রাবণ'].includes(bn.month) ? "bg-blue-50/50" : // Monsoon
              ['ভাদ্র', 'আশ্বিন'].includes(bn.month) ? "bg-cyan-50/50" : // Autumn
              ['কার্তিক', 'অগ্রহায়ণ'].includes(bn.month) ? "bg-emerald-50/50" : // Late Autumn
              ['পৌষ', 'মাঘ'].includes(bn.month) ? "bg-indigo-50/50" : // Winter
              "bg-pink-50/50"; // Spring

            return (
              <motion.button
                key={day.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "h-12 w-full rounded-2xl flex flex-col items-center justify-center relative transition-all",
                  isSelected ? "bg-primary text-white shadow-xl shadow-primary/30" : cn("hover:bg-neutral-50", !isCurrMonth && "opacity-20", isCurrMonth && seasonColor),
                  isTdy && !isSelected && "ring-2 ring-primary ring-inset"
                )}
              >
                <span className="text-sm font-bold leading-none">{format(day, 'd')}</span>
                <span className="text-[8px] opacity-60 mt-0.5">{toBengaliDigits(getBengaliDate(day).day)}</span>
                {holidayInfo && !isSelected && (
                  <div className={cn("absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500")} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mb-8 min-h-[160px]">
        <AnimatePresence mode="wait">
          {holiday ? (
            <motion.div
              key={holiday.name}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className={cn(
                "p-8 rounded-[40px] text-white overflow-hidden relative group bg-gradient-to-br shadow-2xl",
                holiday.color
              )}
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none group-hover:scale-125 transition-transform duration-700">
                <span className="text-[140px] leading-none italic font-black uppercase select-none">
                  {holiday.type}
                </span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl bg-white/20 p-2 rounded-2xl backdrop-blur-sm shadow-inner">{holiday.emoji}</span>
                  <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80">{holiday.type} Festival</span>
                </div>
                <h3 className="text-3xl font-black mb-2 italic leading-tight drop-shadow-md">{holiday.name}</h3>
                <p className="text-white/80 font-medium leading-relaxed max-w-[80%] drop-shadow-sm">{holiday.description}</p>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-1 bg-white/30 rounded-full mt-6"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
            </motion.div>
          ) : (
            <motion.div
              key="no-event"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-neutral-50/50 border-2 border-dashed border-neutral-100 rounded-[40px] p-10 text-center"
            >
              <div className="text-4xl mb-4 opacity-50">🍃</div>
              <h4 className="font-bold text-neutral-400 italic">No major festivals on this day</h4>
              <p className="text-xs text-neutral-300 font-bold uppercase tracking-widest mt-1">Enjoy a peaceful day</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
