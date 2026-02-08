'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useAgentFactory } from '@/hooks/useAgentFactory'

export function SignupCard() {
    const { openConnectModal } = useConnectModal()
    const { address, isConnected } = useAccount()
    const { createAgent, loading } = useAgentFactory()
    const [deployed, setDeployed] = useState(false)

    const handleAction = async () => {
        if (!isConnected) {
            openConnectModal?.()
            return
        }

        try {
            const hash = await createAgent()
            if (hash) {
                setDeployed(true)
                console.log("Welcome to PulseRemit! Agent live.")
                // Refresh or reload to update state in parent
                setTimeout(() => window.location.reload(), 2000)
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (deployed) {
        return (
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#CAFF33]/20 to-black border border-[#CAFF33]/30 text-center">
                <div className="w-16 h-16 bg-[#CAFF33] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-black font-display mb-2">Agent Active!</h3>
                <p className="text-gray-400">Redirecting to your command center...</p>
            </div>
        )
    }

    return (
        <div className="p-10 rounded-[3rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group hover:border-[#CAFF33]/20 transition-all">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-[#CAFF33]" />
                </div>

                <div>
                    <h2 className="text-3xl font-black font-display tracking-tight mb-2">
                        {isConnected ? "Activate Your Agent" : "Start Your Journey"}
                    </h2>
                    <p className="text-gray-400 font-medium max-w-sm">
                        {isConnected
                            ? "Deploy your personal autonomous agent to start managing wealth flows."
                            : "Connect your wallet to deploy your personal autonomous agent."}
                    </p>
                </div>

                <button
                    onClick={handleAction}
                    disabled={loading}
                    className="w-full py-4 bg-[#CAFF33] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b8e62e] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Deploying Agent...
                        </>
                    ) : isConnected ? (
                        <>
                            Deploy Agent
                            <ArrowRight className="w-5 h-5" />
                        </>
                    ) : (
                        <>
                            <Wallet className="w-5 h-5" />
                            Connect Wallet
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
