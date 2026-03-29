
import React, { useState, useEffect } from 'react';
import { UserProfile, AppState } from '../types';

interface ShowTokenProps {
  user: UserProfile;
  navigateTo: (page: AppState) => void;
}

const ShowToken: React.FC<ShowTokenProps> = ({ user, navigateTo }) => {
  const [brightness, setBrightness] = useState(100);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Simulasi token data terenkripsi
  const tokenData = `QLIQ-OFFLINE-TOKEN-${user.phone}-${Date.now()}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(tokenData)}&color=1152d4`;

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#f8f9fb] animate-in slide-in-from-bottom duration-500">
      <header className="p-6 flex items-center justify-between bg-white border-b border-slate-50 sticky top-0 z-10">
        <button onClick={() => navigateTo('DASHBOARD')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">close</span>
        </button>
        <h2 className="text-lg font-extrabold text-black tracking-tight">QR Bayar Offline</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8 space-y-10">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-500/10 border border-slate-100 flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-64 h-64 flex items-center justify-center bg-slate-50 rounded-3xl overflow-hidden p-4">
               <img src={qrUrl} alt="Offline Payment Token" className="w-full h-full mix-blend-multiply" />
            </div>
            {/* Timer circle indicator */}
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-extrabold">
              {timer}s
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-black font-extrabold text-sm uppercase tracking-widest">Pindai QR ini</p>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Token Keamanan Dinamis</p>
          </div>
        </div>

        <div className="w-full space-y-6">
          <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 space-y-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined font-bold">account_balance_wallet</span>
                </div>
                <div>
                   <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Saldo Token Offline</p>
                   <p className="text-xl font-extrabold text-black">Rp {user.offlineBalance.toLocaleString('id-ID')}</p>
                </div>
             </div>
             <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic border-t border-blue-100/50 pt-4">
               "Tunjukkan kode ini kepada penjual. Transaksi akan mengurangi saldo token offline Anda secara otomatis."
             </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 text-slate-400">
               <span className="material-symbols-outlined text-sm">light_mode</span>
               <p className="text-[10px] font-extrabold uppercase tracking-widest">Kecerahan Layar Maksimal Otomatis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 pb-12 text-center">
        <button 
          onClick={() => navigateTo('DASHBOARD')}
          className="text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors"
        >
          Batalkan Pembayaran
        </button>
      </div>
    </div>
  );
};

export default ShowToken;
