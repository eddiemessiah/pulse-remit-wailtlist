'use client'

import React from 'react'
import { motion } from 'framer-motion'

/**
 * Abstract Arrows Component
 * Decorative arrows pointing up-right in lime green (#CAFF33)
 */
export const AbstractArrows = () => {
    return (
        <div className="relative w-full h-full min-h-[400px]">
            {/* Large arrow - top right */}
            <motion.div
                className="absolute top-0 right-0"
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <path
                        d="M20 100L100 20M100 20H40M100 20V80"
                        stroke="#CAFF33"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            {/* Medium arrow - top left area */}
            <motion.div
                className="absolute top-20 left-10"
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 0.4, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <path
                        d="M10 50L50 10M50 10H20M50 10V40"
                        stroke="#CAFF33"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                    />
                </svg>
            </motion.div>

            {/* Large arrow with gradient - center */}
            <motion.div
                className="absolute top-1/3 left-1/4"
                initial={{ opacity: 0, x: 40, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                    <defs>
                        <linearGradient id="arrowGradient1" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#CAFF33" stopOpacity="0" />
                            <stop offset="100%" stopColor="#CAFF33" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M20 120L120 20M120 20H50M120 20V90"
                        stroke="url(#arrowGradient1)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            {/* Small arrow - bottom center */}
            <motion.div
                className="absolute bottom-1/3 left-1/3"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 0.6, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path
                        d="M8 42L42 8M42 8H16M42 8V34"
                        stroke="#CAFF33"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            {/* Medium arrow with fade - right side */}
            <motion.div
                className="absolute top-1/2 right-1/4"
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 0.8, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <defs>
                        <linearGradient id="arrowGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#CAFF33" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#CAFF33" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M12 68L68 12M68 12H28M68 12V52"
                        stroke="url(#arrowGradient2)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            {/* Tiny arrow - scattered */}
            <motion.div
                className="absolute bottom-1/4 right-1/3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path
                        d="M5 25L25 5M25 5H10M25 5V20"
                        stroke="#CAFF33"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            {/* Extra large faded arrow - background */}
            <motion.div
                className="absolute -top-10 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    <defs>
                        <linearGradient id="arrowGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#CAFF33" stopOpacity="0" />
                            <stop offset="100%" stopColor="#CAFF33" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M30 170L170 30M170 30H70M170 30V130"
                        stroke="url(#arrowGradient3)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </div>
    )
}
