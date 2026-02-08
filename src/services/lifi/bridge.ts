import { createConfig, getRoutes, getStatus, Route, RoutesRequest, Token } from '@lifi/sdk'
import { LIFI_CONFIG, DEFAULT_CHAIN } from '@/lib/config'
import { createWalletClient, custom, http } from 'viem'
import { mainnet } from 'viem/chains'

// Initialize LI.FI SDK config
createConfig({
    integrator: LIFI_CONFIG.INTEGRATOR,
    providers: [
        // We'll use the default providers configured by the SDK
        // In a real app we might configure specific RPCs here
    ],
})

export interface BridgeQuoteParams {
    fromChainId: number
    toChainId: number
    fromTokenAddress: string
    toTokenAddress: string
    fromAmount: string // in atomic units (wei)
    fromAddress: string
    toAddress?: string
}

export class LiFiService {
    /**
     * Get a quote for bridging/swapping tokens
     */
    async getQuote(params: BridgeQuoteParams): Promise<Route | null> {
        try {
            const request: RoutesRequest = {
                fromChainId: params.fromChainId,
                toChainId: params.toChainId,
                fromTokenAddress: params.fromTokenAddress,
                toTokenAddress: params.toTokenAddress,
                fromAmount: params.fromAmount,
                fromAddress: params.fromAddress,
                toAddress: params.toAddress || params.fromAddress,
                options: {
                    integrator: LIFI_CONFIG.INTEGRATOR,
                    slippage: LIFI_CONFIG.DEFAULT_SLIPPAGE / 100, // SDK expects 0-1 range
                    order: 'RECOMMENDED', // Optimize for a balance of gas, time, and return
                },
            }

            const response = await getRoutes(request)

            if (!response.routes || response.routes.length === 0) {
                console.warn('No routes found for bridge request')
                return null
            }

            // Return the best route
            return response.routes[0]
        } catch (error) {
            console.error('LI.FI quote error:', error)
            return null
        }
    }

    /**
     * Get status of a bridging transaction
     */
    async getTransactionStatus(txHash: string, bridge: string, fromChainId: number, toChainId: number) {
        try {
            const status = await getStatus({
                txHash,
                bridge,
                fromChain: fromChainId,
                toChain: toChainId
            })
            return status
        } catch (error) {
            console.error('LI.FI status check error:', error)
            return null
        }
    }

    /**
     * Helper to format a route for display
     */
    formatRouteDetails(route: Route) {
        const steps = route.steps.map(step => ({
            tool: step.tool, // e.g., "connext", "hop"
            action: step.action,
            estimate: step.estimate,
            executionDuration: step.estimate.executionDuration,
        }))

        return {
            id: route.id,
            fromAmount: route.fromAmount,
            toAmount: route.toAmount,
            gasCostUSD: route.gasCostUSD,

            steps,
        }
    }
}

export const liFiService = new LiFiService()
