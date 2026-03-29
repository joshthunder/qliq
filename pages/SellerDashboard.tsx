
import React, { useState } from 'react';
import { UserProfile, AppState, Transaction } from '../types';
import BottomNav from '../components/BottomNav';

interface SellerDashboardProps {
  user: UserProfile;
  navigateTo: (page: AppState) => void;
  handleScanClick: () => void;
  onSelectTransaction: (tx: Transaction) => void;
  onSwitchRole: (role: 'USER' | 'SELLER') => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ user, navigateTo, handleScanClick, onSelectTransaction, onSwitchRole }) => {
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleGenerateQR = () => {
    if (amount && !isOffline) setShowQR(true);
  };

  const MOCK_SALES: Transaction[] = [
    { id: 'TX-9901', merchant: 'Alex Johnson', amount: 65000, date: 'Hari Ini', time: '10:15', type: 'PAYMENT' },
    { id: 'TX-9902', merchant: 'Maria Sharapova', amount: 125000, date: 'Hari Ini', time: '09:45', type: 'PAYMENT' },
    { id: 'TX-9903', merchant: 'Budi Santoso', amount: 45000, date: 'Kemarin', time: '20:20', type: 'PAYMENT' },
  ];

  return (
    <div className="flex flex-col h-full min-h-screen pb-24 animate-in fade-in duration-300 bg-[#f8f9fb] dark:bg-slate-950 font-sans text-black">
      <div className="px-6 pt-10 pb-4 flex items-center justify-between relative">
        <div className="relative">
          <button 
            onClick={() => setShowModeMenu(!showModeMenu)}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-sm overflow-hidden active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-white font-bold text-xl">store</span>
          </button>
          
          {showModeMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowModeMenu(false)}></div>
              <div className="absolute left-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 p-2 animate-in zoom-in-95 duration-200 origin-top-left">
                <button 
                  onClick={() => { setShowModeMenu(false); onSwitchRole('USER'); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-sm font-bold">person</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Mode Pengguna</span>
                </button>
                <button 
                  onClick={() => setShowModeMenu(false)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-primary transition-colors text-left mt-1"
                >
                  <span className="material-symbols-outlined text-sm font-bold">store</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Mode Penjual</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-xl font-display font-extrabold text-black dark:text-white tracking-tight leading-none">QLiQ Seller</h1>
          <div className="flex items-center gap-1 mt-1">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
             <p className="text-[9px] font-extrabold text-primary uppercase tracking-[0.2em]">Merchant Portal</p>
          </div>
        </div>

        <button 
          onClick={() => navigateTo('NOTIFICATIONS')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-50 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-black text-xl">notifications</span>
        </button>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl flex gap-1.5 shadow-sm border border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => setIsOffline(false)}
            className={`flex-1 py-3 px-2 rounded-xl text-[11px] font-extrabold transition-all flex items-center justify-center gap-2 ${!isOffline ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 uppercase'}`}
          >
            <span className="material-symbols-outlined text-[18px]">wifi</span>
            ONLINE
          </button>
          <button 
            onClick={() => { setIsOffline(true); setShowQR(false); }}
            className={`flex-1 py-3 px-2 rounded-xl text-[11px] font-extrabold transition-all flex items-center justify-center gap-2 ${isOffline ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 uppercase'}`}
          >
            <span className="material-symbols-outlined text-[18px]">wifi_off</span>
            OFFLINE
          </button>
        </div>
      </div>

      <div className="px-6 py-2 space-y-6 flex-1 overflow-y-auto">
        <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden text-center">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 space-y-4">
            <p className="text-white/70 text-[10px] font-extrabold uppercase tracking-widest">
              {isOffline ? 'OMZET OFFLINE TERKUNCI' : 'PENDAPATAN HARI INI'}
            </p>
            <h2 className="text-[44px] font-extrabold tracking-tighter leading-none">
              <span className="text-lg mr-1 opacity-60">Rp</span>
              { (1250000).toLocaleString('id-ID') }
            </h2>
            <div className="flex items-center justify-center gap-2 text-blue-200 font-bold text-xs">
              <span className="material-symbols-outlined text-[16px]">{isOffline ? 'cloud_off' : 'trending_up'}</span>
              <span>{isOffline ? 'Sinkron otomatis saat online' : 'Meningkat 12% vs Kemarin'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-extrabold text-black">Terima Pembayaran</h3>
            {isOffline && (
              <div className="bg-blue-50 text-primary px-4 py-2 rounded-full w-fit mx-auto text-[10px] font-extrabold uppercase tracking-wider">
                Mode Offline Aktif
              </div>
            )}
          </div>

          {!isOffline ? (
            <div className="space-y-4 animate-in slide-in-from-top duration-300">
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-extrabold text-slate-300 text-xl">Rp</span>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setShowQR(false); }}
                  placeholder="0"
                  className="w-full pl-16 pr-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-black text-3xl font-extrabold placeholder:text-slate-200"
                />
              </div>

              {!showQR ? (
                <button 
                  onClick={handleGenerateQR}
                  disabled={!amount}
                  className={`w-full py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 transition-all ${amount ? 'bg-primary text-white shadow-xl shadow-blue-500/20 active:scale-95' : 'bg-slate-100 text-slate-400'}`}
                >
                  <span className="material-symbols-outlined font-bold">qr_code_2</span>
                  Generate QR Bayar
                </button>
              ) : (
                <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500 p-4 bg-slate-50 rounded-[2rem]">
                  <div className="p-4 bg-white rounded-3xl shadow-xl">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QLIQ-REC-${amount}`} alt="QR" className="w-48 h-48" />
                  </div>
                  <p className="text-2xl font-extrabold text-primary">Rp {parseInt(amount).toLocaleString('id-ID')}</p>
                  <button onClick={() => setShowQR(false)} className="text-xs font-bold text-slate-400 underline uppercase tracking-widest">Batal</button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
               <div className="bg-blue-50 p-6 rounded-[1.5rem] border border-blue-100 text-center space-y-2">
                  <span className="material-symbols-outlined text-primary text-4xl">wifi_off</span>
                  <p className="text-[11px] text-slate-600 font-bold leading-relaxed uppercase tracking-tighter">
                    Gunakan Kamera untuk Memindai QR Token Pembeli
                  </p>
               </div>
               
               <button 
                onClick={handleScanClick}
                className="w-full py-5 bg-primary text-white font-extrabold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined font-bold">photo_camera</span>
                Scan Token Pembeli
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 pb-12">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Penjualan Terbaru</h4>
            <button onClick={() => navigateTo('ACTIVITY')} className="text-[10px] font-bold text-primary uppercase">Lihat Semua</button>
          </div>
          <div className="space-y-2">
            {MOCK_SALES.map((tx) => (
              <button 
                key={tx.id} 
                onClick={() => onSelectTransaction(tx)}
                className="w-full bg-white p-5 rounded-[1.5rem] border border-slate-100 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-xs">
                    {tx.merchant[0]}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-black">Bayar dari {tx.merchant}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.time}</p>
                  </div>
                </div>
                <p className="text-sm font-extrabold text-emerald-600">+ Rp {Math.abs(tx.amount).toLocaleString('id-ID')}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="HOME" onNavigate={navigateTo} onScanClick={() => {}} homePath="SELLER_DASHBOARD" />
    </div>
  );
};

export default SellerDashboard;
