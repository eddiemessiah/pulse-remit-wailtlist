
import React from 'react';
import { RemittanceAgent, AgentStatus } from '../types';
import { LOGOS } from '../constants';

interface AgentCardProps {
  agent: RemittanceAgent;
  onToggleStatus: (id: string) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onToggleStatus }) => {
  const statusColors = {
    [AgentStatus.ACTIVE]: 'bg-green-500',
    [AgentStatus.PAUSED]: 'bg-yellow-500',
    [AgentStatus.EXECUTING]: 'bg-blue-500 animate-pulse',
    [AgentStatus.ERROR]: 'bg-red-500'
  };

  return (
    <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 hover:border-[#00FF88]/30 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg group-hover:text-[#00FF88] transition-colors">{agent.name}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{agent.recipientEns}</p>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1.5 bg-opacity-10 ${statusColors[agent.status].replace('bg-', 'text-')} border border-current`}>
          <div className={`w-1.5 h-1.5 rounded-full ${statusColors[agent.status]}`} />
          {agent.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black/30 p-2 rounded-lg">
          <p className="text-[10px] text-gray-500 mb-1">AMOUNT</p>
          <p className="text-sm font-semibold">${agent.amount} {agent.currency}</p>
        </div>
        <div className="bg-black/30 p-2 rounded-lg">
          <p className="text-[10px] text-gray-500 mb-1">FREQUENCY</p>
          <p className="text-sm font-semibold capitalize">{agent.frequency}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-[10px] bg-white/5 px-2 py-1 rounded">{agent.sourceChain}</span>
        <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
        <span className="text-[10px] bg-white/5 px-2 py-1 rounded">{agent.destChain}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex gap-2">
           <LOGOS.Circle className="w-4 h-4 text-gray-500" />
           <LOGOS.LiFi className="w-4 h-4 text-gray-500" />
           <LOGOS.ENS className="w-4 h-4 text-gray-500" />
        </div>
        <button 
          onClick={() => onToggleStatus(agent.id)}
          className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
        >
          {agent.status === AgentStatus.ACTIVE ? 'Pause Agent' : 'Resume Agent'}
        </button>
      </div>
    </div>
  );
};
