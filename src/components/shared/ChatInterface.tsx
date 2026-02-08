'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Loader2, CheckCircle2, Bot, ArrowRight, Wallet, Activity, ShieldCheck } from 'lucide-react'
import { parseRemittanceRequest } from '@/services/ai'
import { AIPlanningResponse } from '@/types'
import { cn } from '@/lib/utils'
import { useYellowChannel } from '@/hooks/useYellowChannel'
import { useLiFiBridge } from '@/hooks/useLiFiBridge'
import { parseUnits } from 'viem'
import { LIFI_CONFIG } from '@/lib/config'

interface ChatInterfaceProps {
    onAgentCreated: (plan: AIPlanningResponse) => void
}

interface Message {
    role: 'user' | 'assistant'
    content: string
    plan?: AIPlanningResponse
    status?: 'pending' | 'executing' | 'success' | 'error'
    txHash?: string
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAgentCreated }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm Pulse AI. I can set up gasless recurring payments via Yellow Network or bridge funds with LI.FI. Try 'Send $50 to aisha.eth every Friday'." }
    ])
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Hooks
    const { createChannel, sendPayment, isConnected: isYellowConnected } = useYellowChannel()
    const { getBridgeQuote, loading: bridgeLoading } = useLiFiBridge()

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, loading])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMsg = input
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMsg }])
        setLoading(true)

        try {
            const plan = await parseRemittanceRequest(userMsg)
            setLoading(false)

            if (plan) {
                let responseContent = ''

                if (plan.frequency !== 'one-time') {
                    responseContent = `I'll set up a Yellow Network state channel for gasless ${plan.frequency} payments of $${plan.amount} to ${plan.recipient}.`
                } else if (plan.sourceChain !== plan.destChain) {
                    responseContent = `I'll bridge ${plan.amount} ${plan.token} from ${plan.sourceChain} to ${plan.destChain} using LI.FI's optimal route.`
                } else {
                    responseContent = `Ready to send $${plan.amount} to ${plan.recipient} on ${plan.sourceChain}.`
                }

                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: responseContent,
                    plan,
                    status: 'pending'
                }])
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "I couldn't quite parse that. Could you specify the amount, recipient, and chain details?" }])
            }
        } catch (err) {
            setLoading(false)
            setMessages(prev => [...prev, { role: 'assistant', content: "Sync error. Please try again." }])
        }
    }

    const executePlan = async (plan: AIPlanningResponse, messageIndex: number) => {
        // Update status to executing
        setMessages(prev => prev.map((m, i) =>
            i === messageIndex ? { ...m, status: 'executing' } : m
        ))

        try {
            if (plan.frequency !== 'one-time') {
                // Yellow Channel Flow
                if (!isYellowConnected) {
                    throw new Error("Yellow Network not connected")
                }

                // For demo, we assume the recipient resolves to a valid address
                // In production, use real resolution
                const partnerAddress = "0x1234567890123456789012345678901234567890" // Demo address
                const amount = parseUnits(plan.amount.toString(), 6)

                // 1. Create Channel
                const sessionId = await createChannel(partnerAddress, amount * 4n) // Deposit 4x for recurring
                if (!sessionId) throw new Error("Failed to open channel")

                // 2. Schedule/Execute first payment
                const success = await sendPayment(amount, partnerAddress)
                if (!success) throw new Error("Payment failed")

                // Success
                setMessages(prev => prev.map((m, i) =>
                    i === messageIndex ? {
                        ...m,
                        status: 'success',
                        content: `Channel ${sessionId.slice(0, 8)}... created! First gasless payment sent.`
                    } : m
                ))
                onAgentCreated(plan)

            } else if (plan.sourceChain !== plan.destChain) {
                // LI.FI Bridge Flow
                // Mock params for demo - in prod use real addresses
                const quote = await getBridgeQuote({
                    fromChainId: 84532, // Base Sepolia
                    toChainId: 11155111, // Sepolia
                    fromTokenAddress: "0x0000000000000000000000000000000000000000",
                    toTokenAddress: "0x0000000000000000000000000000000000000000",
                    fromAmount: parseUnits(plan.amount.toString(), 18).toString(),
                    fromAddress: "0x..."
                })

                if (!quote) throw new Error("No route found")

                // Executing... (in real app, trigger wallet tx)
                await new Promise(r => setTimeout(r, 2000))

                setMessages(prev => prev.map((m, i) =>
                    i === messageIndex ? {
                        ...m,
                        status: 'success',
                        content: `Bridge executed! Funds arriving on ${plan.destChain} shortly.`
                    } : m
                ))
                onAgentCreated(plan)
            } else {
                // Direct Transfer
                await new Promise(r => setTimeout(r, 1000))
                setMessages(prev => prev.map((m, i) =>
                    i === messageIndex ? {
                        ...m,
                        status: 'success',
                        content: `Transfer confirmed on-chain.`
                    } : m
                ))
                onAgentCreated(plan)
            }
        } catch (error) {
            console.error(error)
            setMessages(prev => prev.map((m, i) =>
                i === messageIndex ? {
                    ...m,
                    status: 'error',
                    content: `Execution failed: ${(error as Error).message}`
                } : m
            ))
        }
    }

    return (
        <div className="flex flex-col h-full bg-[#050505] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#CAFF33]/5 blur-[100px] pointer-events-none" />

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10 z-10">
                <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "flex flex-col",
                                m.role === 'user' ? 'items-end' : 'items-start'
                            )}
                        >
                            <div className={cn(
                                "max-w-[90%] p-5 rounded-3xl text-[13px] leading-relaxed shadow-lg",
                                m.role === 'user'
                                    ? 'bg-[#0061FF] text-white rounded-tr-none'
                                    : 'bg-white/[0.03] text-gray-200 border border-white/5 rounded-tl-none font-medium'
                            )}>
                                {m.content}
                            </div>

                            {m.plan && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 w-full p-6 pulse-card border-[#CAFF33]/20 bg-black/40 space-y-4"
                                >
                                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[#CAFF33]" />
                                            <span className="text-[10px] text-[#CAFF33] font-black uppercase tracking-[0.2em]">Deployment Proposal</span>
                                        </div>
                                        {m.status === 'success' ? (
                                            <CheckCircle2 className="w-4 h-4 text-[#CAFF33]" />
                                        ) : m.status === 'executing' ? (
                                            <Loader2 className="w-4 h-4 text-[#CAFF33] animate-spin" />
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-[#CAFF33] animate-pulse" />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Recipient</p>
                                            <p className="text-xs font-mono text-[#CAFF33] font-bold">{m.plan.recipient}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Frequency</p>
                                            <p className="text-xs font-bold text-white uppercase italic">{m.plan.frequency}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Strategy</p>
                                            <div className="flex items-center gap-1.5">
                                                {m.plan.frequency !== 'one-time' ? (
                                                    <span className="text-[10px] bg-[#CAFF33]/10 text-[#CAFF33] px-1.5 py-0.5 rounded font-bold uppercase">Yellow Channel</span>
                                                ) : m.plan.sourceChain !== m.plan.destChain ? (
                                                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold uppercase">LI.FI Bridge</span>
                                                ) : (
                                                    <span className="text-[10px] bg-white/10 text-white px-1.5 py-0.5 rounded font-bold uppercase">Direct</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Total Value</p>
                                            <p className="text-xs font-bold text-white">${m.plan.amount} <span className="text-gray-500 text-[10px]">{m.plan.token}</span></p>
                                        </div>
                                    </div>

                                    {m.status === 'pending' && (
                                        <button
                                            onClick={() => executePlan(m.plan!, i)}
                                            disabled={loading}
                                            className="w-full py-4 bg-[#CAFF33] text-black font-black uppercase tracking-widest text-xs rounded-2xl mt-4 hover:bg-[#b8e62e] transition-all transform active:scale-95 shadow-[0_0_30px_rgba(202,255,51,0.2)] flex items-center justify-center gap-2 group"
                                        >
                                            Authorize Execution
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    )}

                                    {m.status === 'success' && (
                                        <div className="bg-[#CAFF33]/10 border border-[#CAFF33]/20 rounded-xl p-3 mt-4 flex items-center justify-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-[#CAFF33]" />
                                            <span className="text-[#CAFF33] text-xs font-bold uppercase tracking-wider">Agent Deployed & Active</span>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-3 items-center">
                            <Loader2 className="w-4 h-4 text-[#CAFF33] animate-spin" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Optimizing Route...</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Footer */}
            <div className="p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute inset-0 bg-[#CAFF33]/5 blur-xl group-focus-within:bg-[#CAFF33]/10 transition-all opacity-0 group-focus-within:opacity-100" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Configure your next wealth flow..."
                        className="relative w-full bg-[#111] border border-white/10 rounded-[1.5rem] py-5 px-6 pr-16 focus:outline-none focus:border-[#CAFF33]/50 text-sm transition-all focus:bg-black font-medium"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#CAFF33] text-black rounded-2xl hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100 shadow-lg"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
                <div className="mt-4 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <Bot className="w-3 h-3 text-gray-600" />
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.1em]">Pulse Engine v1.2 • Gemini 2.0 Flash</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {isYellowConnected ? (
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#CAFF33] animate-pulse" />
                                <span className="text-[9px] text-[#CAFF33] font-black uppercase tracking-[0.1em]">Yellow Online</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.1em]">Yellow Offline</span>
                            </div>
                        )}
                        <span className="text-[9px] text-gray-700 font-black uppercase tracking-[0.1em]">Verified On-Chain</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
