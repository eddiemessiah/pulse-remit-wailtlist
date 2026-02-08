'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Globe,
    Zap,
    ArrowUpRight,
    Network,
    Search,
    Filter,
    Activity,
    MapPin,
    ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const flows = [
    { id: 1, origin: 'Lagos', dest: 'London', volume: '$12,450', growth: '+24%', status: 'high' },
    { id: 2, origin: 'Nairobi', dest: 'New York', volume: '$8,200', growth: '+12%', status: 'stable' },
    { id: 3, origin: 'Acra', dest: 'Berlin', volume: '$4,100', growth: '+5%', status: 'stable' },
    { id: 4, origin: 'Johannesburg', dest: 'Singapore', volume: '$18,900', growth: '+32%', status: 'expanding' },
    { id: 5, origin: 'Cairo', dest: 'Dubai', volume: '$6,700', growth: '-2%', status: 'stable' },
]

export default function GlobalFlowsPage() {
    return (
        <div className="space-y-8 max-w-[1400px] mx-auto pb-20 px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Global Connectivity</h1>
                    <p className="text-gray-500 mt-1">Live tracking of agentic wealth movements across borders.</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-1 rounded-2xl border border-white/10">
                    <button className="px-4 py-2 bg-[#CAFF33] text-black font-bold rounded-xl text-xs transition-all">Live Network</button>
                    <button className="px-4 py-2 text-gray-500 font-bold rounded-xl text-xs hover:text-white transition-all">Historical Radar</button>
                </div>
            </div>

            {/* Map Visualization Container */}
            <div className="relative aspect-[21/9] w-full pulse-card overflow-hidden group">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-[#0A0A0A]">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#CAFF33 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    {/* Pulsing Nodes */}
                    {[
                        { top: '30%', left: '20%', label: 'NA' },
                        { top: '60%', left: '15%', label: 'SA' },
                        { top: '25%', left: '50%', label: 'EU' },
                        { top: '65%', left: '55%', label: 'AF' },
                        { top: '40%', left: '80%', label: 'AS' },
                    ].map((node, i) => (
                        <motion.div
                            key={i}
                            className="absolute flex flex-col items-center"
                            style={{ top: node.top, left: node.left }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                        >
                            <div className="w-4 h-4 rounded-full bg-[#CAFF33] shadow-[0_0_20px_#CAFF33] relative">
                                <div className="absolute inset-0 rounded-full bg-[#CAFF33] animate-ping" />
                            </div>
                            <span className="text-[10px] font-bold text-white mt-1 uppercase tracking-widest">{node.label}</span>
                        </motion.div>
                    ))}

                    {/* Arcs (Simulated with SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                        <motion.path
                            d="M 20% 30% Q 35% 10% 50% 25%"
                            fill="none"
                            stroke="#CAFF33"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                        />
                        <motion.path
                            d="M 50% 25% Q 52% 45% 55% 65%"
                            fill="none"
                            stroke="#0061FF"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                        />
                        <motion.path
                            d="M 80% 40% Q 70% 50% 55% 65%"
                            fill="none"
                            stroke="#FF6B00"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                        />
                    </svg>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Active Nodes</p>
                                <p className="text-2xl font-bold">1,240 <span className="text-[#CAFF33] text-xs">+12</span></p>
                            </div>
                            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Live Volume</p>
                                <p className="text-2xl font-bold">$1.2M <span className="text-gray-400 text-xs">/hr</span></p>
                            </div>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-white text-black font-extrabold rounded-2xl flex items-center gap-2 hover:bg-gray-200 transition-all">
                        Explore Detailed Map
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Hubs and Expansion */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ranking Table */}
                <div className="lg:col-span-2 pulse-card overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                        <h3 className="text-lg font-bold">Top Hubs</h3>
                        <div className="flex gap-2">
                            <button className="p-2 bg-white/5 rounded-lg border border-white/10"><Search className="w-4 h-4 text-gray-500" /></button>
                            <button className="p-2 bg-white/5 rounded-lg border border-white/10"><Filter className="w-4 h-4 text-gray-500" /></button>
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Origin / Dest</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Volume</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Growth</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {flows.map((flow) => (
                                <tr key={flow.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-sm tracking-tight">{flow.origin}</span>
                                            <ArrowRight className="w-4 h-4 text-gray-600" />
                                            <span className="font-bold text-sm tracking-tight">{flow.dest}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="font-bold font-mono text-sm">{flow.volume}</span>
                                    </td>
                                    <td className="px-6 py-5 text-emerald-500 font-bold text-sm">
                                        {flow.growth}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            flow.status === 'high' ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" :
                                                flow.status === 'expanding' ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "bg-gray-500"
                                        )} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Right Panel: Optimization Insights */}
                <div className="space-y-6">
                    <div className="p-8 pulse-card bg-gradient-to-br from-[#0061FF]/10 to-transparent">
                        <Network className="w-10 h-10 text-blue-500 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Expansion Intelligence</h3>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            Pulse AI has identified 3 new optimized routes for the <span className="text-white font-bold">Nigeria-Kenya</span> corridor with 12% lower slippage.
                        </p>
                        <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            Review Deployment Data
                            <ArrowRight className="w-4 h-4 text-[#CAFF33]" />
                        </button>
                    </div>

                    <div className="p-8 pulse-card">
                        <Activity className="w-10 h-10 text-[#CAFF33] mb-6" />
                        <h3 className="text-xl font-bold mb-3">Health Status</h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Network Integrity</p>
                        <div className="space-y-3">
                            {[
                                { name: 'Base L2', status: 'Operational', uptime: '99.99%' },
                                { name: 'Circle Arc', status: 'Optimal', uptime: '100%' },
                                { name: 'LI.FI Gateway', status: 'Operational', uptime: '99.98%' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                                    <span className="text-xs font-bold">{item.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-bold text-gray-500">{item.uptime}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
