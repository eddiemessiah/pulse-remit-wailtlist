'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export const PulseLogo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF88] to-[#0061FF] flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                />
                <Zap className="w-6 h-6 text-white fill-white" />
                <motion.div
                    className="absolute -inset-1 bg-white/30 blur-2xl rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
            <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    PULSE<span className="text-[#00FF88]">REMIT</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Agentic Finance</span>
            </div>
        </div>
    )
}
