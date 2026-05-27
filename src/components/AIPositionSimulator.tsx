import { useState, useEffect } from 'react';
import { Play, Check, RefreshCw, Cpu, Layers, UserCheck, ShieldAlert, CheckCircle2, Copy } from 'lucide-react';

type SimStep = 'ready' | 'scanning' | 'found' | 'signing' | 'broadcasting' | 'complete';

export default function AIPositionSimulator() {
  const [step, setStep] = useState<SimStep>('ready');
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'terminal' | 'flow'>('terminal');
  const [copiedTx, setCopiedTx] = useState(false);

  const startScan = () => {
    setStep('scanning');
    setLogs([]);
    addLog('STG-ENG >> Initializing Base Blockchain MCP Context...');
    addLog('STG-ENG >> Loading user risk appetite: [BALANCED]...');
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  // Run the step-by-step state machine simulation
  useEffect(() => {
    if (step === 'scanning') {
      const timers = [
        setTimeout(() => addLog('CORE-SCAN >> Pulling live state from Morpho Curated Vaults... [TVL $412M] APY: 4.5%'), 600),
        setTimeout(() => addLog('CORE-SCAN >> Pulling live state from Moonwell USDC lending... [TVL $15.4M] APY: 9.3%'), 1200),
        setTimeout(() => addLog('CORE-SCAN >> Pulling live state from Fluid Protocol markets... [TVL $12.8M] APY: 6.8% (Spiking ⬆)'), 1800),
        setTimeout(() => addLog('STG-ENG >> Evaluating rebalance threshold rule... Delta > 1.5% APY net of gas'), 2450),
        setTimeout(() => {
          addLog('STG-ENG >> [ALERT] Actionable opportunity detected in Fluid Vaults.');
          setStep('found');
        }, 3200)
      ];
      return () => timers.forEach(clearTimeout);
    }

    if (step === 'signing') {
      const t1 = setTimeout(() => {
        addLog('USER-AUTH >> Cryptographic verification requested from Coinbase Smart Wallet...');
        addLog('USER-AUTH >> Waiting for passkey user response...');
      }, 500);
      return () => clearTimeout(t1);
    }

    if (step === 'broadcasting') {
      const timers = [
        setTimeout(() => addLog('STG-TX >> Calldata generated successfully. Operation: batchDepositFluidUSDC()'), 400),
        setTimeout(() => addLog('STG-TX >> Submitting ERC-4337 smart-account userOperation to Base bundler...'), 1000),
        setTimeout(() => addLog('STG-TX >> Bundler block confirmation detected. Tx Hash: 0xfdb1a4e27b9c99120ffc914b'), 2200),
        setTimeout(() => {
          addLog('STG-TX >> On-chain yield accrual activated. Portfolio rebalance resolved.');
          setStep('complete');
        }, 2800)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [step]);

  const approveTx = () => {
    setStep('signing');
    // Simulate approval click
    setTimeout(() => {
      setStep('broadcasting');
    }, 1800);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText('0xfdb1a4e27b9c99120ffc914b9c8112e431f421f1e9c20a9bf6afc3e2189d2d8bcf');
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[520px] md:h-[460px]" id="strategy-simulator">
      
      {/* Left panel: Simulated Phone View */}
      <div className="w-full md:w-[350px] bg-slate-50 border-r border-slate-200 flex flex-col justify-between shrink-0 p-5 relative">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">BASE SMART ACCOUNT</span>
          </div>
          <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-mono text-slate-600 font-semibold">Connected</span>
        </div>

        {/* Dynamic Inner Display */}
        <div className="flex-1 my-4 flex flex-col justify-center items-center">
          
          {step === 'ready' && (
            <div className="text-center space-y-3.5 p-4">
              <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-blue-600 shadow-tiny">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Yield System Inactive</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[220px] mx-auto leading-normal">
                  Click the scan trigger in the protocol terminal to launch the real-time AI scanner.
                </p>
              </div>
              <button
                onClick={startScan}
                className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" /> Trigger Live OCR Scan
              </button>
            </div>
          )}

          {step === 'scanning' && (
            <div className="text-center space-y-3.5 p-4">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto relative">
                <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">AI Strategy Engine Scanning</h4>
                <p className="text-[10px] text-mono text-slate-400 mt-1 uppercase">
                  Reading on-chain live blocks...
                </p>
              </div>
              <div className="w-28 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
                <div className="w-1/2 h-full bg-blue-600 animate-infinite-loading" />
              </div>
            </div>
          )}

          {step === 'found' && (
            <div className="w-full space-y-3.5 h-full flex flex-col justify-between">
              <div className="bg-white border border-blue-100 rounded-xl p-3.5 space-y-2.5 shadow-tiny">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">REBALANCE RECOMMENDED</span>
                  <span className="text-[9px] text-slate-400 font-mono font-semibold">1s ago</span>
                </div>
                
                <div className="space-y-0.5">
                  <h5 className="text-[11px] font-bold text-slate-500">Fluid USDC Lending Yield</h5>
                  <div className="flex items-center gap-1 text-slate-900">
                    <span className="text-[11px] line-through text-slate-400">4.5%</span>
                    <span className="text-xs font-mono font-bold text-emerald-600">6.8% APY</span>
                    <span className="text-[9px] text-slate-500 font-mono font-semibold">(+$23.00 USDC delta)</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-600 leading-relaxed font-mono">
                  Move 30% from Morpho Prime into highly collateralized Fluid Market vaults.
                </p>

                <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                  <span>Est Gas: &lt;$0.01 USDC</span>
                  <span>Slippage Limit: 0.01%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <button
                  onClick={approveTx}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5" /> Tap to Approve in App
                </button>
                <button
                  onClick={() => setStep('ready')}
                  className="w-full py-1.5 px-3 bg-slate-200 hover:bg-slate-300 text-[10px] text-slate-600 rounded-lg hover:text-slate-900 font-semibold transition-all text-center"
                >
                  Reject & Ignore Recommendation
                </button>
              </div>
            </div>
          )}

          {step === 'signing' && (
            <div className="text-center space-y-3.5 p-4">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-blue-600">
                <Layers className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Confirming with Passkey...</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] mx-auto leading-normal">
                  Awaiting your secure iOS/Android secure hardware lock signature.
                </p>
              </div>
              <div className="flex justify-center gap-1 text-[10px] font-mono text-slate-400 font-semibold items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                <span>Pending user biometric touch signature</span>
              </div>
            </div>
          )}

          {step === 'broadcasting' && (
            <div className="text-center space-y-3.5 p-4">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Broadcasting Calldata</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  Bundling operations into ERC-4337 smart-transaction block on Base.
                </p>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center space-y-3.5 p-4 w-full">
              <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Rebalance Completed</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  Your USDC has been successfully rebalanced. Yield is compounding live on-chain.
                </p>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-tiny space-y-1">
                <span className="text-[8px] font-mono text-slate-400 block text-left uppercase font-bold">TRANSACTION BUNDLE RESOLVED</span>
                <div className="flex justify-between items-center font-mono text-[9px] text-slate-600 font-semibold">
                  <span className="truncate max-w-[150px]">0xfdb1a4e...2d8bcf</span>
                  <button onClick={handleCopyHash} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-all">
                    {copiedTx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep('ready')}
                className="w-full py-1.5 px-3 border border-slate-200 hover:border-slate-300 text-xs text-slate-500 font-bold rounded-lg hover:text-slate-800 transition-all"
              >
                Reset Simulator
              </button>
            </div>
          )}

        </div>

        <div className="pt-2 border-t border-slate-200 flex justify-center text-[10px] text-slate-400 font-mono font-bold uppercase">
          <span>Powered by Coinbase Base SDK</span>
        </div>
      </div>

      {/* Right panel: Terminal Terminal/Engine Output Logs */}
      <div className="flex-1 bg-white p-5 flex flex-col justify-between">
        
        {/* Navigation Tabs */}
        <div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 block mb-0.5 font-bold">CLAUDE AI + BASE MCP STRATEGY ENGINE</span>
              <h4 className="text-sm font-bold text-slate-900">Strategy Scanner Pipeline</h4>
            </div>
            
            <div className="flex bg-slate-50 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`py-1 px-2.5 text-[10px] uppercase tracking-wider rounded-md font-mono transition-all font-bold ${activeTab === 'terminal' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab('flow')}
                className={`py-1 px-2.5 text-[10px] uppercase tracking-wider rounded-md font-mono transition-all font-bold ${activeTab === 'flow' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Risk Flow
              </button>
            </div>
          </div>

          {/* Interactive Screen Display */}
          <div className="mt-4 bg-slate-900 border border-slate-950 rounded-xl h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed shadow-inner">
            {activeTab === 'terminal' ? (
              <div className="space-y-1.5">
                {logs.length === 0 ? (
                  <div className="text-slate-400 italic h-full flex flex-col items-center justify-center space-y-2 py-12 text-center text-[11px]">
                    <p>Terminal state idle. Ready for command initiation.</p>
                    <p className="text-[10px] text-slate-500">Click the "Trigger Live OCR Scan" button in the Smart Wallet phone view...</p>
                  </div>
                ) : (
                  logs.map((log, index) => {
                    let color = 'text-slate-300';
                    if (log.startsWith('STG-ENG >>')) color = 'text-blue-400 font-bold';
                    else if (log.includes('[ALERT]')) color = 'text-amber-400 font-bold';
                    else if (log.startsWith('CORE-SCAN >>')) color = 'text-slate-400';
                    else if (log.startsWith('USER-AUTH >>')) color = 'text-yellow-400 font-semibold';
                    else if (log.startsWith('STG-TX >>')) color = 'text-emerald-400 font-bold';
                    
                    return (
                      <div key={index} className="flex gap-1.5 leading-snug">
                        <span className="text-slate-600 select-none">[{index + 1}]</span>
                        <span className={color}>{log}</span>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/50 space-y-1.5">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-1 text-[10px] font-mono font-bold">
                    <span className="text-slate-400">OPPORTUNITY SCORECARD</span>
                    <span className="text-blue-400">NET ROUTED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-slate-300 font-mono">
                    <div>Yield APY Margin: <span className="text-white font-bold">+2.3% APY</span></div>
                    <div>Curator Safety: <span className="text-white font-bold">A+ (Gauntlet Curated)</span></div>
                    <div>Solvency Cap: <span className="text-emerald-400 font-bold">Perfect Overcollateralized</span></div>
                    <div>Exit Liquidity Queue: <span className="text-white font-bold">&lt;1 Minute</span></div>
                  </div>
                </div>

                <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/50 space-y-1.5">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-1 text-[10px] font-mono font-bold font-semibold">
                    <span className="text-slate-400 font-bold">MCP PRE-FLIGHT BOUND CHECKLIST</span>
                    <span className="text-emerald-400 font-bold">6/6 PASS</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300 font-mono leading-tight">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Target Vault Age exceeds 6+ months limit</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Zero leverage in prepared calldata contract</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Stablecoin peg deviation stays &lt; 0.1%</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action guidelines */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-lg p-3 mt-4 text-xs font-mono text-slate-500 leading-normal">
          <Layers className="w-4 h-4 shrink-0 text-blue-600" />
          <p>
            This simulator runs directly in safety sandbox. It portrays the real-time interaction between our strategy scanning models and your secure Coinbase Smart Account.
          </p>
        </div>

      </div>

    </div>
  );
}
