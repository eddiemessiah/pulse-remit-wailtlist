'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const partners = [
    { name: 'Circle Arc', logo: '/images/partners/arc.svg', width: 120, height: 40 },
    { name: 'LI.FI', logo: '/images/partners/lifi.svg', width: 100, height: 40 },
    { name: 'Yellow', logo: '/images/partners/yellow.svg', width: 120, height: 40 },
    { name: 'ENS', logo: '/images/partners/ens.svg', width: 100, height: 40 },
    { name: 'Base', logo: '/images/partners/base.svg', width: 110, height: 40 },
]

export const PoweredBy = () => {
    return (
        <section className="py-16 px-6 lg:px-12 border-t border-[#1A1A1A]">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold text-white mb-12 tracking-tight"
                >
                    Powered By
                </motion.h3>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                        >
                            <div className="h-10 md:h-12 relative flex items-center justify-center">
                                <Image
                                    src={partner.logo}
                                    alt={`${partner.name} logo`}
                                    width={0}
                                    height={0}
                                    className="h-full w-auto object-contain"
                                    unoptimized // for SVGs usually safer
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
