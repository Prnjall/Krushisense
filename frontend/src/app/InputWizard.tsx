import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { LanguageToggle } from './LanguageContext';

const steps = [
  {
    labelKey: 'soilAnalysis',
    name: 'nitrogen',
    unit: 'kg/ha',
    infoKey: 'nitrogenDescription',
    promptKey: 'nitrogenPrompt',
    placeholder: 'Nitrogen (N)',
  },
  {
    labelKey: 'soilAnalysis',
    name: 'phosphorus',
    unit: 'kg/ha',
    infoKey: 'phosphorusDescription',
    promptKey: '',
    placeholder: 'Phosphorus (P)',
  },
  {
    labelKey: 'soilAnalysis',
    name: 'potassium',
    unit: 'kg/ha',
    infoKey: 'potassiumDescription',
    promptKey: '',
    placeholder: 'Potassium (K)',
  },
  {
    labelKey: 'soilAnalysis',
    name: 'ph',
    unit: '',
    infoKey: 'phDescription',
    promptKey: '',
    placeholder: 'pH',
  },
  {
    labelKey: 'temperatureDescription',
    name: 'temperature',
    unit: '°C',
    infoKey: 'temperatureDescription',
    promptKey: '',
    placeholder: 'Temperature',
  },
  {
    labelKey: 'humidityDescription',
    name: 'humidity',
    unit: '%',
    infoKey: 'humidityDescription',
    promptKey: '',
    placeholder: 'Humidity',
  },
  {
    labelKey: 'rainfallDescription',
    name: 'rainfall',
    unit: 'mm',
    infoKey: 'rainfallDescription',
    promptKey: '',
    placeholder: 'Rainfall',
  },
];

export default function InputWizard({ onSubmit, loading }: { onSubmit: (data: any) => void; loading: boolean }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{ [key: string]: string }>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
    rainfall: '',
  });

  const current = steps[step];
  const total = steps.length;
  const percent = Math.round(((step + 1) / total) * 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [current.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < total - 1) setStep(step + 1);
    else onSubmit(form);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-dark text-white px-4">
      <LanguageToggle />
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-primary">eco</span>
          <h2 className="text-2xl font-bold tracking-tight">{t('appName')}</h2>
        </div>
        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20 mb-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider">{t('step')} {step + 1} {t('of')} {total}</p>
              <p className="text-slate-400 text-xs mt-1">{t('cropPredictionWizard')}</p>
            </div>
            <p className="text-primary font-bold text-lg">{percent}%</p>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
          </div>
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2">{step + 1} / {total}</h1>
          <h2 className="text-xl font-bold mb-2">{t(current.labelKey)}</h2>
          <p className="text-slate-400 mb-4">{current.promptKey ? t(current.promptKey) : ''}</p>
          <div className="bg-background-dark border border-primary/30 rounded-xl p-6 flex flex-col items-center">
            <label className="block text-lg font-bold mb-2" htmlFor={current.name}>{current.placeholder} {current.unit && <span className="text-xs">({current.unit})</span>}</label>
            <input
              id={current.name}
              name={current.name}
              type="number"
              value={form[current.name]}
              onChange={handleChange}
              className="w-32 text-4xl text-center font-black bg-transparent border-b-2 border-primary focus:outline-none mb-4"
              required
            />
            <div className="flex gap-4 mb-4">
              <button type="button" className="bg-primary/20 px-6 py-2 rounded-lg text-2xl" onClick={() => setForm(f => ({ ...f, [current.name]: String(Number(f[current.name] || 0) - 1) }))}>-</button>
              <button type="button" className="bg-primary/20 px-6 py-2 rounded-lg text-2xl" onClick={() => setForm(f => ({ ...f, [current.name]: String(Number(f[current.name] || 0) + 1) }))}>+</button>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-base">info</span>
              {t(current.infoKey)}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button onClick={handleBack} disabled={step === 0} className="text-slate-400 hover:text-primary font-semibold">&larr; {t('back')}</button>
          <button onClick={handleNext} className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 disabled:opacity-50" disabled={loading}>
            {step === total - 1 ? (loading ? t('predicting') : t('next')) : t('next')}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
