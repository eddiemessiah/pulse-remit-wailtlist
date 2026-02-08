'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRightLeft, Plus } from 'lucide-react'

const activeAgents = [
    { name: 'Family Support', ens: 'CHIDI.ENS', amount: '-$68.00', type: 'send', active: true },
    { name: 'Stock Savings', ens: 'TUMI.ETH', amount: '-$68.00', type: 'send', active: false },
    { name: 'Trade', ens: 'BAMBOO.ETH', amount: '-$68.00', type: 'send', active: false },
]

export const DashboardPreview = () => {
    return (
        <motion.div
            className="relative w-full max-w-[380px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
            {/* Monthly Income Badge - Floating above */}
            <motion.div
                className="absolute -top-4 left-4 z-20 flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-2.5 shadow-xl"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
                <div className="w-7 h-7 rounded-full bg-[#CAFF33] flex items-center justify-center">
                    <Plus className="w-4 h-4 text-black" strokeWidth={3} />
                </div>
                <div>
                    <p className="text-[#CAFF33] font-bold text-sm leading-none">+ $5000,00</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">Monthly Income</p>
                </div>
            </motion.div>

            {/* Main Card */}
            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-[#2A2A2A] p-5 pt-12 space-y-5">

                {/* Active Agent Section */}
                <div>
                    <h3 className="text-white font-semibold text-sm mb-3">Active Agent</h3>
                    <div className="space-y-2">
                        {activeAgents.map((agent, i) => (
                            <motion.div
                                key={i}
                                className={`flex items-center justify-between p-3 rounded-xl ${agent.active
                                        ? 'bg-[#0D0D0D] border border-[#2A2A2A]'
                                        : 'opacity-50'
                                    }`}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: agent.active ? 1 : 0.5, x: 0 }}
                                transition={{ delay: 0.6 + (i * 0.1) }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#CAFF33]/20 flex items-center justify-center">
                                        <ArrowRightLeft className="w-4 h-4 text-[#CAFF33]" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-[10px] leading-none">{agent.name}</p>
                                        <p className="text-white font-semibold text-sm">{agent.ens}</p>
                                    </div>
                                </div>
                                <span className="text-white font-medium text-sm">{agent.amount}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Money Exchange Section */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-[#2A2A2A]" />
                        <h3 className="text-white font-semibold text-sm px-2">Money Exchange</h3>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#2A2A2A] to-[#2A2A2A]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-[#0D0D0D] rounded-xl border border-[#2A2A2A]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🇮🇳</span>
                                <span className="text-white font-medium text-sm">INR</span>
                            </div>
                            <p className="text-gray-500 text-[10px] mb-1">Indian Rupees</p>
                            <p className="text-white font-bold text-lg">5,0000</p>
                        </div>
                        <div className="p-3 bg-[#0D0D0D] rounded-xl border border-[#2A2A2A]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🇺🇸</span>
                                <span className="text-white font-medium text-sm">USD</span>
                            </div>
                            <p className="text-gray-500 text-[10px] mb-1">United States Dollar</p>
                            <p className="text-white font-bold text-lg">12.00</p>
                        </div>
                    </div>
                </div>

                {/* Disburse Button */}
                <button className="w-full py-3 rounded-full border border-[#CAFF33] text-[#CAFF33] font-semibold text-sm hover:bg-[#CAFF33]/10 transition-all">
                    Disburse Funds
                </button>
            </div>

            {/* Supported Assets Pill - Below card */}
            <motion.div
                className="flex items-center justify-center gap-3 mt-6 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-5 py-2.5 mx-auto w-fit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <span className="text-gray-400 text-xs font-medium">Supported Assets/Currencies</span>
                <div className="flex items-center gap-1.5">
                    {[
                        { symbol: '$', color: '#CAFF33' },
                        { symbol: '€', color: '#CAFF33' },
                        { symbol: '₿', color: '#CAFF33' },
                        { symbol: 'Ξ', color: '#CAFF33' },
                    ].map((asset, i) => (
                        <div
                            key={i}
                            className="w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center text-xs font-bold"
                            style={{ color: asset.color }}
                        >
                            {asset.symbol}
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
