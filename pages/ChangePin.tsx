
import React, { useState } from 'react';
import { AppState } from '../types';

interface ChangePinProps {
  navigateTo: (page: AppState) => void;
  onSuccess: () => void;
}

const ChangePin: React.FC<ChangePinProps> = ({ navigateTo, onSuccess }) => {
  const [pin, setPin] = useState('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) setPin(prev => prev + num);
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigateTo('PROFILE')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Security PIN</h2>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12 space-y-12">
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-extrabold text-black">Enter New 6-Digit PIN</h3>
          <p className="text-slate-500 font-medium">This PIN will be required for every transaction.</p>
        </div>

        <div className="flex gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${pin.length > i ? 'bg-primary border-primary scale-125' : 'bg-slate-200 border-slate-200'}`} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button 
              key={num} 
              onClick={() => handleKeyPress(num)}
              className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-100 text-2xl font-extrabold text-black active:bg-primary active:text-white transition-colors"
            >
              {num}
            </button>
          ))}
          <div />
          <button onClick={() => handleKeyPress('0')} className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-100 text-2xl font-extrabold text-black active:bg-primary active:text-white transition-colors">0</button>
          <button onClick={handleBackspace} className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center active:bg-red-50 active:text-red-500 transition-colors">
            <span className="material-symbols-outlined font-bold">backspace</span>
          </button>
        </div>
      </div>

      <div className="p-8">
        <button 
          disabled={pin.length !== 6}
          onClick={onSuccess}
          className={`w-full py-5 rounded-[2rem] font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${pin.length === 6 ? 'bg-primary text-white shadow-blue-500/30 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          Confirm New PIN
        </button>
      </div>
    </div>
  );
};

export default ChangePin;
