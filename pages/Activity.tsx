
import React, { useState, useMemo } from 'react';
import { UserProfile, AppState, Transaction } from '../types';
import { MOCK_TRANSACTIONS } from '../constants';
import BottomNav from '../components/BottomNav';

interface ActivityProps {
  user: UserProfile;
  navigateTo: (page: AppState) => void;
  handleScanClick: () => void;
  appRole: 'USER' | 'SELLER';
  onSelectTransaction: (tx: Transaction) => void;
}

type SortOption = 'NEWEST' | 'OLDEST' | 'AMOUNT_HIGH' | 'AMOUNT_LOW';

const MOCK_SELLER_REPORTS: Transaction[] = [
  { id: 'S-7701', merchant: 'Pelanggan #011', amount: 45000, date: 'Hari Ini', time: '14:20', type: 'PAYMENT' },
  { id: 'S-7702', merchant: 'Pelanggan #082', amount: 125000, date: 'Hari Ini', time: '13:15', type: 'PAYMENT' },
  { id: 'S-7703', merchant: 'Pelanggan #103', amount: 65000, date: 'Hari Ini', time: '11:05', type: 'PAYMENT' },
  { id: 'S-7704', merchant: 'Pelanggan #009', amount: 80000, date: 'Kemarin', time: '18:30', type: 'PAYMENT' },
  { id: 'S-7705', merchant: 'Pelanggan #045', amount: 250000, date: 'Kemarin', time: '16:45', type: 'PAYMENT' },
  { id: 'S-7706', merchant: 'Pelanggan #012', amount: 45000, date: 'Kemarin', time: '09:10', type: 'PAYMENT' },
  { id: 'S-7707', merchant: 'Pelanggan #033', amount: 150000, date: '23 Sep', time: '20:15', type: 'PAYMENT' },
  { id: 'S-7708', merchant: 'Pelanggan #076', amount: 300000, date: '23 Sep', time: '14:00', type: 'PAYMENT' },
];

const Activity: React.FC<ActivityProps> = ({ navigateTo, handleScanClick, appRole, onSelectTransaction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('NEWEST');

  const transactions = appRole === 'SELLER' ? MOCK_SELLER_REPORTS : MOCK_TRANSACTIONS;

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      result = result.filter(tx => 
        tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'AMOUNT_HIGH') return Math.abs(b.amount) - Math.abs(a.amount);
      if (sortBy === 'AMOUNT_LOW') return Math.abs(a.amount) - Math.abs(b.amount);
      
      const dateWeight = (d: string) => {
        if (d === 'Hari Ini') return 3;
        if (d === 'Kemarin') return 2;
        return 1;
      };
      
      const weightA = dateWeight(a.date);
      const weightB = dateWeight(b.date);
      
      if (sortBy === 'NEWEST') return weightB - weightA;
      if (sortBy === 'OLDEST') return weightA - weightB;
      return 0;
    });

    return result;
  }, [transactions, searchTerm, sortBy]);

  const dailySummaries = useMemo(() => {
    const sums: Record<string, number> = {};
    filteredTransactions.forEach(tx => {
      sums[tx.date] = (sums[tx.date] || 0) + Math.abs(tx.amount);
    });
    return sums;
  }, [filteredTransactions]);

  const dates = ['Hari Ini', 'Kemarin', '23 Sep'];

  return (
    <div className="flex flex-col h-full min-h-screen pb-24 animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-slate-50">
        <div>
          <h2 className="text-2xl font-extrabold text-black">
            {appRole === 'SELLER' ? 'Laporan Penjualan' : 'Riwayat Aktivitas'}
          </h2>
          {appRole === 'SELLER' && (
            <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mt-0.5">Ringkasan Uang Masuk</p>
          )}
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${showFilters ? 'bg-primary text-white' : 'bg-slate-50 text-black'}`}
        >
          <span className="material-symbols-outlined font-bold">tune</span>
        </button>
      </header>

      <div className="px-6 mt-4 space-y-4 flex-1 overflow-y-auto pb-10 text-black">
        {appRole === 'SELLER' && (
          <button 
            onClick={() => navigateTo('MONTHLY_REPORT')}
            className="w-full p-4 bg-primary rounded-2xl text-white flex items-center justify-between shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">calendar_month</span>
              <div className="text-left">
                <p className="text-sm font-extrabold">Lihat Laporan Bulanan</p>
                <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Analisis performa toko</p>
              </div>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        )}

        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">search</span>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={appRole === 'SELLER' ? "Cari transaksi..." : "Cari merchant atau ID..."}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm shadow-sm focus:ring-1 focus:ring-primary text-black font-bold placeholder:text-slate-400"
          />
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm animate-in zoom-in-95 duration-200 grid grid-cols-2 gap-2">
            {[
              { label: 'Terbaru', val: 'NEWEST' },
              { label: 'Terlama', val: 'OLDEST' },
              { label: 'Nilai Tertinggi', val: 'AMOUNT_HIGH' },
              { label: 'Nilai Terendah', val: 'AMOUNT_LOW' }
            ].map(opt => (
              <button 
                key={opt.val}
                onClick={() => setSortBy(opt.val as SortOption)}
                className={`py-2 px-3 rounded-xl text-[10px] font-extrabold uppercase tracking-tight transition-all ${sortBy === opt.val ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-8 pt-2">
          {dates.map((sectionDate) => {
            const sectionTxs = filteredTransactions.filter(t => t.date === sectionDate);
            if (sectionTxs.length === 0) return null;
            
            return (
              <div key={sectionDate} className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-100/80 w-fit px-3 py-1 rounded-lg">
                    {sectionDate.toUpperCase()}
                  </h3>
                  {appRole === 'SELLER' && (
                    <div className="text-right">
                      <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Total Uang Masuk</p>
                      <p className="text-sm font-extrabold text-emerald-600">Rp {dailySummaries[sectionDate].toLocaleString('id-ID')}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {sectionTxs.map((tx) => (
                    <button 
                      key={tx.id} 
                      onClick={() => onSelectTransaction(tx)}
                      className="w-full flex items-center justify-between py-4 bg-white px-4 rounded-[1.5rem] shadow-sm border border-slate-50 active:scale-[0.98] transition-transform text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center ${appRole === 'SELLER' ? 'bg-emerald-50 text-emerald-600' : tx.amount < 0 ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                          <span className="material-symbols-outlined filled text-xl font-bold">
                            {appRole === 'SELLER' ? 'add_shopping_cart' : tx.merchant.includes('Starbucks') ? 'coffee' : tx.type === 'PAYMENT' ? 'shopping_bag' : 'swap_horiz'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-black">{tx.merchant}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{tx.time} • {tx.id}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-extrabold ${appRole === 'SELLER' ? 'text-emerald-600' : tx.amount < 0 ? 'text-black' : 'text-primary'}`}>
                        {appRole === 'SELLER' ? '+' : tx.amount < 0 ? '-' : '+'} Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav 
        active="ACTIVITY" 
        onNavigate={navigateTo} 
        onScanClick={handleScanClick} 
        homePath={appRole === 'SELLER' ? 'SELLER_DASHBOARD' : 'DASHBOARD'} 
      />
    </div>
  );
};

export default Activity;
