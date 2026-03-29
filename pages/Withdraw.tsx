
import React, { useState } from 'react';
import { AppState, UserProfile, BankAccount } from '../types';

interface WithdrawProps {
  user: UserProfile;
  navigateTo: (page: AppState) => void;
  onConfirm: (amount: number, bank: string) => void;
}

const Withdraw: React.FC<WithdrawProps> = ({ user, navigateTo, onConfirm }) => {
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(
    user.linkedAccounts.find(a => a.isDefault) || user.linkedAccounts[0] || null
  );

  const isValid = parseInt(amount) > 0 && parseInt(amount) <= user.balance && selectedAccount !== null;

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-bottom duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center justify-between border-b border-slate-100 bg-white">
        <button onClick={() => navigateTo('WALLET')} className="w-10 h-10 rounded-full flex items-center justify-center text-black">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-lg font-extrabold text-black">Tarik Dana</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Saldo tersedia untuk ditarik</p>
          <h1 className="text-4xl font-extrabold text-black text-center tracking-tight">
            <span className="text-lg mr-1 text-slate-300">Rp</span>
            {user.balance.toLocaleString('id-ID')}
          </h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Pilih Rekening Tujuan</label>
              <button onClick={() => navigateTo('MANAGE_ACCOUNTS')} className="text-[10px] text-primary font-bold uppercase">Kelola</button>
            </div>
            
            <div className="space-y-2">
              {user.linkedAccounts.map(account => (
                <button 
                  key={account.id}
                  onClick={() => setSelectedAccount(account)}
                  className={`w-full p-5 rounded-[2rem] border-2 transition-all flex items-center justify-between text-left ${selectedAccount?.id === account.id ? 'border-primary bg-blue-50' : 'border-slate-100 bg-white'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-[10px] ${selectedAccount?.id === account.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {account.bankName}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-black">{account.bankName} Account</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">**** {account.accountNumber.slice(-4)}</p>
                    </div>
                  </div>
                  {selectedAccount?.id === account.id && <span className="material-symbols-outlined text-primary">check_circle</span>}
                </button>
              ))}
              
              {user.linkedAccounts.length === 0 && (
                <button 
                  onClick={() => navigateTo('MANAGE_ACCOUNTS')}
                  className="w-full p-8 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold text-sm hover:border-primary hover:text-primary transition-all"
                >
                  + Tambah Rekening Penarikan
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Nominal Penarikan</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-extrabold text-black">Rp</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] focus:ring-2 focus:ring-primary text-black text-2xl font-extrabold"
              />
            </div>
            {parseInt(amount) > user.balance && (
              <p className="text-red-500 text-[10px] font-extrabold px-4 uppercase tracking-wider">Saldo tidak mencukupi</p>
            )}
            <div className="flex gap-2 px-2">
              {[100000, 500000, 1000000].map(val => (
                <button 
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className="px-3 py-1.5 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 active:bg-primary active:text-white"
                >
                  Rp {val.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <button 
          disabled={!isValid}
          onClick={() => onConfirm(parseInt(amount), selectedAccount?.bankName || '')}
          className={`w-full py-5 rounded-[2rem] font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${isValid ? 'bg-primary text-white shadow-blue-500/30 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          <span className="material-symbols-outlined">payments</span>
          Konfirmasi Penarikan
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
