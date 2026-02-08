'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Bot,
    History,
    BarChart3,
    Settings,
    Wallet,
    Globe,
    Plus,
    X,
    Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PulseLogo } from '@/components/shared/PulseLogo'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Bot, label: 'My Agents', href: '/dashboard/agents' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Globe, label: 'Global Flows', href: '/dashboard/flows' },
]

const subMenuItems = [
    { icon: Wallet, label: 'Wallets', href: '/dashboard/wallets' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export const Sidebar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <PulseLogo className="mb-12" />

            <button className="w-full py-4 mb-8 bg-[#CAFF33] text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#b8e62e] transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(202,255,51,0.2)]">
                <Plus className="w-5 h-5" />
                New Agent
            </button>

            <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 px-3">Main Menu</p>
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
                            pathname === item.href
                                ? "bg-white/5 text-[#CAFF33]"
                                : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                        )}
                    >
                        {pathname === item.href && (
                            <motion.div
                                layoutId="sidebar-active"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-[#CAFF33] rounded-r-full"
                            />
                        )}
                        <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-[#CAFF33]" : "group-hover:scale-110 transition-transform")} />
                        <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-8 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 px-3">Account</p>
                {subMenuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                            pathname === item.href
                                ? "bg-white/5 text-[#CAFF33]"
                                : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    </Link>
                ))}

                <div className="mt-8 p-5 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-white/5">
                    <p className="text-xs font-bold text-white mb-1">Elite Status</p>
                    <p className="text-[10px] text-gray-500 font-bold mb-3 leading-tight uppercase tracking-widest">Fee Savings: $840</p>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-[#CAFF33] shadow-[0_0_10px_#CAFF33]" />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex w-72 h-screen border-r border-white/5 bg-[#050505] flex-col p-8 fixed left-0 top-0 z-50">
                <SidebarContent />
            </div>

            {/* Mobile Header with Hamburger */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 px-6 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-[60]">
                <PulseLogo />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#050505] border-r border-white/10 p-8 z-[80] lg:hidden overflow-y-auto"
                        >
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
