import React from 'react';
import { Home, Scan, Smartphone, BookOpen } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'scan', icon: Scan, label: 'Scan' },
    { id: 'sim', icon: Smartphone, label: 'Sim' },
    { id: 'learn', icon: BookOpen, label: 'Learn' },
  ];

  return (
    <nav className="absolute bottom-6 left-6 right-6 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-black/50 border border-gray-100 dark:border-slate-800 flex justify-around items-center z-30 ring-1 ring-white/5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${isActive ? 'bg-cyan-600 text-white -translate-y-5 shadow-lg shadow-cyan-500/40 rotate-3' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-600 dark:hover:text-gray-300'}`}
          >
            <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            {isActive && <span className="absolute -bottom-6 text-[10px] font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap animate-fadeIn">{tab.label}</span>}
          </button>
        );
      })}
    </nav>
  );
}
