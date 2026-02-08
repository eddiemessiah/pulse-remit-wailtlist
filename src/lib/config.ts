// Chain and contract configuration for PulseRemit

import { baseSepolia, sepolia, base, mainnet, optimism, arbitrum, polygon } from 'wagmi/chains'

// ===========================================
// CHAIN CONFIGURATION
// ===========================================

export const SUPPORTED_CHAINS = {
    BASE_SEPOLIA: baseSepolia,
    SEPOLIA: sepolia,
    BASE: base,
    MAINNET: mainnet,
    OPTIMISM: optimism,
    ARBITRUM: arbitrum,
    POLYGON: polygon,
} as const

export const DEFAULT_CHAIN = baseSepolia

// Chain IDs for quick reference
export const CHAIN_IDS = {
    MAINNET: 1,
    SEPOLIA: 11155111,
    BASE: 8453,
    BASE_SEPOLIA: 84532,
    OPTIMISM: 10,
    ARBITRUM: 42161,
    POLYGON: 137,
    AVALANCHE: 43114,
} as const

// ===========================================
// CONTRACT ADDRESSES (Environment-based)
// ===========================================

export const CONTRACT_ADDRESSES = {
    // PulseRemit Protocol Contracts (loaded from env after deployment)
    REMITTANCE_VAULT: (process.env.NEXT_PUBLIC_VAULT_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,
    LIFI_EXECUTOR: (process.env.NEXT_PUBLIC_LIFI_EXECUTOR_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,
    AGENT_REGISTRY: (process.env.NEXT_PUBLIC_AGENT_REGISTRY_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,
    IDENTITY_REGISTRY: (process.env.NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,
    RECIPIENT_REGISTRY: (process.env.NEXT_PUBLIC_RECIPIENT_REGISTRY_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,
    AGENT_FACTORY: (process.env.NEXT_PUBLIC_AGENT_FACTORY_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,

    // LI.FI Diamond (official addresses - same on all chains)
    LIFI_DIAMOND: {
        [baseSepolia.id]: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE' as `0x${string}`,
        [base.id]: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE' as `0x${string}`,
        [sepolia.id]: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE' as `0x${string}`,
        [mainnet.id]: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE' as `0x${string}`,
        [optimism.id]: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE' as `0x${string}`,
        [arbitrum.id]: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE' as `0x${string}`,
        [polygon.id]: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE' as `0x${string}`,
    },

    // ENS Registry
    ENS_REGISTRY: {
        [mainnet.id]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' as `0x${string}`,
        [sepolia.id]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' as `0x${string}`,
    },
} as const

// ===========================================
// TOKEN ADDRESSES
// ===========================================

export const TOKEN_ADDRESSES = {
    USDC: {
        [baseSepolia.id]: '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as `0x${string}`,
        [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`,
        [sepolia.id]: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' as `0x${string}`,
        [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}`,
        [optimism.id]: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85' as `0x${string}`,
        [arbitrum.id]: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831' as `0x${string}`,
        [polygon.id]: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359' as `0x${string}`,
    },
    // Native token placeholder
    NATIVE: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as `0x${string}`,
} as const

// ===========================================
// YELLOW NETWORK CONFIGURATION
// ===========================================

export const YELLOW_CONFIG = {
    // ClearNode WebSocket endpoints
    WS_URL: {
        sandbox: 'wss://clearnet-sandbox.yellow.com/ws',
        production: 'wss://clearnet.yellow.com/ws',
    },

    // Current environment endpoint
    CURRENT_WS_URL: process.env.NEXT_PUBLIC_YELLOW_WS_URL || 'wss://clearnet-sandbox.yellow.com/ws',

    // Protocol identifier
    PROTOCOL: 'pulseremit-v1',

    // Default channel settings
    DEFAULT_QUORUM: 100,
    DEFAULT_CHALLENGE_PERIOD: 0,

    // Session settings
    MAX_SESSION_DURATION: 30 * 24 * 60 * 60, // 30 days in seconds
    MIN_DEPOSIT: 1_000_000n, // $1 USDC (6 decimals)
} as const

// ===========================================
// LIFI CONFIGURATION
// ===========================================

export const LIFI_CONFIG = {
    INTEGRATOR: process.env.NEXT_PUBLIC_LIFI_INTEGRATOR || 'PulseRemit',
    API_KEY: process.env.NEXT_PUBLIC_LIFI_API_KEY || '',
    API_URL: 'https://li.quest/v1',

    // Supported chains for bridging
    SUPPORTED_CHAIN_IDS: [
        CHAIN_IDS.BASE_SEPOLIA,
        CHAIN_IDS.BASE,
        CHAIN_IDS.SEPOLIA,
        CHAIN_IDS.MAINNET,
        CHAIN_IDS.OPTIMISM,
        CHAIN_IDS.ARBITRUM,
        CHAIN_IDS.POLYGON,
        CHAIN_IDS.AVALANCHE,
    ],

    // Slippage settings
    DEFAULT_SLIPPAGE: 0.5, // 0.5%
    MAX_SLIPPAGE: 3.0,     // 3%

    // Timeouts
    QUOTE_TIMEOUT: 30000,  // 30 seconds
    EXECUTION_TIMEOUT: 300000, // 5 minutes
} as const

// ===========================================
// CIRCLE ARC CONFIGURATION
// ===========================================

export const CIRCLE_CONFIG = {
    APP_ID: process.env.NEXT_PUBLIC_CIRCLE_APP_ID || '',

    // CCTP supported chains
    CCTP_CHAINS: {
        'ethereum-sepolia': { domain: 0, chainId: 11155111 },
        'base-sepolia': { domain: 6, chainId: 84532 },
        'avalanche-fuji': { domain: 1, chainId: 43113 },
        'arbitrum-sepolia': { domain: 3, chainId: 421614 },
        'optimism-sepolia': { domain: 2, chainId: 11155420 },
    },

    // Token Messenger addresses
    TOKEN_MESSENGER: {
        [CHAIN_IDS.SEPOLIA]: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5' as `0x${string}`,
        [CHAIN_IDS.BASE_SEPOLIA]: '0x877b8e8c9e2383077809787ED6F279ce01CB4cc8' as `0x${string}`,
    },
} as const

// ===========================================
// ENS CONFIGURATION
// ===========================================

export const ENS_CONFIG = {
    // ENS Registry addresses
    REGISTRY: CONTRACT_ADDRESSES.ENS_REGISTRY,

    // Universal Resolver
    UNIVERSAL_RESOLVER: {
        [mainnet.id]: '0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62' as `0x${string}`,
        [sepolia.id]: '0xc8Af999e38273D658BE1b921b88A9Ddf005769cC' as `0x${string}`,
    },

    // RPC for ENS resolution (mainnet has the registry)
    RESOLUTION_RPC: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
        ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        : 'https://eth.llamarpc.com',
} as const

// ===========================================
// AGENT CONFIGURATION
// ===========================================

export const AGENT_CONFIG = {
    // Polling intervals
    EXECUTION_INTERVAL: 60 * 1000,  // Check every minute
    SYNC_INTERVAL: 30 * 1000,       // Sync state every 30 seconds

    // Limits
    MAX_BATCH_SIZE: 10,
    MIN_EXECUTION_AMOUNT: 1_000_000n,  // $1 USDC (6 decimals)
    MAX_EXECUTION_AMOUNT: 10_000_000_000n, // $10,000 USDC

    // Timing (in seconds)
    MIN_INTERVAL: 24 * 60 * 60,     // 1 day
    DEFAULT_INTERVAL: 7 * 24 * 60 * 60, // 1 week
} as const

// ===========================================
// FREQUENCY OPTIONS
// ===========================================

export const FREQUENCY_OPTIONS = {
    daily: 24 * 60 * 60,
    weekly: 7 * 24 * 60 * 60,
    biweekly: 14 * 24 * 60 * 60,
    monthly: 30 * 24 * 60 * 60,
    quarterly: 90 * 24 * 60 * 60,
} as const

export type FrequencyOption = keyof typeof FREQUENCY_OPTIONS

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

export function getUSDCAddress(chainId: number): `0x${string}` {
    return (TOKEN_ADDRESSES.USDC[chainId as keyof typeof TOKEN_ADDRESSES.USDC] ||
        TOKEN_ADDRESSES.USDC[baseSepolia.id])
}

export function getLiFiDiamond(chainId: number): `0x${string}` {
    return (CONTRACT_ADDRESSES.LIFI_DIAMOND[chainId as keyof typeof CONTRACT_ADDRESSES.LIFI_DIAMOND] ||
        CONTRACT_ADDRESSES.LIFI_DIAMOND[baseSepolia.id])
}

export function getChainName(chainId: number): string {
    const chainNames: Record<number, string> = {
        [CHAIN_IDS.BASE_SEPOLIA]: 'Base Sepolia',
        [CHAIN_IDS.BASE]: 'Base',
        [CHAIN_IDS.SEPOLIA]: 'Sepolia',
        [CHAIN_IDS.MAINNET]: 'Ethereum',
        [CHAIN_IDS.OPTIMISM]: 'Optimism',
        [CHAIN_IDS.ARBITRUM]: 'Arbitrum',
        [CHAIN_IDS.POLYGON]: 'Polygon',
        [CHAIN_IDS.AVALANCHE]: 'Avalanche',
    }
    return chainNames[chainId] || `Chain ${chainId}`
}

export function getChainId(chainName: string): number {
    const nameToId: Record<string, number> = {
        'base': CHAIN_IDS.BASE,
        'base sepolia': CHAIN_IDS.BASE_SEPOLIA,
        'ethereum': CHAIN_IDS.MAINNET,
        'sepolia': CHAIN_IDS.SEPOLIA,
        'optimism': CHAIN_IDS.OPTIMISM,
        'arbitrum': CHAIN_IDS.ARBITRUM,
        'polygon': CHAIN_IDS.POLYGON,
    }
    return nameToId[chainName.toLowerCase()] || CHAIN_IDS.BASE_SEPOLIA
}

export function formatUSDC(amount: bigint): string {
    const value = Number(amount) / 1_000_000
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value)
}

export function parseUSDC(amount: string | number): bigint {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount
    return BigInt(Math.floor(value * 1_000_000))
}

export function isContractsDeployed(): boolean {
    return (
        CONTRACT_ADDRESSES.REMITTANCE_VAULT !== '0x0000000000000000000000000000000000000000' &&
        CONTRACT_ADDRESSES.AGENT_REGISTRY !== '0x0000000000000000000000000000000000000000'
    )
}

export function getExplorerUrl(chainId: number, type: 'tx' | 'address', hash: string): string {
    const explorers: Record<number, string> = {
        [CHAIN_IDS.BASE_SEPOLIA]: 'https://sepolia.basescan.org',
        [CHAIN_IDS.BASE]: 'https://basescan.org',
        [CHAIN_IDS.SEPOLIA]: 'https://sepolia.etherscan.io',
        [CHAIN_IDS.MAINNET]: 'https://etherscan.io',
        [CHAIN_IDS.OPTIMISM]: 'https://optimistic.etherscan.io',
        [CHAIN_IDS.ARBITRUM]: 'https://arbiscan.io',
        [CHAIN_IDS.POLYGON]: 'https://polygonscan.com',
    }

    const baseUrl = explorers[chainId] || explorers[CHAIN_IDS.BASE_SEPOLIA]
    return `${baseUrl}/${type}/${hash}`
}
