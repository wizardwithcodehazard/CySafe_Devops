import React, { useState } from 'react';
import { FileText, Camera, AlertTriangle, XCircle, Lock } from 'lucide-react';
import ResultItem from '../components/ResultItem';

export default function ForensicScanner() {
  const [mode, setMode] = useState('text');
  const [status, setStatus] = useState('idle');
  const [textInput, setTextInput] = useState('');

  const runScan = () => {
    setStatus('scanning');
    setTimeout(() => setStatus('result'), 3000);
  };

  const reset = () => {
    setStatus('idle');
    setTextInput('');
  };

  return (
    <div className="p-6 h-full flex flex-col pb-24">
      <div className="flex p-1 bg-gray-200 dark:bg-slate-800 rounded-xl mb-6 shadow-inner">
        {['text', 'image'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); reset(); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${mode === m
                ? 'bg-white dark:bg-slate-600 shadow-md text-black dark:text-white transform scale-[1.02]'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
          >
            {m === 'text' ? 'Text Analysis' : 'Screenshot'}
          </button>
        ))}
      </div>

      <div className="flex-1 relative">
        {status === 'idle' && (
          <div className="h-full border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-slate-900/50 transition-all">
            {mode === 'text' ? (
              <>
                <FileText size={48} className="text-gray-300 dark:text-slate-600 mb-4" />
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste suspicious SMS, Link, or Email here..."
                  className="w-full bg-transparent text-center resize-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 text-sm"
                  rows={4}
                />
                <button onClick={() => setTextInput("Join Elite Traders Club now! 400% returns guaranteed. Click bit.ly/fast-money")} className="mb-6 mt-2 text-xs text-cyan-500 font-bold hover:text-cyan-400 transition-colors">
                  ⚡ Paste Demo Scam Text
                </button>
                <button
                  onClick={runScan}
                  disabled={!textInput}
                  className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg ${textInput ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20' : 'bg-gray-300 dark:bg-slate-700 cursor-not-allowed'}`}
                >
                  Analyze Text
                </button>
              </>
            ) : (
              <>
                <div className="relative mb-6 group">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse group-hover:bg-purple-500/30 transition-all"></div>
                  <Camera size={64} className="text-purple-500 relative z-10 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Deep Forensic Scan</h3>
                <p className="text-sm text-gray-500 text-center mb-8 px-4">Detects Photoshop layers, metadata stripping, and fake numbers.</p>
                <button onClick={runScan} className="w-full bg-purple-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:scale-[1.02] hover:bg-purple-500 transition-all">
                  Upload Demo Evidence
                </button>
              </>
            )}
          </div>
        )}

        {status === 'scanning' && (
          <div className="h-full bg-slate-950 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center border border-slate-800">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
              {[...Array(64)].map((_, i) => <div key={i} className="border border-green-500/20"></div>)}
            </div>
            <div className="absolute top-0 left-0 w-full h-2 bg-cyan-400 shadow-[0_0_40px_#22d3ee] animate-[scan_2s_linear_infinite] z-20"></div>
            <div className="z-30 text-center space-y-6">
              <div className="w-20 h-20 border-4 border-t-cyan-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-cyan-400 font-mono text-xs tracking-[0.2em] animate-pulse">
                {mode === 'image' ? 'ANALYZING PIXEL LAYERS...' : 'CROSS-REFERENCING SEBI DB...'}
              </p>
            </div>
          </div>
        )}

        {status === 'result' && (
          <div className="h-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 animate-slideUp overflow-y-auto">
            <div className="flex items-center gap-4 mb-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
              <AlertTriangle size={32} className="text-red-500" />
              <div>
                <h3 className="text-2xl font-black text-red-600 dark:text-red-500 tracking-tight">HIGH RISK</h3>
                <p className="text-xs text-red-400 font-bold uppercase">Confidence: 99.8%</p>
              </div>
            </div>

            {mode === 'image' && (
              <div className="mb-6 relative rounded-xl overflow-hidden border border-red-500/30 shadow-lg">
                <div className="bg-slate-800 h-40 flex items-center justify-center text-slate-500 text-xs font-mono relative">
                  [PROFIT SCREENSHOT PREVIEW]
                  <div className="absolute top-8 right-12 w-16 h-8 bg-red-500/60 blur-lg rounded-full animate-pulse mix-blend-overlay"></div>
                  <div className="absolute bottom-6 left-10 w-24 h-10 bg-red-500/60 blur-lg rounded-full animate-pulse mix-blend-overlay"></div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-red-400 text-[10px] px-2 py-1 rounded font-bold border border-red-500 backdrop-blur-md">
                  MANIPULATED PIXELS FOUND
                </div>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <ResultItem icon={XCircle} text={mode === 'image' ? "Inconsistent Metadata found" : "Domain created < 5 days ago"} />
              <ResultItem icon={XCircle} text={mode === 'image' ? "Font mismatch in 'Profit' section" : "Keywords: 'Guaranteed', 'Double'"} />
              <ResultItem icon={XCircle} text="Entity NOT registered with SEBI" />
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-100 dark:border-yellow-900/30 mb-6 flex gap-3">
              <Lock size={18} className="text-yellow-600 dark:text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-700 dark:text-yellow-500 text-sm mb-1">Cooling-Off Active</h4>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 leading-relaxed">Outgoing payments to this entity are blocked for 24h to prevent impulse transfers.</p>
              </div>
            </div>

            <button onClick={reset} className="w-full py-3.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-white rounded-xl font-bold transition-colors">
              Scan Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
