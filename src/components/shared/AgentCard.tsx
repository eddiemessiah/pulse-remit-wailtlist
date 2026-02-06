'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Bot,
    Settings2,
    Pause,
    Play,
    ExternalLink,
    Calendar,
    Layers,
    ShieldCheck
} from 'lucide-react'
import { RemittanceAgent, AgentStatus } from '@/types'
import { cn } from '@/lib/utils'

interface AgentCardProps {
    agent: RemittanceAgent
    onToggleStatus: (id: string) => void
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onToggleStatus }) => {
    const isActive = agent.status === AgentStatus.ACTIVE

    return (
        <motion.div
            layout
            className="pulse-card p-6 group hover:border-[#00FF88]/30 transition-all"
            whileHover={{ y: -5 }}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        isActive ? "bg-[#00FF88]/10 text-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.1)]" : "bg-white/5 text-gray-500"
                    )}>
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-none mb-1 group-hover:text-[#00FF88] transition-colors">{agent.name}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#00FF88] font-bold font-mono">{agent.recipientEns}</p>
                    </div>
                </div>
                <div className={cn(
                    "px-2 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1.5",
                    isActive ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-white/5 text-gray-500 border-white/10"
                )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isActive ? "bg-emerald-500" : "bg-gray-500")} />
                    {agent.status}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Amount</p>
                    <p className="text-sm font-bold">${agent.amount} <span className="text-[10px] text-gray-500">USDC</span></p>
                </div>
                <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Frequency</p>
                    <p className="text-sm font-bold capitalize">{agent.frequency}</p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8 px-1">
                <div className="flex items-center gap-2">
                    <div className="text-[10px] px-2 py-1 rounded bg-white/5 font-bold">{agent.sourceChain}</div>
                    <Layers className="w-3 h-3 text-gray-600" />
                    <div className="text-[10px] px-2 py-1 rounded bg-white/5 font-bold">{agent.destChain}</div>
                </div>
                {agent.hedgingEnabled && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[#00FF88] font-bold uppercase">
                        <ShieldCheck className="w-3 h-3" />
                        Hedging On
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <button
                    onClick={() => onToggleStatus(agent.id)}
                    className={cn(
                        "flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all",
                        isActive ? "bg-white/5 text-gray-300 hover:bg-white/10" : "bg-[#00FF88] text-black hover:bg-[#00D16F]"
                    )}
                >
                    {isActive ? <><Pause className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> Active</>}
                </button>
                <button className="p-2.5 rounded-xl bg-white/5 text-gray-500 hover:text-white transition-all">
                    <Settings2 className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-xl bg-white/5 text-gray-500 hover:text-white transition-all">
                    <ExternalLink className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}
