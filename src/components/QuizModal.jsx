import React, { useState } from 'react';
import { CheckCircle, ChevronLeft } from 'lucide-react';

export default function QuizModal({ module, close, addXp }) {
  const [qIndex, setQIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const handleAnswer = (idx) => {
    const isCorrect = idx === module.questions[qIndex].correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) addXp(100);
  };

  const next = () => {
    setFeedback(null);
    if (qIndex < module.questions.length - 1) setQIndex(qIndex + 1);
    else close();
  };

  return (
    <div className="absolute inset-0 z-50 bg-gray-50 dark:bg-slate-950 p-6 flex flex-col animate-slideUp">
      <div className="flex justify-between items-center mb-10">
        <button onClick={close} className="p-2 bg-gray-200 dark:bg-slate-800 rounded-full hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors"><ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" /></button>
        <div className="h-2 flex-1 mx-6 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 transition-all duration-300 ease-out" style={{ width: `${((qIndex + 1) / module.questions.length) * 100}%` }}></div>
        </div>
        <span className="text-xs font-bold text-gray-500">{qIndex + 1}/{module.questions.length}</span>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center leading-relaxed">{module.questions[qIndex].q}</h3>

        <div className="space-y-4">
          {module.questions[qIndex].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !feedback && handleAnswer(i)}
              disabled={!!feedback}
              className={`w-full p-5 rounded-2xl text-left font-bold text-sm border-2 transition-all duration-200 transform ${feedback
                  ? i === module.questions[qIndex].correct
                    ? 'bg-green-100 border-green-500 text-green-800 scale-[1.02]'
                    : feedback === 'wrong' && i !== module.questions[qIndex].correct
                      ? 'opacity-40 grayscale'
                      : 'opacity-40 grayscale'
                  : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-md'
                }`}
            >
              <div className="flex justify-between items-center">
                {opt}
                {feedback && i === module.questions[qIndex].correct && <CheckCircle size={20} className="text-green-600" />}
              </div>
            </button>
          ))}
        </div>

        {feedback && (
          <div className={`mt-8 p-4 rounded-xl text-center animate-bounce shadow-lg ${feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            <p className="font-bold text-lg">{feedback === 'correct' ? 'Correct! +100 XP' : 'Incorrect'}</p>
            <button onClick={next} className="mt-2 text-xs bg-white/20 px-4 py-1.5 rounded-full font-bold hover:bg-white/30 transition-colors">Continue</button>
          </div>
        )}
      </div>
    </div>
  );
}
