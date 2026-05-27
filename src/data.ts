import { ProtocolInfo, FAQItem, RiskProfileData } from './types';

export const PROTOCOLS: ProtocolInfo[] = [
  {
    id: 'aave',
    name: 'Aave v3 / Spark',
    strategy: 'USDC lending & Blue-chip yield',
    expectedApy: 3.5,
    tvl: '$30M+ (Aave) / $222M+ (Spark)',
    riskTier: 'Conservative',
    badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
    textColor: 'text-green-400',
    description: 'Battle-tested blue-chip lending protocols with deep liquidity. The safest options with lower yields but maximum established audit histories in DeFi.'
  },
  {
    id: 'morpho-prime',
    name: 'Morpho (Gauntlet / Steakhouse Prime)',
    strategy: 'Curated vault lending',
    expectedApy: 4.5,
    tvl: '$370M - $456M',
    riskTier: 'Conservative',
    badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
    textColor: 'text-green-400',
    description: 'Deploys USDC into curated vaults managed by top-tier risk companies like Gauntlet and Steakhouse Finance. Lends to institutional borrowers against overcollateralized assets.'
  },
  {
    id: 'morpho-high-yield',
    name: 'Morpho (High Yield Vaults)',
    strategy: 'Curated vault lending',
    expectedApy: 6.0,
    tvl: '$4M - $25M',
    riskTier: 'Moderate',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    textColor: 'text-blue-400',
    description: 'Higher targeted yield lending vaults with managed smart-contract risks and hand-selected underlying borrowers.'
  },
  {
    id: 'fluid',
    name: 'Fluid Protocol',
    strategy: 'Optimized lending market',
    expectedApy: 6.5,
    tvl: '$12M+',
    riskTier: 'Moderate',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    textColor: 'text-blue-400',
    description: 'Next-generation token lending mechanism that dynamically and intelligently routes capital between multiple borrowers to maximize capital utilization rates.'
  },
  {
    id: 'moonwell',
    name: 'Moonwell Protocol',
    strategy: 'Direct USDC lending',
    expectedApy: 9.5,
    tvl: '$15M+',
    riskTier: 'Moderate',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    textColor: 'text-blue-400',
    description: 'Leading Base-native lending market. Yield responds directly to on-chain credit demand, consistently producing high returns during periods of market activity.'
  },
  {
    id: 'morpho-specialty',
    name: 'Morpho (OUSD / Niche Vaults)',
    strategy: 'Specialty lending vaults',
    expectedApy: 8.0,
    tvl: '$2M+',
    riskTier: 'Elevated',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    textColor: 'text-amber-400',
    description: 'Specialty asset categories providing elevated margins. Managed closer to liquidity boundaries but offering strong yield multipliers.'
  },
  {
    id: 'avantis',
    name: 'Avantis',
    strategy: 'Perps liquidity vault',
    expectedApy: 11.5,
    tvl: '$45M+',
    riskTier: 'Elevated',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    textColor: 'text-amber-400',
    description: 'Liquidity providers serve as the counterparty for decentralized leveraged perp traders. Earns consistent income from trader losses and open interest fees.'
  },
  {
    id: 'aerodrome',
    name: 'Aerodrome (Stable LPs)',
    strategy: 'USDC/USDT trading fees',
    expectedApy: 30.0,
    tvl: '$1M - $8M',
    riskTier: 'Active',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    textColor: 'text-rose-400',
    description: 'Deploys concentrated liquidity into stablecoin pairings on Base\'s dominant decentralized exchange, collecting direct real-time trading volumes as fees.'
  }
];

