import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/geminiService';
import { Send, Mic, MicOff, Globe } from 'lucide-react';

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const ChatView: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Vanakkam! How can I help you today? \nவணக்கம்! நான் உங்களுக்கு எப்படி உதவ முடியும்?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechLang, setSpeechLang] = useState<'ta-IN' | 'en-US'>('ta-IN');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendChatMessage(history, userMsg.text);
    
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.lang = speechLang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const toggleLanguage = () => {
    setSpeechLang(prev => prev === 'ta-IN' ? 'en-US' : 'ta-IN');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in slide-in-from-right duration-300">
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto space-y-4 p-2 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap shadow-sm ${
                msg.role === 'user'
                  ? 'bg-orange-600 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-gray-500 text-sm italic animate-pulse">
                Typing...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-2 flex flex-col gap-2">
         {/* Language Toggle for Voice */}
         <div className="flex justify-end px-1">
            <button 
              onClick={toggleLanguage}
              className="text-xs flex items-center gap-1 text-gray-500 hover:text-orange-600 transition-colors bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm"
              title="Switch Voice Language"
            >
               <Globe size={12} />
               <span>Voice: {speechLang === 'ta-IN' ? 'Tamil (தமிழ்)' : 'English'}</span>
            </button>
         </div>

         <div className="bg-white p-2 rounded-xl border border-gray-200 flex gap-2 items-center shadow-sm relative">
          <input
            type="text"
            className="flex-grow p-3 bg-transparent outline-none text-gray-800"
            placeholder={isListening ? "Listening... / கேட்கிறது..." : "Type or use mic..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          
          <button
            onClick={toggleListening}
            className={`p-3 rounded-lg transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-md ring-2 ring-red-200' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Voice Input"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;