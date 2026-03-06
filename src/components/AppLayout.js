'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AppLayout({ children, title }) {
  const { isRTL } = useLanguage();

  return (
    <div className={`flex h-screen overflow-hidden bg-gray-100 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-2 text-center text-xs text-gray-400">
          © 2025 EcoVision. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
