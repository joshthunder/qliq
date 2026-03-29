
import React from 'react';
import { AppState } from '../types';

interface SyncScheduleProps {
  currentSchedule: string;
  onSave: (schedule: string) => void;
  navigateTo: (page: AppState) => void;
}

const SyncSchedule: React.FC<SyncScheduleProps> = ({ currentSchedule, onSave, navigateTo }) => {
  const options = ['Daily', 'Weekly', 'Monthly'];

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigateTo('PROFILE')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Sync Schedule</h2>
      </header>

      <div className="p-8 space-y-6 flex-1">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
          {options.map((opt) => (
            <button 
              key={opt}
              onClick={() => onSave(opt)}
              className="w-full flex items-center justify-between p-6 active:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${currentSchedule === opt ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>
                  <span className="material-symbols-outlined font-bold">calendar_today</span>
                </div>
                <span className="text-lg font-bold text-black">{opt}</span>
              </div>
              {currentSchedule === opt && (
                <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
          <span className="material-symbols-outlined text-primary font-bold">info</span>
          <p className="text-xs text-blue-800 font-medium leading-relaxed">
            Your schedule determines how often your offline tokens are automatically refreshed when a connection is available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SyncSchedule;
