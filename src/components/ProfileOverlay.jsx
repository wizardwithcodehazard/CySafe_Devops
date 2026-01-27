import React from 'react';
import { X, Zap, Calendar, Medal, Award, Lock, LogOut } from 'lucide-react';
import StatBox from './StatBox';

export default function ProfileOverlay({ user, close, isDark }) {
  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fadeIn">
      <div className={`w-full sm:w-[90%] max-h-[90vh] overflow-y-auto scrollbar-hide rounded-t-[2rem] sm:rounded-[2rem] p-8 shadow-2xl animate-slideUp ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black">Agent Profile</h2>
          <button onClick={close} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full hover:rotate-90 transition-transform"><X size={20}/></button>
        </div>

        <div className="flex items-center gap-6 mb-8">
           <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-xl shadow-cyan-500/20">
             <div className="w-full h-full rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-4xl font-bold">
               {user.name[0]}
             </div>
           </div>
           <div>
             <h3 className="text-2xl font-bold">{user.name}</h3>
             <p className="text-cyan-500 font-bold text-sm mb-1">{user.rank}</p>
             <p className="text-xs text-gray-500">{user.handle} • Joined {user.joined}</p>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatBox icon={Zap} val={user.xp} label="Total XP" color="text-yellow-500" isDark={isDark} />
          <StatBox icon={Calendar} val={user.streak} label="Day Streak" color="text-red-500" isDark={isDark} />
          <StatBox icon={Medal} val={user.badges.length} label="Badges" color="text-purple-500" isDark={isDark} />
        </div>

        <h4 className="font-bold text-sm mb-4 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Achievements</h4>
        <div className="grid grid-cols-4 gap-4 mb-8">
           {user.badges.map((b, i) => (
             <div key={i} className="flex flex-col items-center gap-2">
               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-sm">
                 <Award className="text-cyan-600 dark:text-cyan-400" size={24} />
               </div>
               <span className="text-[9px] font-bold text-center leading-tight opacity-80">{b}</span>
             </div>
           ))}
           <div className="flex flex-col items-center gap-2 opacity-40">
               <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-slate-600">
                 <Lock size={20} />
               </div>
               <span className="text-[9px] font-bold text-center">???</span>
           </div>
        </div>

        <button className="w-full py-4 rounded-xl bg-gray-50 dark:bg-slate-800 text-red-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
