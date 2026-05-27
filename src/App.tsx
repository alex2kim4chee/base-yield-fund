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
  FileCheck
} from 'lucide-react';
import { PROTOCOLS, NOT_DO_PRINCIPLES, PRE_TRADE_CHECKS } from './data';
import DynamicCalculator from './components/DynamicCalculator';
import AIPositionSimulator from './components/AIPositionSimulator';
import MetricsDashboard from './components/MetricsDashboard';
import FAQAccordion from './components/FAQAccordion';

export default function App() {
  const [selectedTechSection, setSelectedTechSection] = useState<string>('base');
  const [strategyFilter, setStrategyFilter] = useState<string>('All');
  const [accessModalOpen, setAccessModalOpen] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [accessRequested, setAccessRequested] = useState<boolean>(false);

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

  const handleRequestAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setAccessRequested(true);
      setTimeout(() => {
        // Clear inputs on success
        setEmailInput('');
        setReferralCode('');
      }, 5000);
    }
  };

  // Tech items list
  const techItems = [
    { id: 'base', title: 'Base Blockchain', desc: 'Secure Ethereum L2 backed and maintained by Coinbase. Transactions cost under $0.01 with total instant settlement.' },
    { id: 'erc4337', title: 'ERC-4337 Smart Accounts', desc: 'Hardware-passkey cryptographical accounts capable of batch action execution, custom recovery thresholds, and gas abstraction.' },
    { id: 'morpho', title: 'Morpho Protocol', desc: 'Overcollateralized decentralized lending optimized by Gauntlet and Steakhouse risk curation teams. Over $4B TVL.' },
    { id: 'moonwell', title: 'Moonwell Protocol', desc: 'Direct-lending liquidity vaults native to Base, dynamically responding to live retail credit demands.' },
    { id: 'aerodrome', title: 'Aerodrome Finance', desc: 'Concentrated stablecoin trading pools generating raw trading fee volumes on Base\'s largest liquidity DEX.' },
    { id: 'fluid', title: 'Fluid Protocol', desc: 'Dynamic liquidity routing engine optimizing utilization across credit and debt markets.' },
    { id: 'avantis', title: 'Avantis', desc: 'Institutional peer-to-pool liquidity vaults supporting perpetual exchange trades on Base.' },
    { id: 'aave', title: 'Aave v3 / Spark', desc: 'Established DeFi protocols representing the absolute blue-chip safety anchors on Base ecosystem.' },
    { id: 'claude', title: 'Claude AI + Base MCP', desc: 'Autonomous monitoring scanner synthesizing on-chain rates directly against predefined safety risk buffers.' }
  ];

  const filteredProtocols = strategyFilter === 'All' 
    ? PROTOCOLS 
    : PROTOCOLS.filter(p => p.riskTier === strategyFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white pb-12">
      
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
              <span className="text-slate-900 font-bold text-sm tracking-tight block">Base Yield Fund</span>
              <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">AI-Assisted Self-Custody</span>
            </div>
          </div>

          {/* Quick Stats Banner for Top Nav */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-500 font-mono font-semibold">
            <div>
              <span className="text-slate-400 mr-1.5 uppercase font-bold">Compound Pool:</span>
              <span className="text-slate-900 font-bold animate-pulse">$8,421,412.50 USDC</span>
            </div>
            <div>
              <span className="text-slate-400 mr-1.5 uppercase font-bold">Net Avg APY:</span>
              <span className="text-emerald-600 font-bold">8.94%</span>
            </div>
          </div>

          {/* Right Action Trigger */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAccessModalOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-xs border border-slate-200 py-1.5 px-3 rounded-lg font-bold text-slate-700 transition-all cursor-pointer hidden sm:inline-block"
            >
              Verify Positions
            </button>
            <button 
              onClick={() => setAccessModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-xs text-white py-1.5 px-3.5 rounded-lg font-bold transition-all shadow-sm cursor-pointer"
            >
              Get early access →
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
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" /> Coinbase Smart Account Infrastructure
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Your money. Your account.<br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 bg-clip-text text-transparent">Institutional-grade DeFi yield — managed for you.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              We run an AI-assisted yield strategy on Base blockchain — the same infrastructure used by the world's top DeFi protocols — so you earn <span className="text-emerald-600 font-bold">4–40% APY</span> on your dollars without lifting a finger.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button 
                onClick={() => setAccessModalOpen(true)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold transition-all shadow-sm text-center text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                Get early access <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="#yield-estimator"
                className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 py-3 px-8 rounded-lg text-xs text-center text-slate-700 transition-all font-bold flex items-center justify-center gap-1.5 shadow-tiny"
              >
                Estimate APY Returns
              </a>
            </div>

            {/* Trust line */}
            <div className="pt-8 border-t border-slate-150 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-[11px] font-mono font-bold text-slate-400">
              <span className="flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" /> 100% self-custody
              </span>
              <span className="flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Every transaction approved
              </span>
              <span className="flex items-center justify-center gap-1.5 text-slate-500 font-semibold">
                ● Built on Coinbase Stack
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
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative" id="the-problem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left text */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
                SECTION 01 — THE PROBLEM
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                DeFi pays more. Most people can't access it.
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                <p>
                  Stablecoins sitting in savings accounts earn 0.5%. The same dollar deployed on Base blockchain earns <span className="text-emerald-600 font-bold">4–40% APY</span> — verified, on-chain, every single day.
                </p>
                <p>
                  The gap isn't knowledge. It's structural infrastructure. Running a serious DeFi strategy requires:
                </p>
              </div>

              {/* Grid of highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-tiny">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Programmable Wallet
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">Requires ERC-4337 smart-contract capabilities to bundle operations efficiently.</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-tiny">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Real-time Tracking
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">Hourly monitoring of yields across pools to capture peaks and bypass drop-offs.</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-tiny">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Robust Risk Assessment
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">Evaluating lock solvency caps, bad debt ratios, and dynamic collateral levels.</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-tiny">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Tx Construction
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">Crafting exact batch smart contracts and routing scripts to save on execution gas.</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-500 font-mono italic font-semibold">
                  "We've built all of that. You just approve."
                </p>
              </div>
            </div>

            {/* Right panel: Comparative Visualization panel */}
            <div className="w-full lg:w-[420px] bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between space-y-8 relative overflow-hidden shrink-0 shadow-sm">
              <div className="absolute top-0 right-0 p-3 bg-blue-50 text-blue-600 rounded-bl-xl font-mono font-bold text-[10px] border-l border-b border-blue-100">
                APY COMPARE
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-900">Compound Rate Spread</h4>
                <p className="text-xs text-slate-500 font-medium">Comparing traditional dollars vs Base positions.</p>
              </div>

              <div className="space-y-4 py-2">
                {/* TradFi bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-slate-500">Traditional Bank Account</span>
                    <span className="text-slate-700">0.5% APY</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[4%] h-full bg-slate-400" />
                  </div>
                </div>

                {/* DeFi bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-slate-700">Base Yield Fund Blended Rate</span>
                    <span className="text-emerald-600">8.94% - 25% APY</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-gradient-to-r from-blue-600 to-emerald-500" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Target Delta Result
                </div>
                <p className="leading-relaxed font-semibold">
                  Every $1,000 sitting in standard savings earns roughly $5 annually. Deployed actively on Base, that same dollar compiles up to $250 in expected yield.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2 — WHAT WE DO */}
      <section className="py-20 border-b border-slate-200 bg-white relative" id="what-we-do">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
              SECTION 02 — WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              A yield strategy. Managed by AI. Controlled by you.
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              We manage your Base Account — Coinbase's smart wallet wrapper — the same way a wealth manager watches a portfolio. The difference: you never give up cryptographic self-custody.
            </p>
          </div>

          {/* Interactive simulator goes here. Extremely visual and engages user with "how it works" steps */}
          <div className="max-w-5xl mx-auto mb-16">
            <AIPositionSimulator />
          </div>

          {/* How it works steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">01 / ACCOUNT SETUP</span>
              <h4 className="text-base font-bold text-slate-900">Open a Base Account</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Takes just 2 minutes. Powered entirely by Coinbase's smart passkey wallet backend underneath.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">02 / STABLECOIN DEPOSIT</span>
              <h4 className="text-base font-bold text-slate-900">Fund account with USDC</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Fund with the leading fully-backed, US-regulated stablecoin pegged 1:1 to the US dollar.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">03 / CONTINUOUS SCANS</span>
              <h4 className="text-base font-bold text-slate-900">AI daily opportunity sweeps</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Our MCP bot scans across 6+ protocols (Morpho, Moonwell, Fluid, Aerodrome, Avantis) hourly for yield-risk metrics.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">04 / MEMO ANALYSIS</span>
              <h4 className="text-base font-bold text-slate-900">We prepare transaction sheets</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                We craft the direct gas calldata and map precise risk matrices, explaining realistic dollar downside.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">05 / USER SIGNATURE</span>
              <h4 className="text-base font-bold text-slate-900">Approve with one tap</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                You receive recommendations on your device. Confirm using secure hardware locks or Apple FaceID.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-tiny">
              <span className="text-xs font-mono text-blue-600 font-bold block animate-pulse">06 / EARN YIELD</span>
              <h4 className="text-base font-bold text-slate-900">Automatic compounding</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Yield accrues directly in your self-custody wallet, automatically compounding to raise your position value.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl text-center text-xs text-slate-700 font-medium shadow-tiny">
            <strong>Custody proof:</strong> You see and sign every underlying blockchain transaction. Base Yield Fund never holds administrative custody over your keys.
          </div>

        </div>
      </section>

      {/* SECTION 3 — THE TECHNOLOGY */}
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative" id="the-technology">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left: Interactive list selector */}
            <div className="w-full lg:w-[380px] space-y-6 shrink-0 z-10">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                  SECTION 03 — THE TECHNOLOGY
                </span>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  Built on the same stack as the world's top DeFi funds.
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  We integrate directly with secure, audited, and open-source blue-chip protocols. Click any stack vector to inspect its architecture.
                </p>
              </div>

              {/* Stack items */}
              <div className="space-y-1.5 font-bold">
                {techItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTechSection(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-mono flex justify-between items-center ${
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
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between relative overflow-hidden w-full shadow-sm">
              {/* Corner tech accent grid */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-400 bg-slate-50 select-none rounded-bl-xl border-l border-b border-slate-200 font-bold">
                STACK_ID: {selectedTechSection.toUpperCase()}
              </div>

              <div className="space-y-6">
                <span className="text-[10px] font-mono bg-blue-50 px-2.5 py-1 rounded text-blue-600 font-bold uppercase">
                  ACTIVE DESTRUCTURING SPECS
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
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">TVL deployed</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">$10 Billion+</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Average gas cost</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">&lt; $0.01 USDC</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'erc4337' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Primary benefits</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">Batch execution, passkey signature</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Authentication standard</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">Biometric enclave passkeys</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'morpho' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Risk curation teams</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">Gauntlet / Steakhouse Prime</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Audited state code</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">100% Open source Verified</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'moonwell' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Typical lending rates</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">7% - 12% variables</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Primary system health</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">$15M+ USDC Depth</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'aerodrome' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Ecosystem volume share</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">#1 DEX on Base network</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">LP pool yields</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">20% - 40% stable ranges</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'avantis' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Liquidity backing pool</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">$45M+ TVL stable depth</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Yield drivers</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">Trader fees & performance ranges</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'fluid' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Vault utilization model</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">Intelligent routing mechanics</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Current TVL depth</span>
                      <span className="text-emerald-600 font-extrabold block mt-0.5">$12M+ on Base</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'aave' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Integration TVL</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5">$30M+ on Base v3</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Risk Profile grade</span>
                      <span className="text-slate-700 font-extrabold block mt-0.5">Conservative Anchor Bluechip</span>
                    </div>
                  </div>
                )}

                {selectedTechSection === 'claude' && (
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Core AI integration</span>
                      <span className="text-slate-900 font-extrabold block mt-0.5 font-sans">Claude via Anthropic Base MCP</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[9px]">Decision mechanism</span>
                      <span className="text-amber-600 font-extrabold block mt-0.5">Recommendation only (No autonomous signatures)</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5 mt-8 font-semibold">
                <LockKeyhole className="w-3.5 h-3.5 text-emerald-600" /> All logic is open source and verifiable on GitHub. You can check every compiler hash independently.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — STRATEGY AREA */}
      <section className="py-20 border-b border-slate-200 bg-white relative" id="strategy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                SECTION 04 — STRATEGY UNIVERSE
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                One dollar. Six protocols. The best risk-adjusted yield on Base.
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                We don't limit ourselves to one single contract. We allocate dynamically across conservative anchors and moderator pools to maximize net return within your selected safety tier limits.
              </p>
            </div>

            {/* Filter buttons for the table */}
            <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 font-mono text-xs shadow-tiny">
              {['All', 'Conservative', 'Moderate', 'Elevated', 'Active'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setStrategyFilter(tier)}
                  className={`py-1.5 px-3 rounded-lg font-bold transition-all ${
                    strategyFilter === tier 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tier}
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
                    <th className="p-4 py-3 font-semibold">DeFi Protocol</th>
                    <th className="p-4 py-3 font-semibold">Lending Strategy / Underliers</th>
                    <th className="p-4 py-3 font-semibold text-right">Expected APY</th>
                    <th className="p-4 py-3 font-semibold text-right">Protocol Sizing TVL</th>
                    <th className="p-4 py-3 font-semibold text-right">Assessed Risk Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProtocols.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-all font-medium">
                      <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
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
              *APY figures are live variables pulled from smart logs. Past performance stays separate from future outcomes.
            </div>
          </div>

          {/* Principle matrices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* What we never do */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-tiny">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-bold block flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> Safety Safeguards
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  What we never do
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {NOT_DO_PRINCIPLES.map((prin, i) => (
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
                  <TrendingUp className="w-4 h-4" /> Yield Metrics
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Portfolio Return Matrices
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  How much does a starting allocation of <strong className="text-slate-900 font-extrabold">$1,000 USDC</strong> earn across different system configurations?
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs font-bold">
                
                {/* Tier 1 */}
                <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div>
                    <span className="text-slate-900 font-bold block">Conservative Target</span>
                    <span className="text-[10px] text-slate-400 font-medium block">Gauntlet Curated vaults</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-extrabold block">~$3.50/mo</span>
                    <span className="text-[10px] text-slate-400 font-medium block">~$43.00 annual</span>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="flex justify-between items-center p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                  <div>
                    <span className="text-slate-900 font-extrabold block">Balanced Model</span>
                    <span className="text-[10px] text-blue-600 font-bold block">Morpho + Moonwell composite</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-650 font-extrabold text-emerald-600 block">~$6.00 - $8.00/mo</span>
                    <span className="text-[10px] text-slate-500 block">~$72.00 - $96.00 annual</span>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div>
                    <span className="text-slate-900 font-bold block">Growth Optimization</span>
                    <span className="text-[10px] text-slate-400 font-medium block">Blended LP pairs & Avantis</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-extrabold block">~$9.00 - $13.00/mo</span>
                    <span className="text-[10px] text-slate-400 font-medium block">~$108.00 - $156.00 annual</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5 — WHO THIS IS FOR */}
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative" id="who-this-is-for">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
              SECTION 05 — SOVEREIGN SAVINGS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Built for people who've decided their money belongs to them — not their bank.
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              You don't need to distrust the traditional financial system to be here. But if you do — you're in the right place. We share a simple conviction: the safest place for your savings is where no intermediary can reach them.
            </p>
          </div>

          {/* Core Conviction Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 font-medium">
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-tiny">
              <span className="text-xs font-bold text-slate-900 block">Unpredictable Local Systems</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Watched banks freeze accounts, currencies devalue overnight, and capital restrictions appear? We offer an alternative path.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-tiny">
              <span className="text-xs font-bold text-slate-900 block">Financial Sovereignty</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Your dollars should compile for you, not sit inside institutions that block, inflate, or compromise them at whim.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-tiny">
              <span className="text-xs font-bold text-slate-900 block font-sans">Borderless DeFi Yield</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Real yields generated directly by market liquidity demands, settled by decentralized rules instead of SWIFT bans.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-tiny">
              <span className="text-xs font-bold text-slate-900 block">Zero Added Complexity</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                You do not need to become an active DeFi wizard. We run the infrastructure, while you keep 100% custody keys.
              </p>
            </div>
          </div>

          {/* TradFi vs Base Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden p-6 md:p-8 mb-16 shadow-tiny">
            <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-2">
              <Globe2 className="text-blue-600 w-5 h-5" /> Comparison: Traditional Finance vs This Service
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* TradFi Column */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 block border-b border-rose-200 pb-2">
                  TRADITIONAL FINANCE
                </span>
                <div className="space-y-3 font-semibold text-xs text-slate-500">
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                    <span>Deposit Custody:</span>
                    <span className="text-right text-slate-800">Bank holds and lends your money</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-bold">
                    <span>Account Freezes:</span>
                    <span className="text-right text-rose-605 text-rose-605 text-rose-600">Can freeze or block at will</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                    <span>Asset Seizure:</span>
                    <span className="text-right text-slate-800">Subject to localized capital controls</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-medium">
                    <span>Currency Exposure:</span>
                    <span className="text-right text-slate-800">Single localized country inflation risks</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-extrabold text-slate-900">
                    <span>Interest Return:</span>
                    <span className="text-right">0.5% Average savings rate</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span>Identity:</span>
                    <span className="text-right text-slate-800">Local ID, tax records, physical validation</span>
                  </div>
                </div>
              </div>

              {/* DeFi Column */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block border-b border-blue-200 pb-2">
                  BASE YIELD FUND SERVICE
                </span>
                <div className="space-y-3 text-xs text-slate-500 font-semibold">
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900">Deposit Custody:</span>
                    <span className="text-right text-slate-950 font-extrabold">You hold 100% custody</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900">Account Freezes:</span>
                    <span className="text-right text-emerald-600 font-extrabold">Censorship-resistant standard</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900">Asset Seizure:</span>
                    <span className="text-right text-slate-950 font-extrabold">Public blockchain cryptography</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-semibold">
                    <span className="font-bold text-slate-900">Currency Exposure:</span>
                    <span className="text-right text-slate-950 font-extrabold">USDC - Dollar-pegged, global utility</span>
                  </div>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-100 font-extrabold text-emerald-650 text-emerald-600">
                    <span className="font-bold text-slate-905">Interest Return:</span>
                    <span className="text-right">4.0% - 40.0% APY ranges</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900">Identity:</span>
                    <span className="text-right text-slate-950 font-extrabold">Requires physical internet connection only</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Note on USDC */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-[11px] text-slate-400 leading-relaxed max-w-3xl font-mono font-bold">
              <strong>A note on USDC stablecoins:</strong> Funds are stored in USDC, fully collateralized with asset pools maintained by Circle (a regulated US firm). Moves freely without processing halts, 24 hours a day, directly on-chain.
            </div>
          </div>

          {/* Pre-trade checklist & tiered policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-tiny">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                AUDITING PROTOCOLS
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Pre-trade compliance check
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Before presenting any allocation rebalance recommendation, or signing transactions, our system validates every metrics node.
              </p>

              {/* Interactive Checklist list */}
              <div className="space-y-3 font-mono text-xs font-bold">
                {PRE_TRADE_CHECKS.map((checkText, idx) => {
                  const isChecked = !!checkedItems[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleCheckItem(idx)}
                      className="w-full text-left flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-350 transition-all bg-slate-50"
                    >
                      <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-[11px] leading-relaxed ${isChecked ? 'text-slate-800' : 'text-slate-400 line-through font-medium'}`}>
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
                  SAFETY SIGNAL STATUS: <strong>SYSTEM SECURE ({Object.values(checkedItems).filter(Boolean).length}/6 CHECKS ACTIVE)</strong>
                </span>
              </div>
            </div>

            {/* General policies guidelines text summary list */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-tiny">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                  SYSTEM SAFEGUARDS
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Tapping into institutional rigor
                </h3>
                
                <div className="space-y-4 text-xs text-slate-600 font-medium whitespace-normal">
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-bold">Tiered risk bounds</h4>
                    <p className="leading-relaxed">Conservative strategies stay active as your root defaults. Dynamic high-yield vaults require explicit approved credentials.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-bold">Gas Buffer requirement</h4>
                    <p className="leading-relaxed">We strictly maintain small reserve gas quantities of Ethereum (ETH) in your wallet to confirm withdrawals whenever conditions turn hostile.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-bold font-mono text-blue-600">No autonomous transactions</h4>
                    <p className="text-amber-600 font-mono font-bold leading-relaxed">The AI scans indexes & builds calldata. Only your physical click commits operations to the blockchain.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500 font-mono font-semibold">
                *We never ask where you are from. We never audit why you want control of your money. That is your core priority. We ensure standard capital efficacy.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6 — TRANSPARENCY */}
      <section className="py-20 border-b border-slate-200 bg-white relative" id="transparency">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left panels */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block animate-pulse">
                SECTION 06 — TRANSPARENCY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Every number is verifiable. On-chain. By anyone.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
                Unlike opaque traditional offshore funds, there is zero room to guess or hide here. Every ledger update can be cross-audited on-chain via public network browsers.
              </p>

              <div className="space-y-3">
                <div className="flex gap-3 items-start p-3 bg-slate-50 border border-slate-200 rounded-xl shadow-tiny">
                  <span className="text-xs font-bold shrink-0 bg-blue-50 text-blue-600 p-1.5 rounded font-mono">01</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">BaseScan browser integration</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">Every compounding event, allocation movement, and rebalance can be checked by searching your account address on basescan.org.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-3 bg-slate-50 border border-slate-200 rounded-xl shadow-tiny">
                  <span className="text-xs font-bold shrink-0 bg-blue-50 text-blue-600 p-1.5 rounded font-mono">02</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Direct Protocol verification links</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">Your exact positions can be audited anytime by connecting your ledger keys to morpho.org or moonwell.fi dashboards.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive list of verification targets */}
            <div className="w-full lg:w-[450px] shrink-0 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 shadow-tiny">
              <span className="text-[10px] bg-blue-50 border border-blue-200 text-blue-600 font-mono font-bold px-2 py-0.5 rounded-full inline-block">
                LIVE SOURCE REFERENCE LINKS
              </span>

              <div className="space-y-2.5">
                <a
                  href="https://app.morpho.org"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 border border-slate-200 hover:border-slate-350 rounded-xl bg-white hover:bg-slate-50/50 transition-all group shadow-tiny"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-all">Morpho Protocol Tracker</span>
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
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-all">Moonwell Dashboard Hub</span>
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
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-all">BaseScan L2 Explorer</span>
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
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative" id="decisions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Description info */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                SECTION 07 — STRATEGY SELECTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Strategy decided by data. Executed by AI. Approved by you.
              </h2>
              <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-600 font-semibold">
                <div className="border-l-2 border-blue-200 pl-4 space-y-1">
                  <h4 className="text-slate-900 font-extrabold">Daily Sweeps</h4>
                  <p>Our smart scheduler pulls APYs across all protocols, flagging positions where yield drops or utilization spikes.</p>
                </div>
                <div className="border-l-2 border-blue-200 pl-4 space-y-1">
                  <h4 className="text-slate-900 font-extrabold font-sans">Scoring Weights</h4>
                  <p>Candidate pools are graded on expected net APY, TVL buffers, collateral assets quality, target liquidity depth, and gas expenses.</p>
                </div>
                <div className="border-l-2 border-blue-200 pl-4 space-y-1">
                  <h4 className="text-slate-900 font-extrabold">Migration Threshold Bounds</h4>
                  <p>Rebalances are strictly locked unless expected extra returns coverage transaction gas bounds in under 3 months.</p>
                </div>
              </div>
            </div>

            {/* Right Mock AI Scan preview Card */}
            <div className="w-full lg:w-[460px] shrink-0 bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-tiny">
              <span className="text-[10px] font-mono text-slate-450 font-bold block text-slate-400">AI THRESHOLD PARSER EXAMPLE</span>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-500 pb-2 border-b border-slate-200 font-bold">
                  <span>Rebalance Candidate:</span>
                  <span className="text-slate-900 font-black">Morpho → Moonwell USDC</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>Expected APY Gain:</span>
                  <span className="text-emerald-600 font-black">+4.82% Annual</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>Estimated Total Gas:</span>
                  <span className="text-slate-950 font-black">0.0001 ETH ($0.003 USDC)</span>
                </div>
                <div className="flex justify-between text-slate-500 border-t border-slate-200 pt-2 font-black">
                  <span>Threshold Status:</span>
                  <span className="text-emerald-600 font-black uppercase animate-pulse">THRESHOLD PASSED</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <Info className="w-4 h-4 text-blue-600 text-center font-bold" />
                <span>Recommendation prepares automatically and updates on-chain.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8 — FOR YOUR ACCOUNT DETAILS */}
      <section className="py-20 border-b border-slate-200 relative bg-white" id="account-details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left checklist details */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
                SECTION 08 — ACCOUNT OWNERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                You keep your account. We manage the strategy.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                This isn't a pooled or opaque collective investment. You do not send us money. Your stablecoins stay situated inside your Base Account (secured by Coinbase abstraction infrastructure) accessible to withdraw anytime.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-700 font-bold">
                <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200 shadow-tiny">
                  <span className="text-emerald-700 font-bold block flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 font-bold animate-pulse" /> WHAT YOU CONTROL
                  </span>
                  <ul className="space-y-1.5 text-slate-500 text-[11px] font-medium font-sans">
                    <li>● 100% custody of keys</li>
                    <li>● Instant penalty-free withdrawals</li>
                    <li>● Approve or reject allocations</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200 shadow-tiny">
                  <span className="text-blue-600 font-bold block flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-blue-600 font-bold animate-pulse" /> WHAT WE MANAGE
                  </span>
                  <ul className="space-y-1.5 text-slate-500 text-[11px] font-medium font-sans">
                    <li>● Daily opportunity checks</li>
                    <li>● Continuous risk mitigation sheets</li>
                    <li>● Precise tax calculations logs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Stats summaries */}
            <div className="w-full lg:w-[420px] shrink-0 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-5 shadow-tiny">
              <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase pb-1 border-b border-slate-200">Minimum Requirements</span>
              
              <div className="space-y-3 font-mono text-xs font-extrabold text-slate-500">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span>Minimum to Start:</span>
                  <span className="text-slate-900 font-black">$100 USDC</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span>Recommended Balance:</span>
                  <span className="text-slate-900 font-black">$500 – $2,000 USDC</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span>Dynamic Exit limits:</span>
                  <span className="text-emerald-605 text-emerald-600 font-black">Unlimited Instant</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setAccessModalOpen(true)}
                  className="w-full text-center py-3 bg-blue-600 hover:bg-blue-650 text-xs font-bold text-white rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  Request Early Access Invitation →
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="py-20 border-b border-slate-200 bg-slate-50 relative font-sans" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block">
              SECTION 09 — ACCRUED FAQ
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Answered Questions
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              We focus on complete clarity. If you have additional inquiries, connect inside on-chain discussion channels.
            </p>
          </div>

          <FAQAccordion />

        </div>
      </section>

      {/* SECTION 10 — SOCIAL PROOF / METRICS SIMULATION */}
      <section className="py-20 border-b border-slate-200 relative bg-white" id="metrics-dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold block animate-pulse">
              SECTION 10 — LIVE HEALTH STATUS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              On-Chain Capital Accrual Analytics
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Verify composite stats pulled in real-time as our user pool compounding grows.
            </p>
          </div>

          <MetricsDashboard />

        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="py-20 bg-slate-900 text-slate-200 relative border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono bg-blue-900/40 border border-blue-800 px-3 py-1 rounded-full inline-block font-semibold text-blue-400">
              JOIN THE INVITE ONLY SELECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to put your dollars to work?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-mono">
              Early access is limited to invited accounts. If you received this link from someone you trust, you're already in.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setAccessModalOpen(true)}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-650 text-white text-sm font-bold rounded-xl transition-all shadow-lg flex items-center gap-1.5 active:scale-98 cursor-pointer"
            >
              Request access →
            </button>
          </div>

          {/* Legal Disclaimer block */}
          <div className="pt-12 border-t border-slate-800 text-[10px] text-slate-500 leading-relaxed max-w-4xl mx-auto space-y-4 font-mono">
            <p>
              This service is provided for informational and operational purposes only. It does not constitute investment advice. Cryptocurrency investments carry risk including total loss of principal. Past performance is not indicative of future results. Each participant maintains full self-custody of their funds at all times.
            </p>
            <p className="text-slate-600">
              © 2026 Base Yield Fund. Powered by Coinbase abstractions and Anthropic Model Context Protocol. All rights reserved.
            </p>
          </div>

        </div>
      </section>

      {/* EARLY ACCESS CAPTURE MODAL OVERLAY */}
      {accessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-250">
            <button
              onClick={() => {
                setAccessModalOpen(false);
                setAccessRequested(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-all text-xs font-mono font-bold cursor-pointer"
            >
              [esc] CLOSE
            </button>

            {!accessRequested ? (
              <form onSubmit={handleRequestAccessSubmit} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <span className="text-[10px] font-mono tracking-wider text-blue-600 uppercase block font-bold">MEMBER ENROLLMENT</span>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">Request Platform Invitation</h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Verify account allocation access parameters. Enter your referral coordinates to be prioritized.
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Referral Invitation Code (Optional)</label>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="e.g. BASE-YIELD-772"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Email Coordinates</label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter your secure email address"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-sans"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-650 text-xs text-white font-bold rounded-lg transition-all cursor-pointer shadow-md"
                >
                  Request Early Access Invite Coords
                </button>

                <p className="text-[10px] text-slate-400 font-mono text-center leading-relaxed">
                  *We do not request credentials or seed logs. We only track secure passkey credentials coordinates.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900">Access Coordinates Queued</h3>
                  <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed font-mono font-bold">
                    Welcome to the Base Yield Fund. Your request has been logged. Invitation keys will dispatch to your coordinates if slot quotas permit.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAccessModalOpen(false);
                    setAccessRequested(false);
                  }}
                  className="px-6 py-2 border border-slate-200 hover:border-slate-300 text-xs text-slate-600 rounded-lg hover:text-slate-900 transition-all font-mono font-bold cursor-pointer"
                >
                  Verify Complete
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
