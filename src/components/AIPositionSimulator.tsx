import { useState, useEffect } from 'react';
import { Play, Check, RefreshCw, Cpu, Layers, UserCheck, ShieldAlert, CheckCircle2, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type SimStep = 'ready' | 'scanning' | 'found' | 'signing' | 'broadcasting' | 'complete';

export default function AIPositionSimulator() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<SimStep>('ready');
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'terminal' | 'flow'>('terminal');
  const [copiedTx, setCopiedTx] = useState(false);

  const startScan = () => {
    setStep('scanning');
    setLogs([]);
    addLog(t('simulator.logs.init'));
    addLog(t('simulator.logs.risk'));
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  // Run the step-by-step state machine simulation
  useEffect(() => {
    if (step === 'scanning') {
      const timers = [
        setTimeout(() => addLog(t('simulator.logs.morphoScan')), 600),
        setTimeout(() => addLog(t('simulator.logs.moonwellScan')), 1200),
        setTimeout(() => addLog(t('simulator.logs.fluidScan')), 1800),
        setTimeout(() => addLog(t('simulator.logs.rule')), 2450),
        setTimeout(() => {
          addLog(t('simulator.logs.alert'));
          setStep('found');
        }, 3200)
      ];
      return () => timers.forEach(clearTimeout);
    }

    if (step === 'signing') {
      const t1 = setTimeout(() => {
        addLog(t('simulator.logs.auth'));
        addLog(t('simulator.logs.wait'));
      }, 500);
      return () => clearTimeout(t1);
    }

    if (step === 'broadcasting') {
      const timers = [
        setTimeout(() => addLog(t('simulator.logs.calldata')), 400),
        setTimeout(() => addLog(t('simulator.logs.submit')), 1000),
        setTimeout(() => addLog(t('simulator.logs.confirm')), 2200),
        setTimeout(() => {
          addLog(t('simulator.logs.resolved'));
          setStep('complete');
        }, 2800)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [step, t]);

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

  const checklistItems = t('simulator.card.checklist');

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[520px] md:h-[460px]" id="strategy-simulator">
      
      {/* Left panel: Simulated Phone View */}
      <div className="w-full md:w-[350px] bg-slate-50 border-r border-slate-200 flex flex-col justify-between shrink-0 p-5 relative">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">{t('simulator.walletBadge')}</span>
          </div>
          <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-mono text-slate-600 font-semibold">{t('simulator.connected')}</span>
        </div>

        {/* Dynamic Inner Display */}
        <div className="flex-1 my-4 flex flex-col justify-center items-center">
          
          {step === 'ready' && (
            <div className="text-center space-y-3.5 p-4">
              <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-blue-600 shadow-tiny">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('simulator.statusInactive')}</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[220px] mx-auto leading-normal">
                  {t('simulator.descInactive')}
                </p>
              </div>
              <button
                onClick={startScan}
                className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" /> {t('simulator.btnScan')}
              </button>
            </div>
          )}

          {step === 'scanning' && (
            <div className="text-center space-y-3.5 p-4">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto relative">
                <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('simulator.statusActive')}</h4>
                <p className="text-[10px] text-mono text-slate-400 mt-1 uppercase">
                  {t('simulator.reading')}
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
                  <span className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{t('simulator.rebalanceBadge')}</span>
                  <span className="text-[9px] text-slate-400 font-mono font-semibold">1{t('simulator.ago')}</span>
                </div>
                
                <div className="space-y-0.5">
                  <h5 className="text-[11px] font-bold text-slate-500">{t('simulator.fluidTitle')}</h5>
                  <div className="flex items-center gap-1 text-slate-900">
                    <span className="text-[11px] line-through text-slate-400">4.5%</span>
                    <span className="text-xs font-mono font-bold text-emerald-600">6.8% APY</span>
                    <span className="text-[9px] text-slate-500 font-mono font-semibold">(+$23.00 USDC {t('simulator.deltaText')})</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-600 leading-relaxed font-mono">
                  {t('simulator.rebalanceAction')}
                </p>

                <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                  <span>{t('simulator.gasEstimate')}</span>
                  <span>{t('simulator.slippage')}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <button
                  onClick={approveTx}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" /> {t('simulator.btnApprove')}
                </button>
                <button
                  onClick={() => setStep('ready')}
                  className="w-full py-1.5 px-3 bg-slate-200 hover:bg-slate-300 text-[10px] text-slate-600 rounded-lg hover:text-slate-900 font-semibold transition-all text-center cursor-pointer"
                >
                  {t('simulator.btnReject')}
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
                <h4 className="text-xs font-bold text-slate-900">{t('simulator.statusPasskey')}</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] mx-auto leading-normal">
                  {t('simulator.descPasskey')}
                </p>
              </div>
              <div className="flex justify-center gap-1 text-[10px] font-mono text-slate-400 font-semibold items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                <span>{t('simulator.pendingBiometric')}</span>
              </div>
            </div>
          )}

          {step === 'broadcasting' && (
            <div className="text-center space-y-3.5 p-4">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('simulator.broadcasting')}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  {t('simulator.descBroadcasting')}
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
                <h4 className="text-xs font-bold text-slate-900">{t('simulator.completeTitle')}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  {t('simulator.completeDesc')}
                </p>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-tiny space-y-1">
                <span className="text-[8px] font-mono text-slate-400 block text-left uppercase font-bold">{t('simulator.resolvedBadge')}</span>
                <div className="flex justify-between items-center font-mono text-[9px] text-slate-600 font-semibold">
                  <span className="truncate max-w-[150px]">0xfdb1a4e...2d8bcf</span>
                  <button onClick={handleCopyHash} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-all cursor-pointer">
                    {copiedTx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep('ready')}
                className="w-full py-1.5 px-3 border border-slate-200 hover:border-slate-300 text-xs text-slate-500 font-bold rounded-lg hover:text-slate-800 transition-all cursor-pointer"
              >
                {t('simulator.btnReset')}
              </button>
            </div>
          )}

        </div>

        <div className="pt-2 border-t border-slate-200 flex justify-center text-[10px] text-slate-400 font-mono font-bold uppercase">
          <span>{t('simulator.power')}</span>
        </div>
      </div>

      {/* Right panel: Terminal Terminal/Engine Output Logs */}
      <div className="flex-1 bg-white p-5 flex flex-col justify-between">
        
        {/* Navigation Tabs */}
        <div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 block mb-0.5 font-bold">{t('simulator.strategyBadge')}</span>
              <h4 className="text-sm font-bold text-slate-900">{t('simulator.strategyTitle')}</h4>
            </div>
            
            <div className="flex bg-slate-50 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`py-1 px-2.5 text-[10px] uppercase tracking-wider rounded-md font-mono transition-all font-bold cursor-pointer ${activeTab === 'terminal' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t('simulator.outputTab')}
              </button>
              <button
                onClick={() => setActiveTab('flow')}
                className={`py-1 px-2.5 text-[10px] uppercase tracking-wider rounded-md font-mono transition-all font-bold cursor-pointer ${activeTab === 'flow' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t('simulator.flowTab')}
              </button>
            </div>
          </div>

          {/* Interactive Screen Display */}
          <div className="mt-4 bg-slate-900 border border-slate-950 rounded-xl h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed shadow-inner text-left">
            {activeTab === 'terminal' ? (
              <div className="space-y-1.5">
                {logs.length === 0 ? (
                  <div className="text-slate-400 italic h-full flex flex-col items-center justify-center space-y-2 py-12 text-center text-[11px]">
                    <p>{t('simulator.logs.idle')}</p>
                    <p className="text-[10px] text-slate-500">{t('simulator.logs.hint')}</p>
                  </div>
                ) : (
                  logs.map((log, index) => {
                    let color = 'text-slate-300';
                    if (log.startsWith('STG-ENG >>')) color = 'text-blue-400 font-bold';
                    else if (log.includes('[ALERT]') || log.includes('[СИГНАЛ]')) color = 'text-amber-400 font-bold';
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
                    <span className="text-slate-400">{t('simulator.card.title')}</span>
                    <span className="text-blue-400">{t('simulator.card.routed')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-slate-300 font-mono">
                    <div>{t('simulator.card.margin')}</div>
                    <div>{t('simulator.card.safety')}</div>
                    <div>{t('simulator.card.solvency')}</div>
                    <div>{t('simulator.card.exit')}</div>
                  </div>
                </div>

                <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/50 space-y-1.5">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-1 text-[10px] font-mono font-bold">
                    <span className="text-slate-400 font-bold">{t('simulator.card.complianceTitle')}</span>
                    <span className="text-emerald-400 font-bold">{t('simulator.card.complianceStatus')}</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300 font-mono leading-tight">
                    {checklistItems.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action guidelines */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-lg p-3 mt-4 text-xs font-mono text-slate-500 leading-normal text-left">
          <Layers className="w-4 h-4 shrink-0 text-blue-600" />
          <p>
            {t('simulator.bottomNote')}
          </p>
        </div>

      </div>

    </div>
  );
}
