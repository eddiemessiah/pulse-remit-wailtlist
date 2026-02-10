'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    ArrowUpRight,
    ArrowDownLeft,
    TrendingUp,
    Zap,
    Bot,
    Globe,
    Send,
    Download,
    Plus,
    Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatInterface } from '@/components/shared/ChatInterface'
import { useAccount } from 'wagmi'
import { useAgentFactory } from '@/hooks/useAgentFactory'
import { SignupCard } from '@/components/shared/SignupCard'
import { useState, useEffect } from 'react'

const stats = [
    { label: 'Total Volume', value: '$125,647', change: '+12.5%', icon: TrendingUp, color: 'text-[#CAFF33]', bg: 'bg-[#CAFF33]/10' },
    { label: 'Fees Saved', value: '$840', change: '+18.2%', icon: Zap, color: 'text-[#FF6B00]', bg: 'bg-[#FF6B00]/10' },
    { label: 'Guardians', value: '14 Active', change: '+2', icon: Bot, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Global Flows', value: '8 Corridors', change: 'Live', icon: Globe, color: 'text-purple-400', bg: 'bg-purple-400/10' },
]

const recentTransactions = [
    { id: 1, name: 'Family Support', recipient: 'chidi.ens', amount: 50, status: 'COMPLETED', date: '2 mins ago', icon: ArrowUpRight },
    { id: 2, name: 'Business Lease', recipient: 'lagosrent.ens', amount: 450, status: 'PENDING', date: '1 hour ago', icon: ArrowUpRight },
    { id: 3, name: 'Receive Payment', recipient: '0x71...4E2', amount: 1200, status: 'COMPLETED', date: '2 hours ago', icon: ArrowDownLeft, type: 'receive' },
    { id: 4, name: 'Education Fund', recipient: 'ade.ens', amount: 200, status: 'FAILED', date: '5 hours ago', icon: ArrowUpRight },
]

export default function DashboardPage() {
    const { address, isConnected } = useAccount()
    const { checkAgent, agentAddress } = useAgentFactory()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const init = async () => {
            // Artificial delay for smooth loading or ensure provider is ready
            await new Promise(r => setTimeout(r, 800))
            if (address) {
                await checkAgent(address)
            }
            setChecking(false)
        }
        init()
    }, [address])

    // Determine if we should show the full dashboard
    // We show full dashboard if:
    // 1. We are checking (show skeleton/loading ideally, but existing UI is fine)
    // 2. We have an agentAddress
    // 3. User is NOT connected (demo mode preview) ??
    // Actually, if user is NOT connected, we should probably prompt signup too.
    // So show dashboard ONLY if agentAddress is present.

    // For demo purposes:
    // If connected AND no agent -> Show Signup
    // If not connected -> Show Signup (connect wallet state)
    // If agent exists -> Show Dashboard

    // BUT we want to show the "AI Sidekick" always?

    const showSignup = !checking && (!isConnected || !agentAddress)

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-20 px-4 md:px-0">
            {/* Top Section: Welcome & Overview */}
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2 font-display">Hub Command</h1>
                        <p className="text-gray-500 font-medium">Hello {address ? address.slice(0, 6) : 'Guest'}, your agents are successfully routing wealth.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="p-5 pulse-card relative group hover:border-white/20 transition-all"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={cn("p-2 rounded-xl", stat.bg, stat.color)}>
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[9px] font-bold text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">{stat.change}</span>
                                </div>
                                <p className="text-xl font-bold mb-1 tracking-tight">{stat.value}</p>
                                <p className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-bold whitespace-nowrap">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {showSignup ? (
                        <SignupCard />
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Primary Balance Section */}
                            <div className="p-10 pulse-card bg-gradient-to-br from-zinc-900 to-black border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-[#CAFF33]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-2 h-2 rounded-full bg-[#CAFF33] animate-pulse" />
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Consolidated Wealth</p>
                                    </div>
                                    <div className="flex items-baseline gap-4 mb-4">
                                        <h2 className="text-7xl font-black tracking-tighter text-gradient leading-none font-display italic">125,647.00</h2>
                                        <span className="text-2xl font-bold text-gray-600">USD</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-500 border border-white/5">0.12 ETH Locked</div>
                                        <div className="px-3 py-1 bg-[#CAFF33]/10 rounded-full text-[10px] font-bold text-[#CAFF33] border border-[#CAFF33]/10">+1.2k USDC Today</div>
                                    </div>
                                </div>

                                <div className="relative z-10 flex gap-4 mt-12">
                                    <button
                                        onClick={() => document.querySelector<HTMLInputElement>('input[type="text"]')?.focus()}
                                        className="flex-1 py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Send className="w-5 h-5" />
                                        Send
                                    </button>
                                    <button
                                        onClick={() => {
                                            const chatInput = document.querySelector<HTMLInputElement>('input[type="text"]')
                                            if (chatInput) {
                                                chatInput.value = "Deploy a new agent for me"
                                                chatInput.dispatchEvent(new Event('change', { bubbles: true }))
                                                chatInput.focus()
                                            }
                                        }}
                                        className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Deploy
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity Mini-Feed */}
                            <div className="p-10 pulse-card border-white/5 flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-emerald-500" />
                                        <h3 className="font-black font-display tracking-tight text-xl uppercase italic">Live Ledger</h3>
                                    </div>
                                    <button className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Explore All</button>
                                </div>
                                <div className="space-y-4 flex-1">
                                    {recentTransactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between p-4 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-all group cursor-pointer overflow-hidden">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                                                    tx.type === 'receive' ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-gray-500"
                                                )}>
                                                    <tx.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm tracking-tight">{tx.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{tx.recipient}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={cn(
                                                    "font-bold text-lg tracking-tighter",
                                                    tx.type === 'receive' ? "text-emerald-500" : "text-white"
                                                )}>
                                                    {tx.type === 'receive' ? '+' : '-'}${tx.amount.toLocaleString()}
                                                </p>
                                                <p className="text-[10px] text-gray-600 font-bold uppercase">{tx.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CAFF33] to-blue-500 flex items-center justify-center text-black font-black">AI</div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#0A0A0A]" />
                            </div>
                            <div>
                                <span className="font-black text-lg tracking-tight font-display mb-0.5 block italic">PULSE CO-PILOT</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-[#CAFF33] uppercase tracking-widest">Active</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">v1.2.4 Alpha</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ChatInterface onAgentCreated={(plan) => console.log(plan)} />
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-all" />
                    <h4 className="font-black italic text-xl font-display mb-4 relative z-10">NETWORK INTELLIGENCE</h4>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed relative z-10">
                        Detecting high volatility in NGN/USD pairs. Agents automatically switched hedging strategy to <span className="text-white font-bold">Hard-Peg Stability</span>.
                    </p>
                    <button className="w-full py-4 mt-6 bg-white text-black rounded-2xl font-black text-sm hover:bg-gray-200 transition-all relative z-10 transform active:scale-95 shadow-lg">
                        Review Protection Plan
                    </button>
                </div>
            </div>
        </div >

    )
}
