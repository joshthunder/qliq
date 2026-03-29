
import React from 'react';
import { AppState } from '../types';

interface BottomNavProps {
  active: 'HOME' | 'ACTIVITY' | 'SCAN' | 'WALLET' | 'PROFILE';
  onNavigate: (page: AppState) => void;
  onScanClick: () => void;
  homePath?: AppState;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate, onScanClick, homePath = 'DASHBOARD' }) => {
  const isSeller = homePath === 'SELLER_DASHBOARD';

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 pb-10 pt-2 z-50">
      <div className="flex items-center justify-around h-16 relative px-2">
        <button 
          onClick={() => onNavigate(homePath)}
          className={`flex flex-col items-center justify-center w-full gap-1 transition-colors ${active === 'HOME' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${active === 'HOME' ? 'filled' : ''}`}>home</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Beranda</span>
        </button>
        
        <button 
          onClick={() => onNavigate('ACTIVITY')}
          className={`flex flex-col items-center justify-center w-full gap-1 transition-colors ${active === 'ACTIVITY' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${active === 'ACTIVITY' ? 'filled' : ''}`}>receipt_long</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">{isSeller ? 'Laporan' : 'Riwayat'}</span>
        </button>

        {!isSeller && (
          <div className="relative flex flex-col items-center justify-center w-full">
            <button 
              onClick={onScanClick}
              className="absolute -top-10 w-16 h-16 rounded-full bg-primary text-white shadow-xl shadow-blue-500/40 border-4 border-white dark:border-background-dark active:scale-90 transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[32px] font-bold">qr_code_scanner</span>
            </button>
            <div className="mt-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scan</span>
            </div>
          </div>
        )}

        <button 
          onClick={() => onNavigate('WALLET')}
          className={`flex flex-col items-center justify-center w-full gap-1 transition-colors ${active === 'WALLET' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${active === 'WALLET' ? 'filled' : ''}`}>account_balance_wallet</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Dompet</span>
        </button>

        <button 
          onClick={() => onNavigate('PROFILE')}
          className={`flex flex-col items-center justify-center w-full gap-1 transition-colors ${active === 'PROFILE' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${active === 'PROFILE' ? 'filled' : ''}`}>person</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Profil</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
