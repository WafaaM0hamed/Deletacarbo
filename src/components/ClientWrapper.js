'use client';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function ClientWrapper({ children }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
