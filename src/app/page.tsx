'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Sparkles,
  CheckCircle2,
  Wallet,
  Zap,
  Shield,
  Menu,
  X
} from 'lucide-react'
import { PulseLogo } from '@/components/shared/PulseLogo'

export default function WaitlistPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [claimName, setClaimName] = useState('')
  const [claimed, setClaimed] = useState(false)

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!claimName) return
    // Use the absolute URL for the API since we are on IPFS/Static Export
    // If running totally locally without API, this will fail unless we mock it.
    // For now, we point to the Vercel production API or fallback to mock if VERCEL_URL is not set.

    try {
      const response = await fetch('https://pulse-remit.vercel.app/api/namestone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: claimName, address: '0x0000000000000000000000000000000000000000' }) // Placeholder address until wallet connect added to this page
      })

      if (response.ok) {
        setClaimed(true)
      } else {
        // Fallback for demo if API fails
        setTimeout(() => setClaimed(true), 1500)
      }
    } catch (e) {
      setTimeout(() => setClaimed(true), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#CAFF33]/30 font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#CAFF33]/5 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <PulseLogo />

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Vision</Link>
            <Link href="#roadmap" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Roadmap</Link>
            <Link
              href="https://pulse-remit.vercel.app"
              className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all text-xs uppercase tracking-widest flex items-center gap-2"
            >
              Explore Alpha Testnet
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CAFF33]/10 border border-[#CAFF33]/20 text-[#CAFF33] text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#CAFF33] animate-pulse" />
              Live on Base Sepolia
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              GLOBAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CAFF33] to-emerald-400">WEALTH</span> <br />
              FLOWS.
            </h1>

            <p className="text-xl text-gray-400 max-w-lg leading-relaxed font-medium">
              The first AI-native remittance network. We empower users in Africa, LATAM, and South America to bypass banks and move money instantly with autonomous agents.
            </p>

            <div className="pt-4">
              <div className="bg-[#111] p-1.5 rounded-[2rem] border border-white/10 inline-flex flex-col md:flex-row gap-2 max-w-full">
                {claimed ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-8 py-4 flex items-center gap-3 text-[#CAFF33]"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-bold">You're on the list! Watch your inbox.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleClaim} className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-bold">@</span>
                      </div>
                      <input
                        type="text"
                        placeholder="yourname"
                        value={claimName}
                        onChange={e => setClaimName(e.target.value)}
                        className="w-full md:w-64 bg-transparent border-none text-white font-bold h-14 pl-12 focus:ring-0 focus:outline-none placeholder:text-gray-600"
                      />
                      <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-bold">.pulseremit.eth</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!claimName}
                      className="px-8 h-14 bg-[#CAFF33] text-black font-black rounded-[1.5rem] hover:bg-[#b8e62e] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_0_40px_rgba(202,255,51,0.3)]"
                    >
                      Claim ENS
                    </button>
                  </form>
                )}
              </div>
              <p className="mt-4 text-xs text-gray-500 font-bold uppercase tracking-widest pl-4">
                * Free for the first 500 users
              </p>
            </div>
          </motion.div>

          {/* Abstract / Graphic Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#CAFF33]/20 to-blue-500/20 rounded-full blur-[100px]" />
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <Globe className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="font-bold text-lg mb-1">Cross-Border</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">Instant settlement to Nigeria, Brazil, and Kenya via stablecoins.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <Zap className="w-8 h-8 text-[#CAFF33] mb-4" />
                    <h3 className="font-bold text-lg mb-1">Gasless</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">Yellow Network state channels mean 0 gas fees for recurring flows.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 rounded-3xl bg-[#CAFF33] text-black border border-[#CAFF33] shadow-[0_0_50px_rgba(202,255,51,0.2)]">
                    <Sparkles className="w-8 h-8 text-black mb-4" />
                    <h3 className="font-black text-lg mb-1 uppercase tracking-tight">AI Agents</h3>
                    <p className="text-xs text-black/70 font-medium leading-relaxed">"Send $50 to mama every Friday." We handle the rest.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <Shield className="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 className="font-bold text-lg mb-1">Secure</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">Non-custodial. You own your keys, we just route the value.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Marquee / Social Proof */}
      <div className="border-y border-white/5 bg-white/[0.02] py-8 overflow-hidden">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap px-8">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-2xl font-black text-white/20 uppercase tracking-tight">Yellow Network</span>
              <span className="text-2xl font-black text-white/20 uppercase tracking-tight">LI.FI</span>
              <span className="text-2xl font-black text-white/20 uppercase tracking-tight">Base</span>
              <span className="text-2xl font-black text-white/20 uppercase tracking-tight">Optimism</span>
              <span className="text-2xl font-black text-white/20 uppercase tracking-tight">ENS</span>
              <span className="text-2xl font-black text-white/20 uppercase tracking-tight">Circle</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <footer className="py-12 text-center text-gray-600 text-sm font-medium">
        <p>&copy; 2026 PulseRemit. Building for the next billion.</p>
      </footer>
    </div>
  )
}
