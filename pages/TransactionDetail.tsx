
import React from 'react';
import { Transaction, AppState } from '../types';

interface TransactionDetailProps {
  transaction: Transaction;
  navigateTo: (page: AppState) => void;
  returnTo: AppState;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, navigateTo, returnTo }) => {
  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-bottom duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center justify-between bg-white border-b border-slate-50 sticky top-0 z-20">
        <button onClick={() => navigateTo(returnTo)} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-lg font-extrabold text-black">Detail Transaksi</h2>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-black">
          <span className="material-symbols-outlined font-bold">share</span>
        </button>
      </header>

      <div className="flex-1 px-6 pt-10 pb-20 space-y-8 overflow-y-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-xl ${transaction.amount < 0 ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
            <span className="material-symbols-outlined text-4xl font-bold">
              {transaction.merchant.includes('Starbucks') ? 'coffee' : transaction.type === 'PAYMENT' ? 'shopping_bag' : 'arrow_downward'}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-black">{transaction.merchant}</h3>
          <h1 className={`text-4xl font-extrabold tracking-tight ${transaction.amount < 0 ? 'text-black' : 'text-primary'}`}>
            {transaction.amount < 0 ? '-' : '+'} Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
          </h1>
        </div>

        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
          <div className="p-6 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
            <span className="text-sm font-extrabold text-emerald-600 font-bold">Berhasil</span>
          </div>
          <div className="p-6 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Waktu</span>
            <span className="text-sm font-extrabold text-black">{transaction.date}, {transaction.time}</span>
          </div>
          <div className="p-6 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ID Transaksi</span>
            <span className="text-xs font-mono font-bold text-black">{transaction.id}</span>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white/80 backdrop-blur-md border-t border-slate-50">
        <button onClick={() => navigateTo(returnTo)} className="w-full py-5 bg-primary text-white font-extrabold text-lg rounded-[2rem] active:scale-95 transition-transform">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default TransactionDetail;
