
import React from 'react';
import { AppState } from '../types';

interface PaymentSuccessProps {
  details: any;
  navigateTo: (page: AppState) => void;
  returnTo: AppState;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ details, navigateTo, returnTo }) => {
  if (!details) return null;

  return (
    <div className="flex flex-col h-full min-h-screen animate-in fade-in duration-700 bg-[#f8f9fb]">
      <div className="flex-1 flex flex-col items-center pt-24 px-8">
        <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-10 shadow-sm border border-blue-100/50">
          <span className="material-symbols-outlined text-6xl font-bold animate-pulse">check</span>
        </div>

        <h2 className="text-2xl font-extrabold text-black mb-2">Transaksi Berhasil</h2>
        <p className="text-slate-500 text-center mb-10 max-w-[200px]">Data transaksi Anda telah diproses secara aman.</p>

        <h1 className="text-4xl font-extrabold text-primary mb-12">
          Rp {Math.abs(details.amount).toLocaleString('id-ID')}
        </h1>

        <div className="w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
          <div className="flex items-center justify-between p-5">
            <span className="text-sm font-medium text-slate-400">Deskripsi</span>
            <span className="text-sm font-bold text-black">{details.merchant}</span>
          </div>
          <div className="flex items-center justify-between p-5">
            <span className="text-sm font-medium text-slate-400">Waktu</span>
            <span className="text-sm font-bold text-black">{details.date} • {details.time}</span>
          </div>
          <div className="flex items-center justify-between p-5 bg-slate-50">
            <span className="text-sm font-medium text-slate-400">ID Transaksi</span>
            <span className="text-[12px] font-mono font-bold text-black">{details.id}</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-4">
        <button 
          onClick={() => navigateTo(returnTo)}
          className="w-full py-5 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all"
        >
          Selesai
        </button>
        <button className="w-full py-5 border-2 border-primary text-primary font-bold text-lg rounded-2xl flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">receipt_long</span>
          Unduh Bukti
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
