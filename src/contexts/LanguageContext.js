'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

const translations = { ar, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('ar'); // default arabic
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // get saved language
    const saved = localStorage.getItem('ecovision_locale') || 'ar';
    setLocale(saved);
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = saved;
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
      localStorage.setItem('ecovision_locale', locale);
    }
  }, [locale, mounted]);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  // translate function
  const t = (key) => {
    const keys = key.split('.');
    let result = translations[locale];
    
    for (const k of keys) {
      result = result?.[k];
    }
    
    return result || key;
  };

  const isRTL = locale === 'ar';

  return (
    <LanguageContext.Provider value={{ locale, isRTL, changeLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
