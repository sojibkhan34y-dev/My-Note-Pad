import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/home/Dashboard';
import { NotesSection } from './components/notes/NotesSection';
import { CalendarView } from './components/calendar/CalendarView';
import { TimerSection } from './components/timer/TimerSection';
import { BottomNav } from './components/layout/BottomNav';
import { CreateSheet } from './components/layout/CreateSheet';
import { NoteEditor } from './components/notes/NoteEditor';
import { Onboarding } from './components/onboarding/Onboarding';
import { Note } from './types';
import { AnimatePresence, motion } from 'motion/react';

const STORAGE_KEY = 'bloom_note_data';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotes(parsed.notes || []);
        setIsOnboarding(parsed.onboarding ?? true);
        setUserName(parsed.userName || '');
      } catch (e) {
        console.error("Failed to parse storage", e);
      }
    }
  }, []);

  const saveToStorage = (updatedNotes: Note[], onboardingState: boolean, name: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      notes: updatedNotes, 
      onboarding: onboardingState,
      userName: name 
    }));
  };

  const handleCreateNote = (category: Note['category']) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      category,
      color: 'bg-white',
      createdAt: Date.now(),
      financeData: category === 'finance' ? { items: [], total: 0 } : undefined
    };
    setSelectedNote(newNote);
    setIsCreateOpen(false);
  };

  const handleSaveNote = (updatedNote: Note) => {
    const exists = notes.find(n => n.id === updatedNote.id);
    let newNotes;
    if (exists) {
      newNotes = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
    } else {
      newNotes = [updatedNote, ...notes];
    }
    setNotes(newNotes);
    saveToStorage(newNotes, isOnboarding, userName);
    setSelectedNote(null);
  };

  const handleDeleteNote = (id: string) => {
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    saveToStorage(newNotes, isOnboarding, userName);
    setSelectedNote(null);
  };

  const handleOnboardingComplete = (name: string) => {
    setUserName(name);
    setIsOnboarding(false);
    saveToStorage(notes, false, name);
  };

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen bg-bg-soft relative overflow-hidden flex flex-col shadow-2xl shadow-neutral-200">
      <AnimatePresence>
        {isOnboarding && <Onboarding onComplete={handleOnboardingComplete as any} />}
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-screen">
        <main className="flex-1 overflow-y-auto pb-32 pt-6 md:pt-12 px-4 md:px-8 h-full">
          <div className="max-w-4xl mx-auto w-full">
            {activeTab === 'home' && <Dashboard userName={userName} notes={notes} />}
            {activeTab === 'notes' && <NotesSection notes={notes} onNoteSelect={setSelectedNote} />}
            {activeTab === 'calendar' && <CalendarView />}
            {activeTab === 'timer' && <TimerSection />}
          </div>
        </main>
      </div>

      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 md:pb-10 pointer-events-none z-50">
        <div className="pointer-events-auto w-full max-w-2xl px-6">
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onPlusClick={() => setIsCreateOpen(true)}
          />
        </div>
      </div>

      <CreateSheet
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSelect={handleCreateNote}
      />

      <AnimatePresence>
        {selectedNote && (
          <NoteEditor
            note={selectedNote}
            onSave={handleSaveNote}
            onBack={() => setSelectedNote(null)}
            onDelete={handleDeleteNote}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
