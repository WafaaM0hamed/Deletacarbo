'use client';
import { useState } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import AppLayout from '@/components/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const EyeIcon    = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z" /></svg>;
const EditIcon   = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const TrashIcon  = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const DownIcon   = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

const reports = [
  { id: 1, name_ar: 'تقرير الأداء البيئي للربع الأول 2024',          name_en: 'Environmental Performance Report Q1 2024',          company: 'حلول إيكو كورب', date: '2024-03-31', status: 'complete',   version: '1.0' },
  { id: 2, name_ar: 'مراجعة انبعاثات النطاق 1 و 2 لعام 2023',        name_en: 'Scope 1 & 2 Emissions Review 2023',                company: 'حلول إيكو كورب', date: '2024-01-15', status: 'approved',  version: '1.2' },
  { id: 3, name_ar: 'مسودة تقرير استهلاك الطاقة لشهر فبراير',        name_en: 'Energy Consumption Report Draft – February',       company: 'حلول إيكو كورب', date: '2024-02-28', status: '',          version: '0.9' },
  { id: 4, name_ar: 'تقرير أهداف صافي الصفر 2023',                  name_en: 'Net Zero Goals Report 2023',                       company: 'حلول إيكو كورب', date: '2023-12-01', status: 'draft',     version: '2.0' },
  { id: 5, name_ar: 'تحليل البصمة الكربونية للمنتج X',              name_en: 'Carbon Footprint Analysis – Product X',            company: 'حلول إيكو كورب', date: '2024-04-10', status: 'complete',   version: '1.1' },
  { id: 6, name_ar: 'تقرير المراجعة السنوية لعام 2022',             name_en: 'Annual Review Report 2022',                        company: 'حلول إيكو كورب', date: '2023-01-20', status: 'approved',  version: '1.0' },
];

function StatusBadge({ status, locale }) {
  if (!status) return null;
  const isAr = locale === 'ar';
  const map = {
    complete: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: isAr ? 'مكتمل' : 'Complete' },
    approved: { bg: 'bg-gray-100',   text: 'text-gray-600',    label: isAr ? 'معتمد' : 'Approved' },
    draft:    { bg: 'bg-blue-50',    text: 'text-blue-600',    label: isAr ? 'مسودة' : 'Draft' },
  };
  const s = map[status];
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>{s.label}</span>;
}

function ReportsLogContent() {
  const { locale } = useLanguage();
  const isAr = locale === 'ar';

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className={isAr ? 'text-right' : 'text-left'}>
          <h1 className="text-xl font-bold text-gray-900">{isAr ? 'سجل التقارير' : 'Reports Log'}</h1>
          <p className="text-xs text-gray-400 mt-0.5">{isAr ? '.الذي تم إنشاؤها إدارة وتتبع تقاريرك البيئية والاجتماعية والحوكمة (ESG)' : 'Manage and track your created ESG reports.'}</p>
        </div>
        {/* Filters + Export */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 transition">
            <DownIcon /> {isAr ? 'تصدير' : 'Export'}
          </button>
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 outline-none">
            <option>{isAr ? 'الكل' : 'All'}</option>
            <option>{isAr ? 'مكتمل' : 'Complete'}</option>
            <option>{isAr ? 'معتمد' : 'Approved'}</option>
            <option>{isAr ? 'مسودة' : 'Draft'}</option>
          </select>
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 outline-none">
            <option>{isAr ? 'الكل' : 'All'}</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className={`px-5 py-3 border-b border-gray-100 ${isAr ? 'text-right' : 'text-left'}`}>
          <h2 className="text-sm font-semibold text-gray-800">{isAr ? 'قائمة التقارير' : 'Reports List'}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className={`px-5 py-3 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'اسم التقرير' : 'Report Name'}</th>
                <th className={`px-4 py-3 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'الشركة' : 'Company'}</th>
                <th className={`px-4 py-3 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'تاريخ الإنشاء' : 'Created'}</th>
                <th className={`px-4 py-3 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'الحالة' : 'Status'}</th>
                <th className={`px-4 py-3 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'الإصدار' : 'Version'}</th>
                <th className={`px-4 py-3 text-xs font-semibold text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className={`px-5 py-3.5 text-xs font-medium text-gray-800 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? r.name_ar : r.name_en}</td>
                  <td className={`px-4 py-3.5 text-xs text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{r.company}</td>
                  <td className={`px-4 py-3.5 text-xs text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{r.date}</td>
                  <td className={`px-4 py-3.5 ${isAr ? 'text-right' : 'text-left'}`}><StatusBadge status={r.status} locale={locale} /></td>
                  <td className={`px-4 py-3.5 text-xs text-gray-500 ${isAr ? 'text-right' : 'text-left'}`}>{r.version}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button className="text-gray-400 hover:text-emerald-500 transition"><EyeIcon /></button>
                      <button className="text-gray-400 hover:text-emerald-500 transition"><EditIcon /></button>
                      <button className="text-gray-400 hover:text-red-500 transition"><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100">
          <button className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">{isAr ? 'التالي' : 'Next'}</button>
          <button className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">{isAr ? 'السابق' : 'Previous'}</button>
        </div>
      </div>
    </div>
  );
}

export default function ReportsLogPage() {
  return (
    <ClientWrapper>
      <AppLayout>
        <ReportsLogContent />
      </AppLayout>
    </ClientWrapper>
  );
}
