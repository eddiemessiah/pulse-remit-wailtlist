'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Shield,
  Zap,
  Globe,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  Wallet,
  CheckCircle2,
  Users,
  Lock,
  Sparkles,
} from 'lucide-react'
import { PulseLogo } from '@/components/shared/PulseLogo'
import { DashboardPreview } from '@/components/landing/DashboardPreview'
import { AbstractArrows } from '@/components/landing/AbstractArrows'
import { ActiveAgentsCard } from '@/components/landing/ActiveAgentsCard'

// Brand Color
const BRAND_GREEN = '#CAFF33'

// FAQ Data
const faqs = [
  {
    question: 'What is PulseRemit?',
    answer: 'PulseRemit is an AI-powered, agentic remittance platform that automates cross-border money transfers. Using natural language, you can set up recurring payments, hedge against currency volatility, and send money globally with minimal fees.'
  },
  {
    question: 'How do Agents work?',
    answer: 'Agents are autonomous programs that execute your financial instructions automatically. Simply tell PulseRemit what you want (e.g., "Send $50 to family.eth every Friday"), and an agent will handle bridging, routing, and execution without any further action from you.'
  },
  {
    question: 'Which chains are supported?',
    answer: 'PulseRemit supports Ethereum, Base, Optimism, Polygon, and Arbitrum. We use LI.FI for optimal cross-chain routing, ensuring the best rates and fastest settlement times across networks.'
  },
  {
    question: 'Is my money secure?',
    answer: 'Absolutely. PulseRemit uses non-custodial smart contracts, meaning you always retain control of your funds. All transactions are verified on-chain, and we leverage Circle\'s USDC for stable value transfers.'
  },
]

// Steps Data
const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Link your Web3 wallet securely using RainbowKit. We support MetaMask, Coinbase Wallet, WalletConnect, and more.'
  },
  {
    icon: Bot,
    title: 'Describe Your Need',
    description: 'Tell Pulse AI what you want in plain English: "Send $200 to mom.eth every month from Base"'
  },
  {
    icon: Sparkles,
    title: 'Agent Deploys',
    description: 'Our AI parses your request, finds optimal routes via LI.FI, and creates an autonomous agent to handle everything.'
  },
  {
    icon: CheckCircle2,
    title: 'Automatic Execution',
    description: 'Your agent executes transfers automatically on schedule. Track progress, pause, or modify anytime from your dashboard.'
  },
]

// Features Data
const features = [
  {
    icon: Bot,
    title: 'AI-Powered Agents',
    description: 'Deploy autonomous agents that understand natural language and execute complex financial logic automatically.',
    color: BRAND_GREEN,
    bgColor: 'bg-[#CAFF33]/10'
  },
  {
    icon: Shield,
    title: 'Volatility Protection',
    description: 'Smart hedging agents monitor currency pairs and automatically protect your wealth from devaluations.',
    color: '#60A5FA',
    bgColor: 'bg-blue-400/10'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Send to 190+ countries using local off-ramps and stablecoins. Human-readable ENS names, no hex addresses.',
    color: '#A78BFA',
    bgColor: 'bg-purple-400/10'
  },
  {
    icon: Zap,
    title: 'Gasless Transfers',
    description: 'Yellow Network integration enables instant, gasless recurring payments through state channels.',
    color: '#FBBF24',
    bgColor: 'bg-yellow-400/10'
  },
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'Your funds, your control. Smart contracts ensure transparent, verifiable execution without intermediaries.',
    color: '#F472B6',
    bgColor: 'bg-pink-400/10'
  },
  {
    icon: Users,
    title: 'ENS Integration',
    description: 'Send money to human-readable names. No more copying long hex addresses—just use name.eth.',
    color: '#22D3EE',
    bgColor: 'bg-cyan-400/10'
  },
]

