'use client'

import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Bell, Search, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export const Header = () => {
    return (
        <header className="h-16 lg:h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <div className="hidden md:block relative group w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00FF88] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search agents, transactions, or recipients..."
                        className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 px-12 text-sm focus:outline-none focus:border-[#00FF88]/50 transition-all focus:bg-white/[0.08]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Network Secure</span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 text-gray-400 hover:text-white transition-colors"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]" />
                </motion.button>

                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        mounted,
                    }) => {
                        const ready = mounted;
                        const connected = ready && account && chain;

                        return (
                            <div
                                {...(!ready && {
                                    'aria-hidden': true,
                                    'style': {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    },
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <button
                                                onClick={openConnectModal}
                                                className="px-4 md:px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all text-xs md:text-sm"
                                            >
                                                Connect
                                            </button>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <button
                                                onClick={openChainModal}
                                                className="px-4 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-all text-xs md:text-sm"
                                            >
                                                Error
                                            </button>
                                        );
                                    }

                                    return (
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <button
                                                onClick={openChainModal}
                                                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest"
                                            >
                                                {chain.name}
                                            </button>

                                            <button
                                                onClick={openAccountModal}
                                                className="flex items-center gap-2 md:gap-3 pl-3 pr-1 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
                                            >
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-[10px] font-mono font-bold text-white leading-none">{account.displayName}</p>
                                                </div>
                                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#00FF88] to-[#0061FF] border border-white/20" />
                                            </button>
                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </div>
        </header>
    )
}
