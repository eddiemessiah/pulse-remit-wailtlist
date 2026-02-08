'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts'
import {
    TrendingUp,
    TrendingDown,
    ShieldCheck,
    Zap,
    Globe,
    Coins,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'

const flowData = [
    { name: 'Jan', amount: 12000, savings: 340 },
    { name: 'Feb', amount: 18000, savings: 510 },
    { name: 'Mar', amount: 15000, savings: 420 },
    { name: 'Apr', amount: 22000, savings: 680 },
    { name: 'May', amount: 25000, savings: 840 },
    { name: 'Jun', amount: 31000, savings: 1020 },
]

const chainShare = [
    { name: 'Base', value: 45, color: '#CAFF33' },
    { name: 'Optimism', value: 25, color: '#FF0420' },
    { name: 'Polygon', value: 20, color: '#8247E5' },
    { name: 'Ethereum', value: 10, color: '#627EEA' },
]

export default function AnalyticsPage() {
    return (
        <div className="space-y-8 max-w-[1400px] mx-auto pb-20 px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Flow Analytics</h1>
                    <p className="text-gray-500 mt-1">Real-time performance of your global remittance network.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        Last 30 Days
                    </button>
                    <button className="px-4 py-2 bg-[#CAFF33] text-black rounded-xl text-xs font-bold hover:bg-[#b8e62e] transition-all">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Volume', value: '$126,450', change: '+12%', icon: TrendingUp, trend: 'up' },
                    { label: 'Network Fees', value: '$84.20', change: '-45%', icon: Zap, trend: 'down' },
                    { label: 'Avg Speed', value: '1.2s', change: 'Optimized', icon: Zap, trend: 'neutral' },
                    { label: 'Savings', value: '$2,450', change: '+24%', icon: Coins, trend: 'up' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 pulse-card"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2.5 rounded-2xl bg-white/5">
                                <stat.icon className="w-5 h-5 text-gray-400" />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest",
                                stat.trend === 'up' ? "bg-emerald-500/10 text-emerald-500" :
                                    stat.trend === 'down' ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-500"
                            )}>
                                {stat.change}
                            </span>
                        </div>
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</h4>
                        <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Volume Flow Chart */}
                <div className="lg:col-span-2 p-8 pulse-card h-[500px] relative">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-bold">Volume Performance</h3>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Consolidated Multi-Chain Traffic</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#CAFF33]" />
                                <span className="text-xs text-gray-500">Volume</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#0061FF]" />
                                <span className="text-xs text-gray-500">Savings</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[340px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={flowData}>
                                <defs>
                                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#CAFF33" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#CAFF33" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0061FF" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#0061FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #ffffff10', borderRadius: '16px' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#CAFF33"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorVolume)"
                                    animationDuration={2000}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="savings"
                                    stroke="#0061FF"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorSavings)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Liquidity Distribution */}
                <div className="p-8 pulse-card flex flex-col">
                    <h3 className="text-xl font-bold mb-8">Chain Utilization</h3>
                    <div className="flex-1 space-y-6">
                        {chainShare.map((item, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        {item.name}
                                    </span>
                                    <span className="text-gray-400 font-mono font-bold">{item.value}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: item.color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.value}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.1, ease: 'circOut' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 text-center">Efficiency Insight</p>
                        <p className="text-xs text-center leading-relaxed text-gray-300">
                            Base currently offers the <span className="text-[#CAFF33] font-bold">lowest gas fees</span> for your volume. Pulse Agents are routing 45% of traffic here.
                        </p>
                    </div>
                </div>
            </div>

            {/* Lower Section: Impact and Corridors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 pulse-card bg-gradient-to-br from-[#CAFF33]/5 to-transparent">
                    <ShieldCheck className="w-12 h-12 text-[#CAFF33] mb-6" />
                    <h3 className="text-xl font-bold mb-4">Volatility Shield Impact</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Our hedging engine successfully detected 3 currency devaluation events this month, automatically locking in USD value before market impact.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Preserved Value</p>
                            <p className="text-xl font-bold text-emerald-500">+$1,840</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Success Rate</p>
                            <p className="text-xl font-bold">99.8%</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 pulse-card">
                    <Globe className="w-12 h-12 text-blue-500 mb-6" />
                    <h3 className="text-xl font-bold mb-4">Top Remittance Corridors</h3>
                    <div className="space-y-4">
                        {[
                            { from: 'USA', to: 'NGA', volume: '$45,000', change: '+8%' },
                            { from: 'UK', to: 'ZAF', volume: '$12,800', change: '+2%' },
                            { from: 'EU', to: 'KEN', volume: '$8,400', change: '+15%' },
                        ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-300">{row.from}</span>
                                    <ArrowUpRight className="w-3 h-3 text-gray-600 rotate-90" />
                                    <span className="text-sm font-bold text-gray-300">{row.to}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">{row.volume}</p>
                                    <p className="text-[10px] font-bold text-emerald-500">{row.change}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
