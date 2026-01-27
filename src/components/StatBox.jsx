import React from 'react';

// eslint-disable-next-line no-unused-vars
export default function StatBox({ icon: Icon, val, label, color, isDark }) {
  return (
    <div className={`p-4 rounded-2xl text-center border transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
      <Icon size={24} className={`mx-auto mb-2 ${color}`} />
      <div className="font-bold text-xl">{val}</div>
      <div className="text-[10px] uppercase text-gray-400 font-bold">{label}</div>
    </div>
  );
}
