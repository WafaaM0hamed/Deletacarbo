'use client';
import { useState } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import AppLayout from '@/components/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';

function SettingsContent() {
  const { t, locale, changeLocale } = useLanguage();
  const isAr = locale === 'ar';

  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState('محمد خالد');
  const [email, setEmail] = useState('mohamed.khalid@ecocorp.com');
  const [phone, setPhone] = useState('+966 50 123 4567');
  const [avatarUrl, setAvatarUrl] = useState('/placeholder-avatar.jpg');
  const [saved, setSaved] = useState(false);

  const tabs = [
    t('settings.profile_tab'),
    t('settings.security'),
    t('settings.language'),
    t('settings.appearance'),
    t('settings.api_keys')
  ];

  const handleSave = () => {
    // TODO: implement actual save to backend
    console.log('Saving settings...', { name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTabChange = (index) => {
    console.log('Tab changed to:', tabs[index]);
    setActiveTab(index);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">
      {/* page title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          {t('settings.title')}
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* tabs navigation */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map((tab, i) => (
          <button 
            key={i} 
            onClick={() => handleTabChange(i)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition
              ${activeTab === i ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* profile tab content */}
      {activeTab === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-800 mb-0.5">
            {t('settings.personal_profile')}
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            {t('settings.update_profile')}
          </p>

          {/* avatar section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 relative">
              <span className="text-white text-xl font-bold">{name[0]}</span>
              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600">
                {t('settings.avatar_url')}
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={e => setAvatarUrl(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
                <button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition whitespace-nowrap">
                  {t('settings.update_photo')}
                </button>
              </div>
            </div>
          </div>

          {/* form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-gray-600">
                {t('settings.full_name')}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">
                {t('settings.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
              />
            </div>
          </div>

          <div className="sm:w-1/2 mb-6">
            <label className="text-xs font-medium text-gray-600">
              {t('settings.phone')}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
          </div>

          {/* save button */}
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition 
              ${saved ? 'bg-emerald-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
          >
            {saved ? t('settings.saved') : t('settings.save_changes')}
          </button>
        </div>
      )}

      {/* language tab */}
      {activeTab === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-800 mb-1">
            {t('settings.language_settings')}
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            {t('settings.choose_language')}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => changeLocale('ar')}
              className={`flex-1 rounded-lg border-2 p-4 text-center transition
                ${locale === 'ar' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <p className="text-base font-bold text-gray-800">{t('settings.arabic')}</p>
              <p className="text-xs text-gray-400 mt-1">Arabic</p>
            </button>
            <button
              onClick={() => changeLocale('en')}
              className={`flex-1 rounded-lg border-2 p-4 text-center transition
                ${locale === 'en' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <p className="text-base font-bold text-gray-800">{t('settings.english')}</p>
              <p className="text-xs text-gray-400 mt-1">{t('settings.english')}</p>
            </button>
          </div>
        </div>
      )}

      {/* other tabs - placeholder */}
      {activeTab !== 0 && activeTab !== 2 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-sm font-semibold text-gray-800">{tabs[activeTab]}</p>
          <p className="text-xs text-gray-400 mt-2">— {t('settings.coming_soon')} —</p>
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ClientWrapper>
      <AppLayout>
        <SettingsContent />
      </AppLayout>
    </ClientWrapper>
  );
}
