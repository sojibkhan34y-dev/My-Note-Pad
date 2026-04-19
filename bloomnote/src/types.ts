export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'finance' | 'story' | 'caption' | 'general';
  color: string;
  createdAt: number;
  tags?: string[];
  financeData?: {
    items: { label: string; amount: number; category: string; date: string }[];
    total: number;
  };
}

export interface ActivityLog {
  id: string;
  type: 'sleep' | 'water' | 'food' | 'exercise';
  value: number; // hours, glasses, calories, minutes
  label: string;
  timestamp: number;
  details?: string;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  calories: number;
  weight: number;
  steps: number;
  sleep: number;
  water: number;
}
