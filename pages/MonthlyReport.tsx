
import React from 'react';
import { AppState } from '../types';

interface MonthlyReportProps {
  navigateTo: (page: AppState) => void;
}

const MonthlyReport: React.FC<MonthlyReportProps> = ({ navigateTo }) => {
  const months = ['Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober'];
  const data = [12000000, 15500000, 14200000, 18900000, 21500000, 24800000];
  const maxVal = Math.max(...data);

  return (
    <div className="flex flex-col h-full min-h-screen pb-12 animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-slate-50">
        <button onClick={() => navigateTo('ACTIVITY')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Laporan Bulanan</h2>
      </header>

      <div className="p-6 space-y-8 flex-1 overflow-y-auto pb-20">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Total Omzet Oktober</p>
              <h1 className="text-3xl font-extrabold text-black">Rp 24.800.000</h1>
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
              <span className="text-[10px] font-extrabold">15%</span>
            </div>
          </div>

          {/* Bar Chart Mockup */}
          <div className="h-48 flex items-end justify-between gap-2 pt-4">
            {data.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-1000 ${i === data.length - 1 ? 'bg-primary' : 'bg-blue-100 group-hover:bg-blue-200'}`}
                    style={{ height: `${(val / maxVal) * 150}px` }}
                  ></div>
                  {i === data.length - 1 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Terbaik</div>
                  )}
                </div>
                <span className={`text-[10px] font-bold ${i === data.length - 1 ? 'text-primary' : 'text-slate-400'}`}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-2">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Rata-rata Harian</p>
            <p className="text-lg font-extrabold text-black font-sans">Rp 800rb</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-2">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Transaksi</p>
            <p className="text-lg font-extrabold text-black font-sans">342</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Statistik Produk</h3>
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
            {[
              { label: 'Kopi Susu Gula Aren', qty: '842 cup', val: 'Rp 15.1M' },
              { label: 'Caffe Latte', qty: '312 cup', val: 'Rp 6.8M' },
              { label: 'Butter Croissant', qty: '145 pcs', val: 'Rp 2.9M' }
            ].map((item, i) => (
              <div key={i} className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-black">{item.label}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{item.qty}</p>
                </div>
                <p className="text-sm font-extrabold text-black font-sans">{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-5 border-2 border-primary text-primary font-extrabold text-lg rounded-[2rem] flex items-center justify-center gap-2 active:bg-blue-50">
          <span className="material-symbols-outlined font-bold">download</span>
          Unduh Laporan PDF
        </button>
      </div>
    </div>
  );
};

export default MonthlyReport;
