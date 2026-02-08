'use client'

import * as React from 'react'
import {
    RainbowKitProvider,
    getDefaultConfig,
    darkTheme,
} from '@rainbow-me/rainbowkit'
import { WagmiProvider, http } from 'wagmi'
import {
    mainnet,
    polygon,
    optimism,
    base,
    baseSepolia,
    sepolia,
    arbitrum,
} from 'wagmi/chains'
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query"
import '@rainbow-me/rainbowkit/styles.css'

// Get API keys from environment
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '630ff214a3b4507c7b3230967763c943'
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

// Configure RPC transports for each chain
const transports = {
    [mainnet.id]: alchemyApiKey
        ? http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
        : http(),
    [polygon.id]: alchemyApiKey
        ? http(`https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
        : http(),
    [optimism.id]: alchemyApiKey
        ? http(`https://opt-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
        : http(),
    [base.id]: alchemyApiKey
        ? http(`https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
        : http(),
    [arbitrum.id]: alchemyApiKey
        ? http(`https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
        : http(),
    [baseSepolia.id]: http('https://sepolia.base.org'),
    [sepolia.id]: alchemyApiKey
        ? http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`)
        : http('https://sepolia.gateway.tenderly.co'),
}

const config = getDefaultConfig({
    appName: 'PulseRemit',
    projectId: walletConnectProjectId,
    chains: [
        // Testnets first for development
        baseSepolia,
        sepolia,
        // Mainnets
        base,
        mainnet,
        optimism,
        polygon,
        arbitrum,
    ],
    transports,
    ssr: true,
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 2,
        },
    },
})

// Custom theme matching PulseRemit branding
const pulseRemitTheme = darkTheme({
    accentColor: '#00FF88', // PulseRemit primary green
    accentColorForeground: 'black',
    borderRadius: 'medium',
    fontStack: 'system',
    overlayBlur: 'small',
})



export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={pulseRemitTheme}
                    showRecentTransactions={true}
                    appInfo={{
                        appName: 'PulseRemit',
                        learnMoreUrl: 'https://pulseremit.io',
                    }}
                >
                    {mounted ? children : null}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
