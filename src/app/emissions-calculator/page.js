'use client';
import { useState } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import AppLayout from '@/components/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';

function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center justify-center gap-0 w-full mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition-all
              ${i < current ? 'bg-emerald-500 border-emerald-500' : i === current ? 'border-emerald-500 bg-white' : 'border-gray-300 bg-white'}`}>
              {i < current && (
                <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {i === current && <div className="h-2 w-2 rounded-full bg-emerald-500" />}
            </div>
            <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${i === current ? 'text-emerald-600' : 'text-gray-400'}`}>{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 h-0.5 mx-1 mb-5 ${i < current ? 'bg-emerald-400' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function InfoIcon() {
  return (
    <svg className="h-4 w-4 text-gray-300 cursor-pointer hover:text-emerald-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-2v-4h2m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <InfoIcon />
      </div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none appearance-none cursor-pointer"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <InfoIcon />
      </div>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
      />
    </div>
  );
}

function EmissionsCalculatorContent() {
  const { t, locale } = useLanguage();
  const isAr = locale === 'ar';

  const [step, setStep] = useState(0);

  const steps = locale === 'ar'
    ? ['النطاق 1: الانبعاثات المباشرة', 'النطاق 2: انبعاثات الطاقة غير المباشرة', 'النطاق 3: انبعاثات سلسلة القيمة', 'المراجعة والنتائج']
    : ['Scope 1: Direct', 'Scope 2: Indirect', 'Scope 3: Value Chain', 'Review & Results'];

  const [fuelType, setFuelType]           = useState('diesel');
  const [fuelAmount, setFuelAmount]       = useState('1500');
  const [fuelUnit, setFuelUnit]           = useState('liter');
  const [refrigerantType, setRefrigerantType] = useState('hfc134a');
  const [leakAmount, setLeakAmount]       = useState('50');
  const [leakUnit, setLeakUnit]           = useState('kg');

  // Scope 2 states
  const [electricityAmount, setElectricityAmount] = useState('25000');
  const [electricityUnit, setElectricityUnit] = useState('kwh');
  const [heatAmount, setHeatAmount] = useState('5000');
  const [heatUnit, setHeatUnit] = useState('mmbtu');

  // Scope 3 states
  const [travelMode, setTravelMode] = useState('flight');
  const [travelDistance, setTravelDistance] = useState('5000');
  const [travelUnit, setTravelUnit] = useState('km');
  const [wasteAmount, setWasteAmount] = useState('2000');
  const [wasteUnit, setWasteUnit] = useState('kg');

  const fuelOptions = locale === 'ar'
    ? [{ value: 'diesel', label: 'ديزل' }, { value: 'gasoline', label: 'بنزين' }, { value: 'gas', label: 'غاز طبيعي' }]
    : [{ value: 'diesel', label: 'Diesel' }, { value: 'gasoline', label: 'Gasoline' }, { value: 'gas', label: 'Natural Gas' }];

  const fuelUnitOptions = locale === 'ar'
    ? [{ value: 'liter', label: 'لتر' }, { value: 'kg', label: 'كيلوجرام' }, { value: 'gallon', label: 'جالون' }]
    : [{ value: 'liter', label: 'Liter' }, { value: 'kg', label: 'Kilogram' }, { value: 'gallon', label: 'Gallon' }];

  const refrigerantOptions = [
    { value: 'hfc134a', label: 'HFC-134a' },
    { value: 'hfc410a', label: 'HFC-410A' },
    { value: 'r22',     label: 'R-22' },
  ];

  const leakUnitOptions = locale === 'ar'
    ? [{ value: 'kg', label: 'كيلوجرام' }, { value: 'g', label: 'جرام' }]
    : [{ value: 'kg', label: 'Kilogram' }, { value: 'g', label: 'Gram' }];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Title */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-gray-900">{t('emissions_calculator.title')}</h1>
        <p className="text-sm text-gray-400 mt-1">{t('emissions_calculator.subtitle')}</p>
      </div>

      {/* Steps */}
      <StepIndicator steps={steps} current={step} />

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {step === 0 && (
          <>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{t('emissions_calculator.scope1_direct')}</h2>
            <p className="text-xs text-gray-400 mb-5">{t('emissions_calculator.scope1_desc')}</p>

            {/* Fuel Combustion */}
            <div className="border border-gray-100 rounded-lg p-5 mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">{t('emissions_calculator.fuel_combustion')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField label={t('emissions_calculator.fuel_type')} value={fuelType} options={fuelOptions} onChange={setFuelType} />
                <InputField label={t('emissions_calculator.fuel_consumption')} value={fuelAmount} onChange={setFuelAmount} placeholder="1500" />
              </div>
              <div className="mt-4 sm:w-1/2">
                <SelectField label={t('emissions_calculator.fuel_unit')} value={fuelUnit} options={fuelUnitOptions} onChange={setFuelUnit} />
              </div>
            </div>

            {/* Refrigerants */}
            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">{t('emissions_calculator.refrigerants')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField label={t('emissions_calculator.refrigerant_type')} value={refrigerantType} options={refrigerantOptions} onChange={setRefrigerantType} />
                <InputField label={t('emissions_calculator.leak_quantity')} value={leakAmount} onChange={setLeakAmount} placeholder="50" />
              </div>
              <div className="mt-4 sm:w-1/2">
                <SelectField label={t('emissions_calculator.leak_unit')} value={leakUnit} options={leakUnitOptions} onChange={setLeakUnit} />
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{t('emissions_calculator.scope2_energy')}</h2>
            <p className="text-xs text-gray-400 mb-5">{isAr ? 'أدخل بيانات الطاقة غير المباشرة المشتراة من قبل شركتك (كهرباء، تبريد، تدفئة).' : 'Enter data for indirect energy purchased by your company (electricity, cooling, heating).'}</p>

            {/* Electricity Consumption */}
            <div className="border border-gray-100 rounded-lg p-5 mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">{isAr ? 'استهلاك الكهرباء' : 'Electricity Consumption'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField 
                  label={isAr ? 'كمية الكهرباء المستهلكة' : 'Electricity Consumed'} 
                  value={electricityAmount} 
                  onChange={setElectricityAmount} 
                  placeholder="25000" 
                />
                <SelectField 
                  label={isAr ? 'الوحدة' : 'Unit'} 
                  value={electricityUnit} 
                  options={[
                    { value: 'kwh', label: isAr ? 'كيلووات ساعة (kWh)' : 'Kilowatt-hour (kWh)' },
                    { value: 'mwh', label: isAr ? 'ميجاوات ساعة (MWh)' : 'Megawatt-hour (MWh)' }
                  ]} 
                  onChange={setElectricityUnit} 
                />
              </div>
            </div>

            {/* Purchased Heat/Steam */}
            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">{isAr ? 'التدفئة أو البخار المشترى' : 'Purchased Heat/Steam'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField 
                  label={isAr ? 'الكمية' : 'Amount'} 
                  value={heatAmount} 
                  onChange={setHeatAmount} 
                  placeholder="5000" 
                />
                <SelectField 
                  label={isAr ? 'الوحدة' : 'Unit'} 
                  value={heatUnit} 
                  options={[
                    { value: 'mmbtu', label: 'MMBtu' },
                    { value: 'gj', label: isAr ? 'جيجاجول (GJ)' : 'Gigajoule (GJ)' }
                  ]} 
                  onChange={setHeatUnit} 
                />
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{t('emissions_calculator.scope3_value')}</h2>
            <p className="text-xs text-gray-400 mb-5">{isAr ? 'أدخل بيانات الانبعاثات من سلسلة القيمة (موردين، نقل، سفر الموظفين، نفايات).' : 'Enter data for value chain emissions (suppliers, transport, employee travel, waste).'}</p>

            {/* Business Travel */}
            <div className="border border-gray-100 rounded-lg p-5 mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">{isAr ? 'سفر العمل' : 'Business Travel'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField 
                  label={isAr ? 'وسيلة النقل' : 'Transport Mode'} 
                  value={travelMode} 
                  options={[
                    { value: 'flight', label: isAr ? 'طائرة' : 'Flight' },
                    { value: 'car', label: isAr ? 'سيارة' : 'Car' },
                    { value: 'train', label: isAr ? 'قطار' : 'Train' }
                  ]} 
                  onChange={setTravelMode} 
                />
                <InputField 
                  label={isAr ? 'المسافة (كم)' : 'Distance (km)'} 
                  value={travelDistance} 
                  onChange={setTravelDistance} 
                  placeholder="12000" 
                />
              </div>
            </div>

            {/* Waste Generated */}
            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">{isAr ? 'النفايات المتولدة' : 'Waste Generated'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField 
                  label={isAr ? 'كمية النفايات' : 'Waste Amount'} 
                  value={wasteAmount} 
                  onChange={setWasteAmount} 
                  placeholder="850" 
                />
                <SelectField 
                  label={isAr ? 'الوحدة' : 'Unit'} 
                  value={wasteUnit} 
                  options={[
                    { value: 'kg', label: isAr ? 'كيلوجرام' : 'Kilogram' },
                    { value: 'tons', label: isAr ? 'طن' : 'Tons' }
                  ]} 
                  onChange={setWasteUnit} 
                />
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <div className="py-2">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{t('emissions_calculator.review')}</h2>
            <p className="text-xs text-gray-400 mb-5">{isAr ? 'مراجعة وتأكيد البيانات المدخلة وعرض النتائج المحسوبة.' : 'Review and confirm entered data and view calculated results.'}</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <p className="text-xs text-emerald-600 font-semibold mb-1">{isAr ? 'النطاق 1' : 'Scope 1'}</p>
                <p className="text-2xl font-bold text-emerald-700">3,120</p>
                <p className="text-xs text-emerald-500 mt-1">{isAr ? 'طن مكافئ CO₂' : 'Tons CO₂e'}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-xs text-blue-600 font-semibold mb-1">{isAr ? 'النطاق 2' : 'Scope 2'}</p>
                <p className="text-2xl font-bold text-blue-700">4,890</p>
                <p className="text-xs text-blue-500 mt-1">{isAr ? 'طن مكافئ CO₂' : 'Tons CO₂e'}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <p className="text-xs text-purple-600 font-semibold mb-1">{isAr ? 'النطاق 3' : 'Scope 3'}</p>
                <p className="text-2xl font-bold text-purple-700">4,533</p>
                <p className="text-xs text-purple-500 mt-1">{isAr ? 'طن مكافئ CO₂' : 'Tons CO₂e'}</p>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">{isAr ? 'إجمالي الانبعاثات المحسوبة' : 'Total Calculated Emissions'}</p>
                  <p className="text-xs text-gray-400">{isAr ? 'بناءً على البيانات المدخلة' : 'Based on entered data'}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">12,543</p>
                  <p className="text-xs text-gray-500">{isAr ? 'طن مكافئ ثاني أكسيد الكربون' : 'Tons CO₂ Equivalent'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition">
                {isAr ? 'حفظ التقرير' : 'Save Report'}
              </button>
              <button className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                {isAr ? 'تصدير PDF' : 'Export PDF'}
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {t('common.previous')}
          </button>
          <button
            onClick={() => setStep(Math.min(3, step + 1))}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition"
          >
            {t('common.next')}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EmissionsCalculatorPage() {
  return (
    <ClientWrapper>
      <AppLayout>
        <EmissionsCalculatorContent />
      </AppLayout>
    </ClientWrapper>
  );
}
