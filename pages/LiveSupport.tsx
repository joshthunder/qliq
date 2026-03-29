
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { AppState } from '../types';

interface LiveSupportProps {
  navigateTo: (page: AppState) => void;
}

const LiveSupport: React.FC<LiveSupportProps> = ({ navigateTo }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Siap untuk membantu');
  const [transcription, setTranscription] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  // Implementation of standard base64/audio decoding from guidelines
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const startSupport = async () => {
    if (isActive) return;
    
    try {
      setStatus('Menghubungkan ke Live Agent...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setStatus('Mendengarkan...');
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const bytes = new Uint8Array(int16.buffer);
              let binary = '';
              for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              const base64 = btoa(binary);
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }

            const base64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64 && audioContextRef.current) {
              setStatus('Berbicara...');
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64), audioContextRef.current, 24000, 1);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContextRef.current.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('Mendengarkan...');
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => console.error('Live Support Error:', e),
          onclose: () => setIsActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          outputAudioTranscription: {},
          systemInstruction: 'Anda adalah Live Agent AI untuk QLiQ Payment. Anda ramah, membantu, dan ahli dalam sistem pembayaran offline QRIS. Gunakan bahasa Indonesia yang santai tapi profesional. Jika pengguna bertanya tentang HP hilang, ingatkan tentang keamanan PIN. Jika tanya limit, arahkan ke menu Token Offline.',
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('Gagal menghubungkan. Periksa izin mikrofon.');
    }
  };

  const endSupport = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsActive(false);
    setStatus('Sesi berakhir');
    setTranscription('');
    navigateTo('HELP');
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-primary animate-in fade-in duration-500 overflow-hidden">
      <header className="p-6 flex items-center justify-between text-white z-20">
        <button onClick={endSupport} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span className="material-symbols-outlined font-bold">close</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-extrabold uppercase tracking-widest">Live Agent AI</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'}`}></div>
            <p className="text-[10px] font-bold opacity-70">24/7 ACTIVE</p>
          </div>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-10 relative">
        {/* Background Visualizations */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className={`w-96 h-96 bg-white rounded-full blur-3xl transition-all duration-1000 ${isActive ? 'scale-125' : 'scale-75'}`}></div>
        </div>

        <div className="relative z-10 text-center space-y-12">
          <div className="relative">
            <div className={`w-40 h-40 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20 transition-all duration-500 ${isActive ? 'scale-110 shadow-[0_0_50px_rgba(255,255,255,0.3)]' : ''}`}>
               <span className={`material-symbols-outlined text-white text-7xl font-bold ${isActive ? 'animate-pulse' : ''}`}>
                 {status === 'Berbicara...' ? 'hearing' : 'support_agent'}
               </span>
            </div>
            {isActive && (
              <div className="absolute -inset-4 border-2 border-white/20 rounded-full animate-ping opacity-20"></div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-white text-3xl font-extrabold tracking-tight">{status}</h1>
            <p className="text-white/60 text-sm font-medium px-4 h-20 overflow-hidden text-ellipsis italic">
              {transcription || "Sapa agen kami untuk mulai berbicara..."}
            </p>
          </div>
        </div>
      </div>

      <div className="p-12 z-20">
        {!isActive ? (
          <button 
            onClick={startSupport}
            className="w-full py-5 bg-white text-primary font-extrabold text-lg rounded-[2.5rem] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined font-bold">mic</span>
            Mulai Bicara
          </button>
        ) : (
          <button 
            onClick={endSupport}
            className="w-full py-5 bg-red-500 text-white font-extrabold text-lg rounded-[2.5rem] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined font-bold">call_end</span>
            Akhiri Sesi
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveSupport;
