
import React, { useState } from 'react';
import { AppState, UserProfile } from '../types';

interface SignUpProps {
  navigateTo: (page: AppState) => void;
  onSignUp: (newUser: UserProfile) => boolean;
}

const SignUp: React.FC<SignUpProps> = ({ navigateTo, onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignUpSubmit = () => {
    if (!name || !email || !phone || !password) {
      setError('Harap isi semua bidang');
      return;
    }

    const newUser: UserProfile = {
      name,
      email,
      phone,
      password,
      balance: 0, 
      offlineBalance: 0, 
      lastSynced: 'Hari Ini, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      linkedAccounts: [],
    };

    const success = onSignUp(newUser);
    if (!success) {
      setError('Akun dengan email atau nomor ini sudah terdaftar');
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen px-8 pt-16 pb-12 animate-in slide-in-from-right duration-500 bg-[#f8f9fb]">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => navigateTo('LOGIN')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-2xl font-extrabold text-black">Daftar Akun</h2>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto">
        <div className="space-y-4">
          {error && (
            <div className="p-4 bg-red-50 text-red-500 text-xs font-bold rounded-xl animate-in shake duration-300">
              {error}
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Contoh: Alex Johnson"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-black font-bold placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Alamat Email</label>
            <input 
              type="email" 
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-black font-bold placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Nomor Telepon</label>
            <input 
              type="tel" 
              placeholder="0812..."
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setError(''); }}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-black font-bold placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Kata Sandi</label>
            <div className="relative group">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Min. 8 karakter"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-black font-bold placeholder:text-gray-300"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-slate-500 font-medium leading-relaxed px-1">
          Dengan mendaftar, Anda menyetujui <button onClick={() => navigateTo('TERMS')} className="font-extrabold text-black hover:text-primary">Syarat Layanan</button> dan <button onClick={() => navigateTo('PRIVACY')} className="font-extrabold text-black hover:text-primary">Kebijakan Privasi</button> kami.
        </p>

        <button 
          onClick={handleSignUpSubmit}
          className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Daftar Sekarang
          <span className="material-symbols-outlined">how_to_reg</span>
        </button>
      </div>

      <div className="text-center pt-8">
        <p className="text-sm text-black font-medium">
          Sudah punya akun? <button onClick={() => navigateTo('LOGIN')} className="font-extrabold text-primary hover:underline ml-1">Masuk</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
