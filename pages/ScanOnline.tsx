
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, AppState } from '../types';

interface ScanOnlineProps {
  user: UserProfile;
  onComplete: (amount: number, merchant: string) => void;
  navigateTo: (page: AppState) => void;
  returnTo: AppState;
}

const SCAN_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';

const ScanOnline: React.FC<ScanOnlineProps> = ({ user, onComplete, navigateTo, returnTo }) => {
  const [mode, setMode] = useState<'CAMERA' | 'SELLER'>('CAMERA');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const scanAudioRef = useRef<HTMLAudioElement | null>(null);

  const numAmount = parseInt(amount) || 0;
  const isBalanceEnough = user.balance >= numAmount;
  const isValid = merchant.trim().length > 0 && numAmount > 0 && isBalanceEnough;

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
    if (mode === 'CAMERA') {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      };
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [mode]);

  const handleManualPay = () => {
    const amt = parseInt(amount);
    if (isValid) {
      playScanSound();
      setTimeout(() => onComplete(amt, merchant), 200);
    }
  };

  const simulateCameraScan = () => {
    const mockAmount = 75000;
    if (user.balance < mockAmount) {
      alert('Saldo tidak mencukupi!');
      return;
    }
    playScanSound();
    setTimeout(() => onComplete(mockAmount, "Coffee Shop - Mall Branch"), 200);
  };

  const qrData = encodeURIComponent(`QLIQ|${merchant}|${amount}|${Date.now()}`);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrData}&color=1152d4`;

  return (
    <div className="flex flex-col h-full min-h-screen animate-in fade-in duration-300 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex items-center justify-between">
        <button onClick={() => navigateTo(returnTo)} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
          <span className="material-symbols-outlined font-bold">chevron_left</span>
        </button>
        <div className="bg-primary/90 text-white px-5 py-2.5 rounded-full flex items-center gap-2 backdrop-blur-md">
          <span className="material-symbols-outlined text-sm">wifi</span>
          <span className="text-[12px] font-bold uppercase tracking-widest">Online Mode</span>
        </div>
        <div className="w-12 h-12" />
      </div>

      {mode === 'CAMERA' ? (
        <div className="relative flex-1 flex flex-col">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/40 shadow-[0_0_20px_rgba(17,82,212,0.8)] animate-bounce"></div>
            </div>
            <p className="text-white font-bold mt-10 text-center text-sm drop-shadow-lg">
              Arahkan ke kode QRIS untuk memindai
            </p>
            <button 
              onClick={simulateCameraScan}
              className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-md text-white/50 text-xs rounded-full border border-white/20 uppercase tracking-widest font-bold"
            >
              Simulasikan Scan
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-[#f8f9fb] dark:bg-slate-50 rounded-t-[3rem] mt-24 px-8 pt-12 space-y-8 animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-40">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-black">Scan by Seller</h2>
            <p className="text-slate-600 text-sm font-medium">Input details to generate a payment QR</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Merchant Name</label>
              <input 
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="e.g. Starbucks Coffee"
                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary text-black font-bold placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Payment Amount</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-black font-extrabold">Rp</span>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className={`w-full pl-16 pr-6 py-5 bg-white border ${!isBalanceEnough ? 'border-red-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-primary text-black text-2xl font-extrabold placeholder:text-slate-300`}
                />
              </div>
              {!isBalanceEnough && (
                <p className="text-red-500 text-[10px] font-extrabold px-2 uppercase tracking-wider">Saldo tidak mencukupi</p>
              )}
            </div>
          </div>

          {isValid ? (
            <div className="flex flex-col items-center space-y-6 animate-in zoom-in duration-500">
               <div className="p-6 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center">
                  <div className="relative w-56 h-56 flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden">
                    <img src={qrUrl} alt="Payment QR" className="w-48 h-48 mix-blend-multiply" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 animate-pulse"></div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-black font-extrabold text-sm uppercase tracking-tight">Merchant can scan this</p>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">DYNAMIC QRIS • {merchant.toUpperCase()}</p>
                  </div>
               </div>

               <button 
                onClick={handleManualPay}
                className="w-full py-5 bg-primary text-white font-bold text-lg rounded-[2rem] shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">check_circle</span>
                Simulasikan Berhasil
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 opacity-30 text-center">
               <span className="material-symbols-outlined text-[64px] text-slate-300">qr_code_2</span>
               <p className="text-slate-500 font-bold text-sm mt-2">Enter details to see QR</p>
            </div>
          )}
        </div>
      )}

      <div className="p-8 pb-12 bg-black/80 backdrop-blur-xl border-t border-white/10 z-20">
        <div className="flex gap-4 p-1.5 bg-white/10 rounded-2xl">
          <button 
            onClick={() => setMode('CAMERA')}
            className={`flex-1 py-4 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${mode === 'CAMERA' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-xl">camera_alt</span>
            Scan Camera
          </button>
          <button 
            onClick={() => setMode('SELLER')}
            className={`flex-1 py-4 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${mode === 'SELLER' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-xl">qr_code_2</span>
            Scan by Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanOnline;
