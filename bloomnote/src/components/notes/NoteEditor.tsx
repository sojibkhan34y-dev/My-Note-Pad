import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Trash2, Calculator, Plus } from 'lucide-react';
import { Note } from '../../types';
import { cn } from '../../lib/utils';

interface NoteEditorProps {
  note: Note;
  onSave: (updatedNote: Note) => void;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onBack, onDelete }) => {
  const [editedNote, setEditedNote] = useState<Note>(note);

  const handleAddField = () => {
    if (!editedNote.financeData) return;
    const newItem = { label: '', amount: 0, category: 'General', date: new Date().toISOString() };
    const items = [...editedNote.financeData.items, newItem];
    setEditedNote({
      ...editedNote,
      financeData: { items, total: items.reduce((sum, i) => sum + i.amount, 0) }
    });
  };

  const handleUpdateField = (index: number, field: string, value: any) => {
    if (!editedNote.financeData) return;
    const items = [...editedNote.financeData.items];
    items[index] = { ...items[index], [field]: value };
    setEditedNote({
      ...editedNote,
      financeData: { items, total: items.reduce((sum, i) => sum + Number(i.amount), 0) }
    });
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed inset-0 bg-white z-[80] flex flex-col"
    >
      <header className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <button onClick={onBack} className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2">
          <button onClick={() => onDelete(note.id)} className="w-10 h-10 text-red-400 flex items-center justify-center">
            <Trash2 size={20} />
          </button>
          <button onClick={() => onSave(editedNote)} className="bg-primary text-white px-6 rounded-full font-medium flex items-center gap-2 shadow-lg shadow-primary/20">
            <Check size={20} /> Save
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className={cn(
          "mb-8 p-1 px-3 inline-block rounded-lg text-[10px] font-bold uppercase tracking-widest",
          note.category === 'finance' ? "bg-blue-100 text-blue-500" :
          note.category === 'story' ? "bg-purple-100 text-purple-500" :
          note.category === 'caption' ? "bg-pink-100 text-pink-500" : "bg-yellow-100 text-yellow-600"
        )}>
          {note.category}
        </div>

        <input
          value={editedNote.title}
          onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          placeholder="Note Title"
          className="text-3xl font-bold w-full focus:outline-none mb-6 placeholder:text-neutral-200"
        />

        {note.category === 'finance' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Calculator size={18} /> Budget Summary</h3>
              <button onClick={handleAddField} className="text-primary text-sm flex items-center gap-1"><Plus size={16} /> Add Item</button>
            </div>
            <div className="bg-neutral-50 rounded-3xl p-4 space-y-3">
              {editedNote.financeData?.items.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    placeholder="Expense name"
                    value={item.label}
                    onChange={(e) => handleUpdateField(idx, 'label', e.target.value)}
                    className="flex-1 bg-white p-3 rounded-xl text-sm border-none focus:ring-1 focus:ring-primary/20"
                  />
                  <input
                    type="number"
                    placeholder="$0"
                    value={item.amount || ''}
                    onChange={(e) => handleUpdateField(idx, 'amount', e.target.value)}
                    className="w-24 bg-white p-3 rounded-xl text-sm border-none focus:ring-1 focus:ring-primary/20 font-mono"
                  />
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-dashed border-neutral-200 flex justify-between items-center px-2">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold text-blue-500">${editedNote.financeData?.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <textarea
          value={editedNote.content}
          onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
          placeholder="Start writing..."
          className="w-full h-96 focus:outline-none text-neutral-600 leading-relaxed resize-none placeholder:text-neutral-200"
        />
      </div>
    </motion.div>
  );
};
