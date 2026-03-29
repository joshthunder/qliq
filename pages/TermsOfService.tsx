
import React from 'react';
import { AppState } from '../types';

interface TermsOfServiceProps {
  navigateTo: (page: AppState) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-500 bg-white">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b border-slate-100">
        <button onClick={() => navigateTo('SIGNUP')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Syarat Layanan Detail</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 text-slate-700">
        <p className="text-xs text-slate-400 italic">Versi 2.1 - Efektif mulai 1 Januari 2024</p>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">1. Cakupan Layanan QLiQ</h3>
          <p className="text-sm leading-relaxed text-justify">
            QLiQ adalah platform teknologi finansial yang memfasilitasi transaksi QRIS baik dalam kondisi online (terhubung internet) maupun offline (tidak terhubung internet). Layanan offline kami menggunakan teknologi "Safety-Token Ledger" yang memungkinkan penyimpanan otorisasi pembayaran sementara di dalam elemen aman perangkat Anda.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">2. Ketentuan Transaksi Offline</h3>
          <p className="text-sm leading-relaxed text-justify">
            Pengguna memahami bahwa fitur pembayaran offline tunduk pada batasan-batasan berikut:
          </p>
          <ul className="list-disc pl-5 text-sm space-y-3">
            <li><span className="font-bold">Masa Berlaku Token:</span> Token offline hanya berlaku selama 24-72 jam (tergantung profil risiko pengguna) sejak sinkronisasi terakhir.</li>
            <li><span className="font-bold">Otorisasi Ganda:</span> Transaksi offline akan didebit dari Saldo Token Offline Anda secara instan dan tidak dapat dibatalkan setelah Merchant memindai kode Anda.</li>
            <li><span className="font-bold">Sinkronisasi Tertunda:</span> Data transaksi akan dikirim ke server pusat QLiQ segera setelah perangkat mendapatkan akses internet. Merchant wajib melakukan sinkronisasi untuk mencairkan dana.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">3. Keamanan Akun dan Biometrik</h3>
          <p className="text-sm leading-relaxed text-justify">
            Anda bertanggung jawab atas segala aktivitas yang terjadi di bawah akun Anda. QLiQ sangat menyarankan penggunaan autentikasi biometrik (FaceID/Fingerprint) dan PIN minimal 6 digit yang tidak mudah ditebak. Kegagalan menjaga kerahasiaan kredensial adalah tanggung jawab mutlak pengguna.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">4. Kebijakan Anti Pencucian Uang (AML)</h3>
          <p className="text-sm leading-relaxed text-justify">
            Sesuai dengan regulasi Bank Indonesia, QLiQ akan melakukan pemantauan transaksi secara otomatis untuk mendeteksi pola mencurigakan. QLiQ berhak membekukan akun yang terindikasi melakukan tindakan melanggar hukum, pencucian uang, atau pendanaan terorisme.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">5. Batasan Tanggung Jawab</h3>
          <p className="text-sm leading-relaxed text-justify">
            QLiQ tidak bertanggung jawab atas kerugian yang timbul akibat kerusakan perangkat keras pengguna, kehilangan perangkat, atau penyalahgunaan akun oleh pihak ketiga yang disebabkan oleh kelalaian pengguna.
          </p>
        </section>

        <div className="pt-10 pb-20">
          <button 
            onClick={() => navigateTo('SIGNUP')}
            className="w-full py-5 bg-primary text-white font-bold rounded-2xl active:scale-95 transition-transform"
          >
            Saya Menyetujui Seluruh Ketentuan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
