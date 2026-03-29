
import React, { useState } from 'react';
import { IMAGES } from '../constants';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "Simple & Fast",
    description: "Experience a clutter-free interface designed for your speed. No internet? No problem.",
    image: IMAGES.ONBOARDING_ILLUSTRATION,
    icon: "qr_code_scanner"
  },
  {
    title: "Secure Offline Payments",
    description: "Pay anyone, anywhere, even without an internet connection.",
    image: "https://picsum.photos/seed/shield/400/400",
    icon: "shield_lock"
  },
  {
    title: "Your Data is Safe",
    description: "Bank-grade encryption ensures your transactions and personal info stay private.",
    image: "https://picsum.photos/seed/secure/400/400",
    icon: "security"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-300">
      <header className="flex items-center justify-between px-6 pt-12">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-3xl font-bold">qr_code_scanner</span>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">QLiQ</span>
        </div>
        <button onClick={onComplete} className="text-slate-500 text-sm font-semibold">Skip</button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-full relative flex justify-center mb-12">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="relative w-72 h-72 bg-contain bg-center bg-no-repeat rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
             {currentStep === 0 ? (
               <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${steps[0].image})` }} />
             ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                   <span className="material-symbols-outlined text-primary text-[8rem]">{steps[currentStep].icon}</span>
                </div>
             )}
          </div>
        </div>

        <div className="space-y-4 max-w-xs mx-auto">
          <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">
            {steps[currentStep].title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
            {steps[currentStep].description}
          </p>
        </div>
      </main>

      <footer className="px-6 pb-12 space-y-8">
        <div className="flex justify-center gap-2.5">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 transition-all duration-300 rounded-full ${i === currentStep ? 'w-8 bg-primary' : 'w-2 bg-slate-200 dark:bg-slate-700'}`}
            />
          ))}
        </div>

        <button 
          onClick={next}
          className="w-full bg-primary text-white font-bold text-lg py-5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};

export default Onboarding;
