import React from 'react';

export default function ResultItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/5 rounded-xl border border-red-100 dark:border-red-900/20">
      <Icon size={16} className="text-red-500 shrink-0" />
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{text}</span>
    </div>
  );
}
