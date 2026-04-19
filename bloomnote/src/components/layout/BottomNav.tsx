import React from 'react';
import { Calendar as CalIcon, Notebook, Home, Timer, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPlusClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, onPlusClick }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'notes', icon: Notebook, label: 'Notes' },
    { id: 'calendar', icon: CalIcon, label: 'Calendar' },
    { id: 'timer', icon: Timer, label: 'Timer' },
  ];

  return (
    <div className="w-full h-20 bg-white/90 backdrop-blur-xl rounded-[32px] md:rounded-[40px] shadow-nav flex items-center justify-around px-4 md:px-8 border border-neutral-100/50">
      <div className="flex flex-1 justify-around items-center">
        {tabs.slice(0, 2).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              activeTab === tab.id ? "text-primary scale-110" : "text-text-muted hover:text-text-main"
            )}
          >
            <tab.icon size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="relative -mt-12 group">
        <button
          onClick={onPlusClick}
          className="w-[72px] h-[72px] bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30 border-[5px] border-bg-soft group-hover:scale-110 active:scale-95 transition-all"
        >
          <Plus size={36} />
        </button>
      </div>

      <div className="flex flex-1 justify-around items-center">
        {tabs.slice(2).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              activeTab === tab.id ? "text-primary scale-110" : "text-text-muted hover:text-text-main"
            )}
          >
            <tab.icon size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
