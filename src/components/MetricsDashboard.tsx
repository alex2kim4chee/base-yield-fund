import { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Users, Database, Zap, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MockTx {
  id: string;
  account: string;
  action: 'Deposit' | 'Rebalance' | 'Yield Compound' | 'Withdraw';
  amount: string;
  protocol: string;
  status: 'Confirmed' | 'Pending';
  time: string;
}

export default function MetricsDashboard() {
  const { t, language } = useLanguage();
  const [totalManaged, setTotalManaged] = useState<number>(8421412.50);
  const [managedAccounts, setManagedAccounts] = useState<number>(1482);
  const [txCount, setTxCount] = useState<number>(42912);
  const [liveTxs, setLiveTxs] = useState<MockTx[]>([
    { id: '1', account: '0x3d4b...f42a', action: 'Rebalance', amount: '8,420 USDC', protocol: 'Fluid USDC', status: 'Confirmed', time: '12s ago' },
    { id: '2', account: '0xec29...210d', action: 'Yield Compound', amount: '1.42 USDC', protocol: 'Moonwell USDC', status: 'Confirmed', time: '41s ago' },
    { id: '3', account: '0x791a...dd9a', action: 'Deposit', amount: '12,500 USDC', protocol: 'Morpho Prime', status: 'Confirmed', time: '2m ago' },
    { id: '4', account: '0x10f3...223e', action: 'Withdraw', amount: '500 USDC', protocol: 'Aave v3', status: 'Confirmed', time: '5m ago' }
  ]);

  // Simulate on-chain block processing & dynamic metric growth
  useEffect(() => {
    const interval = setInterval(() => {
      // Small randomized compound accrual & transactions
      const actionRand = Math.random();
      const numAccs = Math.floor(Math.random() * 3);
      
      setTotalManaged((prev) => prev + (actionRand > 0.6 ? Math.random() * 150 : Math.random() * 0.45));
      if (Math.random() > 0.85) {
        setManagedAccounts((prev) => prev + 1);
      }
      setTxCount((prev) => prev + 1);

      // Add a live tx feed element
      const accounts = ['0x8e21...01f3', '0x221c...33ed', '0x99fa...6c90', '0x43b0...ff01', '0xade5...42cd'];
      const actions: ('Deposit' | 'Rebalance' | 'Yield Compound' | 'Withdraw')[] = ['Rebalance', 'Yield Compound', 'Deposit', 'Yield Compound'];
      const protocols = ['Morpho Gauntlet', 'Moonwell USDC', 'Fluid Vaults', 'Avantis Perps', 'Aerodrome Stable'];
      
      const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomProtocol = protocols[Math.floor(Math.random() * protocols.length)];
      
      let randomAmount = (Math.random() * 2500 + 50).toLocaleString('en-US', { maximumFractionDigits: 2 });
      if (randomAction === 'Yield Compound') {
        randomAmount = (Math.random() * 2.5 + 0.05).toLocaleString('en-US', { maximumFractionDigits: 2 });
      }

      const newTx: MockTx = {
        id: Math.random().toString(),
        account: randomAccount,
        action: randomAction,
        amount: `${randomAmount} USDC`,
        protocol: randomProtocol,
        status: 'Confirmed',
        time: 'Just now'
      };

      setLiveTxs((prev) => [newTx, ...prev.slice(0, 4)].map((t, idx) => {
        if (idx === 0) return t;
        // Age the times slightly
        if (t.time === 'Just now') return { ...t, time: '11s ago' };
        if (t.time.includes('s ago')) {
          const secs = parseInt(t.time) + 12;
          return { ...t, time: `${secs}s ago` };
        }
        return t;
      }));

    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeStr: string) => {
    if (timeStr === 'Just now') return t('liveHealth.feed.times.justNow');
    if (timeStr.includes('s ago')) {
      return timeStr.replace('s ago', t('liveHealth.feed.times.secondsAgo'));
    }
    if (timeStr.includes('m ago')) {
      return timeStr.replace('m ago', t('liveHealth.feed.times.minutesAgo'));
    }
    return timeStr;
  };

  const actionMap: Record<string, string> = t('liveHealth.feed.actions');
  const statusMap: Record<string, string> = t('liveHealth.feed.status');

  return (
    <div className="space-y-6" id="live-metrics">
      
      {/* Grid of 4 main metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 p-4.5 rounded-xl flex flex-col justify-between space-y-2 text-slate-800 relative overflow-hidden group hover:border-slate-300 shadow-tiny transition-all">
          <div className="absolute top-0 right-0 p-3 text-blue-600 opacity-10">
            <Database className="w-11 h-11" />
          </div>
          <div>
            <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block">{t('liveHealth.metrics.tvl')}</span>
            <span className="text-xl font-mono font-bold tracking-tight text-slate-900 block mt-0.5">
              ${totalManaged.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {t('liveHealth.metrics.tvlSub')}
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 p-4.5 rounded-xl flex flex-col justify-between space-y-2 text-slate-800 relative overflow-hidden group hover:border-slate-300 shadow-tiny transition-all">
          <div className="absolute top-0 right-0 p-3 text-blue-600 opacity-10">
            <Users className="w-11 h-11" />
          </div>
          <div>
            <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block">{t('liveHealth.metrics.accounts')}</span>
            <span className="text-xl font-mono font-bold tracking-tight text-slate-900 block mt-0.5">
              {managedAccounts.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US')}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono font-medium">
            {t('liveHealth.metrics.accountsSub')}
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 p-4.5 rounded-xl flex flex-col justify-between space-y-2 text-slate-800 relative overflow-hidden group hover:border-slate-300 shadow-tiny transition-all">
          <div className="absolute top-0 right-0 p-3 text-blue-600 opacity-10">
            <Activity className="w-11 h-11" />
          </div>
          <div>
            <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block">{t('liveHealth.metrics.apy')}</span>
            <span className="text-xl font-mono font-bold tracking-tight text-emerald-600 block mt-0.5">
              8.94%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono font-medium">
            {t('liveHealth.metrics.apySub')}
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 p-4.5 rounded-xl flex flex-col justify-between space-y-2 text-slate-800 relative overflow-hidden group hover:border-slate-300 shadow-tiny transition-all">
          <div className="absolute top-0 right-0 p-3 text-blue-600 opacity-10">
            <ShieldCheck className="w-11 h-11" />
          </div>
          <div>
            <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block">{t('liveHealth.metrics.txs')}</span>
            <span className="text-xl font-mono font-bold tracking-tight text-slate-900 block mt-0.5">
              {txCount.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US')}
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-0.5 font-semibold">
            <Zap className="w-3 h-3 text-emerald-600 fill-current" /> {t('liveHealth.metrics.txsSub')}
          </span>
        </div>

      </div>

      {/* Transaction Feed Ledger */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-tiny">
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900">{t('liveHealth.feed.title')}</h4>
            <p className="text-xs text-slate-500">{t('liveHealth.feed.subline')}</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded text-[10px] font-mono text-blue-600 font-bold uppercase">
            <RefreshCw className="w-3 h-3 animate-spin text-blue-600" /> {t('liveHealth.feed.badge')}
          </div>
        </div>

        <div className="space-y-2 overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs text-slate-600 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold text-[9px] font-mono">
                <th className="py-2.5">{t('liveHealth.feed.headers.account')}</th>
                <th className="py-2.5">{t('liveHealth.feed.headers.action')}</th>
                <th className="py-2.5 text-right">{t('liveHealth.feed.headers.volume')}</th>
                <th className="py-2.5 pl-6">{t('liveHealth.feed.headers.route')}</th>
                <th className="py-2.5 text-right">{t('liveHealth.feed.headers.status')}</th>
                <th className="py-2.5 text-right pr-2">{t('liveHealth.feed.headers.age')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {liveTxs.map((tx) => {
                let actionColor = 'text-blue-600';
                if (tx.action === 'Yield Compound') actionColor = 'text-emerald-600';
                else if (tx.action === 'Withdraw') actionColor = 'text-red-600';
                
                return (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-mono text-slate-500">{tx.account}</td>
                    <td className={`py-2.5 font-bold ${actionColor}`}>{actionMap[tx.action] || tx.action}</td>
                    <td className="py-2.5 font-mono text-right font-bold text-slate-900">{tx.amount}</td>
                    <td className="py-2.5 text-slate-700 pl-6">{tx.protocol}</td>
                    <td className="py-2.5 text-right">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                        {statusMap[tx.status] || tx.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-400 pr-2">{formatTime(tx.time)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
