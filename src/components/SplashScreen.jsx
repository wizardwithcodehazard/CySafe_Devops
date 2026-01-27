import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: Idle, 1: Scanning, 2: Verified

  useEffect(() => {
    // Sequence
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 2500);
    const t3 = setTimeout(() => onComplete(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center space-y-8">

        {/* Fingerprint Animation */}
        <div className="relative w-24 h-24">
          <Fingerprint
            size={96}
            className={`text-slate-700 transition-colors duration-700 ${stage >= 1 ? 'text-cyan-500/50' : ''} ${stage === 2 ? 'text-green-500' : ''}`}
            strokeWidth={1}
          />

          {/* Scan Line */}
          {stage === 1 && (
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] animate-[scan_1.5s_ease-in-out_infinite]"></div>
          )}

          {/* Success Ring */}
          {stage === 2 && (
            <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-ping opacity-50"></div>
          )}
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
            Cyber<span className="text-cyan-400">Safe</span>
          </h1>

          <div className="h-6 flex items-center justify-center">
            {stage === 0 && <span className="text-slate-500 text-xs font-mono animate-pulse">INITIALIZING...</span>}
            {stage === 1 && <span className="text-cyan-400 text-xs font-mono">VERIFYING BIOMETRICS...</span>}
            {stage === 2 && (
              <span className="text-green-400 text-xs font-mono font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle size={12} /> ACCESS GRANTED
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 text-slate-600 text-[10px] font-mono uppercase tracking-[0.2em]">
        NISM Ideathon 2025 • Secure Build v3.0
      </div>
    </div>
  );
}
