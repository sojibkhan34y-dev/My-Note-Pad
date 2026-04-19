import React from 'react';
import { motion } from 'motion/react';
import { Search, Plus } from 'lucide-react';
import { Note } from '../../types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface NotesSectionProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ notes, onNoteSelect }) => {
  return (
    <div className="p-6 pb-32">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold mb-1">My Notes</h1>
          <p className="text-neutral-400 text-sm">{notes.length} items collected</p>
        </div>
        <div className="bg-white p-2 rounded-2xl custom-shadow">
          <Search size={20} className="text-neutral-400" />
        </div>
      </header>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-300">
          <Notebook size={64} strokeWidth={1} />
          <p className="mt-4">No notes yet. Tap + to start.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {notes.map((note) => (
            <motion.button
              key={note.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNoteSelect(note)}
              className={cn(
                "p-5 rounded-3xl text-left flex flex-col justify-between h-48 custom-shadow border border-white/50 selectable",
                note.category === 'finance' && "bg-pastel-blue",
                note.category === 'story' && "bg-pastel-mint",
                note.category === 'caption' && "bg-pastel-pink",
                note.category === 'general' && "bg-pastel-yellow"
              )}
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2 block">
                  {note.category}
                </span>
                <h3 className="font-semibold text-neutral-800 line-clamp-2">{note.title || "Untitled Note"}</h3>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-neutral-500 line-clamp-2 mb-2">{note.content}</p>
                <p className="text-[10px] text-neutral-400">{format(note.createdAt, 'MMM d, yyyy')}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

function Notebook({ size, strokeWidth }: { size: number, strokeWidth: number }) {
  return <StickIcon size={size} strokeWidth={strokeWidth} />;
}

import { StickyNote as StickIcon } from 'lucide-react';
