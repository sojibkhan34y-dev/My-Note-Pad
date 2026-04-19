import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Receipt, BookOpen, MessageSquare, StickyNote } from 'lucide-react';

interface CreateSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (category: 'finance' | 'story' | 'caption' | 'general') => void;
}

export const CreateSheet: React.FC<CreateSheetProps> = ({ isOpen, onClose, onSelect }) => {
  const container = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xl z-[-1]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-[48px] p-10 shadow-2xl border border-white/20 relative overflow-hidden"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <div>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Create New</h3>
                <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mt-1">Select a category</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-6 relative z-10"
            >
              {[
                { id: 'finance', label: 'Finance', icon: Receipt, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
                { id: 'story', label: 'Story', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                { id: 'caption', label: 'Caption', icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-400/10' },
                { id: 'general', label: 'General', icon: StickyNote, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              ].map((cat) => (
                <motion.button
                  key={cat.id}
                  variants={item}
                  onClick={() => onSelect(cat.id as any)}
                  className="flex flex-col items-center gap-4 p-6 rounded-[36px] transition-all bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 active:scale-90 group"
                >
                  <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center transition-all group-hover:scale-110", cat.bg, cat.color)}>
                    <cat.icon size={28} />
                  </div>
                  <span className="text-[10px] font-black text-white/70 uppercase tracking-widest italic group-hover:text-white transition-colors">{cat.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
