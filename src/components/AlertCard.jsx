import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AlertCard({ type, title, desc, time }) {
  const isUrgent = type === 'urgent';
  return (
    <div className={`p-4 rounded-2xl border flex items-start gap-3 backdrop-blur-sm transition-transform active:scale-[0.98] ${
      isUrgent 
        ? 'bg-red-50/80 dark:bg-red-900/10 border-red-100 dark:border-red-900/30' 
        : 'bg-blue-50/80 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30'
    }`}>
      <div className={`mt-0.5 p-1.5 rounded-full ${
        isUrgent ? 'bg-red-100 dark:bg-red-900/50 text-red-500' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-500'
      }`}>
        <AlertTriangle size={14} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">{title}</h4>
          <span className="text-[10px] font-bold opacity-60 dark:text-gray-400">{time}</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
