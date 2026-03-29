
import React from 'react';
import { AppState } from '../types';

interface ForgotPasswordProps {
  navigateTo: (page: AppState) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col h-full min-h-screen px-8 pt-16 pb-12 animate-in slide-in-from-right duration-500 bg-[#f8f9fb]">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => navigateTo('LOGIN')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-2xl font-extrabold text-black">Forgot Password</h2>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined text-4xl font-bold">lock_reset</span>
          </div>
          <p className="text-slate-600 font-medium leading-relaxed">
            Enter the email or phone number associated with your account and we'll send a link to reset your password.
          </p>
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Email or Phone</label>
            <input 
              type="text" 
              placeholder="e.g. alex@example.com"
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-black font-bold placeholder:text-gray-300"
            />
          </div>
        </div>

        <button 
          onClick={() => {
            alert("Reset link sent successfully!");
            navigateTo('LOGIN');
          }}
          className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Send Reset Link
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>

      <div className="text-center pt-8">
        <button onClick={() => navigateTo('LOGIN')} className="text-sm font-extrabold text-primary hover:underline">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
