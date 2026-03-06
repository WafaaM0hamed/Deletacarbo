'use client';
import { useState } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import AppLayout from '@/components/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const DownloadIcon = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const ShareIcon    = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342c.886.894 2.425.894 3.312 0l7.844-7.844a3 3 0 00-4.243-4.243l-3.922 3.922M21.657 5.657a3 3 0 00-4.243 0L13.5 9.5m8.157-3.843a3 3 0 010 4.243" /></svg>;

function AccordionSection({ title, open, onToggle, children }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition">
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <svg className={`h-5 w-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="p-5 bg-white">{children}</div>}
    </div>
  );
}

function ESGReportContent() {
  const { locale } = useLanguage();
  const isAr = locale === 'ar';
  const [openSection, setOpenSection] = useState(-1);

  const toggle = (i) => setOpenSection(openSection === i ? -1 : i);

  const scopeCards = [
    { label: isAr ? 'النطاق 1' : 'Scope 1', value: '12,500', unit: isAr ? 'طن مكافئ ثاني أكسيد الكربون' : 'Tons CO2e', sub: isAr ? '(انبعاثات مباشرة من العمليات)' : '(Direct emissions from operations)', color: 'text-emerald-600' },
    { label: isAr ? 'النطاق 2' : 'Scope 2', value: '7,800',  unit: isAr ? 'طن مكافئ ثاني أكسيد الكربون' : 'Tons CO2e', sub: isAr ? '(انبعاثات غير مباشرة من الكهرباء المشتراة)' : '(Indirect emissions from purchased electricity)', color: 'text-emerald-600' },
    { label: isAr ? 'النطاق 3' : 'Scope 3', value: '34,200', unit: isAr ? 'طن مكافئ ثاني أكسيد الكربون' : 'Tons CO2e', sub: isAr ? '(انبعاثات من سلسلة القيمة)' : '(Emissions from value chain)', color: 'text-emerald-600' },
  ];

  const goals = isAr
    ? [
        { bold: 'هدف:', text: 'تحقيق صافي انبعاثات صفرية عبر انبعاثات صفرية بحلول عام 2040، مع خفض بنسبة 50% بحلول عام 2030.' },
        { bold: 'زيادة الطاقة المتجددة:', text: 'زيادة استخدام مصادر الطاقة المتجددة للتشغيل إلى 80% من منشأها بحلول عام 2028.' },
        { bold: 'تحسين كفاءة سلسلة التوريد:', text: 'العمل مع الموردين الرئيسيين لخفض انبعاثاتهم بنسبة 25% بحلول عام 2027.' },
        { bold: 'مبادرات المسؤولية الاجتماعية:', text: 'إطلاق برامج شامل لدعم المجتمع المحلي ورينادة فرص العمل الخضراء بنسبة 15% بحلول عام 2026.' },
      ]
    : [
        { bold: 'Goal:', text: 'Achieve net zero emissions across all emissions by 2040, with a 50% reduction by 2030.' },
        { bold: 'Renewable Energy:', text: 'Increase renewable energy usage for operations to 80% from baseline by 2028.' },
        { bold: 'Supply Chain Efficiency:', text: 'Work with key suppliers to reduce their emissions by 25% by 2027.' },
        { bold: 'Social Responsibility:', text: 'Launch comprehensive programs to support local community and create green jobs by 15% by 2026.' },
      ];

  const actionSections = [
    {
      title: isAr ? 'التحول إلى الطاقة المتجددة' : 'Transition to Renewable Energy',
      action:   isAr ? 'تركيب الألواح الشمسية في مقر البنوا الرئيسي في ثلاثة مراقب رئيسية.' : 'Install solar panels at the main headquarters in three main monitoring points.',
      timeline: isAr ? 'البريع الثاني 2024 - البريع الرابع 2025' : 'Q2 2024 – Q4 2025',
      team:     isAr ? 'فريق العمليات والاستدامة.' : 'Operations & Sustainability Team.',
    },
    {
      title: isAr ? 'تحسين كفاءة سلسلة التوريد' : 'Improve Supply Chain Efficiency',
      action:   isAr ? 'تطبيق نظام لتتبع انبعاثات التوريد وإجراء تدقيقات بيئية للموردين الرئيسيين.' : 'Implement a system to track supply emissions and conduct environmental audits for key suppliers.',
      timeline: isAr ? 'البريع الأول 2024 - البريع الثالث 2024' : 'Q1 2024 – Q3 2024',
      team:     isAr ? 'فريق المشتريات والخدمات اللوجستية.' : 'Procurement & Logistics Team.',
    },
    {
      title: isAr ? 'برنامج مشاركة الموظفين' : 'Employee Engagement Program',
      action:   isAr ? 'إطلاق برنامج توعية للموظفين حول الاستدامة وتقديم حوافز للمبادرات الخضراء.' : 'Launch an employee awareness program on sustainability and provide incentives for green initiatives.',
      timeline: isAr ? 'البريع الرابع 2023 - مستمر' : 'Q4 2023 – Ongoing',
      team:     isAr ? 'قسم الموارد البشرية والاستدامة.' : 'Human Resources & Sustainability Department.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-5">
      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition">
          <DownloadIcon /> {isAr ? 'تصدير PDF' : 'Export PDF'}
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
          <ShareIcon /> {isAr ? 'مشاركة التقرير' : 'Share Report'}
        </button>
      </div>

      {/* Report Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Title */}
        <h1 className="text-xl font-bold text-emerald-600 text-center leading-snug mb-3">
          {isAr ? 'المدعوم (ESG) تقرير الأداء البيئي والاجتماعي والحوكمة بالذكاء الاصطناعي' : 'AI-Powered ESG Environmental, Social and Governance Performance Report'}
        </h1>
        <p className="text-center text-xs text-gray-400">{isAr ? 'تاريخ التقرير: 15 أكتوبر 2023' : 'Report Date: October 15, 2023'}</p>
        <p className="text-center text-xs text-gray-400 mb-6">{isAr ? 'الشركة: حلول إيكو كورب' : 'Company: EcoCorp Solutions'}</p>

        <hr className="border-gray-100 mb-6" />

        {/* 1. Executive Summary */}
        <h2 className="text-base font-bold text-gray-900 mb-2">{isAr ? '1. ملخص تنفيذي' : '1. Executive Summary'}</h2>
        <p className="text-xs text-gray-600 leading-relaxed mb-6">
          {isAr
            ? 'لشركة حلول إيكو كورب لعام 2023. يوضح هذا التقرير. المدعوم بتقنية (ESG) المدعوم الوثيقة الشاملة الأداء البيئي والاجتماعي والحوكمي في الحد من 20 من حذوذا تقدما دقيقة المراجع EcoCorp Solutions، وتعزز تأثيرها الإزامة من الحكومة، ويهدف أهداف أذوا سبيل التقرير الإزامة إلى أهداف أذوا سبيل الإزامة الاصطناعي التي الصغيرة، ويقدم طريق تقصيلي للسنوات القادمة للممارسات الاستدامة في نموذج أعمالنا.'
            : 'This report presents a comprehensive ESG performance overview for EcoCorp Solutions for the year 2023. It highlights the company\'s environmental and social achievements, identifies key areas for improvement, and outlines a strategic roadmap for sustainable business practices in the coming years.'}
        </p>

        {/* 2. Baseline */}
        <h2 className="text-base font-bold text-gray-900 mb-3">{isAr ? '2. بيانات خط أساس الانبعاثات' : '2. Baseline Emissions Data'}</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {scopeCards.map((c, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 text-center">
              <span className={`text-xs font-semibold ${c.color}`}>{c.label}</span>
              <p className="text-xl font-bold text-gray-900 mt-1">{c.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{c.unit}</p>
              <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* 3. Goals */}
        <h2 className="text-base font-bold text-gray-900 mb-2">{isAr ? '3. الأهداف وخارطة الطريق' : '3. Goals & Roadmap'}</h2>
        <div className="flex flex-col gap-1.5 mb-6">
          {goals.map((g, i) => (
            <p key={i} className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">{g.bold}</span> {g.text}
            </p>
          ))}
        </div>

        {/* 4. Action Plan – accordion */}
        <h2 className="text-base font-bold text-gray-900 mb-3">{isAr ? '4. خطة العمل المفصلة' : '4. Detailed Action Plan'}</h2>
        <div className="flex flex-col gap-2">
          {actionSections.map((s, i) => (
            <AccordionSection key={i} title={s.title} open={openSection === i} onToggle={() => toggle(i)}>
              <p className="text-xs text-gray-600 mb-2"><span className="font-semibold text-gray-700">{isAr ? 'الإجراء:' : 'Action:'}</span> {s.action}</p>
              <p className="text-xs text-gray-600 mb-2"><span className="font-semibold text-gray-700">{isAr ? 'الجدول الزمني:' : 'Timeline:'}</span> {s.timeline}</p>
              <p className="text-xs text-gray-600">{isAr ? 'الفريق المسؤول:' : 'Responsible Team:'} <span className="font-semibold text-gray-700">{s.team}</span></p>
            </AccordionSection>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ESGReportsPage() {
  return (
    <ClientWrapper>
      <AppLayout>
        <ESGReportContent />
      </AppLayout>
    </ClientWrapper>
  );
}
