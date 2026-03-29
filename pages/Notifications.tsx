
import React, { useState } from 'react';
import { AppState } from '../types';

interface NotificationsProps {
  navigateTo: (page: AppState) => void;
  returnTo: AppState;
  appRole: 'USER' | 'SELLER';
}

const USER_NOTIFICATIONS = [
  {
    id: 1,
    type: 'PROMO',
    title: 'Diskon 50% Kopi Kenangan',
    description: 'Nikmati diskon 50% untuk semua menu minuman dengan pembayaran QLiQ Online Scan. Berlaku hingga akhir pekan!',
    time: '2 jam yang lalu',
    isRead: false,
    icon: 'local_offer',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 2,
    type: 'INFO',
    title: 'Token Offline Berhasil Sinkron',
    description: 'Batas saldo offline Anda telah diperbarui secara otomatis. Anda sekarang memiliki Rp 500.000 siap pakai tanpa internet.',
    time: '5 jam yang lalu',
    isRead: true,
    icon: 'sync_saved_locally',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    id: 3,
    type: 'MAINTENANCE',
    title: 'Pembaruan Sistem Rutin',
    description: 'Kami akan melakukan pemeliharaan sistem pada hari Minggu, 27 Okt pukul 01:00 - 04:00 WIB. Layanan offline tetap dapat digunakan.',
    time: 'Yesterday',
    isRead: true,
    icon: 'settings_suggest',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  }
];

const SELLER_NOTIFICATIONS = [
  {
    id: 1,
    type: 'SALES',
    title: 'Pembayaran Diterima!',
    description: 'Alex Johnson baru saja melakukan pembayaran sebesar Rp 65.000. Dana akan segera masuk ke saldo online Anda.',
    time: '15 menit yang lalu',
    isRead: false,
    icon: 'payments',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    id: 2,
    type: 'WITHDRAWAL',
    title: 'Penarikan Dana Berhasil',
    description: 'Penarikan dana sebesar Rp 2.500.000 ke Bank BCA telah selesai diproses.',
    time: '3 jam yang lalu',
    isRead: true,
    icon: 'account_balance',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 3,
    type: 'REPORT',
    title: 'Laporan Bulanan Tersedia',
    description: 'Analisis performa toko Anda untuk bulan September sudah siap dilihat. Omzet Anda meningkat 12%!',
    time: 'Yesterday',
    icon: 'analytics',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    isRead: true
  },
  {
    id: 4,
    type: 'SYSTEM',
    title: 'Info Merchant: Kebijakan QRIS 2024',
    description: 'Ada pembaruan mengenai biaya MDR QRIS untuk merchant mikro. Ketuk untuk membaca detail selengkapnya.',
    time: '2 hari lalu',
    icon: 'info',
    color: 'text-slate-600',
    bg: 'bg-slate-100',
    isRead: true
  }
];

const Notifications: React.FC<NotificationsProps> = ({ navigateTo, returnTo, appRole }) => {
  const isSeller = appRole === 'SELLER';
  const data = isSeller ? SELLER_NOTIFICATIONS : USER_NOTIFICATIONS;
  const [notifications, setNotifications] = useState(data);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo(returnTo)} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold text-black">Notifikasi</h2>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              {isSeller ? 'Merchant Center' : 'Pusat Aktivitas'}
            </p>
          </div>
        </div>
        <button 
          onClick={markAllRead}
          className="text-xs font-bold text-primary px-3 py-1.5 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
        >
          Baca Semua
        </button>
      </header>

      <div className="p-6 space-y-4 flex-1 overflow-y-auto pb-10">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div 
              key={item.id} 
              className={`p-5 rounded-[2rem] border transition-all ${item.isRead ? 'bg-white border-slate-100 shadow-sm' : 'bg-white border-blue-200 shadow-md ring-1 ring-blue-100 relative overflow-hidden'}`}
            >
              {!item.isRead && (
                <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              )}
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${item.bg} ${item.color}`}>
                  <span className="material-symbols-outlined font-bold text-2xl">{item.icon}</span>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-start justify-between">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest ${item.bg} ${item.color}`}>
                      {item.type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-black leading-tight">{item.title}</h3>
                  <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center space-y-4">
            <span className="material-symbols-outlined text-6xl">notifications_off</span>
            <p className="text-sm font-bold">Belum ada notifikasi baru</p>
          </div>
        )}
      </div>
      
      {isSeller && (
        <div className="px-6 pb-8">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-600 font-bold">trending_up</span>
            <p className="text-[11px] text-emerald-800 font-bold leading-relaxed">
              Penjualan toko Anda sedang tinggi! Periksa tab Laporan untuk analisis lebih dalam.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
