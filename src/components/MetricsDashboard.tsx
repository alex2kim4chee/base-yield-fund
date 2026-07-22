import { useState, useMemo } from 'react';
import { Activity, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ─── PORTFOLIO DATA (update as strategy evolves) ────────────────────────────
//
// pnlBase: P&L in USD at $100 base capital.
// To scale to any capital: pnlBase × (capital / 100)
//
// type: 'pos' | 'neg' | 'open'
//   'open' = position opened, no direct P&L impact (pnlBase must be 0)
//   'pos'  = income / yield realized or accrued
//   'neg'  = loss / fee paid

export const EVENTS = [
  {
    dateRu: '26–27 май 2026', dateEn: 'May 26–27, 2026',
    nameRu: 'Morpho Prime открыт', nameEn: 'Morpho Prime opened',
    descRu: '50% капитала → lending vault @ 4.47% APY',
    descEn: '50% of capital → lending vault @ 4.47% APY',
    pnlBase: 0, type: 'open' as const,
  },
  {
    dateRu: '27 май 2026', dateEn: 'May 27, 2026',
    nameRu: 'Morpho HY v1.1 + Moonwell', nameEn: 'Morpho HY v1.1 + Moonwell',
    descRu: 'Вторая половина: HY vault + тест Moonwell ($25 000)',
    descEn: 'Second half: HY vault + Moonwell test ($25,000)',
    pnlBase: 0, type: 'open' as const,
  },
  {
    dateRu: '29 май 2026', dateEn: 'May 29, 2026',
    nameRu: 'HY v1.1 → Avantis (реализовано)', nameEn: 'HY v1.1 → Avantis (realized)',
    descRu: 'Зафиксирован доход HY v1.1 при закрытии позиции',
    descEn: 'HY v1.1 yield locked in on position close',
    pnlBase: +0.016152, type: 'pos' as const,
  },
  {
    dateRu: '29 май 2026', dateEn: 'May 29, 2026',
    nameRu: 'Moonwell → Morpho Prime', nameEn: 'Moonwell → Morpho Prime',
    descRu: '~$0.05 доход stranded как dust (gas > value)',
    descEn: '~$0.05 yield stranded as dust (gas > value)',
    pnlBase: 0, type: 'open' as const,
  },
  {
    dateRu: '15 июн 2026', dateEn: 'Jun 15, 2026',
    nameRu: 'Avantis: просадка perps vault', nameEn: 'Avantis: perps vault drawdown',
    descRu: '17 дней — трейдеры в профите, vault в минусе',
    descEn: '17 days — traders profitable, vault absorbed the loss',
    pnlBase: -0.434361, type: 'neg' as const,
  },
  {
    dateRu: '15 июн 2026', dateEn: 'Jun 15, 2026',
    nameRu: 'Avantis: exit fee 0.5%', nameEn: 'Avantis: exit fee 0.5%',
    descRu: 'Комиссия при выводе — не задокументирована при входе',
    descEn: 'Withdrawal fee — undocumented at entry',
    pnlBase: -0.246676, type: 'neg' as const,
  },
  {
    dateRu: '15 июн 2026', dateEn: 'Jun 15, 2026',
    nameRu: 'Morpho Prime: начисленный yield', nameEn: 'Morpho Prime: accrued yield',
    descRu: '20 дней @ 4.77%, unrealized в vault',
    descEn: '20 days @ 4.77%, unrealized in vault',
    pnlBase: +0.105948, type: 'pos' as const,
  },
  {
    dateRu: '15 июн 2026', dateEn: 'Jun 15, 2026',
    nameRu: 'Morpho HY v1.1 открыт (период 2)', nameEn: 'Morpho HY v1.1 reopened (period 2)',
    descRu: 'Средства из Avantis → bbqUSDC vault @ 8.85% APY',
    descEn: 'Avantis proceeds → bbqUSDC vault @ 8.85% APY',
    pnlBase: 0, type: 'open' as const,
  },
  {
    dateRu: '16 июн 2026', dateEn: 'Jun 16, 2026',
    nameRu: 'HY v1.1 APY: 8.85% → 5.18%', nameEn: 'HY v1.1 APY: 8.85% → 5.18%',
    descRu: '−3.67% за сутки — yield-premium над Prime сузился с +4.1% до +1.1%',
    descEn: '−3.67% overnight — yield premium over Prime narrowed from +4.1% to +1.1%',
    pnlBase: 0, type: 'open' as const,
  },
  {
    dateRu: '15–23 июн 2026', dateEn: 'Jun 15–23, 2026',
    nameRu: 'Morpho Prime: yield (8 дней)', nameEn: 'Morpho Prime: yield (8 days)',
    descRu: '$50 000 × 8 дней @ ~4.40% APY — unrealized в vault',
    descEn: '$50,000 × 8 days @ ~4.40% APY — unrealized in vault',
    pnlBase: +0.050, type: 'pos' as const,
  },
  {
    dateRu: '15–23 июн 2026', dateEn: 'Jun 15–23, 2026',
    nameRu: 'HY v1.1: yield (8 дней)', nameEn: 'HY v1.1: yield (8 days)',
    descRu: '$49 335 × 8 дней (1 день @ 8.85% + 7 дней @ 5.18%) — unrealized',
    descEn: '$49,335 × 8 days (1 day @ 8.85% + 7 days @ 5.18%) — unrealized',
    pnlBase: +0.067, type: 'pos' as const,
  },
  {
    dateRu: '23–30 июн 2026', dateEn: 'Jun 23–30, 2026',
    nameRu: 'Morpho Prime: yield (7 дней)', nameEn: 'Morpho Prime: yield (7 days)',
    descRu: '$50 000 × 7 дней @ ~4.07% APY — unrealized в vault',
    descEn: '$50,000 × 7 days @ ~4.07% APY — unrealized in vault',
    pnlBase: +0.038, type: 'pos' as const,
  },
  {
    dateRu: '23–30 июн 2026', dateEn: 'Jun 23–30, 2026',
    nameRu: 'HY v1.1: yield (7 дней)', nameEn: 'HY v1.1: yield (7 days)',
    descRu: '$49 335 × 7 дней @ ~5.43% APY — unrealized в vault',
    descEn: '$49,335 × 7 days @ ~5.43% APY — unrealized in vault',
    pnlBase: +0.048, type: 'pos' as const,
  },
  {
    dateRu: '30 июн – 2 июл 2026', dateEn: 'Jun 30 – Jul 2, 2026',
    nameRu: 'Morpho Prime: yield (2 дня)', nameEn: 'Morpho Prime: yield (2 days)',
    descRu: '$50 000 × 2 дня @ ~4.03% APY — unrealized в vault',
    descEn: '$50,000 × 2 days @ ~4.03% APY — unrealized in vault',
    pnlBase: +0.010, type: 'pos' as const,
  },
  {
    dateRu: '30 июн – 2 июл 2026', dateEn: 'Jun 30 – Jul 2, 2026',
    nameRu: 'HY v1.1: yield (2 дня)', nameEn: 'HY v1.1: yield (2 days)',
    descRu: '$49 335 × 2 дня @ ~5.5–6.6% APY (растёт) — unrealized',
    descEn: '$49,335 × 2 days @ ~5.5–6.6% APY (rising) — unrealized',
    pnlBase: +0.015, type: 'pos' as const,
  },
  {
    dateRu: '2–6 июл 2026', dateEn: 'Jul 2–6, 2026',
    nameRu: 'Morpho Prime: yield (4 дня)', nameEn: 'Morpho Prime: yield (4 days)',
    descRu: '$50 000 × 4 дня @ ~3.93% APY — unrealized в vault',
    descEn: '$50,000 × 4 days @ ~3.93% APY — unrealized in vault',
    pnlBase: +0.022, type: 'pos' as const,
  },
  {
    dateRu: '2–6 июл 2026', dateEn: 'Jul 2–6, 2026',
    nameRu: 'HY v1.1: yield (4 дня)', nameEn: 'HY v1.1: yield (4 days)',
    descRu: '$49 335 × 4 дня @ ~5.33–6.59% APY — unrealized в vault',
    descEn: '$49,335 × 4 days @ ~5.33–6.59% APY — unrealized in vault',
    pnlBase: +0.032, type: 'pos' as const,
  },
  {
    dateRu: '8 июл 2026', dateEn: 'Jul 8, 2026',
    nameRu: 'HY v1.1 APY: 5.33% → 8.62%', nameEn: 'HY v1.1 APY: 5.33% → 8.62%',
    descRu: '+3.29% — возврат к уровням открытия; весь high-yield тир Morpho вырос',
    descEn: '+3.29% — back to opening levels; broad high-yield tier spike on Morpho',
    pnlBase: 0, type: 'open' as const,
  },
  {
    dateRu: '6–8 июл 2026', dateEn: 'Jul 6–8, 2026',
    nameRu: 'Morpho Prime: yield (2 дня)', nameEn: 'Morpho Prime: yield (2 days)',
    descRu: '$50 000 × 2 дня @ ~4.05% APY — unrealized в vault',
    descEn: '$50,000 × 2 days @ ~4.05% APY — unrealized in vault',
    pnlBase: +0.012, type: 'pos' as const,
  },
  {
    dateRu: '6–8 июл 2026', dateEn: 'Jul 6–8, 2026',
    nameRu: 'HY v1.1: yield (2 дня)', nameEn: 'HY v1.1: yield (2 days)',
    descRu: '$49 335 × 2 дня @ ~5.33–8.62% APY — unrealized в vault',
    descEn: '$49,335 × 2 days @ ~5.33–8.62% APY — unrealized in vault',
    pnlBase: +0.017, type: 'pos' as const,
  },
  {
    dateRu: '8–10 июл 2026', dateEn: 'Jul 8–10, 2026',
    nameRu: 'Morpho Prime: yield (2 дня)', nameEn: 'Morpho Prime: yield (2 days)',
    descRu: '$50 000 × 2 дня @ ~4.07% APY — unrealized в vault',
    descEn: '$50,000 × 2 days @ ~4.07% APY — unrealized in vault',
    pnlBase: +0.010, type: 'pos' as const,
  },
  {
    dateRu: '8–10 июл 2026', dateEn: 'Jul 8–10, 2026',
    nameRu: 'HY v1.1: yield (2 дня)', nameEn: 'HY v1.1: yield (2 days)',
    descRu: '$49 335 × 2 дня @ ~8.37–8.62% APY — unrealized в vault',
    descEn: '$49,335 × 2 days @ ~8.37–8.62% APY — unrealized in vault',
    pnlBase: +0.016, type: 'pos' as const,
  },
  {
    dateRu: '12 июл 2026', dateEn: 'Jul 12, 2026',
    nameRu: 'HY v1.1 APY: 8.37% → 5.11%', nameEn: 'HY v1.1 APY: 8.37% → 5.11%',
    descRu: '−3.26% — весь high-yield тир Morpho сжался; HY v2 тоже упал (7.84% → 5.04%)',
    descEn: '−3.26% — broad Morpho high-yield tier compression; HY v2 also fell (7.84% → 5.04%)',
    pnlBase: 0, type: 'open' as const,
  },
  {
    dateRu: '10–12 июл 2026', dateEn: 'Jul 10–12, 2026',
    nameRu: 'Morpho Prime: yield (2 дня)', nameEn: 'Morpho Prime: yield (2 days)',
    descRu: '$50 000 × 2 дня @ ~4.07% APY — unrealized в vault',
    descEn: '$50,000 × 2 days @ ~4.07% APY — unrealized in vault',
    pnlBase: +0.011, type: 'pos' as const,
  },
  {
    dateRu: '10–12 июл 2026', dateEn: 'Jul 10–12, 2026',
    nameRu: 'HY v1.1: yield (2 дня)', nameEn: 'HY v1.1: yield (2 days)',
    descRu: '$49 335 × 2 дня @ ~5.11–8.37% APY — unrealized в vault',
    descEn: '$49,335 × 2 days @ ~5.11–8.37% APY — unrealized in vault',
    pnlBase: +0.013, type: 'pos' as const,
  },
  {
    dateRu: '13 июл 2026', dateEn: 'Jul 13, 2026',
    nameRu: 'Prime APY: 4.07% → 4.55%', nameEn: 'Prime APY: 4.07% → 4.55%',
    descRu: '+0.48% — весь prime-тир Morpho вырос; Gauntlet Prime 4.29% → 4.80%',
    descEn: '+0.48% — broad prime-tier recovery; Gauntlet Prime 4.29% → 4.80%',
    pnlBase: 0, type: 'open' as const,
  },
  {
    dateRu: '12–13 июл 2026', dateEn: 'Jul 12–13, 2026',
    nameRu: 'Morpho Prime: yield (1 день)', nameEn: 'Morpho Prime: yield (1 day)',
    descRu: '$50 000 × 1 день @ ~4.55% APY — unrealized в vault',
    descEn: '$50,000 × 1 day @ ~4.55% APY — unrealized in vault',
    pnlBase: +0.006, type: 'pos' as const,
  },
  {
    dateRu: '12–13 июл 2026', dateEn: 'Jul 12–13, 2026',
    nameRu: 'HY v1.1: yield (1 день)', nameEn: 'HY v1.1: yield (1 day)',
    descRu: '$49 335 × 1 день @ ~5.22% APY — unrealized в vault',
    descEn: '$49,335 × 1 day @ ~5.22% APY — unrealized in vault',
    pnlBase: +0.007, type: 'pos' as const,
  },
  {
    dateRu: '13–14 июл 2026', dateEn: 'Jul 13–14, 2026',
    nameRu: 'Morpho Prime: yield (1 день)', nameEn: 'Morpho Prime: yield (1 day)',
    descRu: '$50 000 × 1 день @ ~4.23% APY — unrealized в vault',
    descEn: '$50,000 × 1 day @ ~4.23% APY — unrealized in vault',
    pnlBase: +0.006, type: 'pos' as const,
  },
  {
    dateRu: '13–14 июл 2026', dateEn: 'Jul 13–14, 2026',
    nameRu: 'HY v1.1: yield (1 день)', nameEn: 'HY v1.1: yield (1 day)',
    descRu: '$49 335 × 1 день @ ~4.81% APY — unrealized в vault',
    descEn: '$49,335 × 1 day @ ~4.81% APY — unrealized in vault',
    pnlBase: +0.008, type: 'pos' as const,
  },
  {
    dateRu: '15 июл 2026', dateEn: 'Jul 15, 2026',
    nameRu: 'HY v1.1 APY: инверсия ниже Prime-тира', nameEn: 'HY v1.1 APY: inverts below prime tier',
    descRu: '4.81% → 3.67% — впервые ниже Gauntlet Prime (4.31%); TVL vault сокращается ($3.6M → $2.96M)',
    descEn: '4.81% → 3.67% — first time below Gauntlet Prime (4.31%); vault TVL shrinking ($3.6M → $2.96M)',
    pnlBase: 0, type: 'neg' as const,
  },
  {
    dateRu: '14–17 июл 2026', dateEn: 'Jul 14–17, 2026',
    nameRu: 'Morpho Prime: yield (3 дня)', nameEn: 'Morpho Prime: yield (3 days)',
    descRu: '$50 000 × 3 дня @ ~4.05–4.09% APY — unrealized в vault',
    descEn: '$50,000 × 3 days @ ~4.05–4.09% APY — unrealized in vault',
    pnlBase: +0.016, type: 'pos' as const,
  },
  {
    dateRu: '14–17 июл 2026', dateEn: 'Jul 14–17, 2026',
    nameRu: 'HY v1.1: yield (3 дня)', nameEn: 'HY v1.1: yield (3 days)',
    descRu: '$49 335 × 3 дня @ ~3.42–3.67% APY — unrealized в vault; TVL продолжает падать ($2.96M → $2.67M)',
    descEn: '$49,335 × 3 days @ ~3.42–3.67% APY — unrealized in vault; TVL keeps falling ($2.96M → $2.67M)',
    pnlBase: +0.015, type: 'pos' as const,
  },
  {
    dateRu: '20 июл 2026', dateEn: 'Jul 20, 2026',
    nameRu: 'HY v1.1 APY: восстановление выше Prime', nameEn: 'HY v1.1 APY: recovers above prime tier',
    descRu: '3.63% → 4.69% — снова выше Gauntlet Prime (4.30%); инверсия закончилась, хотя TVL всё ещё $2.60M',
    descEn: '3.63% → 4.69% — back above Gauntlet Prime (4.30%); inversion over, though TVL still at $2.60M',
    pnlBase: 0, type: 'pos' as const,
  },
  {
    dateRu: '17–20 июл 2026', dateEn: 'Jul 17–20, 2026',
    nameRu: 'Morpho Prime: yield', nameEn: 'Morpho Prime: yield',
    descRu: '$50 000 @ ~4.05–4.08% APY — unrealized в vault (дата предыдущей проверки была ошибочно указана)',
    descEn: '$50,000 @ ~4.05–4.08% APY — unrealized in vault (previous check date was mislabeled)',
    pnlBase: +0.010, type: 'pos' as const,
  },
  {
    dateRu: '17–20 июл 2026', dateEn: 'Jul 17–20, 2026',
    nameRu: 'HY v1.1: yield', nameEn: 'HY v1.1: yield',
    descRu: '$49 335 @ ~4.31–4.69% APY — unrealized в vault (дата предыдущей проверки была ошибочно указана)',
    descEn: '$49,335 @ ~4.31–4.69% APY — unrealized in vault (previous check date was mislabeled)',
    pnlBase: +0.011, type: 'pos' as const,
  },
  {
    dateRu: '20–21 июл 2026', dateEn: 'Jul 20–21, 2026',
    nameRu: 'Morpho Prime: yield (1 день)', nameEn: 'Morpho Prime: yield (1 day)',
    descRu: '$50 000 × 1 день @ ~4.29% APY — unrealized в vault',
    descEn: '$50,000 × 1 day @ ~4.29% APY — unrealized in vault',
    pnlBase: +0.006, type: 'pos' as const,
  },
  {
    dateRu: '20–21 июл 2026', dateEn: 'Jul 20–21, 2026',
    nameRu: 'HY v1.1: yield (1 день)', nameEn: 'HY v1.1: yield (1 day)',
    descRu: '$49 335 × 1 день @ ~5.52% APY — unrealized в vault',
    descEn: '$49,335 × 1 day @ ~5.52% APY — unrealized in vault',
    pnlBase: +0.007, type: 'pos' as const,
  },
  {
    dateRu: '21–22 июл 2026', dateEn: 'Jul 21–22, 2026',
    nameRu: 'Morpho Prime: yield (1 день)', nameEn: 'Morpho Prime: yield (1 day)',
    descRu: '$50 000 × 1 день @ ~4.09% APY — unrealized в vault',
    descEn: '$50,000 × 1 day @ ~4.09% APY — unrealized in vault',
    pnlBase: +0.006, type: 'pos' as const,
  },
  {
    dateRu: '21–22 июл 2026', dateEn: 'Jul 21–22, 2026',
    nameRu: 'HY v1.1: yield (1 день)', nameEn: 'HY v1.1: yield (1 day)',
    descRu: '$49 335 × 1 день @ ~4.77% APY — unrealized в vault',
    descEn: '$49,335 × 1 day @ ~4.77% APY — unrealized in vault',
    pnlBase: +0.007, type: 'pos' as const,
  },
];

// Active positions — update as portfolio changes
// allocation: fraction of base $100 capital actually deployed (e.g. $50.106 → 0.50106)
export const POSITIONS = [
  {
    nameRu: 'Morpho Prime (steakUSDC)', nameEn: 'Morpho Prime (steakUSDC)',
    allocation: 0.50315, apy: 0.0409,
  },
  {
    nameRu: 'Morpho HY v1.1 (bbqUSDC)', nameEn: 'Morpho HY v1.1 (bbqUSDC)',
    allocation: 0.49602, apy: 0.0477,
  },
];

export const BASE = 100; // USD — all pnlBase values are relative to this
// ────────────────────────────────────────────────────────────────────────────

function usd(v: number, sign = false): string {
  const neg = v < 0;
  const a = Math.abs(v);
  const s = a >= 10000 ? Math.round(a).toLocaleString('en-US')
          : a >= 100   ? String(Math.round(a))
          : a >= 10    ? a.toFixed(1)
          : a >= 1     ? a.toFixed(2)
          : a.toFixed(3);
  return (neg ? '−' : sign ? '+' : '') + '$' + s;
}

export default function MetricsDashboard() {
  const { language } = useLanguage();
  const s = (ru: string, en: string) => language === 'ru' ? ru : en;

  const [capital, setCapital] = useState(100_000);

  const { pnl, dailyYield, breakEvenDays, maxAbsVal, blendedApy } = useMemo(() => {
    const k = capital / BASE;
    const totalPnl = EVENTS.reduce((acc, e) => acc + e.pnlBase * k, 0);
    const daily = POSITIONS.reduce((acc, p) => acc + capital * p.allocation * p.apy / 365, 0);
    const maxA = Math.max(
      ...EVENTS.filter(e => e.pnlBase !== 0).map(e => Math.abs(e.pnlBase * k))
    );
    const totalAlloc = POSITIONS.reduce((acc, p) => acc + p.allocation, 0);
    const blended = totalAlloc > 0
      ? POSITIONS.reduce((acc, p) => acc + p.allocation * p.apy, 0) / totalAlloc
      : 0;
    return {
      pnl: totalPnl,
      dailyYield: daily,
      breakEvenDays: totalPnl < 0 ? Math.round(Math.abs(totalPnl) / daily) : 0,
      maxAbsVal: maxA,
      blendedApy: blended,
    };
  }, [capital]);

  const k = capital / BASE;
  const portfolio = capital + pnl;

  return (
    <div className="space-y-4">

      {/* Demo Account Disclosure */}
      <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-4.5 text-xs text-blue-800 leading-relaxed flex items-start gap-3 shadow-tiny text-left">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-1">
            {s('Предупреждение о демо-счете', 'Demo Account Disclosure')}
          </span>
          {s(
            'Данный кошелек контролируется компанией. Никакие средства клиентов не используются. Это техническая демонстрация работы агента, а не реклама доходности.',
            'This wallet is controlled by the company. No customer funds are included. This is a technical demonstration of agent behavior, not a performance advertisement.'
          )}
        </div>
      </div>

      {/* Capital slider */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
          <div className="flex justify-between items-center md:block">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap shrink-0">
              {s('Демо-кошелек: тестовый баланс', 'Public Demo Wallet: Simulation Balance')}
            </span>
            <span className="md:hidden text-base font-mono font-bold text-slate-900 tabular-nums">
              ${capital.toLocaleString('en-US')}
            </span>
          </div>
          <input
            type="range"
            min={1000}
            max={1000000}
            step={1000}
            value={capital}
            onChange={e => setCapital(Number(e.target.value))}
            className="w-full md:flex-1 accent-blue-600 cursor-pointer"
          />
          <span className="hidden md:inline-block text-base font-mono font-bold text-slate-900 min-w-[108px] text-right tabular-nums shrink-0">
            ${capital.toLocaleString('en-US')}
          </span>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400 px-0.5">
          <span>$1K</span><span>$250K</span><span>$500K</span><span>$750K</span><span>$1M</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            {s('Средн. APY', 'Blended APY')}
          </span>
          <span className="text-sm font-mono font-bold text-emerald-600">
            {(blendedApy * 100).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: s('Баланс демо-кошелька', 'Demo Wallet Balance'),
            val: usd(portfolio),
            cls: 'text-slate-900',
          },
          {
            label: 'DeFi P&L',
            val: usd(pnl, true),
            cls: pnl >= 0 ? 'text-emerald-600' : 'text-rose-600',
          },
          {
            label: s('Доход / день', 'Daily yield'),
            val: usd(dailyYield, true),
            cls: 'text-emerald-600',
          },
          {
            label: s('Период покрытия комиссий', 'Fee Coverage Period'),
            val: breakEvenDays > 0 ? `${breakEvenDays} ${s('дн.', 'days')}` : '✓',
            cls: 'text-slate-700',
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 p-4.5 rounded-xl flex flex-col justify-between space-y-2 hover:border-slate-300 transition-all"
          >
            <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block">
              {card.label}
            </span>
            <span className={`text-xl font-mono font-bold tabular-nums ${card.cls}`}>
              {card.val}
            </span>
          </div>
        ))}
      </div>

      {/* Event history */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-tiny">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-1">
          <Activity className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-bold text-slate-900">
            {s('Журнал аудита транзакций', 'Transaction Audit Log')}
          </h4>
        </div>
        <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
          {[...EVENTS].reverse().map((ev, i) => {
            const val = ev.pnlBase * k;
            const hasVal = ev.pnlBase !== 0;
            const barW = hasVal && maxAbsVal > 0
              ? (Math.abs(val) / maxAbsVal * 100).toFixed(1)
              : '0';
            return (
              <div key={i} className="flex items-start gap-3 py-3 first:pt-3 last:pb-0">
                <span className="text-[10px] font-mono text-slate-400 w-[86px] shrink-0 pt-0.5 leading-snug">
                  {language === 'ru' ? ev.dateRu : ev.dateEn}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {language === 'ru' ? ev.nameRu : ev.nameEn}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {language === 'ru' ? ev.descRu : ev.descEn}
                  </p>
                  {hasVal && (
                    <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden max-w-[200px]">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${barW}%`,
                          backgroundColor: ev.type === 'pos' ? '#16a34a' : '#e11d48',
                        }}
                      />
                    </div>
                  )}
                </div>
                <span className={`text-sm font-mono font-bold tabular-nums shrink-0 pt-0.5 ${
                  ev.type === 'pos' ? 'text-emerald-600'
                  : ev.type === 'neg' ? 'text-rose-600'
                  : 'text-slate-300'
                }`}>
                  {hasVal ? usd(val, true) : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Forward projection */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: s('30 дней', '30 days'), val: dailyYield * 30 },
          { label: s('90 дней', '90 days'), val: dailyYield * 90 },
          { label: s('1 год', '1 year'),    val: dailyYield * 365 },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 p-4.5 rounded-xl flex flex-col justify-between space-y-2 hover:border-slate-300 transition-all"
          >
            <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block">
              {card.label}
            </span>
            <span className="text-xl font-mono font-bold text-emerald-600 tabular-nums">
              {usd(card.val, true)}
            </span>
          </div>
        ))}
      </div>

      {/* Warning notice */}
      <div className="text-[10px] font-mono text-slate-400 mt-1 leading-normal text-left">
        {s(
          '*Сценарий оценки на основе текущих плавающих ставок протокола. Не является прогнозом доходности. Не учитывает риски изменения ставок, смарт-контрактов и другие системные риски.',
          '*Scenario estimate based on current protocol-reported variable rates. Not a forecast of expected user returns. Does not account for rate volatility or contract risks.'
        )}
      </div>

      {/* Insight note */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-600 leading-relaxed text-left">
        {breakEvenDays > 0 && (
          <>
            <span className="font-semibold text-slate-800">
              {s(`~${breakEvenDays} дн. покрытия комиссий`, `~${breakEvenDays}-day fee coverage`)}
            </span>
            {s(
              ' — срок не зависит от суммы вложений: убытки и доходы масштабируются пропорционально. ',
              ' — capital-invariant: losses and yield scale proportionally. '
            )}
          </>
        )}
        {s('Активные позиции: ', 'Active positions: ')}
        {POSITIONS.map((p, i) => (
          <span key={i}>
            <span className="font-semibold text-slate-700">
              {language === 'ru' ? p.nameRu : p.nameEn}
            </span>
            {` ${(p.apy * 100).toFixed(2)}%`}
            {i < POSITIONS.length - 1 ? ' + ' : '. '}
          </span>
        ))}
        {s('Прогноз на год при ', 'Annual yield at ')}
        <span className="font-semibold text-slate-700">${capital.toLocaleString('en-US')}</span>
        {': '}
        <span className="font-semibold text-emerald-700">{usd(dailyYield * 365)}</span>.
      </div>

    </div>
  );
}
