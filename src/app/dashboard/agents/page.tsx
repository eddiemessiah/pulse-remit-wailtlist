'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Bot,
    Plus,
    Search,
    Filter,
    LayoutGrid,
    List,
    Sparkles,
    ArrowUpDown,
    CheckCircle2,
    PauseCircle,
    X
} from 'lucide-react'
import { AgentCard } from '@/components/shared/AgentCard'
import { RemittanceAgent, AgentStatus, ChainType } from '@/types'
import { cn } from '@/lib/utils'

const initialAgents: RemittanceAgent[] = [
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
    },
    {
        id: '3',
        name: 'Scholarship Ade',
        recipientEns: 'ade.ens',
        amount: 200,
        currency: 'USDC',
        frequency: 'monthly',
        sourceChain: ChainType.POLYGON,
        destChain: ChainType.BASE,
        status: AgentStatus.ACTIVE,
        hedgingEnabled: true
    },
    {
        id: '4',
        name: 'Savings Bridge',
        recipientEns: 'vault.ens',
        amount: 1000,
        currency: 'USDC',
        frequency: 'monthly',
        sourceChain: ChainType.BASE,
        destChain: ChainType.BASE,
        status: AgentStatus.ACTIVE,
        hedgingEnabled: true
    }
]

export default function AgentsPage() {
    const [agents, setAgents] = useState(initialAgents)
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | AgentStatus>('all')

    const filteredAgents = useMemo(() => {
        return agents.filter(agent => {
            const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.recipientEns.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = statusFilter === 'all' || agent.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [agents, searchQuery, statusFilter])

    const toggleAgentStatus = (id: string) => {
        setAgents(prev => prev.map(a =>
            a.id === id ? { ...a, status: a.status === AgentStatus.ACTIVE ? AgentStatus.PAUSED : AgentStatus.ACTIVE } : a
        ))
    }

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto pb-20 px-4 md:px-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Guardian Agents</h1>
                    <div className="flex items-center gap-3">
                        <p className="text-gray-500">Your autonomous financial representatives.</p>
                        <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                        <span className="text-xs font-bold text-[#00FF88] uppercase tracking-widest bg-[#00FF88]/10 px-2 py-0.5 rounded-full">
                            {agents.filter(a => a.status === AgentStatus.ACTIVE).length} / {agents.length} Online
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setView('grid')}
                            className={cn(
                                "p-2.5 rounded-xl transition-all",
                                view === 'grid' ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={cn(
                                "p-2.5 rounded-xl transition-all",
                                view === 'list' ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                    <button className="flex-1 md:flex-none px-6 py-3.5 bg-[#00FF88] text-black font-extrabold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#00D16F] transition-all transform hover:scale-[1.02] shadow-[0_0_30px_rgba(0,255,136,0.2)]">
                        <Plus className="w-5 h-5" />
                        Deploy New Agent
                    </button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00FF88] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name or ENS..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 px-12 text-sm focus:outline-none focus:border-[#00FF88]/50 transition-all focus:bg-white/[0.06]"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setStatusFilter('all')}
                        className={cn(
                            "flex-1 px-4 py-3.5 rounded-2xl border text-xs font-bold transition-all",
                            statusFilter === 'all' ? "bg-white/10 border-white/20 text-white" : "bg-transparent border-white/5 text-gray-500 hover:border-white/10"
                        )}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setStatusFilter(AgentStatus.ACTIVE)}
                        className={cn(
                            "flex-1 px-4 py-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2",
                            statusFilter === AgentStatus.ACTIVE ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-transparent border-white/5 text-gray-500 hover:border-white/10"
                        )}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setStatusFilter(AgentStatus.PAUSED)}
                        className={cn(
                            "flex-1 px-4 py-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2",
                            statusFilter === AgentStatus.PAUSED ? "bg-orange-500/10 border-orange-500/20 text-orange-500" : "bg-transparent border-white/5 text-gray-500 hover:border-white/10"
                        )}
                    >
                        Paused
                    </button>
                </div>

                <button className="px-4 py-3.5 bg-white/[0.03] border border-white/5 rounded-2xl text-xs font-bold text-gray-400 flex items-center justify-center gap-2 hover:bg-white/[0.06] transition-all">
                    <ArrowUpDown className="w-4 h-4" />
                    Sort: Recent
                </button>
            </div>

            {/* Content Section */}
            {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredAgents.map((agent, i) => (
                            <motion.div
                                key={agent.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <AgentCard agent={agent} onToggleStatus={toggleAgentStatus} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Quick Deploy Placeholder */}
                    <motion.button
                        layout
                        className="pulse-card h-full min-h-[300px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-[#00FF88]/30 hover:bg-[#00FF88]/5 transition-all group lg:aspect-square"
                    >
                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#00FF88]/20 group-hover:text-[#00FF88]">
                            <Plus className="w-8 h-8" />
                        </div>
                        <div className="text-center px-8">
                            <p className="font-bold text-lg">New Guardian</p>
                            <p className="text-sm text-gray-500">Configure a custom flow.</p>
                        </div>
                    </motion.button>
                </div>
            ) : (
                <div className="pulse-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Agent Name</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Recipient</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Flow</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Frequency</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredAgents.map((agent) => (
                                <tr key={agent.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-2 rounded-xl",
                                                agent.status === AgentStatus.ACTIVE ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-gray-500"
                                            )}>
                                                <Bot className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-sm">{agent.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="font-mono text-xs text-blue-400">{agent.recipientEns}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-[10px] font-bold">
                                            <span className="p-1 px-1.5 rounded bg-white/5">{agent.sourceChain}</span>
                                            <ArrowUpDown className="w-3 h-3 text-gray-600 rotate-90" />
                                            <span className="p-1 px-1.5 rounded bg-white/5">{agent.destChain}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-sm">${agent.amount}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs text-gray-400 capitalize">{agent.frequency}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleAgentStatus(agent.id)}
                                                className={cn(
                                                    "p-2 rounded-lg transition-all",
                                                    agent.status === AgentStatus.ACTIVE ? "hover:bg-orange-500/10 text-orange-500" : "hover:bg-emerald-500/10 text-emerald-500"
                                                )}
                                            >
                                                {agent.status === AgentStatus.ACTIVE ? <PauseCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 transition-all">
                                                <Filter className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredAgents.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                        <X className="w-10 h-10 text-gray-500" />
                    </div>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No agents found matching your query</p>
                    <button
                        onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                        className="text-[#00FF88] text-sm font-bold hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    )
}
