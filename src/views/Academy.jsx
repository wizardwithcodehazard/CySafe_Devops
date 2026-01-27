import React, { useState } from 'react';
import { MODULES } from '../constants/data';
import QuizModal from '../components/QuizModal';

export default function Academy({ isDark, user, setUser }) {
  const [activeModule, setActiveModule] = useState(null);

  return (
    <div className="p-6 pb-24 relative min-h-full">
      {activeModule ? (
        <QuizModal module={activeModule} close={() => setActiveModule(null)} isDark={isDark} addXp={(amount) => setUser(u => ({...u, xp: u.xp + amount}))} />
      ) : (
        <>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Academy</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-[10px] font-bold border border-yellow-200">LEVEL {user.level}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Next: 4500 XP</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 block">{user.xp}</span>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total XP</span>
            </div>
          </div>

          <button 
            onClick={() => setActiveModule(MODULES.find(m => m.id === 101))}
            className="w-full text-left bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] p-6 mb-8 relative overflow-hidden shadow-xl shadow-indigo-500/20 group hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="relative z-10">
              <span className="bg-white/20 text-white px-2 py-1 rounded text-[10px] font-bold mb-3 inline-block backdrop-blur-sm">DAILY CHALLENGE</span>
              <h3 className="text-2xl font-bold text-white mb-2">Spot the Deepfake</h3>
              <p className="text-indigo-100 text-sm mb-4 max-w-[70%] leading-relaxed">Can you tell real from AI? Complete this challenge to unlock the 'Sharp Eye' badge.</p>
              <span className="bg-white text-indigo-600 px-5 py-2.5 rounded-full text-xs font-bold shadow-md inline-block group-hover:bg-indigo-50 transition-colors">Start (+500 XP)</span>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
               <svg width="160" height="160" viewBox="0 0 24 24" fill="white"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            </div>
          </button>

          <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4 pl-1">Core Modules</h3>
          <div className="space-y-3">
             {MODULES.sort((a,b) => a.id - b.id).map((m) => (
               <div key={m.id} onClick={() => setActiveModule(m)} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center gap-4 cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-md transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-lg shadow-sm">
                   {m.title[0]}
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-gray-900 dark:text-white text-sm">{m.title}</h4>
                   <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                 </div>
                 <div className="text-right">
                   <span className="block text-xs font-bold text-green-500">+{m.xp} XP</span>
                   <span className="text-[10px] text-gray-400 font-medium">{m.difficulty}</span>
                 </div>
               </div>
             ))}
          </div>
        </>
      )}
    </div>
  );
}
