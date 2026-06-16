import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  ChevronRight, 
  Info, 
  Lock, 
  Check, 
  ArrowRight, 
  HelpCircle, 
  Target, 
  Compass, 
  Layers, 
  Activity, 
  Zap, 
  Sparkles, 
  ExternalLink,
  LockKeyhole,
  CheckCircle,
  Globe2,
  FileCheck,
  Mail
} from 'lucide-react';
import DynamicCalculator from './components/DynamicCalculator';
import AIPositionSimulator from './components/AIPositionSimulator';
import MetricsDashboard, { EVENTS, POSITIONS, BASE } from './components/MetricsDashboard';
import FAQAccordion from './components/FAQAccordion';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t, language, setLanguage } = useLanguage();
  const [isUS, setIsUS] = useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('bypass-geo') === 'true') {
      return;
    }

    // 1. Timezone Check (Blocks US residents even if they use a VPN)
    const US_TIMEZONES = /^(US\/|America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Honolulu|Adak|Boise|Detroit|Menominee|Metlakatla|Juneau|Sitka|Yakutat|Nome|Indiana\/|Kentucky\/|North_Dakota\/))/;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isUSTimezone = tz && US_TIMEZONES.test(tz);

    if (isUSTimezone) {
      setIsUS(true);
      return;
    }

    // 2. Cache check
    const cachedCode = sessionStorage.getItem('geo_country_code');
    const cachedOrg = sessionStorage.getItem('geo_org');

    if (cachedCode) {
      if (cachedCode === 'US') {
        setIsUS(true);
        return;
      }
      if (cachedOrg) {
        const DATACENTER_ORGS = ['m247', 'hetzner', 'digitalocean', 'ovh', 'linode', 'leaseweb', 'nordvpn', 'expressvpn', 'surfshark', 'datacamp', 'vultr', 'choopa', 'colocrossing', 'google', 'amazon', 'microsoft'];
        const isDatacenter = DATACENTER_ORGS.some(keyword => cachedOrg.toLowerCase().includes(keyword));
        if (isDatacenter) {
          setIsUS(true);
          return;
        }
      }
      return;
    }

    const checkGeo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('ipapi failed');
        const data = await response.json();
        if (data) {
          const country = data.country_code || '';
          const org = data.org || '';
          sessionStorage.setItem('geo_country_code', country);
          sessionStorage.setItem('geo_org', org);

          const DATACENTER_ORGS = ['m247', 'hetzner', 'digitalocean', 'ovh', 'linode', 'leaseweb', 'nordvpn', 'expressvpn', 'surfshark', 'datacamp', 'vultr', 'choopa', 'colocrossing', 'google', 'amazon', 'microsoft'];
          const isDatacenter = org && DATACENTER_ORGS.some(keyword => org.toLowerCase().includes(keyword));

          if (country === 'US' || isDatacenter) {
            setIsUS(true);
          }
          return;
        }
      } catch (e) {
        console.warn('First geo API failed, trying fallback...', e);
        try {
          const fallbackRes = await fetch('https://freeipapi.com/api/json');
          if (!fallbackRes.ok) throw new Error('freeipapi failed');
          const data = await fallbackRes.json();
          if (data) {
            const country = data.countryCode || '';
            const org = data.org || data.asnOrg || '';
            sessionStorage.setItem('geo_country_code', country);
            sessionStorage.setItem('geo_org', org);

            const DATACENTER_ORGS = ['m247', 'hetzner', 'digitalocean', 'ovh', 'linode', 'leaseweb', 'nordvpn', 'expressvpn', 'surfshark', 'datacamp', 'vultr', 'choopa', 'colocrossing', 'google', 'amazon', 'microsoft'];
            const isDatacenter = org && DATACENTER_ORGS.some(keyword => org.toLowerCase().includes(keyword));

            if (country === 'US' || isDatacenter) {
              setIsUS(true);
            }
            return;
          }
        } catch (err) {
          console.error('All geo APIs failed, using timezone fallback', err);
        }
      }
    };

    checkGeo();
  }, []);

  // Calculate dynamic header stats from MetricsDashboard source of truth
  const DEFAULT_CAPITAL = 100000;
  const k = DEFAULT_CAPITAL / BASE;
  const totalPnl = EVENTS.reduce((acc, e) => acc + e.pnlBase * k, 0);
  const portfolioNow = DEFAULT_CAPITAL + totalPnl;

  const totalAlloc = POSITIONS.reduce((acc, p) => acc + p.allocation, 0);
  const blendedApy = totalAlloc > 0
    ? POSITIONS.reduce((acc, p) => acc + p.allocation * p.apy, 0) / totalAlloc
    : 0;
  const netAvgApy = blendedApy * 100;

  const [selectedTechSection, setSelectedTechSection] = useState<string>('base');
  const [strategyFilter, setStrategyFilter] = useState<string>('All');
  const [accessModalOpen, setAccessModalOpen] = useState<boolean>(false);

  // Track checked state of interactive checklist
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true
  });

  const toggleCheckItem = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const accessMailto = `mailto:hello@baseyieldfund.com?subject=${encodeURIComponent(
    language === 'ru' ? 'Запрос доступа к ИИ-ассистенту Base Yield Agent' : 'AI Software Access Request - Base Yield Agent'
  )}&body=${encodeURIComponent(
    language === 'ru'
      ? 'Здравствуйте!\n\nЯ бы хотел подать заявку на ранний доступ к ИИ-ассистенту Base Yield Agent.\n\nПланируемый размер транзакционного баланса: $______ USDC (минимальный порог симуляции от $1,000).\n\nС уважением,'
      : 'Hello!\n\nI would like to apply for early access to the Base Yield Agent AI software.\n\nPlanned transaction balance: $______ USDC (minimum simulation size of $1,000).\n\nRegards,'
  )}`;

  const reportMailto = `mailto:report@baseyieldfund.com?subject=${encodeURIComponent(
    language === 'ru' ? 'Запрос отчета по демо-кошельку Base Yield Agent' : 'Demo Wallet Report Request - Base Yield Agent'
  )}&body=${encodeURIComponent(
    language === 'ru'
      ? 'Здравствуйте!\n\nПрошу предоставить детальный отчет по текущим позициям демо-кошелька и логам ребалансировки ИИ.\n\nС уважением,'
      : 'Hello!\n\nPlease provide the latest report on active demo wallet allocations and AI rebalance logs.\n\nRegards,'
  )}`;

  // Tech items list pulled dynamically based on translation keys
  const techItemIds = ['base', 'erc4337', 'morpho', 'moonwell', 'aerodrome', 'fluid', 'avantis', 'aave', 'claude'];
  const techItems = techItemIds.map(id => ({
    id,
    title: t(`tech.items.${id}.title`),
    desc: t(`tech.items.${id}.desc`)
  }));

  const protocols = t('protocols');
  const filteredProtocols = strategyFilter === 'All' 
    ? protocols 
    : protocols.filter((p: any) => p.riskTier === strategyFilter);

  const filterLabels: Record<string, string> = {
    All: language === 'ru' ? 'Все' : 'All',
    Conservative: language === 'ru' ? 'Консервативный' : 'Conservative',
    Moderate: language === 'ru' ? 'Умеренный' : 'Moderate',
    Elevated: language === 'ru' ? 'Повышенный' : 'Elevated',
    Active: language === 'ru' ? 'Активный' : 'Active'
  };

  const notDoPrinciples = t('notDoPrinciples');
  const preTradeChecks = t('preTradeChecks');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white pb-12 text-left">
      
      {/* GEOLOCATION BLOCKING OVERLAY */}
      {isUS && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fade-in text-center select-none">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl max-w-lg w-full p-8 space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.15)] relative">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <ShieldAlert className="w-12 h-12" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase block font-bold">
                {t('geoblock.badge')}
              </span>
              <h2 className="text-2xl font-extrabold text-white leading-tight font-sans">
                {t('geoblock.title')}
              </h2>
              <div className="h-[1px] w-16 bg-red-500/30"></div>
              <p className="text-sm text-slate-300 font-semibold leading-relaxed font-sans max-w-md">
                {t('geoblock.desc')}
              </p>
            </div>
            <div className="text-[11px] text-slate-500 font-mono leading-relaxed pt-4 border-t border-slate-800">
              {t('geoblock.disclaimer')}
            </div>
          </div>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 mx-auto w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                B
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>
            <div>
              <span className="text-slate-900 font-bold text-sm tracking-tight block">{t('nav.title')}</span>
              <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">{t('nav.subtitle')}</span>
            </div>
          </div>

          {/* Quick Stats Banner for Top Nav */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-500 font-mono font-semibold">
            <div>
              <span className="text-slate-400 mr-1.5 uppercase font-bold">{t('nav.compoundPool')}</span>
              <span className="text-slate-900 font-bold animate-pulse">
                {'$' + portfolioNow.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
              </span>
            </div>
            <div>
              <span className="text-slate-400 mr-1.5 uppercase font-bold">{t('nav.netAvgApy')}</span>
              <span className="text-emerald-600 font-bold">
                {netAvgApy.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Right Action Trigger with Switcher */}
          <div className="flex items-center gap-3">
            {/* Sleek Language Switcher */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 font-mono text-[10px] font-bold shadow-tiny">
              <button
                onClick={() => setLanguage('ru')}
                className={`py-1 px-2.5 rounded-md transition-all cursor-pointer ${
                  language === 'ru'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`py-1 px-2.5 rounded-md transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <button 
              onClick={() => setAccessModalOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-xs border border-slate-200 py-1.5 px-3 rounded-lg font-bold text-slate-700 transition-all cursor-pointer hidden sm:inline-block"
            >
              {t('nav.verify')}
            </button>
            <button 
              onClick={() => setAccessModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-xs text-white py-1.5 px-3.5 rounded-lg font-bold transition-all shadow-sm cursor-pointer"
            >
              {t('nav.getAccess')}
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-slate-200 bg-white">
        
        {/* Abstract Background Accents */}
        <div className="absolute top-12 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-12 right-1/4 translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative content-center text-center">
          
          <div className="mx-auto max-w-3xl space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-xs font-mono font-bold text-blue-600 text-center mx-auto shadow-tiny">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" /> {t('hero.tagline')}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              {t('hero.title1')}<br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 bg-clip-text text-transparent">{t('hero.title2')}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              {t('hero.subline')}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button 
                onClick={() => setAccessModalOpen(true)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold transition-all shadow-sm text-center text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                {t('hero.ctaAccess')} <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="#yield-estimator"
                className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 py-3 px-8 rounded-lg text-xs text-center text-slate-700 transition-all font-bold flex items-center justify-center gap-1.5 shadow-tiny"
              >
                {t('hero.ctaCalculate')}
              </a>
            </div>

            {/* Trust line */}
            <div className="pt-8 border-t border-slate-150 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-[11px] font-mono font-bold text-slate-400">
              <span className="flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" /> {t('hero.trustCustody')}
              </span>
              <span className="flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> {t('hero.trustApproval')}
              </span>
              <span className="flex items-center justify-center gap-1.5 text-slate-500 font-semibold">
                ● {t('hero.trustCoinbase')}
              </span>
            </div>

          </div>

          {/* Interactive Yield Estimator Teaser (Directly visible client component) */}
          <div className="mt-16 max-w-5xl mx-auto">
            <DynamicCalculator />
          </div>

        </div>
      </section>

      {/* SECTION 1 — THE PROBLEM */}
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative text-left" id="the-problem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left text */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
                {t('problem.tagline')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {t('problem.title')}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                <p>
                  {t('problem.subline1')}
                </p>
                <p>
                  {t('problem.subline2')}
                </p>
              </div>

              {/* Grid of highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-left">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-tiny">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> {t('problem.walletTitle')}
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">{t('problem.walletDesc')}</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-tiny">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> {t('problem.trackingTitle')}
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">{t('problem.trackingDesc')}</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-tiny">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> {t('problem.riskTitle')}
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">{t('problem.riskDesc')}</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-tiny">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> {t('problem.mathTitle')}
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">{t('problem.mathDesc')}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-500 font-mono italic font-semibold">
                  {t('problem.quote')}
                </p>
              </div>
            </div>

            {/* Right panel: Comparative Visualization panel */}
            <div className="w-full lg:w-[420px] bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between space-y-8 relative overflow-hidden shrink-0 shadow-sm text-left">
              <div className="absolute top-0 right-0 p-3 bg-blue-50 text-blue-600 rounded-bl-xl font-mono font-bold text-[10px] border-l border-b border-blue-100">
                {t('problem.badge')}
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-900">{t('problem.compareTitle')}</h4>
                <p className="text-xs text-slate-500 font-medium">{t('problem.compareDesc')}</p>
              </div>

              <div className="space-y-4 py-2">
                {/* TradFi bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-slate-500">{t('problem.compareTrad')}</span>
                    <span className="text-slate-700">0.5% APY</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[4%] h-full bg-slate-400" />
                  </div>
                </div>

                {/* DeFi bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-slate-700">{t('problem.compareFund')}</span>
                    <span className="text-emerald-600">{netAvgApy.toFixed(2)}% – 25% APY</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-gradient-to-r from-blue-600 to-emerald-500" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" /> {t('problem.deltaTitle')}
                </div>
                <p className="leading-relaxed font-semibold">
                  {t('problem.deltaText')}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2 — WHAT WE DO */}
      <section className="py-20 border-b border-slate-200 bg-white relative text-left" id="what-we-do">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
              {t('whatWeDo.tagline')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {t('whatWeDo.title')}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              {t('whatWeDo.subline')}
            </p>
          </div>

          {/* Interactive simulator goes here. Extremely visual and engages user with "how it works" steps */}
          <div className="max-w-5xl mx-auto mb-16">
            <AIPositionSimulator />
          </div>

          {/* How it works steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">01 / {language === 'ru' ? 'НАСТРОЙКА АККАУНТА' : 'ACCOUNT SETUP'}</span>
              <h4 className="text-base font-bold text-slate-900">{t('whatWeDo.step1Title')}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t('whatWeDo.step1Desc')}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">02 / {language === 'ru' ? 'ДЕПОЗИТ СТЕЙБЛКОИНА' : 'STABLECOIN DEPOSIT'}</span>
              <h4 className="text-base font-bold text-slate-900">{t('whatWeDo.step2Title')}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t('whatWeDo.step2Desc')}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">03 / {language === 'ru' ? 'ПОСТОЯННЫЙ СКАН' : 'CONTINUOUS SCANS'}</span>
              <h4 className="text-base font-bold text-slate-900">{t('whatWeDo.step3Title')}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t('whatWeDo.step3Desc')}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">04 / {language === 'ru' ? 'АНАЛИЗ ПАРАМЕТРОВ' : 'MEMO ANALYSIS'}</span>
              <h4 className="text-base font-bold text-slate-900">{t('whatWeDo.step4Title')}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t('whatWeDo.step4Desc')}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">05 / {language === 'ru' ? 'ПОДПИСЬ ПОЛЬЗОВАТЕЛЯ' : 'USER SIGNATURE'}</span>
              <h4 className="text-base font-bold text-slate-900">{t('whatWeDo.step5Title')}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t('whatWeDo.step5Desc')}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">06 / {language === 'ru' ? 'ПОЛУЧЕНИЕ APY' : 'EARN YIELD'}</span>
              <h4 className="text-base font-bold text-slate-900">{t('whatWeDo.step6Title')}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t('whatWeDo.step6Desc')}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl text-center text-xs text-slate-700 font-medium shadow-tiny">
            {t('whatWeDo.custodyProof')}
          </div>

        </div>
      </section>

      {/* SECTION 3 — THE TECHNOLOGY */}
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative text-left" id="the-technology">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left: Interactive list selector */}
            <div className="w-full lg:w-[380px] space-y-6 shrink-0 z-10">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                  {t('tech.tagline')}
                </span>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {t('tech.title')}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  {t('tech.subline')}
                </p>
              </div>

              {/* Stack items */}
              <div className="space-y-1.5 font-bold">
                {techItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTechSection(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-mono flex justify-between items-center cursor-pointer ${
                      selectedTechSection === item.id 
                        ? 'bg-blue-50 border-blue-600 text-slate-900 font-extrabold' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronRight className={`w-4 h-4 ${selectedTechSection === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Selected item interactive details console */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between relative overflow-hidden w-full shadow-sm text-left">
              {/* Corner tech accent grid */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-400 bg-slate-50 select-none rounded-bl-xl border-l border-b border-slate-200 font-bold">
                {t('tech.cornerBadge')}{selectedTechSection.toUpperCase()}
              </div>

              <div className="space-y-6">
                <span className="text-[10px] font-mono bg-blue-50 px-2.5 py-1 rounded text-blue-600 font-bold uppercase">
                  {t('tech.activeSpecs')}
                </span>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {techItems.find((t) => t.id === selectedTechSection)?.title}
                  </h3>
                  <p className="text-sm text-slate-650 leading-relaxed font-medium font-sans">
                    {techItems.find((t) => t.id === selectedTechSection)?.desc}
                  </p>
                </div>

                {/* Additional protocol details based on selection */}
                {selectedTechSection === 'base' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.tvlDeployed')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">$10 Billion+</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.avgGas')}</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">&lt; $0.01 USDC</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'erc4337' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.primaryBenefits')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">{language === 'ru' ? 'Пакетные транзакции, ключи passkey' : 'Batch execution, passkey signature'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.authStandard')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">{language === 'ru' ? 'Биометрические ключи' : 'Biometric enclave passkeys'}</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'morpho' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.riskCuration')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">Gauntlet / Steakhouse Prime</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.auditedCode')}</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">100% Open source Verified</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'moonwell' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.lendingRates')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">7% - 12% variables</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.systemHealth')}</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">$15M+ USDC Depth</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'aerodrome' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.volumeShare')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">#1 DEX on Base network</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.lpYields')}</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">20% - 40% stable ranges</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'avantis' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.backingPool')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">$45M+ TVL stable depth</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.yieldDrivers')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">Trader fees & performance ranges</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'fluid' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.routingModel')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">Intelligent routing mechanics</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.currentDepth')}</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">$12M+ on Base</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'aave' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.integrationTvl')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">$30M+ on Base v3</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.riskGrade')}</span>
                      <span className="text-slate-700 font-extrabold block mt-0.5">Conservative Anchor Bluechip</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'claude' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.coreAi')}</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5 font-sans">Claude via Anthropic Base MCP</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">{t('tech.labels.decisionMechanism')}</span>
                      <span className="text-amber-600 font-extrabold block mt-0.5">{language === 'ru' ? 'Только рекомендации (Без авто-подписи)' : 'Recommendation only (No autonomous signatures)'}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5 mt-8 font-semibold">
                <LockKeyhole className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> {t('tech.bottomNote')}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — STRATEGY AREA */}
      <section className="py-20 border-b border-slate-200 bg-white relative text-left" id="strategy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 font-sans">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                {t('strategy.tagline')}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                {t('strategy.title')}
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                {t('strategy.subline')}
              </p>
            </div>

            {/* Filter buttons for the table */}
            <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 font-mono text-xs shadow-tiny">
              {['All', 'Conservative', 'Moderate', 'Elevated', 'Active'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setStrategyFilter(tier)}
                  className={`py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer ${
                    strategyFilter === tier 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filterLabels[tier]}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-slate-50 font-mono font-bold uppercase text-[10px]">
                    <th className="p-4 py-3 font-semibold">{t('strategy.table.protocol')}</th>
                    <th className="p-4 py-3 font-semibold">{t('strategy.table.underliers')}</th>
                    <th className="p-4 py-3 font-semibold text-right">{t('strategy.table.expectedApy')}</th>
                    <th className="p-4 py-3 font-semibold text-right">{t('strategy.table.sizingTvl')}</th>
                    <th className="p-4 py-3 font-semibold text-right">{t('strategy.table.riskTier')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProtocols.map((p: any) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-all font-medium">
                      <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0 animate-pulse" />
                        {p.name}
                      </td>
                      <td className="p-4 text-slate-600">{p.strategy}</td>
                      <td className={`p-4 font-mono font-bold text-right text-emerald-600`}>
                        {p.expectedApy.toFixed(1)}% <span className="text-[10px] text-slate-400 font-normal">APY</span>
                      </td>
                      <td className="p-4 font-mono text-right text-slate-700">{p.tvl}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-block border rounded px-2.5 py-0.5 text-[10px] uppercase font-mono font-bold ${p.badgeColor}`}>
                          {p.riskTier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-400 text-center font-mono font-semibold">
              {t('strategy.table.liveNote')}
            </div>
          </div>

          {/* Principle matrices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            
            {/* What we never do */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-tiny">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-bold block flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> {t('strategy.principlesTitle')}
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t('strategy.principlesSubtitle')}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {notDoPrinciples.map((prin: any, i: number) => (
                  <div key={i} className="space-y-1 border-l-2 border-rose-500/35 pl-3">
                    <h4 className="text-xs font-bold text-slate-900">{prin.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{prin.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio allocation options overview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 justify-between flex flex-col shadow-tiny">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {t('strategy.metricsTitle')}
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t('strategy.metricsSubtitle')}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                  {t('strategy.metricsDesc')}
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs font-bold">
                
                {/* Tier 1 */}
                <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div>
                    <span className="text-slate-900 font-bold block">{t('strategy.returns.conservative')}</span>
                    <span className="text-[10px] text-slate-400 font-medium block font-sans">{t('strategy.returns.conservativeSub')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-extrabold block">~$3.50{t('strategy.returns.perMonth')}</span>
                    <span className="text-[10px] text-slate-400 font-medium block">~$43.00{t('strategy.returns.perYear')}</span>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="flex justify-between items-center p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                  <div>
                    <span className="text-slate-900 font-extrabold block">{t('strategy.returns.balanced')}</span>
                    <span className="text-[10px] text-blue-600 block font-sans font-bold">{t('strategy.returns.balancedSub')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-650 font-extrabold text-emerald-600 block">~$6.00 - $8.00{t('strategy.returns.perMonth')}</span>
                    <span className="text-[10px] text-slate-500 block">~$72.00 - $96.00{t('strategy.returns.perYear')}</span>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div>
                    <span className="text-slate-900 font-bold block">{t('strategy.returns.growth')}</span>
                    <span className="text-[10px] text-slate-400 font-medium block font-sans">{t('strategy.returns.growthSub')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-extrabold block">~$9.00 - $13.00{t('strategy.returns.perMonth')}</span>
                    <span className="text-[10px] text-slate-400 font-medium block">~$108.00 - $156.00{t('strategy.returns.perYear')}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5 — WHO THIS IS FOR */}
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative text-left" id="who-this-is-for">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
              {t('whoThisIsFor.tagline')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {t('whoThisIsFor.title')}
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              {t('whoThisIsFor.subline')}
            </p>
          </div>

          {/* Core Conviction Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 font-medium text-left">
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-tiny">
              <span className="text-xs font-bold text-slate-900 block">{t('whoThisIsFor.convictions.c1Title')}</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {t('whoThisIsFor.convictions.c1Desc')}
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-tiny">
              <span className="text-xs font-bold text-slate-900 block">{t('whoThisIsFor.convictions.c2Title')}</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {t('whoThisIsFor.convictions.c2Desc')}
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-tiny">
              <span className="text-xs font-bold text-slate-900 block font-sans">{t('whoThisIsFor.convictions.c3Title')}</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {t('whoThisIsFor.convictions.c3Desc')}
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-tiny">
              <span className="text-xs font-bold text-slate-900 block">{t('whoThisIsFor.convictions.c4Title')}</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {t('whoThisIsFor.convictions.c4Desc')}
              </p>
            </div>
          </div>

          {/* TradFi vs Base Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden p-6 md:p-8 mb-16 shadow-tiny text-left">
            <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-2">
              <Globe2 className="text-blue-600 w-5 h-5 animate-pulse" /> {t('whoThisIsFor.table.title')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* TradFi Column */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 block border-b border-rose-200 pb-2">
                  {t('whoThisIsFor.table.tradTitle')}
                </span>
                <div className="space-y-3 font-semibold text-xs text-slate-500">
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                    <span>{t('whoThisIsFor.table.custody')}</span>
                    <span className="text-right text-slate-800 font-sans">{t('whoThisIsFor.table.custodyTrad')}</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-bold">
                    <span>{t('whoThisIsFor.table.freezes')}</span>
                    <span className="text-right text-rose-600 font-sans">{t('whoThisIsFor.table.freezesTrad')}</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-semibold">
                    <span>{t('whoThisIsFor.table.seizure')}</span>
                    <span className="text-right text-slate-800 font-sans">{t('whoThisIsFor.table.seizureTrad')}</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-medium">
                    <span>{t('whoThisIsFor.table.inflation')}</span>
                    <span className="text-right text-slate-800 font-sans">{t('whoThisIsFor.table.inflationTrad')}</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-extrabold text-slate-900">
                    <span>{t('whoThisIsFor.table.return')}</span>
                    <span className="text-right">{t('whoThisIsFor.table.returnTrad')}</span>
                  </div>
                  <div className="flex justify-between items-start font-sans">
                    <span>{t('whoThisIsFor.table.identity')}</span>
                    <span className="text-right text-slate-800">{t('whoThisIsFor.table.identityTrad')}</span>
                  </div>
                </div>
              </div>

              {/* DeFi Column */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block border-b border-blue-200 pb-2">
                  {t('whoThisIsFor.table.fundTitle')}
                </span>
                <div className="space-y-3 text-xs text-slate-500 font-semibold">
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-sans">
                    <span className="font-bold text-slate-900">{t('whoThisIsFor.table.custody')}</span>
                    <span className="text-right text-slate-950 font-extrabold">{t('whoThisIsFor.table.custodyFund')}</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-sans">
                    <span className="font-bold text-slate-900">{t('whoThisIsFor.table.freezes')}</span>
                    <span className="text-right text-emerald-600 font-extrabold">{t('whoThisIsFor.table.freezesFund')}</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-sans">
                    <span className="font-bold text-slate-900">{t('whoThisIsFor.table.seizure')}</span>
                    <span className="text-right text-slate-950 font-extrabold">{t('whoThisIsFor.table.seizureFund')}</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-sans">
                    <span className="font-bold text-slate-900">{t('whoThisIsFor.table.inflation')}</span>
                    <span className="text-right text-slate-950 font-extrabold">{t('whoThisIsFor.table.inflationFund')}</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-sans">
                    <span className="font-bold text-slate-900">{t('whoThisIsFor.table.return')}</span>
                    <span className="text-right text-emerald-600 font-extrabold">{t('whoThisIsFor.table.returnFund')}</span>
                  </div>
                  <div className="flex justify-between items-start font-sans">
                    <span className="font-bold text-slate-900">{t('whoThisIsFor.table.identity')}</span>
                    <span className="text-right text-slate-950 font-extrabold">{t('whoThisIsFor.table.identityFund')}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Note on USDC */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-[11px] text-slate-400 leading-relaxed max-w-3xl font-mono font-bold">
              {t('whoThisIsFor.table.usdcNote')}
            </div>
          </div>

          {/* Pre-trade checklist & tiered policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-tiny">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                {t('whoThisIsFor.compliance.tagline')}
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {t('whoThisIsFor.compliance.title')}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans">
                {t('whoThisIsFor.compliance.subline')}
              </p>

              {/* Interactive Checklist list */}
              <div className="space-y-3 font-mono text-xs font-bold">
                {preTradeChecks.map((checkText: string, idx: number) => {
                  const isChecked = !!checkedItems[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleCheckItem(idx)}
                      className="w-full text-left flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-350 transition-all bg-slate-50 cursor-pointer"
                    >
                      <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-[11px] leading-relaxed ${isChecked ? 'text-slate-800' : 'text-slate-400 line-through font-medium font-mono'}`}>
                        {checkText}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Verified Badge */}
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[10px] font-mono p-3 rounded-xl border border-emerald-100 font-bold">
                <FileCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  {t('whoThisIsFor.compliance.badge')} <strong>{language === 'ru' ? 'СИСТЕМА ЗАЩИЩЕНА' : 'SYSTEM SECURE'} ({Object.values(checkedItems).filter(Boolean).length}/6 {language === 'ru' ? 'ПРОВЕРОК АКТИВНО' : 'CHECKS ACTIVE'})</strong>
                </span>
              </div>
            </div>

            {/* General policies guidelines text summary list */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-tiny">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                  {t('whoThisIsFor.safeguards.tagline')}
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t('whoThisIsFor.safeguards.title')}
                </h3>
                
                <div className="space-y-4 text-xs text-slate-600 font-medium whitespace-normal">
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-bold font-sans">{t('whoThisIsFor.safeguards.riskBoundsTitle')}</h4>
                    <p className="leading-relaxed font-sans">{t('whoThisIsFor.safeguards.riskBoundsDesc')}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-bold font-sans">{t('whoThisIsFor.safeguards.gasBufferTitle')}</h4>
                    <p className="leading-relaxed font-sans">{t('whoThisIsFor.safeguards.gasBufferDesc')}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-bold font-mono text-blue-600">{t('whoThisIsFor.safeguards.noAutoTitle')}</h4>
                    <p className="text-amber-600 font-mono font-bold leading-relaxed">{t('whoThisIsFor.safeguards.noAutoDesc')}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500 font-mono font-semibold">
                {t('whoThisIsFor.safeguards.bottomNote')}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6 — TRANSPARENCY */}
      <section className="py-20 border-b border-slate-200 bg-white relative text-left" id="transparency">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left panels */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block animate-pulse">
                {t('transparency.tagline')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {t('transparency.title')}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
                {t('transparency.subline')}
              </p>

              <div className="space-y-3">
                <div className="flex gap-3 items-start p-3 bg-slate-50 border border-slate-200 rounded-xl shadow-tiny">
                  <span className="text-xs font-bold shrink-0 bg-blue-50 text-blue-600 p-1.5 rounded font-mono">01</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">{t('transparency.c1Title')}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5 font-sans">{t('transparency.c1Desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-3 bg-slate-50 border border-slate-200 rounded-xl shadow-tiny">
                  <span className="text-xs font-bold shrink-0 bg-blue-50 text-blue-600 p-1.5 rounded font-mono">02</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">{t('transparency.c2Title')}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5 font-sans">{t('transparency.c2Desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive list of verification targets */}
            <div className="w-full lg:w-[450px] shrink-0 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 shadow-tiny">
              <span className="text-[10px] bg-blue-50 border border-blue-200 text-blue-600 font-mono font-bold px-2 py-0.5 rounded-full inline-block">
                {t('transparency.badge')}
              </span>

              <div className="space-y-2.5">
                <a
                  href="https://app.morpho.org"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 border border-slate-200 hover:border-slate-350 rounded-xl bg-white hover:bg-slate-50/50 transition-all group shadow-tiny"
                >
                  <div className="flex justify-between items-center font-sans">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-all">{t('transparency.links.morpho')}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-all" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block truncate">app.morpho.org/base/</span>
                </a>

                <a
                  href="https://app.moonwell.fi"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 border border-slate-200 hover:border-slate-350 rounded-xl bg-white hover:bg-slate-50/50 transition-all group shadow-tiny"
                >
                  <div className="flex justify-between items-center font-sans">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-all">{t('transparency.links.moonwell')}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-all" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block truncate">app.moonwell.fi/base/</span>
                </a>

                <a
                  href="https://basescan.org"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 border border-slate-200 hover:border-slate-350 rounded-xl bg-white hover:bg-slate-50/50 transition-all group shadow-tiny"
                >
                  <div className="flex justify-between items-center font-sans">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-all">{t('transparency.links.basescan')}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-all" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block truncate">basescan.org/address/...</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7 — DECISION MAKING PROCESS */}
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative text-left" id="decisions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Description info */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                {t('decisions.tagline')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {t('decisions.title')}
              </h2>
              <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-600 font-semibold">
                <div className="border-l-2 border-blue-200 pl-4 space-y-1">
                  <h4 className="text-slate-900 font-extrabold font-sans">{t('decisions.sweepsTitle')}</h4>
                  <p>{t('decisions.sweepsDesc')}</p>
                </div>
                <div className="border-l-2 border-blue-200 pl-4 space-y-1">
                  <h4 className="text-slate-900 font-extrabold font-sans">{t('decisions.weightsTitle')}</h4>
                  <p>{t('decisions.weightsDesc')}</p>
                </div>
                <div className="border-l-2 border-blue-200 pl-4 space-y-1">
                  <h4 className="text-slate-900 font-extrabold font-sans">{t('decisions.boundsTitle')}</h4>
                  <p>{t('decisions.boundsDesc')}</p>
                </div>
              </div>
            </div>

            {/* Right Mock AI Scan preview Card */}
            <div className="w-full lg:w-[460px] shrink-0 bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-tiny text-left">
              <span className="text-[10px] font-mono text-slate-400 font-bold block">{t('decisions.card.title')}</span>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-500 pb-2 border-b border-slate-200 font-bold">
                  <span>{t('decisions.card.candidate')}</span>
                  <span className="text-slate-900 font-black">Morpho → Moonwell USDC</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>{t('decisions.card.gain')}</span>
                  <span className="text-emerald-600 font-black">+4.82% {language === 'ru' ? 'Годовых' : 'Annual'}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>{t('decisions.card.gas')}</span>
                  <span className="text-slate-950 font-black">0.0001 ETH ($0.003 USDC)</span>
                </div>
                <div className="flex justify-between text-slate-500 border-t border-slate-200 pt-2 font-black">
                  <span>{t('decisions.card.status')}</span>
                  <span className="text-emerald-600 font-black uppercase animate-pulse">{t('decisions.card.passed')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <Info className="w-4 h-4 text-blue-600 text-center font-bold" />
                <span className="font-sans">{t('decisions.card.hint')}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8 — FOR YOUR ACCOUNT DETAILS */}
      <section className="py-20 border-b border-slate-200 relative bg-white text-left" id="account-details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left checklist details */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                {t('ownership.tagline')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {t('ownership.title')}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-semibold font-sans">
                {t('ownership.subline')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-700 font-bold">
                <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200 shadow-tiny">
                  <span className="text-emerald-700 font-bold block flex items-center gap-1.5 font-sans">
                    <CheckCircle className="w-4 h-4 text-emerald-600 font-bold animate-pulse" /> {t('ownership.control')}
                  </span>
                  <ul className="space-y-1.5 text-slate-500 text-[11px] font-medium font-sans">
                    {(t('ownership.controlItems') as string[]).map((item, idx) => (
                      <li key={idx}>● {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200 shadow-tiny">
                  <span className="text-blue-600 font-bold block flex items-center gap-1.5 font-sans">
                    <Activity className="w-4 h-4 text-blue-600 font-bold animate-pulse" /> {t('ownership.manage')}
                  </span>
                  <ul className="space-y-1.5 text-slate-500 text-[11px] font-medium font-sans">
                    {(t('ownership.manageItems') as string[]).map((item, idx) => (
                      <li key={idx}>● {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Stats summaries */}
            <div className="w-full lg:w-[420px] shrink-0 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-5 shadow-tiny text-left">
              <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase pb-1 border-b border-slate-200">{t('ownership.card.title')}</span>
              
              <div className="space-y-3 font-mono text-xs font-extrabold text-slate-500">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span>{t('ownership.card.minStart')}</span>
                  <span className="text-slate-900 font-black">
                    {language === 'ru' ? '$1 000 USDC' : '$1,000 USDC'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span>{t('ownership.card.recBal')}</span>
                  <span className="text-slate-900 font-black">
                    {language === 'ru' ? '$5 000 – $20 000 USDC' : '$5,000 – $20,000 USDC'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span>{t('ownership.card.exitLimits')}</span>
                  <span className="text-emerald-600 font-black font-sans">{t('ownership.card.exitValue')}</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setAccessModalOpen(true)}
                  className="w-full text-center py-3 bg-blue-600 hover:bg-blue-650 text-xs font-bold text-white rounded-xl transition-all shadow-md active:scale-98 cursor-pointer font-sans"
                >
                  {t('ownership.card.btn')}
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative font-sans text-left" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
              {t('faq.tagline')}
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {t('faq.title')}
            </h2>
            <p className="text-slate-600 text-sm font-medium font-sans">
              {t('faq.subline')}
            </p>
          </div>

          <FAQAccordion />

        </div>
      </section>

      {/* SECTION 10 — SOCIAL PROOF / METRICS SIMULATION */}
      <section className="py-20 border-b border-slate-200 relative bg-white text-left" id="metrics-dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block animate-pulse">
              {t('liveHealth.tagline')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
              {t('liveHealth.title')}
            </h2>
            <p className="text-slate-600 text-sm font-medium font-sans">
              {t('liveHealth.subline')}
            </p>
          </div>

          <MetricsDashboard />

        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="py-20 bg-slate-900 text-slate-200 relative border-t border-slate-800 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono bg-blue-900/40 border border-blue-800 px-3 py-1 rounded-full inline-block font-semibold text-blue-400">
              {t('footer.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              {t('footer.title')}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-mono">
              {t('footer.subline')}
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setAccessModalOpen(true)}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-650 text-white text-sm font-bold rounded-xl transition-all shadow-lg flex items-center gap-1.5 active:scale-98 cursor-pointer font-sans"
            >
              {t('footer.cta')}
            </button>
          </div>

          {/* Legal Disclaimer block */}
          <div className="pt-12 border-t border-slate-800 text-[10px] text-slate-500 leading-relaxed max-w-4xl mx-auto space-y-4 font-mono">
            <p>
              {t('footer.disclaimer')}
            </p>
            <p className="text-slate-650">
              {t('footer.copyright')}
            </p>
          </div>

        </div>
      </section>

      {/* EARLY ACCESS CAPTURE MODAL OVERLAY */}
      {accessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-250">
            <button
              onClick={() => setAccessModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-all text-xs font-mono font-bold cursor-pointer"
            >
              {t('modal.close')}
            </button>

            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-mono tracking-wider text-blue-600 uppercase block font-bold">{t('modal.badge')}</span>
              <h3 className="text-lg font-extrabold text-slate-900 leading-tight font-sans">{t('modal.title')}</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed font-sans">
                {t('modal.subline')}
              </p>
            </div>

            <div className="space-y-4 pt-1">
              {/* Option 1: Access Request */}
              <a 
                href={accessMailto}
                className="block p-4 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/10 transition-all group"
              >
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                      {t('modal.accessTitle')}
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed font-sans">
                      {t('modal.accessDesc')}
                    </p>
                    <span className="inline-block text-[10px] font-mono font-bold text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded mt-1.5 border border-blue-100/50">
                      {t('modal.accessBtn')}
                    </span>
                  </div>
                </div>
              </a>

              {/* Option 2: Position Report */}
              <a 
                href={reportMailto}
                className="block p-4 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/10 transition-all group"
              >
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-all shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                      {t('modal.reportTitle')}
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed font-sans">
                      {t('modal.reportDesc')}
                    </p>
                    <span className="inline-block text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded mt-1.5 border border-indigo-100/50">
                      {t('modal.reportBtn')}
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <p className="text-[10px] text-slate-400 font-mono text-center leading-relaxed pt-2 border-t border-slate-100">
              {t('modal.legalNote')}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
