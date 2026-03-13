import React, { useState } from 'react';
import * as LandingScreenModule from './LandingScreen';
import InputWizard from './InputWizard';
import LoadingScreen from './LoadingScreen';
import * as ResultsScreenModule from './ResultsScreen';
import { LanguageProvider } from './LanguageContext';

export default function Router() {
  const [screen, setScreen] = useState<'landing' | 'input' | 'loading' | 'results'>('landing');
  const [crops, setCrops] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStart = () => setScreen('input');

  const handleSubmit = async (form: any) => {
    setLoading(true);
    setScreen('loading');
    try {
      const res = await fetch('/api/predict-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success && data.top_crops) {
        setCrops(data.top_crops);
        setScreen('results');
      } else {
        alert(data.error || 'Prediction failed');
        setScreen('input');
      }
    } catch (e) {
      alert('Network error');
      setScreen('input');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPrediction = () => {
    setCrops([]);
    setScreen('input');
  };

  return (
    <LanguageProvider>
      {screen === 'landing' && <LandingScreenModule.default onStart={handleStart} />}
      {screen === 'input' && <InputWizard onSubmit={handleSubmit} loading={loading} />}
      {screen === 'loading' && <LoadingScreen />}
      {screen === 'results' && <ResultsScreenModule.default crops={crops} onNewPrediction={handleNewPrediction} />}
    </LanguageProvider>
  );
}
