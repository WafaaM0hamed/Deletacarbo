'use client';
import { useState } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import AppLayout from '@/components/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// TODO: move this to a separate file later
const trendData = [
  { name: 'يناير', actual: 105, target: 140 },
  { name: 'فبراير', actual: 110, target: 135 },
  { name: 'مارس', actual: 118, target: 130 },
  { name: 'أبريل', actual: 115, target: 125 },
  { name: 'مايو', actual: 122, target: 120 },
  { name: 'يونيو', actual: 130, target: 115 },
];

const trendDataEn = [
  { name: 'Jan', actual: 105, target: 140 },
  { name: 'Feb', actual: 110, target: 135 },
  { name: 'Mar', actual: 118, target: 130 },
  { name: 'Apr', actual: 115, target: 125 },
  { name: 'May', actual: 122, target: 120 },
  { name: 'Jun', actual: 130, target: 115 },
];

const sourceData = [
  { name: 'استهلاك الطاقة', value: 35, nameEn: 'Energy' },
  { name: 'النقل والوجستيات', value: 28, nameEn: 'Transport' },
  { name: 'العمليات الصناعية', value: 15, nameEn: 'Manufacturing' },
  { name: 'إدارة النفايات', value: 10, nameEn: 'Waste' },
  { name: 'سلسلة التوريد', value: 7, nameEn: 'Supply Chain' },
];

const intensityData = [
  { name: 'الكهرباء', value: 1.8, nameEn: 'Electricity' },
  { name: 'الغاز الطبيعي', value: 1.2, nameEn: 'Natural Gas' },
  { name: 'الوقود', value: 0.9, nameEn: 'Fuel' },
];

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

// stat card component
function StatCard({ label, value, unit, change, positive }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-1 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">{label}</span>
        <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16v-6m0 0L9 14m4-4l4 4m6 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        </svg>
      </div>
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      <span className="text-xs text-gray-400">{unit}</span>
      <div className={`flex items-center gap-1 text-xs font-semibold ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
        {positive ? (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        <span>{change}</span>
      </div>
    </div>
  );
}

function AccordionItem({ title, children, open, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button 
        onClick={onToggle} 
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <svg 
          className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="p-4 bg-white text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

function DashboardContent() {
  const { t, locale } = useLanguage();
  const [openAccordion, setOpenAccordion] = useState(0);

  const stats = [
    { label: t('dashboard.totalEmissions'), value: '12,543', change: '+1.5%', positive: false },
    { label: t('dashboard.scope1'), value: '3,120', change: '-0.8%', positive: true },
    { label: t('dashboard.scope2'), value: '4,890', change: '+2.1%', positive: false },
    { label: t('dashboard.scope3'), value: '4,533', change: '-0.2%', positive: true },
  ];

  const unit = t('dashboard.tons_co2');
  const vsLabel = t('dashboard.vs_last_month');

  const chartData = locale === 'ar' ? trendData : trendDataEn;
  
  // prepare bar chart data
  const barData = sourceData.map(d => ({ 
    name: locale === 'ar' ? d.name : d.nameEn, 
    value: d.value 
  }));
  
  const intensityBarData = intensityData.map(d => ({ 
    name: locale === 'ar' ? d.name : d.nameEn, 
    value: d.value 
  }));

  return (
    <div className="flex flex-col gap-5">
      {/* top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard 
            key={i} 
            label={s.label} 
            value={s.value} 
            unit={`${unit} • ${vsLabel}`} 
            change={s.change} 
            positive={s.positive} 
          />
        ))}
      </div>

      {/* trend chart + AI insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">
            {t('dashboard.emissions_trend')}
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            {t('dashboard.emissions_trend_subtitle')}
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: '#9ca3af' }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#9ca3af' }} 
                axisLine={false} 
                tickLine={false} 
                domain={[0, 160]} 
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10b981" 
                strokeWidth={2.5} 
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#10b981" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false} 
                opacity={0.5} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ai insights section */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-gray-800">
            {t('dashboard.ai_insights_title')}
          </h2>
          <p className="text-xs text-gray-400">
            {t('dashboard.ai_insights_subtitle')}
          </p>
          <div className="flex flex-col gap-2 flex-1">
            <AccordionItem 
              title={t('dashboard.improve_energy')} 
              open={openAccordion === 0} 
              onToggle={() => setOpenAccordion(openAccordion === 0 ? -1 : 0)}
            >
              {t('dashboard.improve_energy_desc')}
              <a href="#" className="text-emerald-500 text-xs font-semibold mt-2 inline-block hover:underline">
                {t('dashboard.show_details')}
              </a>
            </AccordionItem>
            <AccordionItem 
              title={t('dashboard.raw_material_suppliers')} 
              open={openAccordion === 1} 
              onToggle={() => setOpenAccordion(openAccordion === 1 ? -1 : 1)} 
            />
            <AccordionItem 
              title={t('dashboard.recycling_program')} 
              open={openAccordion === 2} 
              onToggle={() => setOpenAccordion(openAccordion === 2 ? -1 : 2)} 
            />
          </div>
        </div>
      </div>

      {/* bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* emission sources */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-0.5">
            {t('dashboard.top_sources')}
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            {t('dashboard.top_sources_subtitle')}
          </p>
          <div className="flex flex-col gap-3">
            {barData.map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-700">{item.name}</span>
                  <span className="text-xs font-semibold text-gray-500">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${item.value}%`, 
                      backgroundColor: COLORS[i] 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* intensity chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-0.5">
            {t('dashboard.emissions_intensity')}
          </h2>
          <p className="text-xs text-gray-400 mb-2">
            {t('dashboard.emissions_intensity_subtitle')}
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={intensityBarData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                type="number" 
                tick={{ fontSize: 10, fill: '#9ca3af' }} 
                axisLine={false} 
                tickLine={false} 
                domain={[0, 2]} 
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 10, fill: '#6b7280' }} 
                axisLine={false} 
                tickLine={false} 
                width={55} 
              />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {intensityBarData.map((_, i) => (
                  <Cell key={i} fill={['#10b981', '#34d399', '#6ee7b7'][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* net zero progress circle */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col items-center justify-center gap-2">
          <h2 className="text-sm font-semibold text-gray-800">
            {t('dashboard.progress_net_zero')}
          </h2>
          <p className="text-xs text-gray-400">
            {t('dashboard.net_zero_target')}
          </p>
          <div className="relative flex items-center justify-center my-2">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle 
                cx="60" 
                cy="60" 
                r="50" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="12" 
              />
              <circle
                cx="60" 
                cy="60" 
                r="50" 
                fill="none"
                stroke="#10b981" 
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${0.65 * 2 * Math.PI * 50} ${2 * Math.PI * 50}`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">65%</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-500">
            {t('dashboard.good_progress')}
          </span>
          <span className="text-xs text-gray-400 text-center">
            {t('dashboard.years_remaining')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ClientWrapper>
      <AppLayout>
        <DashboardContent />
      </AppLayout>
    </ClientWrapper>
  );
}
