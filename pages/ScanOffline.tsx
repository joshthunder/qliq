
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, AppState } from '../types';

interface ScanOfflineProps {
  user: UserProfile;
  onComplete: () => void;
  navigateTo: (page: AppState) => void;
  returnTo: AppState;
}

const SCAN_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';

const ScanOffline: React.FC<ScanOfflineProps> = ({ user, onComplete, navigateTo, returnTo }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes session
  const videoRef = useRef<HTMLVideoElement>(null);
  const scanAudioRef = useRef<HTMLAudioElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    scanAudioRef.current = new Audio(SCAN_SOUND_URL);
  }, []);

  const playScanSound = () => {
    if (scanAudioRef.current) {
      scanAudioRef.current.currentTime = 0;
      scanAudioRef.current.play().catch(err => console.debug("Sound blocked:", err));
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasError(true);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulateScan = () => {
    if (isProcessing) return;
    const requiredAmount = 150000;
    if (user.offlineBalance < requiredAmount) {
      alert('Saldo Token Offline tidak mencukupi!');
      return;
    }
    setIsProcessing(true);
    playScanSound();
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-black overflow-hidden relative">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      <div className="relative z-10 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => navigateTo(returnTo)} 
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-bold">close</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-white font-extrabold text-sm uppercase tracking-widest">Scanner Offline</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Mode Terkunci</p>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
          <p className="text-[8px] text-white/60 font-bold uppercase">Sesi</p>
          <p className="text-[10px] text-white font-extrabold">{formatTime(timeLeft)}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="relative w-72 h-72">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl shadow-[0_0_15px_rgba(17,82,212,0.5)]"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl shadow-[0_0_15px_rgba(17,82,212,0.5)]"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl shadow-[0_0_15px_rgba(17,82,212,0.5)]"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl shadow-[0_0_15px_rgba(17,82,212,0.5)]"></div>
          
          <div className={`absolute left-2 right-2 h-1 bg-primary/60 shadow-[0_0_20px_rgba(17,82,212,0.8)] rounded-full transition-all duration-1000 ease-in-out ${isProcessing ? 'top-1/2 opacity-0' : 'animate-scan'}`}></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-3 animate-in zoom-in duration-300">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white font-extrabold text-xs uppercase tracking-widest">Memproses Token...</p>
              </div>
            ) : (
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center px-10">
                Arahkan ke QR Token Offline Pembeli
              </p>
            )}
          </div>
        </div>

        {!isProcessing && (
          <div className="mt-12 text-center space-y-4">
            <p className="text-white font-bold text-sm drop-shadow-md">Scan QR Token untuk validasi pembayaran</p>
            <button 
              onClick={handleSimulateScan}
              className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-white/50 text-[10px] font-extrabold uppercase tracking-[0.2em] active:bg-white/10 transition-colors"
            >
              Simulasikan Deteksi Token
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 p-8 bg-gradient-to-t from-black/90 to-transparent">
        <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined font-bold">verified_user</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-extrabold text-sm tracking-tight">Validasi Kriptografi</h4>
              <p className="text-white/50 text-[11px] leading-relaxed">
                Setiap token offline divalidasi menggunakan kunci privat perangkat pembeli secara aman.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 5%; }
          50% { top: 95%; }
        }
        .animate-scan {
          animation: scan 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ScanOffline;
