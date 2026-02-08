'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface PulseLogoProps {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
}

export const PulseLogo = ({ className = "", size = 'md', showText = true }: PulseLogoProps) => {
    const sizeMap = {
        sm: { icon: 28, text: 'text-base' },
        md: { icon: 36, text: 'text-lg' },
        lg: { icon: 48, text: 'text-2xl' }
    }

    const { icon, text } = sizeMap[size]

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Fingerprint/Pulse Logo SVG - Lime Green */}
                <svg
                    width={icon}
                    height={icon}
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                >
                    {/* Outer ring */}
                    <motion.path
                        d="M20 4C10.059 4 2 12.059 2 22"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.path
                        d="M38 22C38 12.059 29.941 4 20 4"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    />
                    {/* Second ring */}
                    <motion.path
                        d="M20 8C12.268 8 6 14.268 6 22"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    />
                    <motion.path
                        d="M34 22C34 14.268 27.732 8 20 8"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                    />
                    {/* Third ring */}
                    <motion.path
                        d="M20 12C14.477 12 10 16.477 10 22"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    />
                    <motion.path
                        d="M30 22C30 16.477 25.523 12 20 12"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                    />
                    {/* Inner ring */}
                    <motion.path
                        d="M20 16C16.686 16 14 18.686 14 22"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    />
                    <motion.path
                        d="M26 22C26 18.686 23.314 16 20 16"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                    />
                    {/* Center dot */}
                    <motion.circle
                        cx="20"
                        cy="22"
                        r="2"
                        fill="#CAFF33"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    />
                </svg>
            </motion.div>

            {showText && (
                <span className={`font-semibold ${text} tracking-tight text-[#CAFF33]`}>
                    PulseRemit
                </span>
            )}
        </div>
    )
}
