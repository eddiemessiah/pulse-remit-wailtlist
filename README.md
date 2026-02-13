# 🌐 PulseRemit - Agentic Remittance Hub

<div align="center">

![PulseRemit Logo](public/logo.svg)

**AI-Powered Cross-Border Remittances for the Next Billion**

[![ETHGlobal HackMoney 2026](https://img.shields.io/badge/ETHGlobal-HackMoney%202026-00FF88?style=for-the-badge)](https://ethglobal.com)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

[🚀 Live Demo](https://pulseremit.vercel.app) | [📹 Demo Video](https://youtube.com/watch?v=xxx) | [📄 Whitepaper](docs/whitepaper.md)

</div>

---

## 🎯 Problem Statement

Cross-border remittances to emerging markets (especially Africa) are plagued by:
- **High fees**: Traditional services charge 5-10% per transfer
- **Slow settlement**: 2-5 business days is the norm
- **Currency volatility**: Value erosion during transit
- **Repetitive manual processes**: Users must initiate each transfer manually

## 💡 Solution

PulseRemit leverages **autonomous AI agents** to automate global wealth movements:

- 🤖 **Natural Language Agents**: Tell Pulse AI "Send $50 to family.eth every Friday" and it handles everything
- ⚡ **Gasless Recurring Payments**: Yellow Network state channels enable instant, gas-free micro-payments
- 🔄 **Cross-Chain Bridging**: LI.FI integration for optimal routing across Ethereum, Base, Optimism, Polygon
- 🛡️ **Volatility Protection**: Automatic hedging agents protect against currency devaluations
- 👤 **ENS Identity**: Human-readable addresses—send to `name.eth`, not `0x...`

---

## 🏆 Bounty Targets

| Sponsor | Bounty | Integration |
|---------|--------|-------------|
| **Yellow Network** | $15,000 | State channels for gasless recurring remittances |
| **Circle Arc** | $10,000 | USDC programmable wallets + CCTP |
| **LI.FI** | $6,000 | Cross-chain bridging & swaps |
| **ENS** | $5,000 | Human-readable identity integration |

---

## ✨ Key Features

### 🤖 Guardian Agents
Deploy autonomous agents that execute complex financial logic:
- Scheduled recurring transfers
- Volatility-triggered swaps
- Multi-recipient batch payments

### 🛡️ Volatility Shield
AI-powered hedging that:
- Monitors 32+ currency pairs
- Auto-converts on devaluation thresholds
- Preserves purchasing power

### 🌍 Global Coverage
- 190+ countries via local off-ramps
- ENS-powered recipient addressing
- L2 efficiency with near-zero fees

### ⚡ Yellow Gasless Flow
- Open state channel once
- Unlimited off-chain transfers
- Settle on-chain only when needed

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Framer Motion** (Animations)
- **Three.js** (3D Effects)
- **RainbowKit + Wagmi** (Web3)

### AI/Agent Logic
- **Google Gemini 1.5 Flash** (NL Processing & Intent Parsing)
- **Viem + Wagmi** (Agent Execution & On-chain Interactions)

### Blockchain
- **Viem** (EVM Interactions)
- **LI.FI SDK** (Bridging)
- **Yellow Nitrolite** (State Channels)
- **Circle Web SDK** (USDC)
- **ENS.js** (Name Resolution)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm or npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ETHGlobal-Hackathon/PulseRemit.git
cd PulseRemit
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
# or
pnpm install
```

3. **Configure environment**
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
pulse-remit/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Main dashboard
│   │   │   ├── agents/        # Agent management
│   │   │   ├── flows/         # Transfer flows
│   │   │   ├── history/       # Transaction history
│   │   │   └── analytics/     # Analytics
│   │   └── providers.tsx      # Web3 providers
│   ├── components/
│   │   ├── shared/            # Reusable components
│   │   │   ├── PulseLogo.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   └── AgentCard.tsx
│   │   └── landing/           # Landing page components
│   ├── lib/
│   │   ├── utils.ts           # Utilities
│   │   ├── config.ts          # Central configuration
│   │   ├── ens/               # ENS integration
│   │   └── yellow/            # Yellow Network
│   ├── services/
│   │   ├── ai.ts              # Gemini AI service
│   │   ├── lifi/              # LI.FI Service
│   │   └── contracts/         # Viem Contract Wrappers
│   └── types/
│       └── index.ts           # TypeScript types
├── public/                     # Static assets
├── contracts-repo/             # Smart Contracts (Hardhat)
└── README.md
```

---

## 🔧 Environment Variables

```env
# AI
NEXT_PUBLIC_GEMINI_API_KEY=           # Google Gemini API

# Web3
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID= # WalletConnect Cloud
# NEXT_PUBLIC_ALCHEMY_API_KEY=          # Optional: Alchemy RPC

# Integrations
NEXT_PUBLIC_YELLOW_API_KEY=           # Yellow Network
```

---

## 🎬 Demo Flow

1. **Connect Wallet** → RainbowKit modal
2. **Natural Language Input** → "Send $100 to family.eth every Monday from Base"
3. **AI Parsing** → Gemini extracts: amount, recipient, frequency, chains
4. **Route Optimization** → LI.FI finds best bridge path
5. **Agent Creation** → User approves agent deployment
6. **Yellow Channel** → Gasless state channel opened
7. **Automatic Execution** → Agent runs on schedule
8. **Settlement** → Batch settlement when channel closes

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                      │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────────┐  │
│  │ Natural Lang│ ───> │  Gemini AI  │ ───> │ Agent Dashboard │  │
│  │    Input    │      │   Parser    │      │ (Approve/Run)   │  │
│  └─────────────┘      └─────────────┘      └────────┬────────┘  │
└─────────────────────────────────────────────────────│───────────┘
                                                      │
                                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Blockchain Layer                           │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────────┐  │
│  │   LI.FI     │      │   Yellow    │      │ Smart Contracts │  │
│  │  Bridging   │      │  Nitrolite  │      │ (Vault/Registry)│  │
│  └─────────────┘      └─────────────┘      └─────────────────┘  │
│                                                                  │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────────┐  │
│  │ Circle Arc  │      │    ENS      │      │ Base / Optimism │  │
│  │    USDC     │      │  Identity   │      │  (L2 Networks)  │  │
│  └─────────────┘      └─────────────┘      └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👥 Team

Built with ❤️ for ETHGlobal HackMoney 2026

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

<div align="center">

**🌍 Automating Global Wealth Flows for the Next Billion**

*Zero friction. Ultra-low fees. Built-in protection.*

</div>
