
import React, { useRef } from 'react';
import { UserProfile, AppState } from '../types';
import BottomNav from '../components/BottomNav';

interface ProfileProps {
  user: UserProfile;
  syncLimit: number;
  syncSchedule: string;
  navigateTo: (page: AppState) => void;
  handleScanClick: () => void;
  onLogout: () => void;
  onUpdateImage: (imageUrl: string) => void;
  appRole?: 'USER' | 'SELLER';
}

const Profile: React.FC<ProfileProps> = ({ user, syncLimit, syncSchedule, navigateTo, handleScanClick, onLogout, onUpdateImage, appRole = 'USER' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isSeller = appRole === 'SELLER';

  const handleItemClick = (label: string) => {
    switch (label) {
      case 'Rekening Bank':
      case 'Rekening Penarikan':
        navigateTo('WALLET');
        break;
      case 'Token Offline':
        navigateTo('OFFLINE_TOKENS');
        break;
      case 'Jadwal Sinkron':
        navigateTo('SYNC_SCHEDULE');
        break;
      case 'Manajemen Perangkat':
        navigateTo('DEVICE_MANAGEMENT');
        break;
      case 'Ubah PIN':
        navigateTo('CHANGE_PIN');
        break;
      case 'Info Pribadi':
      case 'Informasi Toko':
        navigateTo('PERSONAL_INFO');
        break;
      case 'Bantuan & Dukungan':
        navigateTo('HELP');
        break;
      default:
        break;
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen pb-32 animate-in slide-in-from-right duration-300 overflow-y-auto bg-[#f8f9fb]">
      <header className="p-6 text-center sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-slate-50">
        <h2 className="text-xl font-extrabold text-black">
          {isSeller ? 'Pengaturan Toko' : 'Profil & Pengaturan'}
        </h2>
      </header>

      <div className="flex flex-col items-center pt-8 pb-8 bg-white mb-6">
        <div className="relative mb-6">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div 
            onClick={handleImageClick}
            className="w-28 h-28 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-extrabold shadow-xl ring-4 ring-slate-50 overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              isSeller ? <span className="material-symbols-outlined text-5xl">storefront</span> : user.name.split(' ').map(n => n[0]).join('')
            )}
          </div>
          <button 
            onClick={handleImageClick}
            className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-primary text-xl font-bold">edit</span>
          </button>
        </div>
        <h1 className="text-2xl font-extrabold text-black">
          {isSeller ? 'Kedai Kopi Terang' : user.name}
        </h1>
        <p className="text-slate-500 font-bold text-sm mt-1">
          {isSeller ? 'Merchant ID: QLQ-7721-00' : user.phone}
        </p>
        <div className="mt-4 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full flex items-center gap-2">
           <span className="material-symbols-outlined text-primary text-sm font-bold">
             {isSeller ? 'verified' : 'person'}
           </span>
           <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">
             {isSeller ? 'Akun Merchant Terverifikasi' : 'Akun Personal Premium'}
           </span>
        </div>
      </div>

      <div className="px-6 space-y-10">
        {[
          {
            title: isSeller ? 'Identitas Bisnis' : 'Informasi Akun',
            items: [
              { icon: isSeller ? 'store' : 'person', label: isSeller ? 'Informasi Toko' : 'Info Pribadi' },
              { icon: 'account_balance', label: isSeller ? 'Rekening Penarikan' : 'Rekening Bank' }
            ]
          },
          {
            title: isSeller ? 'Keamanan Merchant' : 'Pengaturan Keamanan',
            items: [
              { icon: 'lock', label: 'Ubah PIN' },
              { icon: 'face', label: isSeller ? 'Biometrik Login' : 'Aktifkan FaceID', toggle: true },
              { icon: 'devices', label: 'Manajemen Perangkat' }
            ]
          },
          ...(!isSeller ? [{
            title: 'Kontrol Pembayaran',
            items: [
              { icon: 'offline_bolt', label: 'Token Offline', value: `Rp ${syncLimit.toLocaleString('id-ID')}` },
              { icon: 'sync', label: 'Jadwal Sinkron', value: syncSchedule === 'Daily' ? 'Harian' : 'Mingguan' }
            ]
          }] : []),
          {
            title: 'Lainnya',
            items: [
              { icon: 'help', label: 'Bantuan & Dukungan' }
            ]
          }
        ].map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">{section.title}</h3>
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
              {section.items.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => handleItemClick(item.label)}
                  className="w-full flex items-center justify-between p-5 active:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined font-bold">{item.icon}</span>
                    </div>
                    <span className="text-[16px] font-bold text-black">{item.label}</span>
                  </div>
                  {item.toggle ? (
                    <div className="w-12 h-6 bg-primary rounded-full relative p-1 shadow-inner">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm"></div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {item.value && <span className="text-[11px] text-primary font-extrabold bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">{item.value}</span>}
                      <span className="material-symbols-outlined text-slate-300 text-xl font-bold">chevron_right</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col items-center py-10 space-y-4">
          <button onClick={onLogout} className="w-full py-5 border-2 border-red-50 text-red-500 font-extrabold text-lg rounded-[2rem] hover:bg-red-50 transition-colors active:scale-95">
            Keluar Akun
          </button>
          <p className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">QLiQ v2.4.0 (Merchant Edition)</p>
        </div>
      </div>

      <BottomNav 
        active="PROFILE" 
        onNavigate={navigateTo} 
        onScanClick={handleScanClick} 
        homePath={isSeller ? 'SELLER_DASHBOARD' : 'DASHBOARD'}
      />
    </div>
  );
};

export default Profile;
