
import React, { useState } from 'react';
import { UserProfile, AppState } from '../types';
import BottomNav from '../components/BottomNav';

interface DashboardProps {
  user: UserProfile;
  navigateTo: (page: AppState) => void;
  handleScanClick: () => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  onSyncOffline: () => number | undefined;
  onSwitchRole: (role: 'USER' | 'SELLER') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  navigateTo, 
  handleScanClick, 
  isOffline, 
  setIsOffline, 
  onSyncOffline,
  onSwitchRole 
}) => {
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SUCCESS'>('IDLE');

  const handleSync = async () => {
    if (isOffline) {
      alert("Harap aktifkan Mode Online untuk melakukan sinkronisasi saldo offline.");
      return;
    }
    
    // Direct navigate to manual top up offline for better control
    navigateTo('TOPUP_OFFLINE');
  };

  return (
    <div className="flex flex-col h-full min-h-screen pb-24 animate-in fade-in duration-300 bg-[#f8f9fb] dark:bg-slate-950 font-sans text-black">
      <div className="px-6 pt-10 pb-4 flex items-center justify-between relative">
        <div className="relative">
          <button 
            onClick={() => setShowModeMenu(!showModeMenu)}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-sm overflow-hidden active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-white font-bold text-xl">person</span>
          </button>
          
          {showModeMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowModeMenu(false)}></div>
              <div className="absolute left-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 p-2 animate-in zoom-in-95 duration-200 origin-top-left">
                <button 
                  onClick={() => { setShowModeMenu(false); onSwitchRole('USER'); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-primary transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-sm font-bold">person</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Mode Pengguna</span>
                </button>
                <button 
                  onClick={() => { setShowModeMenu(false); onSwitchRole('SELLER'); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors text-left mt-1"
                >
                  <span className="material-symbols-outlined text-sm font-bold">store</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Mode Penjual</span>
                </button>
              </div>
            </>
          )}
        </div>

        <h1 className="text-xl font-display font-extrabold text-black dark:text-white tracking-tight">QLiQ</h1>
        <button 
          onClick={() => navigateTo('NOTIFICATIONS')}
          className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-50 dark:border-slate-700 active:scale-95 transition-transform relative"
        >
          <span className="material-symbols-outlined text-black dark:text-white text-xl">notifications</span>
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></div>
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
            onClick={() => setIsOffline(true)}
            className={`flex-1 py-3 px-2 rounded-xl text-[11px] font-extrabold transition-all flex items-center justify-center gap-2 ${isOffline ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 uppercase'}`}
          >
            <span className="material-symbols-outlined text-[18px]">wifi_off</span>
            OFFLINE
          </button>
        </div>
      </div>

      <div className="px-6 space-y-10">
        {isOffline && (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex gap-5 animate-in slide-in-from-top duration-500 relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-3 bg-slate-300 rounded-l-[2rem]"></div>
             <div className="ml-2 flex gap-4 items-start">
                <div className="text-slate-500 pt-1">
                  <span className="material-symbols-outlined text-[28px]">wifi_off</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[17px] font-extrabold text-black dark:text-white">Mode Offline Aktif</h3>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-snug font-medium">
                    Pilih "QR Bayar" untuk menunjukkan token offline kepada penjual.
                  </p>
                </div>
             </div>
          </div>
        )}

        <div className="text-center space-y-3">
          <p className="text-[#6c7b91] text-[13px] font-bold tracking-[0.05em] uppercase">
            {isOffline ? 'SALDO TOKEN OFFLINE' : 'SALDO DOMPET'}
          </p>
          <h2 className="text-[64px] font-display font-extrabold text-primary flex items-center justify-center tracking-tight leading-none">
            <span className="text-[28px] mt-4 mr-1 text-slate-300">Rp</span>
            {isOffline ? user.offlineBalance.toLocaleString('id-ID') : user.balance.toLocaleString('id-ID')}
          </h2>
          
          <div className="flex flex-col items-center gap-4 pt-4">
            <button 
              onClick={handleSync}
              className={`px-6 py-3 rounded-full flex items-center gap-3 transition-all ${isOffline ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-blue-50 dark:bg-blue-900/30 text-primary hover:bg-blue-100 active:scale-95 shadow-sm'}`}
            >
              <span className={`material-symbols-outlined text-[20px] font-bold`}>
                sync_alt
              </span>
              <span className="text-[14px] font-extrabold tracking-tight">
                {isOffline ? 'Aktifkan Online untuk Pindah' : 'Pindah Saldo ke Offline'}
              </span>
            </button>
            
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Sinkron Terakhir: {user.lastSynced}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleScanClick}
            className="w-full bg-white dark:bg-slate-900 p-6 rounded-[2rem] flex items-center justify-between shadow-sm hover:shadow-md transition-all active:scale-[0.98] border border-slate-50 dark:border-slate-800"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[32px] font-bold">{isOffline ? 'qr_code_2' : 'photo_camera'}</span>
              </div>
              <div className="text-left">
                <p className="text-[19px] font-extrabold text-black dark:text-white">{isOffline ? 'Tampilkan QR Bayar' : 'Scan Online'}</p>
                <p className="text-[14px] text-slate-400 font-medium">Bayar lewat QRIS</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
        </div>

        {!isOffline && user.offlineBalance < 50000 && (
          <div className="p-5 bg-orange-50 border border-orange-100 rounded-[2rem] animate-bounce cursor-pointer" onClick={() => navigateTo('TOPUP_OFFLINE')}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-orange-500 font-bold">warning</span>
              <p className="text-[12px] text-orange-700 font-extrabold uppercase tracking-tight">
                Saldo Offline Rendah! Klik untuk Pindah Saldo.
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNav active="HOME" onNavigate={navigateTo} onScanClick={handleScanClick} />
    </div>
  );
};

export default Dashboard;
