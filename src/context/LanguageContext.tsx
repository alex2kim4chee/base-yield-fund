import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationSchema } from '../translations';

export type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <K extends keyof TranslationSchema>(path: K) => TranslationSchema[K] | any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to detect if running on a subfolder (like GitHub Pages base path)
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.includes('/base-yield-fund')) {
      return '/base-yield-fund';
    }
  }
  return '';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({ children, initialLanguage }) => {
  const getInitialLanguage = (): Language => {
    if (initialLanguage) return initialLanguage;
    
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const basePath = getBasePath();
      const relativePath = path.substring(basePath.length);
      
      if (relativePath.startsWith('/en') || relativePath.includes('/en/')) {
        return 'en';
      }
      if (relativePath.startsWith('/ru') || relativePath.includes('/ru/')) {
        return 'ru';
      }

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
      
      const basePath = getBasePath();
      const targetPath = lang === 'en' ? `${basePath}/en/` : `${basePath}/`;
      window.history.pushState({}, '', targetPath);
    }
  };

  useEffect(() => {
    // 1. Update HTML lang attribute
    document.documentElement.lang = language;

    // Align URL path on initial load if not set
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const basePath = getBasePath();
      const targetPath = language === 'en' ? `${basePath}/en/` : `${basePath}/`;
      
      if (currentPath !== targetPath && currentPath !== targetPath.slice(0, -1)) {
        window.history.replaceState({}, '', targetPath);
      }
    }

    // 2. Set dynamic translations for SEO elements
    const seoData = {
      ru: {
        title: 'Base Yield Agent | Автоматизация DeFi-транзакций с self-custody',
        description: 'ИИ-ассистент для DeFi-автоматизации и подготовки транзакций в сети Base. Сохраняйте 100% контроль над кошельком: ассистент предлагает действия, вы лично подписываете каждую сделку самостоятельно.',
        keywords: 'Base, DeFi, USDC, автоматизация, ассистент, стейблкоины, Coinbase, Smart Account, ИИ, транзакции, криптовалюта',
        ogTitle: 'Base Yield Agent | DeFi-автоматизация под вашим контролем',
        ogDesc: 'ИИ-ассистент для DeFi-автоматизации и подготовки транзакций в сети Base. Получайте рекомендации, контролируйте свои ключи и подписывайте транзакции сами.',
      },
      en: {
        title: 'Base Yield Agent | Self-Custodial DeFi Automation Assistant',
        description: 'AI automation assistant for self-custody DeFi research and transaction preparation on Base L2. Keep 100% custody: the agent prepares drafts, you sign every transaction.',
        keywords: 'Base, DeFi, USDC, yield, stablecoins, Coinbase, Smart Account, AI, agent, transaction, cryptocurrency',
        ogTitle: 'Base Yield Agent | Self-Custodial DeFi Automation',
        ogDesc: 'AI automation assistant for self-custody DeFi research and transaction preparation on Base L2. Keep 100% custody: the agent prepares drafts, you sign every transaction.',
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
