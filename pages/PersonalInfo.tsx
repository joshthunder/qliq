
import React, { useState } from 'react';
import { AppState, UserProfile } from '../types';

interface PersonalInfoProps {
  user: UserProfile;
  navigateTo: (page: AppState) => void;
  onSave: (updatedUser: Partial<UserProfile>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user, navigateTo, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  const handleSave = () => {
    onSave(formData);
    navigateTo('PROFILE');
  };

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigateTo('PROFILE')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Personal Info</h2>
      </header>

      <div className="flex-1 px-8 py-8 space-y-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300">person</span>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-black font-bold"
                placeholder="Your full name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300">mail</span>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-black font-bold"
                placeholder="yourname@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300">call</span>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-black font-bold"
                placeholder="+62 812..."
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
          <span className="material-symbols-outlined text-primary font-bold">verified_user</span>
          <p className="text-xs text-blue-800 font-medium leading-relaxed">
            Your personal information is encrypted and only used for security verification. QLiQ never shares your data with third parties.
          </p>
        </div>
      </div>

      <div className="p-8 pb-12">
        <button 
          onClick={handleSave}
          className="w-full py-5 bg-primary text-white font-bold text-lg rounded-[2rem] shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
