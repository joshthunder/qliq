
import React, { useState } from 'react';
import { AppState } from '../types';

interface ConfirmPasswordProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({ onConfirm, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      onConfirm();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen animate-in fade-in duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={onCancel} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">close</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Verification Required</h2>
      </header>

      <div className="flex-1 px-8 pt-12 flex flex-col items-center space-y-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
          <span className="material-symbols-outlined text-4xl font-bold">shield_person</span>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-black">Confirm Password</h3>
          <p className="text-slate-500 font-medium">Please enter your account password to proceed with the scan.</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <input 
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-6 py-5 bg-white border border-slate-200 rounded-[2rem] focus:ring-2 focus:ring-primary text-black font-bold placeholder:text-slate-300 text-center"
          />
          
          <button 
            type="submit"
            disabled={password.length === 0}
            className={`w-full py-5 rounded-[2rem] font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${password.length > 0 ? 'bg-primary text-white shadow-blue-500/30 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            <span className="material-symbols-outlined">verified</span>
            Confirm & Proceed
          </button>
        </form>

        <p className="text-xs text-slate-400 font-medium pt-4">
          This extra step ensures only you can authorize payments from this device.
        </p>
      </div>
    </div>
  );
};

export default ConfirmPassword;
