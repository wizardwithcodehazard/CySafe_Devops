import React from 'react';
import { Shield, Search, Award, Smartphone, AlertTriangle } from 'lucide-react';
import AlertCard from '../components/AlertCard';

export default function Dashboard({ setActiveTab }) {
  return (
    <div className="p-6 space-y-6 pb-24 animate-fadeIn">

      {/* Risk Thermometer */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] overflow-hidden shadow-2xl p-6 text-white group cursor-pointer transition-transform hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 blur-[50px] rounded-full -mr-10 -mt-10 group-hover:bg-cyan-500/30 transition-all duration-500"></div>

        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16} className="text-green-400" />
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">System Secure</span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight">Low Risk</h3>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="98, 100" strokeWidth="3" />
            </svg>
            <span className="font-bold text-sm">98%</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>Safety Score</span>
            <span className="text-green-400">+12 this week</span>
          </div>
          <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[98%] rounded-full shadow-[0_0_10px_#22c55e]"></div>
          </div>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('scan')}
          className="bg-white dark:bg-slate-900/50 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-lg transition-all group backdrop-blur-sm"
        >
          <div className="w-12 h-12 bg-cyan-50 dark:bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
            <Search size={24} />
          </div>
          <div className="text-center">
            <span className="block font-bold text-gray-900 dark:text-white text-sm">Forensic Scan</span>
            <span className="text-[10px] text-gray-500">Check Text/Image</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('learn')}
          className="bg-white dark:bg-slate-900/50 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all group backdrop-blur-sm"
        >
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
            <Award size={24} />
          </div>
          <div className="text-center">
            <span className="block font-bold text-gray-900 dark:text-white text-sm">Daily Quiz</span>
            <span className="text-[10px] text-gray-500">+50 XP Reward</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('sim')}
          className="bg-white dark:bg-slate-900/50 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-red-500 dark:hover:border-red-500 hover:shadow-lg transition-all group backdrop-blur-sm"
        >
          <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
            <Smartphone size={24} />
          </div>
          <div className="text-center">
            <span className="block font-bold text-gray-900 dark:text-white text-sm">Scam Dojo</span>
            <span className="text-[10px] text-gray-500">Test Your Skills</span>
          </div>
        </button>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4 pl-1">Live Intelligence</h3>
        <div className="space-y-3">
          <AlertCard
            type="urgent"
            title="Pune Techie Scam Variant"
            desc="New WhatsApp group 'Bull Run 2025' active. Promises 400% returns."
            time="10m ago"
          />
          <AlertCard
            type="info"
            title="Deepfake CEO Videos"
            desc="AI videos of top CEOs circulating on Instagram Reels."
            time="2h ago"
          />
        </div>
      </div>
    </div>
  );
}
