'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type { Locale } from '@/lib/types';
import { TRANSLATIONS, type Translations } from './translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const STORAGE_KEY = 'kivora_locale';

const LanguageContext = createContext<LanguageContextType>({
  locale: 'ru',
  setLocale: () => {},
  t: TRANSLATIONS.ru,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru');

  // Load saved locale from localStorage on mount, or detect from browser
  useEffect(() => {
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang') as Locale | null;
      if (urlLang && (urlLang === 'en' || urlLang === 'ru' || urlLang === 'ky')) {
        setLocaleState(urlLang);
        document.documentElement.lang = urlLang;
      } else {
        const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
        if (saved && (saved === 'en' || saved === 'ru' || saved === 'ky')) {
          setLocaleState(saved);
          document.documentElement.lang = saved;
        } else if (typeof navigator !== 'undefined' && navigator.language) {
        const lang = navigator.language.toLowerCase();
        if (lang.startsWith('ky')) {
          setLocaleState('ky');
          document.documentElement.lang = 'ky';
        } else if (lang.startsWith('en')) {
          setLocaleState('en');
          document.documentElement.lang = 'en';
        } else {
          setLocaleState('ru');
          document.documentElement.lang = 'ru';
        }
      }
    }
  } catch {
    // ignore
  }
}, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // ignore
    }
  };

  const t = useMemo(() => {
    return TRANSLATIONS[locale] || TRANSLATIONS.en;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: 'en' as Locale,
      setLocale: () => {},
      t: TRANSLATIONS.en,
    };
  }
  return context;
}
