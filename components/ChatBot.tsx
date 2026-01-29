
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Phone, User, Bot } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { BRAND } from '../constants';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Welcome to Gibbs Towing & Recovery. I'm your elite dispatch assistant. How can we help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-zinc-950 border border-white/10 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-red-700 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider">Gibbs Assistant</h3>
                <p className="text-[10px] opacity-70">24/7 Smart Dispatch</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/20 p-1 rounded">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-zinc-900/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-red-700 text-white rounded-tr-none' 
                    : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-3 rounded-xl rounded-tl-none animate-pulse text-xs text-zinc-400">
                  Assistant is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Quick CTA */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/40">
             <a href={`tel:${BRAND.phone}`} className="flex items-center justify-center gap-2 text-[10px] font-bold text-red-500 hover:text-red-400">
               <Phone size={12} /> CALL FOR IMMEDIATE DISPATCH
             </a>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your emergency..."
              className="flex-1 bg-zinc-800 border-none rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-red-600 outline-none placeholder:text-zinc-500"
            />
            <button 
              onClick={handleSend}
              className="bg-red-700 hover:bg-red-600 p-2 rounded-lg text-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-700 hover:bg-red-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <MessageSquare size={24} />
          <span className="hidden group-hover:inline text-xs font-bold tracking-widest uppercase ml-2 animate-in slide-in-from-right-2">Help Now</span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
