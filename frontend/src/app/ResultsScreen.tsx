import React from 'react';
import { useLanguage } from './LanguageContext';
import { LanguageToggle } from './LanguageContext';
import cropTranslations from './cropTranslations';

interface ResultsScreenProps {
  crops: string[];
  onNewPrediction: () => void;
}

export default function ResultsScreen({ crops, onNewPrediction }: ResultsScreenProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground relative">
      <LanguageToggle />
      <h1 className="text-4xl font-black mb-4">🌾 {t('yourTopCrops')}</h1>
      <p className="text-lg text-secondary mb-8">{t('resultDescription')}</p>
      <div className="flex flex-col gap-6 w-full max-w-md">
        {crops.map((crop, idx) => {
          const translated = cropTranslations[crop];
          return (
            <div key={crop} className="group relative flex items-center justify-between gap-6 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
                    <span className="material-symbols-outlined text-sm mr-1">eco</span>
                    {idx + 1} Rank
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">{translated?.en || crop}</h3>
                  <p className="text-lg text-secondary">{translated?.hi || crop}</p>
                  <p className="text-lg text-secondary">{translated?.mr || crop}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={onNewPrediction} className="mt-8 group flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.98]">
        <span className="material-symbols-outlined animate-spin-slow">eco</span>
        <span className="text-lg font-bold tracking-wide">{t('newPrediction')}</span>
      </button>
      {/* Inspirational Quote */}
      <div className="w-full flex justify-center mt-6">
        <span
          style={{
            color: '#fff',
            opacity: 0.85,
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: '0.95rem',
            maxWidth: '320px',
          }}
        >
          "Better soil decisions today lead to better harvest tomorrow."
        </span>
      </div>
    </div>
  );
}
