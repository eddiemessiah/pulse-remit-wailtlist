'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Briefcase, Plus } from 'lucide-react'

export const ActiveAgentsCard = () => {
    return (
        <motion.div
            className="w-full max-w-[480px] bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-6 space-y-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">Your Active Agents</p>
                    <h3 className="text-white font-bold text-2xl tracking-tight">3 Running</h3>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded-full text-white text-sm font-medium hover:border-[#CAFF33]/30 transition-all">
                    <Plus className="w-4 h-4" />
                    New Agent
                </button>
            </div>

            {/* Agent Cards */}
            <div className="space-y-3">
                {/* Agent 1 - Family Support */}
                <motion.div
                    className="p-4 bg-[#0D0D0D] rounded-xl border border-[#2A2A2A] space-y-3 hover:border-[#CAFF33]/20 transition-all"
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#CAFF33] flex items-center justify-center">
                                <Bot className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Family Support Agent</p>
                                <p className="text-gray-500 text-xs">family.eth • Weekly</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#CAFF33] animate-pulse" />
                            <span className="text-[#CAFF33] text-xs font-medium">Active</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Amount</p>
                            <p className="text-white font-semibold text-sm">$200</p>
                        </div>
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Route</p>
                            <p className="text-white font-semibold text-sm">Base→OP</p>
                        </div>
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Next</p>
                            <p className="text-white font-semibold text-sm">2 days</p>
                        </div>
                    </div>
                </motion.div>

                {/* Agent 2 - Volatility Hedge */}
                <motion.div
                    className="p-4 bg-[#0D0D0D] rounded-xl border border-[#2A2A2A] space-y-3 hover:border-[#CAFF33]/20 transition-all"
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#CAFF33] flex items-center justify-center">
                                <Bot className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Volatility Hedge Bot</p>
                                <p className="text-gray-500 text-xs">Auto-convert • NGN Monitor</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-400" />
                            <span className="text-yellow-400 text-xs font-medium">Watching</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Trigger</p>
                            <p className="text-white font-semibold text-sm">-5% NGN</p>
                        </div>
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Balance</p>
                            <p className="text-white font-semibold text-sm">$1,200</p>
                        </div>
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Saved</p>
                            <p className="text-[#CAFF33] font-semibold text-sm">$89</p>
                        </div>
                    </div>
                </motion.div>

                {/* Agent 3 - Freelance Payment */}
                <motion.div
                    className="p-4 bg-[#0D0D0D] rounded-xl border border-[#2A2A2A] space-y-3 hover:border-[#CAFF33]/20 transition-all opacity-60"
                    whileHover={{ scale: 1.01, opacity: 1 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-600 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Freelance Payment Bot</p>
                                <p className="text-gray-500 text-xs">client.eth • On-demand</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-500" />
                            <span className="text-gray-500 text-xs font-medium">Paused</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Last Sent</p>
                            <p className="text-white font-semibold text-sm">$500</p>
                        </div>
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Total</p>
                            <p className="text-white font-semibold text-sm">$3,450</p>
                        </div>
                        <div className="p-2 bg-[#1A1A1A] rounded-lg">
                            <p className="text-gray-500 text-[10px]">Txns</p>
                            <p className="text-white font-semibold text-sm">7</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
