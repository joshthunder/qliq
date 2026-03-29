
import React, { useState } from 'react';
import { AppState } from '../types';

interface TransferProps {
  navigateTo: (page: AppState) => void;
  onConfirm: (amount: number, recipient: string) => void;
}

const Transfer: React.FC<TransferProps> = ({ navigateTo, onConfirm }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const isValid = recipient.length > 5 && parseInt(amount) > 0;

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-bottom duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center justify-between border-b border-slate-100 bg-white">
        <button onClick={() => navigateTo('WALLET')} className="w-10 h-10 rounded-full flex items-center justify-center text-black">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-lg font-extrabold text-black">Send Money</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Recipient Number</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">person</span>
              <input 
                type="tel"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="+62 812..."
                className="w-full pl-12 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] focus:ring-2 focus:ring-primary text-black font-extrabold placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="space-y-2 text-center py-4">
             <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Amount to send</label>
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
             <div className="flex justify-center gap-2 mt-4">
                {[50000, 100000, 250000].map(val => (
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
        </div>

        <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
           <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
             <span className="material-symbols-outlined font-bold">info</span>
           </div>
           <p className="text-xs text-blue-800 font-medium leading-relaxed pt-1">
             Transfer to fellow QLiQ users is <span className="font-extrabold">FREE</span>. Fund will be available instantly in their online wallet.
           </p>
        </div>
      </div>

      <div className="p-8">
        <button 
          disabled={!isValid}
          onClick={() => onConfirm(parseInt(amount), recipient)}
          className={`w-full py-5 rounded-[2rem] font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${isValid ? 'bg-primary text-white shadow-blue-500/30 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          <span className="material-symbols-outlined">send</span>
          Send Now
        </button>
      </div>
    </div>
  );
};

export default Transfer;
