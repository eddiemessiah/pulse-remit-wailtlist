'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, Copy, ExternalLink, QrCode } from 'lucide-react'
import { useAccount, useBalance, useEnsName } from 'wagmi'
import { cn } from '@/lib/utils'

export default function WalletPage() {
    const { address, isConnected, chain } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { data: balance } = useBalance({ address })

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-4">
                    <Wallet className="w-10 h-10 text-gray-500" />
                </div>
                <h1 className="text-2xl font-bold">Wallet Not Connected</h1>
                <p className="text-gray-500 max-w-md">Please connect your wallet to view your assets and manage your remittance funds.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Wallet Overview</h1>
                <p className="text-gray-500 mt-1">Manage your connected assets and network settings.</p>
            </div>

            {/* Main Wallet Card */}
            <div className="pulse-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#CAFF33]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#CAFF33] to-emerald-600 flex items-center justify-center shadow-lg shadow-[#CAFF33]/20">
                            <Wallet className="w-10 h-10 text-black" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#CAFF33] uppercase tracking-widest mb-1">Connected Account</p>
                            <h2 className="text-3xl font-black tracking-tight">{ensName || 'Pulse User'}</h2>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="px-3 py-1 bg-white/10 rounded-lg text-sm font-mono text-gray-300 flex items-center gap-2">
                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                    <button className="hover:text-white transition-colors">
                                        <Copy className="w-3 h-3" />
                                    </button>
                                </div>
                                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-xs font-bold uppercase tracking-wide">
                                    {chain?.name || 'Unknown Network'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Total Balance</p>
                        <div className="text-5xl font-black tracking-tighter text-white mb-2">
                            {balance ? parseFloat(balance.formatted).toFixed(4) : '0.00'}
                            <span className="text-lg text-gray-500 ml-2 font-bold">{balance?.symbol}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                            ≈ ${(parseFloat(balance?.formatted || '0') * 2600).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <QrCode className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Receive Assets</h3>
                    <p className="text-gray-500 text-sm mb-6">Display your QR code or copy your address to receive funds from exchanges or other wallets.</p>
                    <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
                        Show QR Code
                    </button>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-[#CAFF33]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ExternalLink className="w-6 h-6 text-[#CAFF33]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">View on Explorer</h3>
                    <p className="text-gray-500 text-sm mb-6">Check your transaction history and token approvals on the block explorer.</p>
                    <a
                        href={`https://etherscan.io/address/${address}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center"
                    >
                        View on Etherscan
                    </a>
                </div>
            </div>
        </div>
    )
}
