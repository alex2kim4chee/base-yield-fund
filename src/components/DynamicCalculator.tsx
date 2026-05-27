import React, { useState } from 'react';
import { RISK_PROFILES } from '../data';
import { Shield, TrendingUp, Sparkles, DollarSign, Percent, AlertCircle } from 'lucide-react';

export default function DynamicCalculator() {
  const [depositAmount, setDepositAmount] = useState<number>(1000);
  const [selectedRisk, setSelectedRisk] = useState<'conservative' | 'balanced' | 'growth'>('balanced');

  const profile = RISK_PROFILES[selectedRisk];
  
  // Calculate average APY within the range
  const averageApy = (profile.expectedApyRange[0] + profile.expectedApyRange[1]) / 2;
  
  const estimatedMonthly = (depositAmount * (averageApy / 100)) / 12;
  const estimatedAnnual = depositAmount * (averageApy / 100);

  // Dynamic risk disclosure customized limits based on amount and tier
  const getRiskDisclosure = () => {
    let lossEstimate = 0;
    let extraComparison = 0;
    
    if (selectedRisk === 'conservative') {
      lossEstimate = depositAmount * 0.05; // 5% max possible bad-debt event
      extraComparison = depositAmount * 0.04;
      return {
        loss: lossEstimate.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        extra: extraComparison.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        level: 'Minimal Systemic',
        text: `Conservative vaults leverage top-rated curators. Main risk is pure smart contract code bugs rather than bad-debt liquidations.`
      };
    } else if (selectedRisk === 'balanced') {
      lossEstimate = depositAmount * 0.12; // 12% in extreme bad debt event
      extraComparison = depositAmount * 0.09;
      return {
        loss: lossEstimate.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        extra: extraComparison.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        level: 'Moderate Borrowing Shift',
        text: `Potential bad-debt event in secondary collateral assets on Moonwell. This represents a robust risk-to-yield ratio.`
      };
    } else {
      lossEstimate = depositAmount * 0.25; // 25% under outlier LP drift
      extraComparison = depositAmount * 0.18;
      return {
        loss: lossEstimate.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        extra: extraComparison.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        level: 'Elevated Volatility LP Drift',
        text: `Active exposure to trading LP pools (Aerodrome) and leveraged tracer counterparties. Higher yield margin with calculated downside limits.`
      };
    }
  };

  const disclosure = getRiskDisclosure();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setDepositAmount(val);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm" id="yield-estimator">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Input panel */}
        <div className="flex-1 space-y-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Yield Engine
            </span>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Test your configuration
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Adjust your allocation amount and appetite parameters to simulate real-time performance.
            </p>
          </div>

          {/* USDC Input slider */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700">Deposit Capital</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">$</span>
                <input
                  type="number"
                  min="100"
                  max="500000"
                  value={depositAmount}
                  onChange={handleAmountChange}
                  className="bg-slate-50 border border-slate-200 rounded-md py-1 pl-6 pr-12 text-right font-mono text-slate-900 text-sm focus:outline-none focus:border-blue-600 w-36 font-semibold"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[10px] font-bold">USDC</span>
              </div>
            </div>
            
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={depositAmount > 10000 ? 10000 : depositAmount}
              onChange={(e) => setDepositAmount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              <span>Min: $100 USDC</span>
              {depositAmount > 10000 && <span className="text-blue-600 font-bold">Custom Value Locked</span>}
              <span>Max: $10,000 USDC (Slider)</span>
            </div>
          </div>

          {/* Select Risk Appetite */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-slate-700">Risk Profile Appetite</label>
            <div className="grid grid-cols-3 gap-2">
              {(['conservative', 'balanced', 'growth'] as const).map((tier) => {
                const isActive = selectedRisk === tier;
                const p = RISK_PROFILES[tier];
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedRisk(tier)}
                    className={`p-2.5 rounded-lg border text-left transition-all relative overflow-hidden ${
                      isActive
                        ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">{tier}</span>
                    <span className="block text-base font-mono font-bold mt-1 text-slate-900">
                      {p.expectedApyRange[0]}-{p.expectedApyRange[1]}%
                    </span>
                    <span className="block text-[9px] text-slate-500 font-mono mt-0.5">APY TARGET</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Realistic Downside Dollar Disclosure */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-red-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <h4 className="text-[10px] font-bold uppercase tracking-wider font-mono">
                Dollar-Denominated Risk Disclosure
              </h4>
            </div>
            <div className="border-l-2 border-red-200 pl-2.5">
              <p className="text-xs text-slate-700 leading-relaxed font-mono">
                "Realistic scenario downside on <span className="text-slate-900 font-bold">${depositAmount.toLocaleString()}</span>: <span className="text-red-600 font-bold">${disclosure.loss}</span> in a default bad-debt event. Net yield vs. standard bank deposit: <span className="text-emerald-600 font-bold">+{disclosure.extra}/year</span>."
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                <strong>Safety status:</strong> {disclosure.level}. {disclosure.text}
              </p>
            </div>
          </div>

        </div>

        {/* Right Output results */}
        <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-5">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">PROJECTED RETURN SIMULATION</span>
            <h4 className="text-sm font-bold text-slate-900">{profile.name}</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{profile.description}</p>
          </div>

          {/* Numbers block */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-200">
            <div>
              <span className="text-[9px] font-mono text-slate-400 block tracking-wider uppercase">ESTIMATED APY</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-mono font-bold text-slate-950 tracking-tight">
                  {averageApy.toFixed(1)}%
                </span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> compiled
                </span>
              </div>
            </div>
            <div>
              <span className="text-[9px] font-mono text-slate-400 block tracking-wider uppercase">MONTHLY EARNINGS</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-mono font-bold text-emerald-600 tracking-tight">
                  +${estimatedMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">USDC</span>
              </div>
            </div>
          </div>

          {/* Stacked allocation bar */}
          <div className="space-y-2.5">
            <span className="text-[9px] font-mono text-slate-400 block tracking-wider uppercase">Fund Allocation Weight</span>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex">
              {profile.allocations.map((alloc, idx) => {
                const colors = ['bg-blue-600', 'bg-blue-400', 'bg-indigo-500', 'bg-emerald-500'];
                return (
                  <div
                    key={alloc.protocolName}
                    style={{ width: `${alloc.percentage}%` }}
                    className={`${colors[idx % colors.length]} h-full transition-all duration-300`}
                    title={`${alloc.protocolName}: ${alloc.percentage}%`}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1.5">
              {profile.allocations.map((alloc, idx) => {
                const badgeStyleEls = [
                  'bg-blue-600',
                  'bg-blue-400',
                  'bg-indigo-500',
                  'bg-emerald-500'
                ];
                return (
                  <div key={alloc.protocolName} className="flex items-center gap-1.5 text-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeStyleEls[idx % badgeStyleEls.length]}`} />
                    <span className="text-slate-600 font-medium truncate flex-1">{alloc.protocolName}</span>
                    <span className="font-mono text-slate-900 font-bold text-right">{alloc.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mini-disclosure at bottom */}
          <div className="flex gap-2 items-start text-[10px] text-slate-500 bg-white p-2.5 rounded border border-slate-200 shadow-tiny">
            <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-600" />
            <p className="leading-snug">
              *All allocations automatically stay on your device under strict 100% self-custody. Every strategic migration requires your cryptographically verified hardware-passkey click or approving tap.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
