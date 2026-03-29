
import React, { useState } from 'react';
import { AppState, UserProfile } from '../types';

interface TopUpOfflineProps {
  user: UserProfile;
  syncLimit: number;
  navigateTo: (page: AppState) => void;
  onConfirm: (amount: number) => void;
}

const TopUpOffline: React.FC<TopUpOfflineProps> = ({ user, syncLimit, navigateTo, onConfirm }) => {
  const [amount, setAmount] = useState('50000');

  const numAmount = parseInt(amount) || 0;
  const isBalanceEnough = user.balance >= numAmount;
  const capacity = syncLimit - user.offlineBalance;
  const isBelowLimit = numAmount <= capacity;
  const isValid = numAmount > 0 && isBalanceEnough && isBelowLimit;

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-bottom duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center justify-between border-b border-slate-100 bg-white">
        <button onClick={() => navigateTo('DASHBOARD')} className="w-10 h-10 rounded-full flex items-center justify-center text-black">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-lg font-extrabold text-black">Pindah Saldo Offline</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-around text-center">
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Dompet Online</p>
            <p className="text-sm font-extrabold text-black">Rp {user.balance.toLocaleString('id-ID')}</p>
          </div>
          <span className="material-symbols-outlined text-primary font-bold">arrow_forward</span>
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Token Offline</p>
            <p className="text-sm font-extrabold text-primary">Rp {user.offlineBalance.toLocaleString('id-ID')}</p>
          </div>
        </div>

        <div className="space-y-3 text-center py-4">
             <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Nominal Perpindahan</label>
             <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-extrabold text-slate-400 pt-1">Rp</span>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-48 text-5xl font-extrabold text-black bg-transparent border-none focus:ring-0 text-center placeholder:text-slate-200"
                />
             </div>
             
             {!isBalanceEnough && (
               <p className="text-red-500 text-[10px] font-extrabold mt-2 uppercase tracking-wider">Saldo Online tidak mencukupi</p>
             )}
             {!isBelowLimit && isBalanceEnough && (
               <p className="text-orange-500 text-[10px] font-extrabold mt-2 uppercase tracking-wider">Melebihi batas token offline (Rp {capacity.toLocaleString('id-ID')} sisa)</p>
             )}

             <div className="flex justify-center gap-2 mt-6 flex-wrap">
                {[20000, 50000, 100000, 200000].map(val => (
                  <button 
                    key={val} 
                    onClick={() => setAmount(val.toString())}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-extrabold text-slate-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    Rp {val.toLocaleString('id-ID')}
                  </button>
                ))}
             </div>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined font-bold">offline_bolt</span>
            </div>
            <p className="text-xs text-blue-800 font-medium leading-relaxed pt-1">
              Dana yang dipindahkan akan disimpan secara lokal di perangkat Anda sebagai <span className="font-extrabold">Token Offline</span> untuk pembayaran tanpa internet.
            </p>
          </div>
      </div>

      <div className="p-8">
        <button 
          disabled={!isValid}
          onClick={() => onConfirm(numAmount)}
          className={`w-full py-5 rounded-[2rem] font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${isValid ? 'bg-primary text-white shadow-blue-500/30 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          <span className="material-symbols-outlined">sync_alt</span>
          Pindahkan Sekarang
        </button>
      </div>
    </div>
  );
};

export default TopUpOffline;
