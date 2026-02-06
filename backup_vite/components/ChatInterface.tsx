
import React, { useState, useRef, useEffect } from 'react';
import { parseRemittanceRequest } from '../services/geminiService';
import { AIPlanningResponse } from '../types';

interface ChatInterfaceProps {
  onAgentCreated: (plan: AIPlanningResponse) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAgentCreated }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; plan?: AIPlanningResponse }[]>([
    { role: 'assistant', content: "Hello! I'm your Pulse Agent. Want to send money? Just tell me: 'Send $50 to chidi.ens every Friday from Base to Polygon'." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const plan = await parseRemittanceRequest(userMsg);
    setLoading(false);

    if (plan) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Got it! I've prepared a plan to send $${plan.amount} to ${plan.recipient} ${plan.frequency} via ${plan.destChain}. Sound good?`,
        plan 
      }]);
    } else {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I couldn't quite parse that. Could you provide more details like amount, recipient, and chain?" }]);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-[#141414] rounded-2xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
        <span className="text-sm font-medium text-gray-400">Agentic Brain Active</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-[#0061FF] text-white rounded-tr-none' 
                : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
            }`}>
              {m.content}
              {m.plan && (
                <div className="mt-3 p-3 bg-black/40 rounded-xl border border-[#00FF88]/20 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Destination</span>
                    <span className="text-[#00FF88]">{m.plan.recipient}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Bridge</span>
                    <span className="text-white">LI.FI ({m.plan.sourceChain} → {m.plan.destChain})</span>
                  </div>
                  <button 
                    onClick={() => onAgentCreated(m.plan!)}
                    className="w-full py-2 bg-[#00FF88] text-black font-bold rounded-lg mt-2 hover:bg-[#00D16F] transition-colors"
                  >
                    Deploy Agent
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/5">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Monthly $100 for family.ens..."
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-[#00FF88] text-sm transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#00FF88] hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9-7-9-7v14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
