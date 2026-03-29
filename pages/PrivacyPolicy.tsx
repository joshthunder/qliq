
import React from 'react';
import { AppState } from '../types';

interface PrivacyPolicyProps {
  navigateTo: (page: AppState) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col h-full min-h-screen animate-in slide-in-from-right duration-500 bg-white">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b border-slate-100">
        <button onClick={() => navigateTo('SIGNUP')} className="w-10 h-10 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-extrabold text-black">Kebijakan Privasi Detail</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 text-slate-700">
        <p className="text-xs text-slate-400 italic">Terakhir diperbarui: 24 Januari 2024</p>
        
        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">1. Pengumpulan Data Biometrik</h3>
          <p className="text-sm leading-relaxed text-justify">
            QLiQ menggunakan sistem autentikasi biometrik perangkat Anda (FaceID, TouchID, atau sensor sidik jari lainnya). Kami <span className="font-bold">TIDAK PERNAH</span> menyimpan data biometrik Anda di server kami. Proses verifikasi terjadi sepenuhnya di dalam chip keamanan (Secure Enclave) pada perangkat Anda, dan kami hanya menerima konfirmasi "Sukses" atau "Gagal" dari sistem operasi.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">2. Enkripsi Data Offline</h3>
          <p className="text-sm leading-relaxed text-justify">
            Token offline Anda dienkripsi menggunakan standar AES-256 tingkat militer. Kunci enkripsi dibuat secara unik untuk setiap perangkat dan diikat ke ID hardware perangkat Anda. Ini memastikan bahwa meskipun data aplikasi Anda dicadangkan ke cloud (seperti iCloud atau Google Drive), token tersebut tidak akan dapat digunakan di perangkat lain.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">3. Lokasi dan Geolokasi</h3>
          <p className="text-sm leading-relaxed text-justify">
            Kami mengumpulkan data lokasi Anda hanya pada saat transaksi QRIS dilakukan (baik online maupun offline). Data ini diperlukan oleh regulasi QRIS nasional untuk memverifikasi keabsahan merchant dan mencegah transaksi lintas negara yang tidak sah.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">4. Retensi dan Penghapusan Data</h3>
          <p className="text-sm leading-relaxed text-justify">
            Riwayat transaksi Anda akan disimpan selama minimal 10 tahun sesuai dengan peraturan perundang-undangan di bidang perbankan. Namun, Anda memiliki hak untuk meminta penutupan akun. Setelah akun ditutup, data pribadi yang tidak wajib disimpan secara hukum akan dihapus atau dianonimkan dalam waktu 30 hari kerja.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-black">5. Cookies dan Pelacakan</h3>
          <p className="text-sm leading-relaxed text-justify">
            Aplikasi kami menggunakan identifikasi sesi (Session IDs) untuk menjaga status login Anda. Kami tidak menggunakan pelacak pihak ketiga untuk tujuan periklanan di dalam aplikasi finansial kami.
          </p>
        </section>

        <div className="pt-10 pb-20">
          <button 
            onClick={() => navigateTo('SIGNUP')}
            className="w-full py-5 bg-primary text-white font-bold rounded-2xl active:scale-95 transition-transform"
          >
            Saya Menyetujui Kebijakan Ini
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
