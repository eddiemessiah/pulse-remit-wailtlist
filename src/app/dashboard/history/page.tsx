'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Download,
    Filter,
    ArrowUpRight,
    ArrowDownLeft,
    CheckCircle2,
    Clock,
    AlertCircle,
    Copy,
    ExternalLink,
    ChevronDown,
    Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'

const transactions = [
    { id: '1', name: 'Family Support', recipient: 'chidi.ens', amount: 50, status: 'COMPLETED', date: '21 May 2024, 02:45 PM', txHash: '0x12a...b3e', network: 'Base', fee: '0.002', savings: '$12.40' },
    { id: '2', name: 'Business Lease', recipient: 'lagosrent.ens', amount: 450, status: 'PROCESSING', date: '21 May 2024, 01:12 PM', txHash: '0x78c...9f2', network: 'Ethereum', fee: '4.50', savings: '$45.00' },
    { id: '3', name: 'Receive Payment', recipient: '0x71...4E2', amount: 1200, status: 'COMPLETED', date: '20 May 2024, 11:30 AM', txHash: '0xde4...a21', network: 'Optimism', type: 'receive', fee: '0.005', savings: '$32.10' },
    { id: '4', name: 'Education Fund', recipient: 'ade.ens', amount: 200, status: 'FAILED', date: '19 May 2024, 09:15 AM', txHash: '0xbf2...c09', network: 'Base', fee: '0', savings: '$0' },
    { id: '5', name: 'Weekly Saving', recipient: 'vault.ens', amount: 100, status: 'COMPLETED', date: '18 May 2024, 05:00 PM', txHash: '0x321...eef', network: 'Polygon', fee: '0.01', savings: '$15.20' },
    { id: '6', name: 'Emergency Support', recipient: 'musa.ens', amount: 300, status: 'COMPLETED', date: '17 May 2024, 10:20 AM', txHash: '0xeee...abc', network: 'Base', fee: '0.001', savings: '$10.50' },
]

export default function ExecutionHistoryPage() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')

    const filteredTxs = transactions.filter(tx => {
        const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase()) || tx.recipient.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'all' || tx.status.toLowerCase() === filter.toLowerCase()
        return matchesSearch && matchesFilter
    })

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            case 'PROCESSING': return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
            case 'FAILED': return <AlertCircle className="w-4 h-4 text-red-500" />
            default: return null
        }
    }

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto pb-20 px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Execution Ledger</h1>
                    <p className="text-gray-500 mt-1">Verifiable on-chain record of every pulse agent deployment.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date Range
                    </button>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download CSV
                    </button>
                </div>
            </div>

            {/* Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="pulse-card p-6 bg-gradient-to-br from-emerald-500/10 to-transparent">
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Total Executed</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold">$125,640</h3>
                        <p className="text-xs text-emerald-500 font-bold mb-1">+12% this month</p>
                    </div>
                </div>
                <div className="pulse-card p-6 bg-gradient-to-br from-blue-500/10 to-transparent">
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Network Savings</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold">$2,450</h3>
                        <p className="text-xs text-blue-500 font-bold mb-1">USDC Protected</p>
                    </div>
                </div>
                <div className="pulse-card p-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Agents</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold">14</h3>
                        <p className="text-xs text-gray-400 font-bold mb-1">Running now</p>
                    </div>
                </div>
            </div>

            {/* Filters and Table */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#CAFF33] transition-colors" />
                        <input
                            type="text"
                            placeholder="Find a specific transaction or recipient..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 px-12 text-sm focus:outline-none focus:border-[#CAFF33]/50 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'completed', 'processing', 'failed'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={cn(
                                    "px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all",
                                    filter === s ? "bg-[#CAFF33] border-[#CAFF33] text-black" : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pulse-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.01] border-b border-white/5 font-display">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Execution / flow</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Recipient</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Network / Hash</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence>
                                {filteredTxs.map((tx) => (
                                    <motion.tr
                                        key={tx.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <div>
                                                <p className="font-bold text-sm tracking-tight text-white/90">{tx.name}</p>
                                                <p className="text-[10px] text-gray-500">{tx.date}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 group/copy cursor-pointer">
                                                <span className="font-mono text-xs text-blue-400 font-bold">{tx.recipient}</span>
                                                <Copy className="w-3 h-3 text-gray-600 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-7 h-7 rounded-lg flex items-center justify-center bg-white/5",
                                                    tx.type === 'receive' ? "text-emerald-500" : "text-gray-400"
                                                )}>
                                                    {tx.type === 'receive' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                                </div>
                                                <span className={cn(
                                                    "font-bold text-sm",
                                                    tx.type === 'receive' ? "text-emerald-500" : "text-white"
                                                )}>
                                                    {tx.type === 'receive' ? '+' : '-'}${tx.amount.toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(tx.status)}
                                                <span className={cn(
                                                    "text-[10px] font-bold uppercase tracking-widest",
                                                    tx.status === 'COMPLETED' ? "text-emerald-500" :
                                                        tx.status === 'PROCESSING' ? "text-blue-400" : "text-red-500"
                                                )}>
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold text-gray-400 px-2 py-0.5 rounded bg-white/5 w-fit">{tx.network}</span>
                                                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
                                                    {tx.txHash}
                                                    <ExternalLink className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs font-bold text-white/80">{tx.savings} Saved</span>
                                                <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Fee: ${tx.fee}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredTxs.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No records found for your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    )
}
