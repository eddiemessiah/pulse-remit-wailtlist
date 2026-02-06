'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Loader2, CheckCircle2, Bot } from 'lucide-react'
import { parseRemittanceRequest } from '@/services/ai'
import { AIPlanningResponse } from '@/types'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
    onAgentCreated: (plan: AIPlanningResponse) => void
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAgentCreated }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; plan?: AIPlanningResponse }[]>([
        { role: 'assistant', content: "Hello! I'm Pulse AI. Tell me what you want to do, e.g., 'Send $50 to aisha.ens every Friday from Base'." }
    ])
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

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
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `Optimal path found. I'll bridge USDC via LI.FI from ${plan.sourceChain} to ${plan.destChain} and execute a ${plan.frequency} payment of $${plan.amount} to ${plan.recipient}.`,
                    plan
                }])
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "I couldn't quite parse that path. Could you specify the amount, recipient, and chains?" }])
            }
        } catch (err) {
            setLoading(false)
            setMessages(prev => [...prev, { role: 'assistant', content: "Sync error. Please try again." }])
        }
    }

    return (
        <div className="flex flex-col h-full bg-[#050505] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00FF88]/5 blur-[100px] pointer-events-none" />

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
                                    className="mt-4 w-full p-6 pulse-card border-[#00FF88]/20 bg-black/40 space-y-4"
                                >
                                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[#00FF88]" />
                                            <span className="text-[10px] text-[#00FF88] font-black uppercase tracking-[0.2em]">Deployment Proposal</span>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Recipient</p>
                                            <p className="text-xs font-mono text-[#00FF88] font-bold">{m.plan.recipient}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Frequency</p>
                                            <p className="text-xs font-bold text-white uppercase italic">{m.plan.frequency}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Bridge Path</p>
                                            <p className="text-xs font-bold text-white">{m.plan.sourceChain} <span className="text-gray-600">→</span> {m.plan.destChain}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Optimizer</p>
                                            <p className="text-xs font-bold text-white">LI.FI v2.4</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onAgentCreated(m.plan!)}
                                        className="w-full py-4 bg-[#00FF88] text-black font-black uppercase tracking-widest text-xs rounded-2xl mt-4 hover:bg-[#00D16F] transition-all transform active:scale-95 shadow-[0_0_30px_rgba(0,255,136,0.2)]"
                                    >
                                        Authorize Execution
                                    </button>
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
                            <Loader2 className="w-4 h-4 text-[#00FF88] animate-spin" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Generating Path...</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Footer */}
            <div className="p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute inset-0 bg-[#00FF88]/5 blur-xl group-focus-within:bg-[#00FF88]/10 transition-all opacity-0 group-focus-within:opacity-100" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Configure your next wealth flow..."
                        className="relative w-full bg-[#111] border border-white/10 rounded-[1.5rem] py-5 px-6 pr-16 focus:outline-none focus:border-[#00FF88]/50 text-sm transition-all focus:bg-black font-medium"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#00FF88] text-black rounded-2xl hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100 shadow-lg"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
                <div className="mt-4 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <Bot className="w-3 h-3 text-gray-600" />
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.1em]">Pulse Engine v1.2</span>
                    </div>
                    <span className="text-[9px] text-gray-700 font-black uppercase tracking-[0.1em]">Verified On-Chain</span>
                </div>
            </div>
        </div>
    )
}
