
import React, { useState } from 'react';
import { AppState } from '../types';

interface TopUpProps {
  navigateTo: (page: AppState) => void;
  onConfirm: (amount: number) => void;
}

const TopUp: React.FC<TopUpProps> = ({ navigateTo, onConfirm }) => {
  const [amount, setAmount] = useState('150000');
  const [method, setMethod] = useState('E-Wallet');

  const methods = [
    { name: 'E-Wallet', subtitle: 'OVO, GoPay, Dana', icon: 'account_balance_wallet' },
    { name: 'Kartu Debit', subtitle: 'Visa, Mastercard', icon: 'credit_card' },
    { name: 'Transfer Bank', subtitle: 'BCA, Mandiri, BNI', icon: 'account_balance' }
  ];

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-bottom duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center justify-between bg-white border-b border-slate-50">
        <button onClick={() => navigateTo('DASHBOARD')} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900">
          <span className="material-symbols-outlined font-bold">chevron_left</span>
        </button>
        <h2 className="text-lg font-bold">Top Up Saldo</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 px-6 space-y-8 mt-6">
        <div className="flex flex-col items-center">
          <div className="bg-blue-50 px-4 py-1.5 rounded-full flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">Mode Online</span>
          </div>

          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Masukkan Nominal</p>
          <div className="flex items-center gap-2 text-primary">
            <span className="text-2xl font-bold mt-2 opacity-40">Rp</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-5xl font-extrabold p-0 border-none bg-transparent focus:ring-0 w-64 text-center"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900">Pilih Metode Pembayaran</h3>
          <div className="space-y-3">
            {methods.map((m) => (
              <button 
                key={m.name}
                onClick={() => setMethod(m.name)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${method === m.name ? 'border-primary bg-blue-50' : 'border-slate-100 bg-white'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === m.name ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>
                    <span className="material-symbols-outlined">{m.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{m.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{m.subtitle}</p>
                  </div>
                </div>
                {method === m.name && <span className="material-symbols-outlined text-primary">check_circle</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <button 
          onClick={() => onConfirm(parseInt(amount))}
          className="w-full py-5 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all"
        >
          Konfirmasi Top Up
        </button>
      </div>
    </div>
  );
};

export default TopUp;
