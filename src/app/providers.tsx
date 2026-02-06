'use client'

import * as React from 'react'
import {
    RainbowKitProvider,
    getDefaultConfig,
    darkTheme,
} from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import {
    mainnet,
    polygon,
    optimism,
    base,
} from 'wagmi/chains'
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query"

const config = getDefaultConfig({
    appName: 'PulseRemit',
    projectId: 'YOUR_PROJECT_ID', // Replaced with a placeholder
    chains: [mainnet, polygon, optimism, base],
    ssr: true,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
