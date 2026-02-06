'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Shield,
  Zap,
  Globe,
  Coins,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Github,
  Twitter,
  Navigation,
  ShieldCheck
} from 'lucide-react'
import { PulseSphere } from '@/components/shared/PulseSphere'
import { PulseLogo } from '@/components/shared/PulseLogo'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-[#00FF88]/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <PulseLogo />
        <div className="hidden md:flex items-center gap-10">
          <Link href="#features" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#00FF88] transition-colors">Network</Link>
          <Link href="#impact" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#00FF88] transition-colors">Identity</Link>
          <Link href="#how-it-works" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#00FF88] transition-colors">Guardians</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Login</Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#00FF88] text-black font-extrabold rounded-full hover:bg-[#00D16F] transition-all transform hover:scale-105 text-sm"
          >
            Launch Hub
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-[10px] font-bold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
              Live Network Alpha
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.9] mb-10 tracking-[-0.04em] font-display">
              ONE WALLET FOR <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">ALL GLOBAL FLOWS.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl leading-relaxed">
              PulseRemit leverages autonomous agents to automate cross-border wealth.
              Zero friction, ultra-low fees, and built-in volatility hedging.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="px-10 py-5 bg-[#00FF88] text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-[#00D16F] transition-all group text-lg shadow-[0_0_40px_rgba(0,255,136,0.2)]"
              >
                Access Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                Read Whitepaper
              </button>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[500px] lg:h-[700px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] bg-[#00FF88]/20 blur-[150px] rounded-full pointer-events-none" />
            <PulseSphere />

            {/* Floating Visual Elements - Improved */}
            <motion.div
              className="absolute top-10 -left-4 md:-left-20 p-5 pulse-card max-w-[240px]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Protection</p>
                  <p className="text-xs font-bold text-emerald-500">Active</p>
                </div>
              </div>
              <p className="text-lg font-bold tracking-tight mb-1">Volatility Shield</p>
              <p className="text-[10px] text-gray-500 leading-tight">Preserving value in 32 emerging markets automatically.</p>
            </motion.div>

            <motion.div
              className="absolute bottom-10 -right-4 md:-right-20 p-5 pulse-card max-w-[240px]"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00FF88]/20 flex items-center justify-center text-[#00FF88]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Automation</p>
                  <p className="text-xs font-bold">Pulse Agent #042</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#00FF88]" animate={{ width: ['0%', '100%', '100%'] }} transition={{ duration: 3, repeat: Infinity }} />
                </div>
                <p className="text-[10px] font-bold text-[#00FF88] flex items-center justify-between uppercase tracking-widest">
                  <span>Routing Flow</span>
                  <span>1.2s</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] w-full text-center mb-10">Powering Global Connectivity</h3>
          <div className="flex flex-wrap justify-center gap-16 w-full grayscale contrast-125">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/10" /><span className="text-lg font-black tracking-tighter">CIRCLE ARC</span></div>
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/10" /><span className="text-lg font-black tracking-tighter">BASE L2</span></div>
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/10" /><span className="text-lg font-black tracking-tighter">LI.FI v2</span></div>
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/10" /><span className="text-lg font-black tracking-tighter">ENS ECO</span></div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight font-display italic">DESIGNED FOR THE NEXT <span className="text-[#00FF88]">BILLION</span>.</h2>
              <p className="text-xl text-gray-500">PulseRemit isn't just a wallet. It's an autonomous financial nervous system.</p>
            </div>
            <Link href="/dashboard" className="flex items-center gap-4 group">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Explore Network</span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: 'Guardian Agents',
                desc: 'Set logical parameters like "Protect my savings during USD/NGN swings" and let Pulse execute.',
                color: 'group-hover:text-[#00FF88]'
              },
              {
                icon: Shield,
                title: 'Zero-Knowledge Privacy',
                desc: 'Your identity is yours. We use advanced ZK proofs to ensure compliance without exposure.',
                color: 'group-hover:text-blue-500'
              },
              {
                icon: Globe,
                title: 'Global Rails',
                desc: 'Send wealth to 190+ countries using local off-ramps, USDC, and L2 native efficiency.',
                color: 'group-hover:text-purple-500'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="p-10 pulse-card group hover:border-white/20 transition-all cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <feature.icon className={cn("w-12 h-12 mb-8 transition-colors duration-500", feature.color)} />
                <h3 className="text-2xl font-bold mb-4 tracking-tight font-display">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact / Mobile Mockup Section */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none font-display text-gradient">
              FINANCE WITHOUT <br />THE FRICTION.
            </h2>
            <div className="space-y-8">
              {[
                { title: 'ENS Managed', desc: 'No more hex strings. Reach recipients via human names.' },
                { title: 'Auto-Hedging', desc: 'Agents keep your assets stable across 32 local currencies.' },
                { title: 'L2 Efficiency', desc: 'Gas fees that are practically zero. Faster than wires.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00FF88] group-hover:text-black transition-all">
                    <CheckCircle2 className="w-5 h-5 font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-zinc-800 to-black rounded-[60px] border-8 border-zinc-900 shadow-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-10 bg-zinc-900/50 flex items-center justify-center">
                <div className="w-20 h-4 bg-black rounded-full" />
              </div>
              {/* Inner Mobile Mockup Content */}
              <div className="w-full h-full p-8 flex flex-col gap-6 pt-16">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 text-center">Active Agents</p>
                  <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#00FF88]/20 flex items-center justify-center text-[#00FF88]"><Bot className="w-4 h-4" /></div>
                      <span className="font-bold text-xs tracking-tight">Family Support</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-400">CHIDI.ENS</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <h5 className="text-4xl font-black font-display tracking-tight">$125,640</h5>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Global Assets Secured</p>
                  <div className="flex gap-4 w-full px-4">
                    <div className="flex-1 py-3 bg-[#00FF88] rounded-xl text-black text-[10px] font-black uppercase tracking-widest">Send</div>
                    <div className="flex-1 py-3 bg-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest">Swap</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Glow */}
            <div className="absolute -inset-10 bg-[#00FF88]/10 blur-3xl -z-10 rounded-full" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 space-y-8">
              <PulseLogo />
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-medium">
                Automating the world's wealth flows through the power of Agentic AI. Join the frontier of finance.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all"><Twitter className="w-4 h-4" /></div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all"><Github className="w-4 h-4" /></div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all"><Navigation className="w-4 h-4" /></div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Ecosystem</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-white cursor-pointer transition-colors">L2 Networks</li>
                <li className="hover:text-white cursor-pointer transition-colors">Identity ENS</li>
                <li className="hover:text-white cursor-pointer transition-colors">API Keys</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Vision</li>
                <li className="hover:text-white cursor-pointer transition-colors">Analytics</li>
                <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Newsletter</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#00FF88]/40"
                />
                <button className="absolute right-2 top-1.5 p-1.5 bg-[#00FF88] text-black rounded-lg"><ArrowRight className="w-4 h-4" /></button>
              </div>
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
                By subscribing you agree to our Terms and conditions of Alpha testing.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-10">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">© 2026 PULSE REMIT LABS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Terms of Flow</span>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
