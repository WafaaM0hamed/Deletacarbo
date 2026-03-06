'use client';
import { useState, useRef, useEffect } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import AppLayout from '@/components/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';

// chatbot API function
async function askBot(question) {
  try {
    const response = await fetch('http://127.0.0.1:5000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question })
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("خطأ:", error);
    return "⚠️ السيرفر غير متصل (هيشتغل لما ندمج الملفات)";
  }
}

function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* avatar */}
      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-emerald-400 to-teal-500' 
          : 'bg-gray-100'
      }`}>
        {isUser ? (
          <span className="text-white text-xs font-bold">U</span>
        ) : (
          <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </div>

      {/* message bubble */}
      <div className={`max-w-md rounded-2xl px-4 py-2.5 ${
        isUser 
          ? 'bg-emerald-500 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <span className={`text-xs mt-1 block ${
          isUser ? 'text-emerald-100' : 'text-gray-400'
        }`}>
          {message.time}
        </span>
      </div>
    </div>
  );
}

function ChatbotContent() {
  const { t, locale } = useLanguage();
  const isAr = locale === 'ar';
  
  const [messages, setMessages] = useState([
    {
      text: t('chatbot.welcome_message'),
      isUser: false,
      time: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      text: inputValue,
      isUser: true,
      time: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // call chatbot API
    console.log('Sending question to bot:', inputValue);
    const reply = await askBot(inputValue);
    
    const botMessage = {
      text: reply,
      isUser: false,
      time: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* header */}
      <div className="bg-white rounded-t-xl border border-gray-200 shadow-sm p-5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">
            {t('chatbot.title')}
          </h2>
          <p className="text-xs text-emerald-500 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t('chatbot.online')}
          </p>
        </div>
      </div>

      {/* messages area */}
      <div className="flex-1 bg-white border-x border-gray-200 p-5 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} isUser={msg.isUser} />
          ))}
          
          {/* loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* input area */}
      <div className="bg-white rounded-b-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chatbot.placeholder')}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none disabled:opacity-50"
          />
          
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {/* tips */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button 
            onClick={() => setInputValue(t('chatbot.quick_question_1'))}
            className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 hover:bg-gray-200 transition"
          >
            {t('chatbot.quick_question_1')}
          </button>
          <button 
            onClick={() => setInputValue(t('chatbot.quick_question_2'))}
            className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 hover:bg-gray-200 transition"
          >
            {t('chatbot.quick_question_2')}
          </button>
          <button 
            onClick={() => setInputValue(t('chatbot.quick_question_3'))}
            className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 hover:bg-gray-200 transition"
          >
            {t('chatbot.quick_question_3')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatbotPage() {
  return (
    <ClientWrapper>
      <AppLayout>
        <ChatbotContent />
      </AppLayout>
    </ClientWrapper>
  );
}
