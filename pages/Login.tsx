
import React, { useState } from 'react';
import { AppState } from '../types';
import { IMAGES } from '../constants';

interface LoginProps {
  onLogin: (identifier: string, pass: string, rememberMe: boolean) => boolean;
  navigateTo: (page: AppState) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, navigateTo }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleLoginSubmit = () => {
    if (!identifier || !password) {
      setError('Harap masukkan kredensial');
      return;
    }
    const success = onLogin(identifier, password, rememberMe);
    if (!success) {
      setError('Email/No HP atau Password salah');
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen px-8 pt-20 pb-12 animate-in fade-in duration-500 bg-[#f8f9fb]">
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative text-black">
            <span className="material-symbols-outlined text-6xl font-bold">qr_code_2</span>
            <span className="material-symbols-outlined text-2xl absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm text-primary">wifi</span>
          </div>
          <h1 className="text-5xl font-display font-extrabold text-black tracking-tight">QLIQ</h1>
        </div>
        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 text-center">
          Secure Offline Payment Portal
        </p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-4">
          {error && (
            <div className="p-4 bg-red-50 text-red-500 text-xs font-bold rounded-xl animate-in shake duration-300 text-center border border-red-100">
              {error}
            </div>
          )}
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Email atau nomor telepon"
              value={identifier}
              onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-black font-bold placeholder:text-gray-400"
            />
          </div>
          <div className="relative group">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-black font-bold placeholder:text-gray-400"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded-md transition-all ${rememberMe ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                {rememberMe && <span className="material-symbols-outlined text-white text-sm font-bold absolute inset-0 flex items-center justify-center">check</span>}
              </div>
            </div>
            <span className="text-sm font-bold text-slate-500 group-hover:text-black transition-colors">Ingat Saya</span>
          </label>
          <button 
            onClick={() => navigateTo('FORGOT_PASSWORD')}
            className="text-sm font-extrabold text-primary hover:text-primary-dark transition-colors"
          >
            Lupa Password?
          </button>
        </div>

        <button 
          onClick={handleLoginSubmit}
          className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          Masuk Sekarang
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>

        <div className="pt-4">
          <div className="flex items-center gap-3 opacity-20 mb-6">
            <div className="h-[1px] bg-black flex-1"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Atau masuk dengan</span>
            <div className="h-[1px] bg-black flex-1"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <button className="py-3 px-4 border border-slate-200 rounded-xl bg-white flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                <span className="text-xs font-bold text-slate-600">Google</span>
             </button>
             <button className="py-3 px-4 border border-slate-200 rounded-xl bg-white flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-blue-600 text-lg">facebook</span>
                <span className="text-xs font-bold text-slate-600">Facebook</span>
             </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-slate-500 font-medium">
          Belum punya akun? <button onClick={() => navigateTo('SIGNUP')} className="font-extrabold text-primary hover:underline ml-1">Daftar Akun Gratis</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
