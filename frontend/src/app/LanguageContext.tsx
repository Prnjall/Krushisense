export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
      <select
        value={language}
        onChange={e => setLanguage(e.target.value as Language)}
        style={{
          padding: '8px 12px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: 16,
          background: '#fff',
          color: '#333',
          border: '1px solid #ccc',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  );
};
import React, { createContext, useContext, useState } from "react";
import { translations } from "./translations";

export type Language = "en" | "hi" | "mr";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
  t: (key) => translations.en[key] || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
