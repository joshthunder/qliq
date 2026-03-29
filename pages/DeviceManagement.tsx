
import React from 'react';
import { AppState, UserDevice } from '../types';

interface DeviceManagementProps {
  devices: UserDevice[];
  navigateTo: (page: AppState) => void;
}

const DeviceManagement: React.FC<DeviceManagementProps> = ({ devices, navigateTo }) => {
  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigateTo('PROFILE')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Device Management</h2>
      </header>

      <div className="p-8 space-y-6 flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Registered Devices ({devices.length}/3)</p>
          {devices.length < 3 && <button className="text-xs font-bold text-primary">+ Link New</button>}
        </div>

        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${device.isCurrent ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400'}`}>
                  <span className="material-symbols-outlined font-bold">{device.model.includes('Phone') || device.model.includes('iPhone') ? 'smartphone' : 'tablet'}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-extrabold text-black">{device.model}</p>
                    {device.isCurrent && (
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-tighter">Current</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">Last active: {device.lastUsed}</p>
                </div>
              </div>
              {!device.isCurrent && (
                <button className="text-red-500 material-symbols-outlined font-bold">delete</button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex gap-4">
          <span className="material-symbols-outlined text-amber-600 font-bold">warning</span>
          <p className="text-xs text-amber-800 font-medium leading-relaxed">
            Removing a device will instantly disable its offline payment capabilities until re-authenticated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