export const RISK_PROFILES: Record<string, RiskProfileData> = {
  conservative: {
    name: 'Conservative Strategy',
    description: 'Targeted maximum preservation of capital using gold-standard blue chip DeFi vaults and highly collateralized institutional lending parameters.',
    expectedApyRange: [4.0, 5.0],
    allocations: [
      { percentage: 60, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Conservative anchor' },
      { percentage: 40, protocolName: 'Aave v3 / Spark', apy: 3.5, role: 'Liquidity buffer' }
    ],
    riskDiscussions: 'This strategy is highly immune to liquidity limits. Main risks are restricted strictly to underlying smart contract integrity across Aave and Morpho blueprints.'
  },
  balanced: {
    name: 'Balanced Strategy',
    description: 'Focuses on higher average yields by distributing your stablecoins between conservative anchors and high-liquidity lending hubs like Moonwell and Fluid.',
    expectedApyRange: [7.0, 9.5],
    allocations: [
      { percentage: 40, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Conservative anchor' },
      { percentage: 35, protocolName: 'Moonwell Protocol', apy: 9.5, role: 'Yield engine' },
      { percentage: 15, protocolName: 'Fluid Protocol', apy: 6.5, role: 'Capital router' },
      { percentage: 10, protocolName: 'Aave v3 / Spark', apy: 3.5, role: 'Capital safety' }
    ],
    riskDiscussions: 'Balances robust yield and strong capital protections. Risk is moderately exposed to changing borrower demand and utilization rates.'
  },
  growth: {
    name: 'Growth Strategy',
    description: 'Intelligently utilizes market fees, leveraged-trading counterparties, and dynamic trading volume pools to yield maximum interest rates.',
    expectedApyRange: [11.0, 25.0],
    allocations: [
      { percentage: 30, protocolName: 'Aerodrome (Stable LPs)', apy: 30.0, role: 'Active fee accrual' },
      { percentage: 30, protocolName: 'Avantis', apy: 11.5, role: 'Traders counterparty' },
      { percentage: 20, protocolName: 'Moonwell Protocol', apy: 9.5, role: 'Yield engine' },
      { percentage: 20, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Conservative anchor' }
    ],
    riskDiscussions: 'High returns backed by direct retail trade volumes. Subject to LP range drift and dynamic perp market adjustments. Risk mitigation applied through tight bounds checks.'
  }
};

export const FAQS: FAQItem[] = [
  {
    question: 'Is my money safe?',
    answer: 'Your funds remain in your Base Account — a Coinbase-secured smart contract wallet (ERC-4337). We never have direct custody of your funds. Every transaction, allocation shift, or withdrawal requires your explicit cryptographically signed approval.'
  },
  {
    question: 'What if I want to stop and withdraw?',
    answer: 'You can withdraw at any time. There are no lockups, and you hold the keys. Morpho and Moonwell withdrawals typically process within minutes back to your main wallet. During rare high-utilization periods on certain lending markets, it could take a bit longer, which is why we maintain liquid margins.'
  },
  {
    question: 'What are the fees?',
    answer: 'The underlying DeFi protocols (such as Morpho and Moonwell) charge natural raw performance fees (0–15%) on yield, which is already deducted from the APY figures shown. Our fund platform charges a modest fee only on yield successfully generated.'
  },
  {
    question: 'What are the core risks involved?',
    answer: 'Each tier represents a different risk level. Conservative tiers (Aave, Morpho Prime) have virtually zero liquidation threat; the main risk is systemic smart contract exploits. Elevated and Active tiers (such as Avantis and Aerodrome) involve dynamic liquidity variables, liquidity lock variations, and market trading results. We quantify realistic dollar downside estimates in plain numbers before every single recommendation so you can make informed decisions.'
  },
  {
    question: 'Do I need to be a DeFi expert or have on-chain experience?',
    answer: 'Not at all. You only need a Coinbase account or compatible smart wallet app. Our dashboard prepares the transaction calldata, performs on-chain scans, and does the complex heavy lifting; you just approve recommendations with one tap.'
  },
  {
    question: 'How are taxes handled?',
    answer: 'We provide automated, detailed tax event tracking. Every deposit, yield payout, rebalance, and on-chain fee is captured in an elegant, structured format that is ready to download and share with your CPA at the end of the year.'
  }
];

export const PROBLEM_HIGHLIGHTS = [
  {
    title: 'Smart Wallet Required',
    desc: 'You need a programmable smart wallet with advanced gas-less capabilities.'
  },
  {
    title: 'Constant Rate Fluctuations',
    desc: 'Yield percentages shift hourly across dozens of dynamic protocols.'
  },
  {
    title: 'Risk Profile Verification',
    desc: 'You must continuously check collateral assets, bad debt ratios, and solvency caps.'
  },
  {
    title: 'Complex Multi-step Gas Fee Math',
    desc: 'Interacting with multiple protocols entails preparing intricate batch transactions.'
  }
];

export const NOT_DO_PRINCIPLES = [
  {
    title: 'Zero Leverage or Borrowing',
    desc: 'We never borrow against your collateral or leverage your current positions.'
  },
  {
    title: 'No Meme Tokens & Hype Contracts',
    desc: 'We strictly interact with established stablecoin-denominated smart vaults with clean histories.'
  },
  {
    title: 'No Blind Entry into Extreme APYs',
    desc: 'Dynamic positions with high annual yield are scanned rigorously for collateral backing before capital entry.'
  },
  {
    title: 'Zero Illiquid Lockups',
    desc: 'Your USDC stays highly accessible, so you can exit when times are volatile or when you need fast liquid cash.'
  }
];

export const PRE_TRADE_CHECKS = [
  'Confirm protocol TVL exceeds safety thresholds ($10M+ core, $50M+ total system)',
  'Verify clean historical audit trail and time-in-production factors (12+ months standard)',
  'Assert collateral health values with Gauntlet or Steakhouse Finance API telemetry models',
  'Ensure current utilization rate stays below critical exit-liquidation thresholds',
  'Project exact transaction gas relative to expected daily yield delta (rebalance must cover gas in <3 months)',
  'Map exit routing strategy and buffer dynamic protocol exit queues'
];
