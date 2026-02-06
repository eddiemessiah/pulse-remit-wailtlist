
import React, { useState, useEffect } from 'react';
import { PulseLogo } from './components/PulseLogo';
import { ChatInterface } from './components/ChatInterface';
import { AgentCard } from './components/AgentCard';
import { RemittanceAgent, AgentStatus, AIPlanningResponse, ChainType, TransactionRecord } from './types';
import { LOGOS } from './constants';

const App: React.FC = () => {
  const [agents, setAgents] = useState<RemittanceAgent[]>([
    {
      id: '1',
      name: 'Family Support',
      recipientEns: 'chidi.ens',
      amount: 50,
      currency: 'USDC',
      frequency: 'weekly',
      sourceChain: ChainType.BASE,
      destChain: ChainType.OPTIMISM,
      status: AgentStatus.ACTIVE,
      hedgingEnabled: true,
      nextRun: '2024-05-24'
    },
    {
      id: '2',
      name: 'Business Lease',
      recipientEns: 'lagosrent.ens',
      amount: 450,
      currency: 'USDC',
      frequency: 'monthly',
      sourceChain: ChainType.ETHEREUM,
      destChain: ChainType.BASE,
      status: AgentStatus.PAUSED,
      hedgingEnabled: false
    }
  ]);

  const [transactions, setTransactions] = useState<TransactionRecord[]>([
    {
      id: 'tx1',
      agentId: '1',
      recipient: 'chidi.ens',
      amount: 50,
      currency: 'USDC',
      timestamp: '2024-05-17 14:20',
      status: 'COMPLETED',
      hash: '0x123...abc',
      feesSaved: 4.5
    }
  ]);

  const handleAgentCreated = (plan: AIPlanningResponse) => {
    const newAgent: RemittanceAgent = {
      id: Math.random().toString(36).substr(2, 9),
      name: plan.name,
      recipientEns: plan.recipient,
      amount: plan.amount,
      currency: 'USDC',
      frequency: plan.frequency,
      sourceChain: plan.sourceChain as ChainType,
      destChain: plan.destChain as ChainType,
      status: AgentStatus.ACTIVE,
      hedgingEnabled: true,
      nextRun: new Date().toISOString().split('T')[0]
    };
    setAgents(prev => [newAgent, ...prev]);
  };

  const toggleAgentStatus = (id: string) => {
    setAgents(prev => prev.map(a => 
      a.id === id ? { ...a, status: a.status === AgentStatus.ACTIVE ? AgentStatus.PAUSED : AgentStatus.ACTIVE } : a
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-xl z-50">
        <PulseLogo />
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="text-white">Dashboard</a>
            <a href="#" className="hover:text-white transition-colors">Agents</a>
            <a href="#" className="hover:text-white transition-colors">History</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono">
              0x71C...4E2
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                Global Remittance, <br />
                <span className="text-[#00FF88]">Powered by AI Agents</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-xl">
                The agentic hub for secure, compliant, and recurring cross-border transfers. 
                Integrating Circle, LI.FI, and ENS for a borderless economy.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-2xl font-bold">$12.4k</p>
                  <p className="text-xs text-gray-500">Total Remitted</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-2xl font-bold text-[#00FF88]">$840</p>
                  <p className="text-xs text-gray-500">Fees Saved</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-2xl font-bold">14</p>
                  <p className="text-xs text-gray-500">Active Agents</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 items-center pt-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                 <div className="flex items-center gap-2"><LOGOS.Circle className="w-6 h-6" /> <span className="text-sm font-bold">CIRCLE</span></div>
                 <div className="flex items-center gap-2"><LOGOS.LiFi className="w-6 h-6" /> <span className="text-sm font-bold">LI.FI</span></div>
                 <div className="flex items-center gap-2"><LOGOS.ENS className="w-6 h-6" /> <span className="text-sm font-bold">ENS</span></div>
              </div>
            </div>

            <div className="w-full md:w-[450px]">
              <ChatInterface onAgentCreated={handleAgentCreated} />
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">My Guardian Agents</h2>
              <p className="text-sm text-gray-500">Autonomous bots managing your global wealth flow</p>
            </div>
            <button className="text-sm text-[#00FF88] font-bold flex items-center gap-1">
              <span className="w-6 h-6 rounded-full border border-[#00FF88] flex items-center justify-center">+</span>
              Create Manually
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                onToggleStatus={toggleAgentStatus} 
              />
            ))}
            {agents.length === 0 && (
              <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-gray-500">
                <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No active agents. Chat with Pulse to deploy your first guardian.</p>
              </div>
            )}
          </div>
        </section>

        {/* Transaction History */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Executions</h2>
          <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/5 text-gray-400">
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Agent</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Recipient</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Amount</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Saved</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Time</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">Family Support</td>
                    <td className="px-6 py-4 text-gray-400 font-mono">{tx.recipient}</td>
                    <td className="px-6 py-4 font-bold text-[#00FF88]">${tx.amount}</td>
                    <td className="px-6 py-4 text-green-400">+${tx.feesSaved}</td>
                    <td className="px-6 py-4 text-gray-500">{tx.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 p-6 md:p-10 bg-[#070707]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <PulseLogo className="h-6 grayscale" />
          <div className="text-gray-500 text-xs text-center md:text-right">
            <p>Built for ETHGlobal HackMoney 2026. Powered by Gemini Agentic Finance.</p>
            <p className="mt-1">Circle Arc | LI.FI | ENS Domains | RWA Track</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
