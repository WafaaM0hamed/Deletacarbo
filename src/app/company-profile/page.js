'use client';
import { useState } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import AppLayout from '@/components/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const SearchIcon  = () => <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const FilterIcon  = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>;
const SortIcon    = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4m4 4V8" /></svg>;
const DownIcon    = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const MailIcon    = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const DotsIcon    = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>;
const BuildingIcon = () => <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m10 0h2m-2 0h-2M9 21H7m2 0V9h6v12" /></svg>;
const TargetIcon   = () => <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const teamMembers = [
  { name_ar: 'سارة الخضراء',  name_en: 'Sarah Green',    email: 'sarah.green@ecocorp.com',     role: 'owner',  color: 'from-purple-400 to-pink-400' },
  { name_ar: 'أحمد كمال',     name_en: 'Ahmed Kamal',    email: 'ahmed.kamal@ecocorp.com',     role: 'admin',  color: 'from-blue-400 to-cyan-400' },
  { name_ar: 'فاطمة الزهراء', name_en: 'Fatima Zahra',   email: 'fatima.zahra@ecocorp.com',    role: 'editor', color: 'from-pink-400 to-rose-400' },
  { name_ar: 'خالد منصور',    name_en: 'Khalid Mansour', email: 'khalid.mansour@ecocorp.com',   role: 'viewer', color: 'from-emerald-300 to-green-400' },
  { name_ar: 'ريم علي',       name_en: 'Reem Ali',       email: 'reem.ali@ecocorp.com',        role: 'editor', color: 'from-indigo-400 to-blue-400' },
];

function RoleBadge({ role, locale }) {
  const isAr = locale === 'ar';
  const map = {
    owner:  { bg: 'bg-emerald-50',  text: 'text-emerald-600', label: isAr ? 'مالك'   : 'Owner' },
    admin:  { bg: 'bg-white',       text: 'text-gray-600',    label: isAr ? 'مسؤول'  : 'Admin' },
    editor: { bg: 'bg-white',       text: 'text-gray-600',    label: isAr ? 'محرر'   : 'Editor' },
    viewer: { bg: 'bg-white',       text: 'text-gray-600',    label: isAr ? 'عارض'   : 'Viewer' },
  };
  const s = map[role];
  return (
    <div className={`flex items-center gap-1 border border-gray-200 rounded-md px-2 py-0.5 ${s.bg}`}>
      <span className={`text-xs font-semibold ${s.text}`}>{s.label}</span>
      {role !== 'owner' && <DotsIcon />}
    </div>
  );
}

function CompanyProfileContent() {
  const { locale } = useLanguage();
  const isAr = locale === 'ar';
  const [search, setSearch] = useState('');

  const filtered = teamMembers.filter(m => {
    const name = isAr ? m.name_ar : m.name_en;
    return name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Company Info Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-lg font-bold text-gray-900">{isAr ? 'ملف الشركة' : 'Company Profile'}</h1>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
            {isAr ? 'تعديل الملف الشخصي' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-400">{isAr ? 'اسم الشركة' : 'Company Name'}</p>
            <p className="text-sm font-semibold text-gray-800">{isAr ? 'حلول إيكوكورب' : 'EcoCorp Solutions'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">{isAr ? 'الصناعة' : 'Industry'}</p>
            <p className="text-sm font-semibold text-gray-800">{isAr ? 'إدارة الاستدامة' : 'Sustainability Management'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">{isAr ? 'البريد الإلكتروني للاتصال' : 'Contact Email'}</p>
            <p className="text-sm font-semibold text-gray-800">info@ecocorp.com</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-400">{isAr ? 'العنوان' : 'Address'}</p>
          <p className="text-sm font-semibold text-gray-800">{isAr ? 'شارع الاستدامة 123، الرياض، المملكة العربية السعودية' : '123 Sustainability Street, Riyadh, Saudi Arabia'}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <BuildingIcon />
            <span className="text-xs text-gray-500">{isAr ? '15 :المشاريع النشطة' : 'Active Projects: 15'}</span>
          </div>
          <div className="flex items-center gap-2">
            <TargetIcon />
            <span className="text-xs text-gray-500">{isAr ? '2030 هدف صافي الانبعاثات الصفرية:' : 'Net Zero Target: 2030'}</span>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Header + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-base font-bold text-gray-900">{isAr ? 'أعضاء الفريق' : 'Team Members'}</h2>
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
              <SearchIcon />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={isAr ? 'بحث عن أعضاء ...' : 'Search for members...'}
                className="text-xs outline-none w-36 text-gray-700 placeholder-gray-400"
              />
            </div>
            {/* Filter */}
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
              <FilterIcon /> {isAr ? 'جميع المستخدمين' : 'All Users'}
            </button>
            {/* Sort */}
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
              <SortIcon /> {isAr ? 'أبجديا' : 'Sort'}
            </button>
            {/* Export CSV */}
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
              <DownIcon /> {isAr ? 'تصدير CSV' : 'Export CSV'}
            </button>
            {/* Invite */}
            <button className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 transition">
              <MailIcon /> {isAr ? 'دعوة أعضاء' : 'Invite Members'}
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className={`pb-2 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'الاسم' : 'Name'}</th>
              <th className={`pb-2 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'الدور' : 'Role'}</th>
              <th className={`pb-2 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'إجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{(isAr ? m.name_ar : m.name_en)[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{isAr ? m.name_ar : m.name_en}</p>
                      <p className="text-xs text-gray-400">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3"><RoleBadge role={m.role} locale={locale} /></td>
                <td className="py-3">
                  <div className="flex justify-end">
                    <button className="text-gray-400 hover:text-gray-600"><DotsIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CompanyProfilePage() {
  return (
    <ClientWrapper>
      <AppLayout>
        <CompanyProfileContent />
      </AppLayout>
    </ClientWrapper>
  );
}
