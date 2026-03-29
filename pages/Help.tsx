
import React, { useState } from 'react';
import { AppState } from '../types';

interface HelpProps {
  navigateTo: (page: AppState) => void;
}

const FAQ_DATA = [
  {
    q: "Bagaimana cara kerja pembayaran offline?",
    a: "QLiQ menggunakan sistem token terenkripsi yang disimpan di perangkat Anda. Saat Anda melakukan scan tanpa internet, token ini diberikan ke merchant dan akan tersinkronisasi secara otomatis saat Anda kembali online."
  },
  {
    q: "Apa itu limit saldo offline?",
    a: "Limit ini adalah jumlah maksimum dana yang dapat Anda gunakan saat tidak ada koneksi internet. Anda dapat mengatur limit ini di menu Pengaturan Token Offline."
  },
  {
    q: "Apakah aman jika HP saya hilang?",
    a: "Sangat aman. Pembayaran offline tetap memerlukan PIN atau verifikasi biometrik. Anda juga dapat memblokir akses perangkat dari menu Manajemen Perangkat di perangkat lain."
  }
];

const Help: React.FC<HelpProps> = ({ navigateTo }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-300 bg-[#f8f9fb]">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-slate-50">
        <button onClick={() => navigateTo('PROFILE')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Bantuan & Dukungan</h2>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
        {/* Support Options */}
        <div className="space-y-4">
          <h3 className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Layanan Utama</h3>
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => navigateTo('LIVE_SUPPORT')}
              className="flex items-center gap-4 p-6 bg-primary rounded-[2rem] text-white shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl font-bold">support_agent</span>
              </div>
              <div className="text-left">
                <p className="font-extrabold text-lg">Live Agent AI 24/7</p>
                <p className="text-white/70 text-xs font-medium">Bicara langsung dengan asisten pintar kami</p>
              </div>
              <span className="material-symbols-outlined ml-auto">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="space-y-4">
          <h3 className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Kontak Kami</h3>
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
            <a href="mailto:support@qliq.payment" className="flex items-center justify-between p-5 active:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">mail</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-black">Email Support</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">support@qliq.payment</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300">open_in_new</span>
            </a>
            <a href="tel:08001234567" className="flex items-center justify-between p-5 active:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">call</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-black">Layanan Telepon</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">0800-1-QLIQ (24 Jam)</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300">call</span>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 pb-12">
          <h3 className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Pertanyaan Umum (FaQ)</h3>
          <div className="space-y-3">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left active:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-extrabold text-black pr-4">{item.q}</span>
                  <span className={`material-symbols-outlined text-slate-300 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 animate-in slide-in-from-top duration-300">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
