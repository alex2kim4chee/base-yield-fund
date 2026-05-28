import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationSchema } from '../translations';

export type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <K extends keyof TranslationSchema>(path: K) => TranslationSchema[K] | any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      if (langParam === 'en' || langParam === 'ru') {
        return langParam as Language;
      }
      
      const savedLang = localStorage.getItem('preferred_language');
      if (savedLang === 'en' || savedLang === 'ru') {
        return savedLang as Language;
      }
      
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en' || browserLang === 'ru') {
        return browserLang as Language;
      }
    }
    return 'ru'; // Russian is default
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_language', lang);
      
      // Update URL query parameters without reloading
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    // 1. Update HTML lang attribute
    document.documentElement.lang = language;

    // Align URL parameter on initial load if not set
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.get('lang') !== language) {
        url.searchParams.set('lang', language);
        window.history.replaceState({}, '', url.toString());
      }
    }

    // 2. Set dynamic translations for SEO elements
    const seoData = {
      ru: {
        title: 'Base Yield Fund | DeFi-доходность институционального уровня',
        description: 'Автоматизированное управление и оптимизация стейблкоинов USDC в сети Base. Сохраняйте 100% контроль над своими средствами на личном кошельке и получайте доход до 40% APY.',
        keywords: 'Base, DeFi, USDC, доходность, стейблкоины, Coinbase, Smart Account, Yield Aggregator, пассивный доход, криптовалюта',
        ogTitle: 'Base Yield Fund | DeFi-доходность под вашим контролем',
        ogDesc: 'Автоматизированное управление и оптимизация стейблкоинов USDC в сети Base. Получайте до 40% APY на личном кошельке под 100% контролем.',
      },
      en: {
        title: 'Base Yield Fund | Institutional-Grade DeFi Yield Aggregator',
        description: 'Automated management and optimization of USDC stablecoins on the Base network. Keep 100% self-custody of your capital on-chain while capturing up to 40% APY.',
        keywords: 'Base, DeFi, USDC, yield, stablecoins, Coinbase, Smart Account, Yield Aggregator, passive income, cryptocurrency',
        ogTitle: 'Base Yield Fund | Self-Custodial DeFi Yield Platform',
        ogDesc: 'Automated optimization of USDC stablecoins on the Base network. Keep 100% self-custody of your capital on-chain while capturing up to 40% APY.',
      }
    };

    const currentSeo = seoData[language];

    // Document Title
    document.title = currentSeo.title;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    updateMeta('meta[name="description"]', 'name', 'description', currentSeo.description);
    updateMeta('meta[name="keywords"]', 'name', 'keywords', currentSeo.keywords);
    
    // Open Graph
    updateMeta('meta[property="og:title"]', 'property', 'og:title', currentSeo.ogTitle);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', currentSeo.ogDesc);

    // Twitter
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', currentSeo.ogTitle);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', currentSeo.ogDesc);
  }, [language]);

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        // Fallback to English if translation is missing in active language
        let fallback: any = translations['en'];
        for (const k of keys) {
          if (fallback === undefined || fallback[k] === undefined) {
            return path; // Return the path as fallback if all fails
          }
          fallback = fallback[k];
        }
        return fallback;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