// Partners Data
const partners = [
  { name: 'Circle Arc', logo: '◉' },
  { name: 'LI.FI', logo: '◈' },
  { name: 'Yellow', logo: '◆' },
  { name: 'ENS', logo: '◎' },
  { name: 'Base', logo: '▣' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white overflow-x-hidden selection:bg-[#CAFF33]/30">
      {/* Dot Pattern Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <PulseLogo />

          {/* Desktop Nav - Center */}
          <div className="hidden md:flex items-center gap-1 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-full px-2 py-1.5 border border-[#2A2A2A]">
            <Link href="#" className="px-5 py-2 text-sm font-medium text-white hover:text-[#CAFF33] transition-colors rounded-full hover:bg-white/5">
              Home
            </Link>
            <Link href="#features" className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-[#CAFF33] transition-colors rounded-full hover:bg-white/5">
              Network
            </Link>
            <Link href="#how-it-works" className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-[#CAFF33] transition-colors rounded-full hover:bg-white/5">
              Security
            </Link>
          </div>

          {/* Desktop Nav - Right */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 bg-[#CAFF33] text-black font-semibold rounded-full hover:bg-[#b8e62e] transition-all transform hover:scale-105 text-sm"
            >
              Launch App
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl mt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2 p-4">
                <Link href="#" className="text-white hover:text-[#CAFF33] py-3 px-4 rounded-xl hover:bg-white/5">Home</Link>
                <Link href="#features" className="text-gray-400 hover:text-[#CAFF33] py-3 px-4 rounded-xl hover:bg-white/5">Network</Link>
                <Link href="#how-it-works" className="text-gray-400 hover:text-[#CAFF33] py-3 px-4 rounded-xl hover:bg-white/5">Security</Link>
                <hr className="border-[#2A2A2A] my-2" />
                <Link href="/dashboard" className="px-6 py-3 bg-[#CAFF33] text-black font-semibold rounded-full text-center">
                  Launch App
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-6 lg:px-12 min-h-screen">
        <div className="max-w-7xl mx-auto w-full">
          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10 pt-8"
            >
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] mb-8">
                <span className="w-2 h-2 rounded-full bg-[#CAFF33] animate-pulse" />
                <span className="text-gray-300 text-sm font-medium">Live Network Alpha</span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
                One <span className="text-[#CAFF33]">Wallet</span> for{' '}
                <br />
                all <span className="text-[#CAFF33]">Global</span> Flows.
              </h1>

              {/* Description */}
              <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
                Deploy intelligent agents that understand natural language, monitor currency volatility, execute compliance checks, and optimize routing—all autonomously.
              </p>

              {/* CTA Button */}
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#CAFF33] text-black font-semibold rounded-full hover:bg-[#b8e62e] transition-all text-base"
              >
                Deploy Agent
              </Link>

              {/* Dashed Line Separator (visible on larger screens) */}
              <div className="hidden lg:block absolute left-1/2 top-32 bottom-20 w-px border-l-2 border-dashed border-[#2A2A2A]" />
            </motion.div>

            {/* Right Side - Dashboard Preview + Abstract Arrows */}
            <motion.div
              className="relative lg:pl-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Abstract Arrows Background */}
              <div className="absolute inset-0 -right-20 -top-10 pointer-events-none">
                <AbstractArrows />
              </div>

              {/* Dashboard Preview */}
              <div className="relative z-10">
                <DashboardPreview />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For the Next Billion Section */}
      <section className="py-24 px-6 lg:px-12 border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              For the next <span className="text-[#CAFF33]">Billion</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Remittances should be instant, cheap, and smart. We're building for emerging markets where every dollar counts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Bot, title: 'Set, Forget, Flow', desc: 'Deploy agents that work 24/7, even when you sleep.' },
              { icon: Shield, title: 'Zero-Knowledge Privacy', desc: 'Your identity stays private. Compliance without exposure.' },
              { icon: Zap, title: 'L2 Efficiency', desc: 'Gas fees near zero. Faster than bank wires.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#CAFF33]/10 flex items-center justify-center border border-[#CAFF33]/20">
                  <item.icon className="w-8 h-8 text-[#CAFF33]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Execute in 4 simple <span className="text-[#CAFF33]">Steps</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              From connecting your wallet to automated execution, we've simplified global remittances.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#CAFF33]/30 transition-all group"
              >
                <div className="w-12 h-12 mb-6 rounded-xl bg-[#CAFF33]/10 flex items-center justify-center group-hover:bg-[#CAFF33] transition-all border border-[#CAFF33]/20 group-hover:border-[#CAFF33]">
                  <step.icon className="w-6 h-6 text-[#CAFF33] group-hover:text-black transition-colors" />
                </div>
                <div className="text-[#CAFF33] text-sm font-semibold mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CAFF33]/10 border border-[#CAFF33]/20 text-[#CAFF33] text-xs font-medium mb-6">
                <Sparkles className="w-3 h-3" />
                Intelligent Dashboard
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight text-white">
                Your Active Agents,<br />Always Working
              </h2>
              <p className="text-gray-500 text-lg">
                Monitor all your automated remittances in one place. See real-time status,
                savings, and upcoming transfers at a glance.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Real-time agent status monitoring',
                'Automatic volatility hedging alerts',
                'Cross-chain transfer tracking',
                'ENS-powered recipient management'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#CAFF33]" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <ActiveAgentsCard />
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Core <span className="text-[#CAFF33]">Features</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Built with cutting-edge Web3 technology for the most advanced remittance experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all group cursor-default"
              >
                <div
                  className={`w-14 h-14 mb-6 rounded-2xl ${feature.bgColor} flex items-center justify-center border`}
                  style={{ borderColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 lg:px-12 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Frequently Asked <span className="text-[#CAFF33]">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-lg text-white">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#CAFF33] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-[#CAFF33]/10 to-transparent border border-[#CAFF33]/20 p-12 md:p-16 text-center overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#CAFF33]/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Deploy your financial agent with{' '}
                <span className="text-[#CAFF33]">PulseRemit</span> today!
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Join the next generation of cross-border finance. Set up your first agent in under 2 minutes.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#CAFF33] text-black font-semibold rounded-full hover:bg-[#b8e62e] transition-all text-lg shadow-[0_0_60px_rgba(202,255,51,0.3)]"
              >
                Launch App
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-6 lg:px-12 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-600 text-sm font-medium mb-10 uppercase tracking-widest">
            Powered By
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
            {partners.map((partner, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl text-[#CAFF33]">{partner.logo}</span>
                <span className="text-lg font-bold tracking-tight text-white">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0B0B] border-t border-[#1A1A1A] pt-16 pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <PulseLogo />
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Automating global wealth flows through the power of AI agents.
                Built for the next billion users.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center hover:border-[#CAFF33]/30 transition-all">
                  <Twitter className="w-4 h-4 text-gray-400" />
                </a>
                <a href="https://github.com/ETHGlobal-Hackathon/PulseRemit" className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center hover:border-[#CAFF33]/30 transition-all">
                  <Github className="w-4 h-4 text-gray-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center hover:border-[#CAFF33]/30 transition-all">
                  <Linkedin className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Product</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Dashboard</li>
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Agents</li>
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Analytics</li>
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">API</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Whitepaper</li>
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">GitHub</li>
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Discord</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-[#CAFF33] cursor-pointer transition-colors">Cookie Policy</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#1A1A1A] pt-8">
            <p className="text-xs text-gray-600">
              © 2026 PulseRemit Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {/* Supported Assets Pill */}
              <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-2">
                <span className="text-gray-500 text-xs">Supported Assets</span>
                <div className="flex items-center gap-1">
                  {['$', '€', '₿', 'Ξ'].map((symbol, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#CAFF33] text-xs font-bold">
                      {symbol}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
