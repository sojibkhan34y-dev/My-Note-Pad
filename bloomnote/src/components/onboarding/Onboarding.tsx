import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');

  const steps = [
    {
      title: "Capture Every Thought",
      description: "From expenses to AI-powered social captions, BloomNote handles it all.",
      emoji: "📝",
      color: "bg-pastel-mint"
    },
    {
      title: "Track Your Vitality",
      description: "Stay informed about your fitness, sleep, and nutrition in one beautiful place.",
      emoji: "🏃‍♀️",
      color: "bg-pastel-blue"
    },
    {
      title: "Focus and Bloom",
      description: "Use our tailored timers to stay productive and fresh throughout the day.",
      emoji: "🌸",
      color: "bg-pastel-pink"
    },
    {
      title: "What's your name?",
      description: "We'd love to personalize your experience.",
      emoji: "✨",
      color: "bg-pastel-yellow",
      isInput: true
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      if (userName.trim()) {
        (onComplete as any)(userName);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col p-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex flex-col items-center w-full"
          >
            <div className={cn("w-64 h-64 rounded-[60px] flex items-center justify-center text-8xl mb-12 shadow-2xl shadow-neutral-100", steps[step].color)}>
              {steps[step].emoji}
            </div>
            <h1 className="text-3xl font-bold mb-4">{steps[step].title}</h1>
            <p className="text-neutral-400 max-w-xs mb-8">{steps[step].description}</p>
            
            {(steps[step] as any).isInput && (
              <motion.input
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full max-w-xs p-4 bg-neutral-50 rounded-2xl border-2 border-primary/20 focus:border-primary focus:outline-none text-center text-xl font-semibold transition-all"
                autoFocus
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="py-8 flex flex-col gap-6">
        <div className="flex justify-center gap-2">
           {steps.map((_, i) => (
             <div key={i} className={cn("h-1.5 rounded-full transition-all", step === i ? "w-8 bg-primary" : "w-2 bg-neutral-200")} />
           ))}
        </div>
        <button
          onClick={handleNext}
          disabled={(steps[step] as any).isInput && !userName.trim()}
          className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all disabled:opacity-50"
        >
          {step === steps.length - 1 ? "Get Started" : "Continue"}
        </button>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
