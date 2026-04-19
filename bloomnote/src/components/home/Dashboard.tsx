import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Note } from '../../types';
import { Notebook, ChevronRight, Clock, Calendar as CalIcon } from 'lucide-react';
import { format } from 'date-fns';
import { getBengaliDate } from '../../lib/bengali-date';

interface DashboardProps {
  userName?: string;
  notes: Note[];
}

export const Dashboard: React.FC<DashboardProps> = ({ userName, notes }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const bnDate = getBengaliDate(time);
  const recentNotes = notes.slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 md:p-10 pb-32 max-w-4xl mx-auto">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-10"
      >
        {/* Real-time Clock Section */}
        <motion.div variants={item} className="text-center py-10">
          <div className="relative inline-block">
             <span className="text-8xl md:text-9xl font-serif italic font-black text-neutral-100 absolute -top-12 left-1/2 -translate-x-1/2 leading-none select-none opacity-50 whitespace-nowrap">
               Time is Gold
             </span>
             <h2 className="text-6xl md:text-8xl font-black text-neutral-800 relative z-10 tabular-nums tracking-tighter">
               {format(time, 'HH:mm')}
               <span className="text-2xl md:text-3xl font-bold text-primary ml-2">{format(time, 'ss')}</span>
             </h2>
          </div>
          <p className="text-text-muted font-bold uppercase tracking-[0.3em] mt-6 text-xs flex items-center justify-center gap-2">
            <Clock size={14} className="text-primary" /> {format(time, 'eeee, MMMM do')}
          </p>
        </motion.div>

        {/* Date Display Section */}
        <motion.div variants={item} className="bg-white rounded-[44px] custom-shadow p-8 flex flex-col items-center border border-neutral-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
             <CalIcon size={120} />
          </div>
          
          <h1 className="text-2xl font-bold text-text-main mb-2">Welcome Back, {userName || 'Guest'}</h1>
          <div className="flex flex-col items-center">
            <p className="text-6xl font-black text-primary font-serif italic mb-2">
              {format(time, 'dd')}
            </p>
            <div className="h-px w-20 bg-neutral-100 my-4" />
            <p className="text-neutral-500 font-bold tracking-widest uppercase text-sm">
              {bnDate.day} {bnDate.month}, {bnDate.year} (BS)
            </p>
          </div>
        </motion.div>

        {/* Recent Notes Section */}
        <motion.div variants={item} className="bg-white rounded-[44px] custom-shadow p-8 border border-neutral-50">
          <div className="flex justify-between items-center mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pastel-blue rounded-[18px] flex items-center justify-center text-blue-500">
                <Notebook size={20} />
              </div>
              <h3 className="font-black text-xl text-neutral-800 italic uppercase tracking-tighter">My Recent Notes</h3>
            </div>
            <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest">{notes.length} total</p>
          </div>

          <div className="space-y-4">
            {recentNotes.length === 0 ? (
              <div className="py-16 text-center text-neutral-300 border-2 border-dashed border-neutral-50 rounded-[32px]">
                <p className="italic text-sm">No notes saved yet. <br/>Start creating your first note!</p>
              </div>
            ) : (
              recentNotes.map((note) => (
                <div key={note.id} className="group p-5 bg-neutral-50 hover:bg-white hover:custom-shadow rounded-[28px] transition-all flex items-center justify-between cursor-pointer border border-transparent hover:border-neutral-100">
                  <div className="flex items-center gap-4 truncate">
                    <div className={cn("w-3 h-10 rounded-full shrink-0", note.color)} />
                    <div className="truncate">
                      <h4 className="font-bold text-neutral-800 text-sm truncate">{note.title || 'Untitled Note'}</h4>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">{note.category}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-neutral-300 group-hover:text-primary transition-colors" />
                </div>
              ))
            )}
          </div>
          
          {notes.length > 3 && (
             <div className="mt-8 pt-6 border-t border-neutral-50 flex justify-center">
               <button className="text-xs font-black text-primary uppercase tracking-widest hover:scale-105 transition-transform">
                 View all notes
               </button>
             </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
