import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Header({ user, activeTab, isDark, toggleTheme, openProfile }) {
  const getTitle = () => {
    switch(activeTab) {
      case 'home': return 'Command Center';
      case 'scan': return 'Forensic Guard';
      case 'sim': return 'Scam Dojo';
      case 'learn': return 'Academy';
      default: return 'CyberSafe';
    }
  };

  return (
    <header className="px-6 pt-12 pb-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-20 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center transition-colors">
      <div>
        <p className="text-[9px] uppercase font-bold text-gray-400 dark:text-slate-500 tracking-widest mb-0.5">System Active</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          {getTitle()}
          {activeTab === 'home' && <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>}
        </h2>
      </div>
      
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all shadow-sm">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <button onClick={openProfile} className="relative group">
          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 to-blue-600 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all">
            <div className="w-full h-full rounded-full bg-gray-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
               <span className="font-bold text-sm text-gray-700 dark:text-white">{user.name[0]}</span>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-950"></div>
        </button>
      </div>
    </header>
  );
}
