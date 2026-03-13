import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary border border-primary/30">
          <span className="material-symbols-outlined text-3xl">eco</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">KrushiSense</h2>
      </div>
      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
        <div className="relative flex flex-col items-center">
          <div className="mb-4">
            <span className="material-symbols-outlined text-8xl text-primary drop-shadow-[0_0_15px_rgba(44,88,60,0.5)]">psychology_alt</span>
          </div>
          <div className="absolute -top-4 -right-4">
            <span className="material-symbols-outlined text-primary/40 text-2xl">wb_sunny</span>
          </div>
          <div className="absolute top-1/2 -left-8">
            <span className="material-symbols-outlined text-primary/40 text-2xl">water_drop</span>
          </div>
        </div>
      </div>
      <div className="text-lg text-primary font-semibold">Analyzing your soil and weather data...</div>
    </div>
  );
}
