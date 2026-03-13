import React from "react";
import { useLanguage, LanguageToggle } from "./LanguageContext";

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  const { t } = useLanguage();
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <LanguageToggle />
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2
        }}
      >
        <source src="/videos/mixkit-aerial-view-at-dawn-of-a-crop-field-and-forest-2797-hd-ready.mp4" type="video/mp4" />
      </video>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.45)",
          zIndex: -1
        }}
      ></div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#FFFFFF', fontWeight: 800 }}>eco</span>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: 1.5,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                margin: 0,
                fontFamily: 'Montserrat, sans-serif',
                textShadow: '0 2px 16px rgba(0,0,0,0.25)',
                letterSpacing: '0.08em',
              }}
            >
              {t('appName').toUpperCase()}
            </h2>
          </div>
          <h1
            className="mb-6"
            style={{
              color: '#FFFFFF',
              fontWeight: 400,
              fontSize: 24,
              textAlign: 'center',
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              opacity: 0.92,
              letterSpacing: '0.04em',
              textShadow: '0 2px 16px rgba(0,0,0,0.18)',
            }}
          >
            {t('tagline')}
          </h1>
          <button onClick={onStart} className="group flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-white transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.98]">
            <span className="material-symbols-outlined">play_arrow</span>
            <span className="text-lg font-bold tracking-wide">{t('startPrediction')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}