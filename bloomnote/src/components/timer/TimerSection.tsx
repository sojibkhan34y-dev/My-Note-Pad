import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Coffee, Zap, Moon } from 'lucide-react';
import { ProgressCircle } from '../ui/ProgressCircle';

export const TimerSection: React.FC = () => {
  const [mode, setMode] = useState<'pomodoro' | 'break' | 'long-break'>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(25);

  const initialTimes = {
    'pomodoro': 25 * 60,
    'break': 5 * 60,
    'long-break': 15 * 60,
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTimes[mode]);
  };

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    setIsActive(false);
    setIsEditing(false);
    setTimeLeft(initialTimes[newMode]);
  };

  const handleSetTime = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSeconds = editMinutes * 60;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsEditing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = (timeLeft / (isEditing ? editMinutes * 60 : initialTimes[mode])) * 100;

  return (
    <div className="p-6 pb-32 flex flex-col items-center">
      <header className="mb-10 text-center w-full">
        <h1 className="text-2xl font-semibold mb-1">Focus Timer</h1>
        <p className="text-neutral-400 text-sm">Stay productive, stay blooming 🌸</p>
      </header>

      <div className="flex bg-neutral-100 p-1.5 rounded-3xl mb-12">
        <button
          onClick={() => handleModeChange('pomodoro')}
          className={cn("px-6 py-3 rounded-2xl text-xs font-semibold transition-all", mode === 'pomodoro' ? "bg-white shadow-sm text-primary" : "text-neutral-400")}
        >
          Pomodoro
        </button>
        <button
          onClick={() => handleModeChange('break')}
          className={cn("px-6 py-3 rounded-2xl text-xs font-semibold transition-all", mode === 'break' ? "bg-white shadow-sm text-primary" : "text-neutral-400")}
        >
          Short
        </button>
        <button
          onClick={() => handleModeChange('long-break')}
          className={cn("px-6 py-3 rounded-2xl text-xs font-semibold transition-all", mode === 'long-break' ? "bg-white shadow-sm text-primary" : "text-neutral-400")}
        >
          Long
        </button>
      </div>

      <div className="relative mb-12 group">
        <ProgressCircle
          percentage={isActive ? percentage : 100}
          size={280}
          strokeWidth={12}
          color={mode === 'pomodoro' ? '#A8DAB9' : '#B8E1FF'}
        >
          <div className="flex flex-col items-center">
            {isEditing ? (
              <form onSubmit={handleSetTime} className="flex flex-col items-center gap-2">
                <input
                  type="number"
                  value={editMinutes}
                  onChange={(e) => setEditMinutes(Number(e.target.value))}
                  className="w-24 text-4xl font-mono font-bold text-center bg-transparent border-b-2 border-primary focus:outline-none"
                  autoFocus
                  min="1"
                  max="999"
                />
                <button type="submit" className="text-[10px] bg-primary text-white px-3 py-1 rounded-full uppercase font-bold tracking-widest">Set</button>
              </form>
            ) : (
              <div 
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => !isActive && setIsEditing(true)}
              >
                <span className="text-5xl font-mono font-bold tracking-tight">{formatTime(timeLeft)}</span>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-2">
                  {isActive ? mode.replace('-', ' ') : 'Tap to set time'}
                </p>
              </div>
            )}
          </div>
        </ProgressCircle>
      </div>

      <div className="flex gap-6 items-center">
        <button
          onClick={resetTimer}
          className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 active:scale-90 transition-transform"
        >
          <RotateCcw size={24} />
        </button>
        
        <button
          onClick={toggleTimer}
          className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30 active:scale-95 transition-transform"
        >
          {isActive ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
        </button>

        <div className="w-16 h-16" /> {/* Placeholder for balance */}
      </div>

      <div className="mt-16 w-full">
        <h3 className="font-semibold mb-4 ml-2">Productivity Boosters</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-pastel-yellow p-5 rounded-3xl custom-shadow flex flex-col gap-3">
             <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-yellow-600"><Coffee size={20} /></div>
             <p className="text-xs font-medium">Rest is key</p>
          </div>
          <div className="bg-pastel-pink p-5 rounded-3xl custom-shadow flex flex-col gap-3">
             <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-rose-500"><Zap size={20} /></div>
             <p className="text-xs font-medium">Work hard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
