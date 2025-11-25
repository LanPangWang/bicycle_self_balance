import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { createPhysicsTutorChat } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatTutor: React.FC = () => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const chat = createPhysicsTutorChat();
      setChatSession(chat);
      // Initial greeting
      setMessages([{
        role: 'model',
        text: '你好！我是你的物理AI导师。你想了解关于“微动”还是“反打方向”的原理？或者你刚刚在模拟器里遇到了什么问题？'
      }]);
    } catch (e) {
      setMessages([{
        role: 'model',
        text: 'API Key 配置错误，无法启动AI导师。请检查 metadata.json 或环境变量。',
        isError: true
      }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMsg });
      const text = result.text;
      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
        console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，网络连接似乎有点问题，请稍后再试。', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if(e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
      <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-bold text-blue-400 flex items-center gap-2">
           <span>🎓</span> 物理 AI 导师
        </h3>
        <span className="text-xs text-slate-500">Powered by Gemini 2.5</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : msg.isError 
                    ? 'bg-red-900/50 text-red-200' 
                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
              }`}
            >
             {/* Simple renderer for bold text/markdown basics often returned by Gemini */}
             {msg.text.split('\n').map((line, i) => (
                 <p key={i} className="mb-1 last:mb-0">{line}</p>
             ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="问问关于反打方向的问题..."
            className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTutor;
