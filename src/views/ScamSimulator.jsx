import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, RefreshCw, PieChart } from 'lucide-react';
import { SCAM_SCRIPTS } from '../constants/data';

// REMOVED: unused 'isDark' prop
export default function ScamSimulator() {
  const [messages, setMessages] = useState([]);
  const [activeScenario, setActiveScenario] = useState(null);
  const [stepId, setStepId] = useState(null);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  const scenario = activeScenario ? SCAM_SCRIPTS[activeScenario] : null;
  const step = scenario ? scenario.script.find(s => s.id === stepId) : null;

  // MOVED UP: Defined before use
  const runScript = async (currentStep) => {
    setTyping(true);
    for (let msg of currentStep.messages) {
      await new Promise(r => setTimeout(r, msg.delay));
      setMessages(prev => [...prev, { ...msg, sender: currentStep.sender }]);
    }
    setTyping(false);
  };

  useEffect(() => {
    if (step && step.role === 'Scammer') runScript(step);
  }, [step]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const handleChoice = (opt) => {
    setMessages(prev => [...prev, { type: 'text', content: opt.text, isUser: true }]);
    if (opt.risk === 100) {
      setTimeout(() => setMessages(prev => [...prev, { type: 'system', status: 'fail' }]), 500);
    } else if (opt.next === 99) {
      setTimeout(() => setMessages(prev => [...prev, { type: 'system', status: 'win' }]), 500);
    } else {
      setStepId(opt.next);
    }
  };

  const startScenario = (key) => {
    setActiveScenario(key);
    setStepId(1);
    setMessages([]);
  };

  const restart = () => {
    setMessages([]);
    setStepId(1);
  };

  const exitScenario = () => {
    setActiveScenario(null);
    setStepId(null);
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-[#0b141a] relative pb-20">
      {scenario ? (
        <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 shadow-md z-10 border-b border-slate-800">
          <button onClick={exitScenario} className="text-gray-400 hover:text-white transition-colors"><ChevronLeft size={24} /></button>
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">{scenario.script[0].sender[0]}</div>
          <div className="flex-1">
            <h3 className="text-gray-100 font-bold text-sm">{scenario.script[0].sender}</h3>
            <p className="text-[10px] text-gray-400">Business Account</p>
          </div>
          <RefreshCw size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" onClick={restart} />
        </div>
      ) : (
        <div className="bg-[#202c33] p-6 z-10 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-1">Scam Dojo</h2>
          <p className="text-sm text-gray-400">Choose a scenario to test your awareness.</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" ref={scrollRef}>
        {!scenario ? (
          <div className="p-2 space-y-3 animate-fadeIn">
            {/* eslint-disable-next-line no-unused-vars */}
            {Object.entries(SCAM_SCRIPTS).map(([key, { title, description, icon: Icon }]) => (
              <button key={key} onClick={() => startScenario(key)} className="w-full p-4 bg-[#202c33]/80 backdrop-blur-sm hover:bg-[#2a3942] text-white rounded-xl text-left border border-[#3e525e] shadow-lg transition-all flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-cyan-400">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base mb-0.5">{title}</h4>
                  <p className="text-xs text-gray-400 leading-snug">{description}</p>
                </div>
                <ChevronRight size={20} className="text-gray-500" />
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="flex justify-center my-4">
              <span className="bg-[#1f2c34] text-[#8696a0] text-[10px] px-3 py-1.5 rounded-lg shadow-sm font-medium uppercase tracking-wide border border-[#2a3942]">Messages are end-to-end encrypted</span>
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.type === 'system' ? 'justify-center' : m.isUser ? 'justify-end' : 'justify-start'} animate-slideUp`}>
                {m.type === 'system' ? (
                  <div className={`p-5 rounded-xl text-center border-2 shadow-2xl mt-4 bg-[#1f2c34] w-[80%] ${m.status === 'win' ? 'border-green-500' : 'border-red-500'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${m.status === 'win' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {m.status === 'win' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                    </div>
                    <h4 className={`font-black text-xl mb-1 ${m.status === 'win' ? 'text-green-400' : 'text-red-400'}`}>{m.status === 'win' ? 'SCAM BLOCKED' : 'MONEY LOST'}</h4>
                    <p className="text-xs text-gray-300">{m.status === 'win' ? 'You spotted the red flags. Great job!' : 'You fell for the "Greed Trap".'}</p>
                    <button onClick={restart} className="mt-4 px-4 py-2 bg-[#2a3942] rounded-lg text-xs text-white font-bold hover:bg-[#37404a] transition-colors">Try Scenario Again</button>
                  </div>
                ) : (
                  <div className={`max-w-[85%] p-2.5 rounded-lg text-sm shadow-md relative leading-relaxed ${m.isUser ? 'bg-[#005c4b] text-white rounded-tr-none' : 'bg-[#202c33] text-white rounded-tl-none'
                    }`}>
                    {m.type === 'image' && (
                      <div className="h-32 bg-black/50 rounded mb-1.5 flex items-center justify-center border border-gray-700 overflow-hidden">
                        <PieChart className="text-gray-500 opacity-50" size={32} />
                      </div>
                    )}
                    <p className="text-[13px]">{m.content}</p>
                    <span className="text-[9px] text-[#8696a0] block text-right mt-1 opacity-80">10:3{i} AM {m.isUser && <span>✓✓</span>}</span>
                  </div>
                )}
              </div>
            ))}
            {typing && <div className="text-xs text-[#00a884] ml-4 font-bold animate-pulse">typing...</div>}
          </>
        )}
      </div>

      {scenario && !messages.find(m => m.type === 'system') && step && !typing && (
        <div className="p-3 bg-[#1f2c34] border-t border-slate-800 space-y-2.5 z-20 animate-fadeIn">
          <p className="text-[10px] text-gray-400 uppercase font-bold ml-1 mb-1">Select Response:</p>
          {step.options.map((opt, i) => (
            <button key={i} onClick={() => handleChoice(opt)} className="w-full p-4 bg-[#2a3942] hover:bg-[#37404a] active:scale-[0.99] text-white rounded-xl text-left text-sm font-semibold border border-[#3e525e] shadow-sm transition-all flex justify-between items-center group">
              {opt.text}
              <ChevronRight size={16} className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}