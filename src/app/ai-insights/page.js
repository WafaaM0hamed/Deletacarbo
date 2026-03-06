'use client';
import { useState } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import AppLayout from '@/components/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';

// icons
const TrendUpIcon = () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L5 23M21 21l-5-5" /></svg>;
const BulbIcon = () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const WarnIcon = () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const ShareIcon = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342c.886.894 2.425.894 3.312 0l7.844-7.844a3 3 0 00-4.243-4.243l-3.922 3.922M21.657 5.657a3 3 0 00-4.243 0L13.5 9.5m8.157-3.843a3 3 0 010 4.243" /></svg>;
const CopyIcon = () => <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-3 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

function ActionCard({ title, desc, saving, open, onToggle, t }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full text-start">
        <div className={`px-4 py-3 ${open ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'} transition flex flex-col gap-1`}>
          <span className="text-sm font-semibold text-gray-800">{title}</span>
          {open && <span className="text-xs text-gray-500 leading-relaxed">{desc}</span>}
          {open && saving && <span className="text-xs font-semibold text-emerald-500 mt-1">{saving}</span>}
        </div>
      </button>
      <div className={`flex justify-end gap-2 px-3 py-2 border-t border-gray-100 ${open ? 'block' : 'hidden'}`}>
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
          <CopyIcon />{t('ai_insights.copy')}
        </button>
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
          <ShareIcon />{t('ai_insights.share')}
        </button>
      </div>
    </div>
  );
}

function RiskBadge({ level, t }) {
  const isHigh = level === 'high';
  const bg = isHigh ? 'bg-red-50' : 'bg-amber-50';
  const text = isHigh ? 'text-red-600' : 'text-amber-600';
  const label = isHigh ? t('ai_insights.risk_high') : t('ai_insights.risk_medium');
  
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${bg} ${text}`}>
      {label}
    </span>
  );
}

function AIInsightsContent() {
  const { t } = useLanguage();
  const [openAction, setOpenAction] = useState(0);
  const [planTab, setPlanTab] = useState(0);

  const actions = [
    { 
      title: t('ai_insights.action_1_title'),
      desc: t('ai_insights.action_1_desc'),
      saving: t('ai_insights.action_1_saving')
    },
    { 
      title: t('ai_insights.action_2_title'),
      desc: t('ai_insights.action_2_desc'),
      saving: t('ai_insights.action_2_saving')
    },
    { 
      title: t('ai_insights.action_3_title'),
      desc: t('ai_insights.action_3_desc'),
      saving: t('ai_insights.action_3_saving')
    },
    { 
      title: t('ai_insights.action_4_title'),
      desc: t('ai_insights.action_4_desc'),
      saving: t('ai_insights.action_4_saving')
    },
  ];

  const risks = [
    { 
      title: t('ai_insights.risk_1_title'),
      desc: t('ai_insights.risk_1_desc'),
      level: 'high'
    },
    { 
      title: t('ai_insights.risk_2_title'),
      desc: t('ai_insights.risk_2_desc'),
      level: 'medium'
    },
    { 
      title: t('ai_insights.risk_3_title'),
      desc: t('ai_insights.risk_3_desc'),
      level: 'high'
    },
  ];

  const opps = [
    { 
      title: t('ai_insights.opp_1_title'),
      desc: t('ai_insights.opp_1_desc'),
      level: 'high'
    },
    { 
      title: t('ai_insights.opp_2_title'),
      desc: t('ai_insights.opp_2_desc'),
      level: 'medium'
    },
    { 
      title: t('ai_insights.opp_3_title'),
      desc: t('ai_insights.opp_3_desc'),
      level: 'high'
    },
  ];

  const planTabs = [
    t('ai_insights.plan_30'),
    t('ai_insights.plan_90'),
    t('ai_insights.plan_180')
  ];

  const planItems = [
    { 
      title: t('ai_insights.timeline_1_title'),
      date: '31-07-2024',
      status: t('ai_insights.status_active'),
      statusColor: 'text-emerald-600'
    },
    { 
      title: t('ai_insights.timeline_2_title'),
      date: '15-08-2024',
      status: t('ai_insights.status_approved'),
      statusColor: 'text-gray-500'
    },
    { 
      title: t('ai_insights.timeline_3_title'),
      date: '20-08-2024',
      status: t('ai_insights.status_planned'),
      statusColor: 'text-gray-500'
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{t('ai_insights.title')}</h1>
          <p className="text-xs text-gray-400 mt-0.5">{t('ai_insights.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition">
          <ShareIcon />
          {t('ai_insights.share_insights')}
        </button>
      </div>

      {/* key highlights - 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              {t('ai_insights.top_opportunity')}
            </span>
            <span className="text-gray-300"><TrendUpIcon /></span>
          </div>
          <span className="text-2xl font-bold text-emerald-600">15%</span>
          <span className="text-xs text-gray-400">
            {t('ai_insights.top_opportunity_detail')}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              {t('ai_insights.expected_reduction')}
            </span>
            <span className="text-gray-300"><BulbIcon /></span>
          </div>
          <span className="text-xl font-bold text-gray-900">12 CO2e</span>
          <span className="text-xs text-gray-400">
            {t('ai_insights.expected_reduction_detail')}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              {t('ai_insights.top_compliance_risk')}
            </span>
            <span className="text-gray-300"><WarnIcon /></span>
          </div>
          <RiskBadge level="high" t={t} />
          <span className="text-xs text-gray-400">
            {t('ai_insights.high_risk')}
          </span>
        </div>
      </div>

      {/* priority actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-gray-800">
            {t('ai_insights.priority_actions')}
          </h2>
          <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            {t('ai_insights.print')}
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          {t('ai_insights.priority_actions_subtitle')}
        </p>
        <div className="flex flex-col gap-2">
          {actions.map((action, i) => (
            <ActionCard
              key={i}
              title={action.title}
              desc={action.desc}
              saving={action.saving}
              open={openAction === i}
              onToggle={() => setOpenAction(openAction === i ? -1 : i)}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* risk & opportunities */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">
          {t('ai_insights.risk_analysis')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* risks */}
          <div>
            <h3 className="text-xs font-semibold text-gray-600 mb-3 flex items-center gap-1.5">
              <span className="text-red-500"><WarnIcon /></span>
              {t('ai_insights.potential_risks')}
            </h3>
            <div className="flex flex-col gap-2">
              {risks.map((risk, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-3 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-800 flex-1">
                      {risk.title}
                    </span>
                    <RiskBadge level={risk.level} t={t} />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{risk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* opportunities */}
          <div>
            <h3 className="text-xs font-semibold text-gray-600 mb-3 flex items-center gap-1.5">
              <span className="text-emerald-500"><BulbIcon /></span>
              {t('ai_insights.new_opportunities')}
            </h3>
            <div className="flex flex-col gap-2">
              {opps.map((opp, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-3 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-800 flex-1">
                      {opp.title}
                    </span>
                    <RiskBadge level={opp.level} t={t} />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{opp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* action plan timeline */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">
          {t('ai_insights.action_plan')}
        </h2>

        {/* tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
          {planTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setPlanTab(i)}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition
                ${planTab === i ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* timeline items */}
        <div className="flex flex-col gap-2">
          {planItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50 flex-shrink-0">
                <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
              <span className={`text-xs font-semibold ${item.statusColor}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AIInsightsPage() {
  return (
    <ClientWrapper>
      <AppLayout>
        <AIInsightsContent />
      </AppLayout>
    </ClientWrapper>
  );
}
