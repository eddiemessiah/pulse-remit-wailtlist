'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    User,
    Settings,
    Shield,
    Bell,
    Smartphone,
    Globe,
    Wallet,
    CheckCircle2,
    ChevronRight,
    Fingerprint
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Preferences</h1>
                <p className="text-gray-500 mt-1">Configure your identity and guardian security settings.</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Card */}
                <div className="pulse-card p-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#CAFF33] to-[#0061FF] flex items-center justify-center border-2 border-white/20 relative">
                            <User className="w-10 h-10 text-white" />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-emerald-500 border-2 border-[#141414] flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold">Pulse User #71C</h2>
                            <p className="text-[#CAFF33] font-mono font-bold text-sm">pulse.ens</p>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400 font-bold uppercase border border-white/5">
                                    <Wallet className="w-3 h-3" />
                                    0x71C...4E2
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400 font-bold uppercase border border-white/5">
                                    <Shield className="w-3 h-3" />
                                    KYC Level 2
                                </div>
                            </div>
                        </div>
                        <button className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-all">
                            Edit Identity
                        </button>
                    </div>
                </div>

                {/* Settings Sections */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold px-2">General Settings</h3>
                        {[
                            { label: 'Guardian Notifications', icon: Bell, status: 'Enabled' },
                            { label: 'Language & Locale', icon: Globe, status: 'English (US)' },
                            { label: 'Mobile App Sync', icon: Smartphone, status: 'Connected' },
                        ].map((item, i) => (
                            <button key={i} className="w-full p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                                <div className="flex items-center gap-4 text-gray-400 group-hover:text-white transition-colors">
                                    <div className="p-2.5 rounded-xl bg-white/5">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-sm text-left">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">{item.status}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400" />
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold px-2">Security & Privacy</h3>
                        {[
                            { label: 'MPC Wallet Settings', icon: Shield, status: 'Hardware Verified' },
                            { label: 'Transaction Signing', icon: Fingerprint, status: 'FaceID' },
                            { label: 'API Connection', icon: Settings, status: 'Read/Write' },
                        ].map((item, i) => (
                            <button key={i} className="w-full p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                                <div className="flex items-center gap-4 text-gray-400 group-hover:text-white transition-colors">
                                    <div className="p-2.5 rounded-xl bg-white/5">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-sm text-left">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">{item.status}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-6 p-8 rounded-3xl bg-red-500/5 border border-red-500/10">
                    <div className="flex justify-between items-center text-red-500">
                        <div>
                            <h4 className="font-bold">Deactivate All Agents</h4>
                            <p className="text-xs text-red-500/60 mt-1">This will pause every active guardian bot immediately.</p>
                        </div>
                        <button className="px-6 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 font-bold rounded-xl text-sm hover:bg-red-500/20 transition-all">
                            Killswitch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
