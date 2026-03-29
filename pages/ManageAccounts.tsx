
import React, { useState } from 'react';
import { UserProfile, AppState, BankAccount } from '../types';

interface ManageAccountsProps {
  user: UserProfile;
  navigateTo: (page: AppState) => void;
  onUpdateAccounts: (accounts: BankAccount[]) => void;
}

const BANKS = ['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga', 'Danamon'];

const ManageAccounts: React.FC<ManageAccountsProps> = ({ user, navigateTo, onUpdateAccounts }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [bankName, setBankName] = useState('BCA');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState(user.name);

  const handleAddAccount = () => {
    if (!accountNumber || !accountHolder) return;
    
    const newAccount: BankAccount = {
      id: Date.now().toString(),
      bankName,
      accountNumber,
      accountHolder,
      isDefault: user.linkedAccounts.length === 0
    };
    
    onUpdateAccounts([...user.linkedAccounts, newAccount]);
    setShowAddForm(false);
    setAccountNumber('');
  };

  const handleRemoveAccount = (id: string) => {
    onUpdateAccounts(user.linkedAccounts.filter(a => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    onUpdateAccounts(user.linkedAccounts.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
  };

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-500 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b border-slate-100">
        <button onClick={() => navigateTo('WALLET')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Kelola Rekening</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {!showAddForm ? (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Rekening Terdaftar</h3>
                <p className="text-[10px] font-bold text-slate-400">{user.linkedAccounts.length}/5</p>
              </div>
              
              <div className="space-y-3">
                {user.linkedAccounts.map(account => (
                  <div key={account.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 font-bold uppercase text-[10px]">
                          {account.bankName}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-black">{account.bankName}</p>
                          <p className="text-[13px] text-slate-600 font-bold">{account.accountNumber}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveAccount(account.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{account.accountHolder}</p>
                      {account.isDefault ? (
                        <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Utama</span>
                      ) : (
                        <button 
                          onClick={() => handleSetDefault(account.id)}
                          className="text-[9px] font-extrabold text-primary hover:underline uppercase"
                        >
                          Jadikan Utama
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {user.linkedAccounts.length === 0 && (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <span className="material-symbols-outlined text-6xl">account_balance</span>
                    <p className="text-sm font-bold">Belum ada rekening penarikan</p>
                  </div>
                )}
              </div>
            </div>

            {user.linkedAccounts.length < 5 && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="w-full py-5 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-extrabold text-sm flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined">add</span>
                Tambah Rekening Baru
              </button>
            )}
          </>
        ) : (
          <div className="animate-in slide-in-from-bottom duration-300 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div className="text-center space-y-2 mb-4">
                <h3 className="text-lg font-extrabold text-black">Tambah Rekening</h3>
                <p className="text-xs text-slate-500 font-medium">Masukkan detail rekening bank Anda</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Nama Bank</label>
                  <select 
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-black font-bold"
                  >
                    {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Nomor Rekening</label>
                  <input 
                    type="number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Contoh: 482100xxxx"
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-black font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Nama Pemilik Rekening</label>
                  <input 
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-black font-bold"
                  />
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-500 font-extrabold rounded-2xl active:scale-95 transition-transform"
                >
                  Batal
                </button>
                <button 
                  onClick={handleAddAccount}
                  className="flex-1 py-4 bg-primary text-white font-extrabold rounded-2xl active:scale-95 transition-transform"
                >
                  Simpan
                </button>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
              <span className="material-symbols-outlined text-primary font-bold">verified_user</span>
              <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                Kami melakukan verifikasi otomatis untuk memastikan nomor rekening valid dan aman untuk transaksi.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccounts;
