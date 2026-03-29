
import React, { useState } from 'react';
import { UserProfile, AppState } from '../types';
import BottomNav from '../components/BottomNav';

interface WalletProps {
  user: UserProfile;
  navigateTo: (page: AppState) => void;
  handleScanClick: () => void;
  appRole?: 'USER' | 'SELLER';
}

const Wallet: React.FC<WalletProps> = ({ user, navigateTo, handleScanClick, appRole = 'USER' }) => {
  const isSeller = appRole === 'SELLER';
  const [showReportOptions, setShowReportOptions] = useState(false);

  return (
    <div className="flex flex-col h-full min-h-screen pb-32 animate-in fade-in duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-slate-50">
        <h2 className="text-2xl font-extrabold text-black">
          {isSeller ? 'Dompet Toko' : 'Dompet Saya'}
        </h2>
        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-black">
          <span className="material-symbols-outlined font-bold">
            {isSeller ? 'storefront' : 'account_balance_wallet'}
          </span>
        </button>
      </header>

      <div className="px-6 space-y-8 pt-4">
        {/* Main Balance Card */}
        <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 space-y-1">
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
              {isSeller ? 'Total Saldo Pendapatan' : 'Total Saldo Online'}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="text-xl mr-1">Rp</span>
              {user.balance.toLocaleString('id-ID')}
            </h1>
            <div className="pt-6 flex items-center justify-between border-t border-white/10 mt-6">
              <div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-tighter">Status Akun</p>
                <p className="font-extrabold text-sm">{isSeller ? 'Merchant Terverifikasi' : 'User Premium'}</p>
              </div>
              {!isSeller && (
                <div className="text-right">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-tighter">Token Offline</p>
                  <p className="font-extrabold text-sm">Rp {user.offlineBalance.toLocaleString('id-ID')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className={`grid ${isSeller ? 'grid-cols-2' : 'grid-cols-5'} gap-2`}>
          {isSeller ? (
            <>
              <button 
                onClick={() => navigateTo('WITHDRAW')}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 active:scale-95 transition-all group"
              >
                <div className="w-14 h-14 bg-emerald-100/50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <span className="material-symbols-outlined text-3xl font-bold">payments</span>
                </div>
                <span className="text-[11px] font-extrabold text-black uppercase tracking-widest text-center">Tarik Dana</span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowReportOptions(!showReportOptions)}
                  className="w-full flex flex-col items-center gap-3 p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 active:scale-95 transition-all group"
                >
                  <div className="w-14 h-14 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <span className="material-symbols-outlined text-3xl font-bold">analytics</span>
                  </div>
                  <span className="text-[11px] font-extrabold text-black uppercase tracking-widest text-center">Laporan</span>
                </button>

                {showReportOptions && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowReportOptions(false)}></div>
                    <div className="absolute right-0 bottom-full mb-3 w-44 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 p-2 animate-in slide-in-from-bottom-2 duration-200">
                      <button 
                        onClick={() => { setShowReportOptions(false); navigateTo('ACTIVITY'); }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">history</span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider">Harian</span>
                      </button>
                      <button 
                        onClick={() => { setShowReportOptions(false); navigateTo('MONTHLY_REPORT'); }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors text-left mt-1"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">calendar_month</span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider">Bulanan</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {[
                { icon: 'add_circle', label: 'Top Up', page: 'TOPUP', color: 'text-blue-600', bg: 'bg-blue-100/50' },
                { icon: 'sync_alt', label: 'Pindah Offline', page: 'TOPUP_OFFLINE', color: 'text-orange-600', bg: 'bg-orange-100/50' },
                { icon: 'send', label: 'Transfer', page: 'TRANSFER', color: 'text-purple-600', bg: 'bg-purple-100/50' },
                { icon: 'payments', label: 'Tarik', page: 'WITHDRAW', color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
                { icon: 'history', label: 'Riwayat', page: 'ACTIVITY', color: 'text-slate-600', bg: 'bg-slate-100' },
              ].map((action) => (
                <button 
                  key={action.label}
                  onClick={() => navigateTo(action.page as AppState)}
                  className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
                >
                  <div className={`w-12 h-12 ${action.bg} rounded-2xl flex items-center justify-center ${action.color} shadow-sm group-hover:shadow-md transition-all`}>
                    <span className="material-symbols-outlined text-2xl font-bold">{action.icon}</span>
                  </div>
                  <span className="text-[9px] font-extrabold text-black uppercase tracking-tighter text-center leading-tight">{action.label}</span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Linked Banks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[13px] font-extrabold text-slate-400 uppercase tracking-widest">Rekening Penarikan</h3>
            <button onClick={() => navigateTo('MANAGE_ACCOUNTS')} className="text-xs font-bold text-primary">Kelola Rekening</button>
          </div>
          <div className="space-y-3 text-black">
            {user.linkedAccounts && user.linkedAccounts.length > 0 ? (
              user.linkedAccounts.map(account => (
                <div key={account.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 font-bold uppercase text-[10px]">
                      {account.bankName}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-black">{account.bankName} • • • • {account.accountNumber.slice(-4)}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{account.accountHolder}</p>
                    </div>
                  </div>
                  {account.isDefault && <span className="material-symbols-outlined text-emerald-500 font-bold">verified</span>}
                </div>
              ))
            ) : (
              <div className="bg-white p-10 rounded-[2rem] border border-dashed border-slate-200 text-center space-y-2">
                <p className="text-slate-400 text-sm font-bold">Belum ada rekening tertaut</p>
                <button onClick={() => navigateTo('MANAGE_ACCOUNTS')} className="text-primary text-xs font-extrabold uppercase">Tambah Rekening</button>
              </div>
            )}
          </div>
        </div>

        {isSeller && (
          <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
            <span className="material-symbols-outlined text-primary font-bold">info</span>
            <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
              Penarikan ke Bank BCA diproses instan 24/7. Seluruh dana penjualan Anda dijamin aman dan terenkripsi.
            </p>
          </div>
        )}
      </div>

      <BottomNav 
        active="WALLET" 
        onNavigate={navigateTo} 
        onScanClick={handleScanClick} 
        homePath={isSeller ? 'SELLER_DASHBOARD' : 'DASHBOARD'}
      />
    </div>
  );
};

export default Wallet;
