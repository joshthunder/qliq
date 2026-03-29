
import React, { useState } from 'react';
import { AppState } from '../types';

interface OfflineTokenSettingsProps {
  currentLimit: number;
  onSave: (newLimit: number) => void;
  navigateTo: (page: AppState) => void;
}

const OfflineTokenSettings: React.FC<OfflineTokenSettingsProps> = ({ currentLimit, onSave, navigateTo }) => {
  const [limit, setLimit] = useState(currentLimit);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigateTo('PROFILE')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Offline Tokens</h2>
      </header>

      <div className="px-8 py-10 space-y-12 flex-1">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl font-bold">token</span>
          </div>
          <h3 className="text-2xl font-extrabold text-black">Daily Sync Limit</h3>
          <p className="text-slate-500 font-medium px-4">Set the maximum balance available for offline transactions per day.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center space-y-8">
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Max Offline Balance</p>
            <h1 className="text-5xl font-extrabold text-black tracking-tighter">
              <span className="text-xl mr-1 text-slate-300">Rp</span>
              {limit.toLocaleString('id-ID')}
            </h1>
          </div>

          <div className="space-y-4">
            <input 
              type="range" 
              min="10000" 
              max="500000" 
              step="5000"
              value={limit} 
              onChange={handleSliderChange}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">
              <span>10.000</span>
              <span>250.000</span>
              <span>500.000</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
          <span className="material-symbols-outlined text-primary font-bold">info</span>
          <p className="text-xs text-blue-800 font-medium leading-relaxed">
            Offline tokens allow you to pay QRIS merchants without internet. Lowering your limit increases security in case of device loss.
          </p>
        </div>
      </div>

      <div className="p-8">
        <button 
          onClick={() => onSave(limit)}
          className="w-full py-5 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default OfflineTokenSettings;
