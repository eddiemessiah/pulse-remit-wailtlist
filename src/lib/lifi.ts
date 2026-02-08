/**
 * LI.FI SDK Integration
 * Cross-chain bridging and swap functionality
 * 
 * Uses LI.FI API for optimal cross-chain routing
 */

import { LIFI_CONFIG, getChainName } from './config'

// LI.FI API Base URL
const LIFI_API_BASE = LIFI_CONFIG.API_URL

// Request headers with API key
const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (LIFI_CONFIG.API_KEY) {
        headers['x-lifi-api-key'] = LIFI_CONFIG.API_KEY
    }

    return headers
}

// ===========================================
// SUPPORTED CHAINS
// ===========================================

export const SUPPORTED_CHAINS = {
    ethereum: { id: 1, name: 'Ethereum', symbol: 'ETH' },
    base: { id: 8453, name: 'Base', symbol: 'ETH' },
    baseSepolia: { id: 84532, name: 'Base Sepolia', symbol: 'ETH' },
    optimism: { id: 10, name: 'Optimism', symbol: 'ETH' },
    polygon: { id: 137, name: 'Polygon', symbol: 'MATIC' },
    arbitrum: { id: 42161, name: 'Arbitrum', symbol: 'ETH' },
    sepolia: { id: 11155111, name: 'Sepolia', symbol: 'ETH' },
} as const

// USDC addresses on different chains
export const USDC_ADDRESSES: Record<number, `0x${string}`> = {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',      // Ethereum
    8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',  // Base
    84532: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // Base Sepolia
    10: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',    // Optimism
    137: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',   // Polygon
    42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // Arbitrum
    11155111: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Sepolia
}

// ===========================================
// TYPES
// ===========================================

export interface QuoteParams {
    fromChain: number
    toChain: number
    fromToken: string
    toToken: string
    fromAmount: string
    fromAddress: string
    toAddress?: string
    slippage?: number
}

export interface Route {
    id: string
    fromChainId: number
    toChainId: number
    fromToken: {
        address: string
        symbol: string
        decimals: number
        name: string
        logoURI?: string
        priceUSD?: string
    }
    toToken: {
        address: string
        symbol: string
        decimals: number
        name: string
        logoURI?: string
        priceUSD?: string
    }
    fromAmount: string
    toAmount: string
    steps: RouteStep[]
    gasCostUSD: string
    insurance?: {
        state: string
        feeAmountUsd: string
    }
    tags?: string[]
}

export interface RouteStep {
    type: 'swap' | 'cross' | 'lifi'
    toolDetails: {
        name: string
        logoURI: string
    }
    action: {
        fromChainId: number
        toChainId: number
        fromToken: {
            address: string
            symbol: string
        }
        toToken: {
            address: string
            symbol: string
        }
    }
    estimate: {
        fromAmount: string
        toAmount: string
        executionDuration: number
        gasCosts: Array<{
            amount: string
            amountUSD: string
        }>
    }
}

export interface QuoteResponse {
    routes: Route[]
    errors?: Array<{
        errorType: string
        tool: string
        message: string
    }>
}

export interface TransactionRequest {
    to: `0x${string}`
    data: `0x${string}`
    value: bigint
    gasLimit?: bigint
    chainId: number
}

// ===========================================
// API FUNCTIONS
// ===========================================

/**
 * Get a quote for a cross-chain transfer
 */
export async function getQuote(params: QuoteParams): Promise<QuoteResponse> {
    const {
        fromChain,
        toChain,
        fromToken,
        toToken,
        fromAmount,
        fromAddress,
        toAddress,
        slippage = LIFI_CONFIG.DEFAULT_SLIPPAGE,
    } = params

    const queryParams = new URLSearchParams({
        fromChain: fromChain.toString(),
        toChain: toChain.toString(),
        fromToken,
        toToken,
        fromAmount,
        fromAddress,
        toAddress: toAddress || fromAddress,
        slippage: slippage.toString(),
        integrator: LIFI_CONFIG.INTEGRATOR,
        order: 'RECOMMENDED',
    })

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), LIFI_CONFIG.QUOTE_TIMEOUT)

    try {
        const response = await fetch(`${LIFI_API_BASE}/quote?${queryParams}`, {
            headers: getHeaders(),
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `LI.FI quote error: ${response.status}`)
        }

        return response.json()
    } catch (error) {
        clearTimeout(timeoutId)
        if ((error as Error).name === 'AbortError') {
            throw new Error('Quote request timed out')
        }
        throw error
    }
}

/**
 * Get advanced routes with more options
 */
export async function getAdvancedRoutes(params: QuoteParams): Promise<{
    routes: Route[]
    unavailableRoutes: { tool: string; reason: string }[]
}> {
    const {
        fromChain,
        toChain,
        fromToken,
        toToken,
        fromAmount,
        fromAddress,
        toAddress,
        slippage = LIFI_CONFIG.DEFAULT_SLIPPAGE,
    } = params

    const body = {
        fromChainId: fromChain,
        toChainId: toChain,
        fromTokenAddress: fromToken,
        toTokenAddress: toToken,
        fromAmount,
        fromAddress,
        toAddress: toAddress || fromAddress,
        options: {
            slippage: slippage / 100, // Convert from percentage
            integrator: LIFI_CONFIG.INTEGRATOR,
            order: 'RECOMMENDED',
            allowSwitchChain: true,
        },
    }

    const response = await fetch(`${LIFI_API_BASE}/advanced/routes`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error(`LI.FI routes error: ${response.statusText}`)
    }

    return response.json()
}

/**
 * Get available tokens on a chain
 */
export async function getTokens(chainId: number): Promise<Array<{
    address: string
    symbol: string
    decimals: number
    name: string
    logoURI: string
    priceUSD: string
}>> {
    const response = await fetch(`${LIFI_API_BASE}/tokens?chains=${chainId}`, {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`LI.FI tokens error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.tokens[chainId] || []
}

/**
 * Get supported chains
 */
export async function getChains(): Promise<Array<{
    id: number
    name: string
    logoURI: string
    nativeToken: {
        symbol: string
        decimals: number
    }
}>> {
    const response = await fetch(`${LIFI_API_BASE}/chains`, {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`LI.FI chains error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.chains
}

/**
 * Build transaction data for a route
 */
export async function buildTransaction(
    route: Route,
    fromAddress: string
): Promise<TransactionRequest> {
    const response = await fetch(`${LIFI_API_BASE}/quote/toTx`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            route,
            fromAddress,
        }),
    })

    if (!response.ok) {
        throw new Error(`LI.FI transaction build error: ${response.statusText}`)
    }

    const data = await response.json()

    return {
        to: data.transactionRequest.to,
        data: data.transactionRequest.data,
        value: BigInt(data.transactionRequest.value || '0'),
        gasLimit: data.transactionRequest.gasLimit ? BigInt(data.transactionRequest.gasLimit) : undefined,
        chainId: data.transactionRequest.chainId,
    }
}

/**
 * Get status of a transaction
 */
export async function getStatus(txHash: string, bridge?: string): Promise<{
    status: 'PENDING' | 'DONE' | 'FAILED' | 'NOT_FOUND'
    substatus?: string
    receiving?: {
        txHash: string
        amount: string
    }
    bridgeExplorerLink?: string
}> {
    const queryParams = new URLSearchParams({ txHash })
    if (bridge) {
        queryParams.append('bridge', bridge)
    }

    const response = await fetch(`${LIFI_API_BASE}/status?${queryParams}`, {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`LI.FI status error: ${response.statusText}`)
    }

    return response.json()
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Format amount with decimals
 */
export function formatAmount(amount: string, decimals: number): string {
    const value = BigInt(amount)
    const divisor = BigInt(10 ** decimals)
    const integerPart = value / divisor
    const fractionalPart = value % divisor

    const fractionalStr = fractionalPart.toString().padStart(decimals, '0')
    const trimmedFractional = fractionalStr.slice(0, 2)

    return `${integerPart}.${trimmedFractional}`
}

/**
 * Parse amount from human-readable format
 */
export function parseAmount(amount: string, decimals: number): string {
    const [integer, fraction = ''] = amount.split('.')
    const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals)
    return `${integer}${paddedFraction}`
}

/**
 * Get the best route for a USDC transfer between chains
 */
export async function getUSDCBridgeQuote(
    fromChain: keyof typeof SUPPORTED_CHAINS,
    toChain: keyof typeof SUPPORTED_CHAINS,
    amount: string,
    fromAddress: string,
    toAddress?: string
): Promise<Route | null> {
    const fromChainId = SUPPORTED_CHAINS[fromChain].id
    const toChainId = SUPPORTED_CHAINS[toChain].id

    const fromToken = USDC_ADDRESSES[fromChainId]
    const toToken = USDC_ADDRESSES[toChainId]

    if (!fromToken || !toToken) {
        throw new Error('USDC not supported on selected chains')
    }

    try {
        const quote = await getQuote({
            fromChain: fromChainId,
            toChain: toChainId,
            fromToken,
            toToken,
            fromAmount: parseAmount(amount, 6), // USDC has 6 decimals
            fromAddress,
            toAddress,
        })

        if (quote.routes && quote.routes.length > 0) {
            return quote.routes[0] // Return best route
        }

        return null
    } catch (error) {
        console.error('LI.FI quote error:', error)
        return null
    }
}

/**
 * Estimate fees for a cross-chain transfer
 */
export async function estimateFees(
    fromChainId: number,
    toChainId: number,
    amount: string,
    fromAddress: string
): Promise<{
    gasCostUSD: string
    bridgeFeeUSD: string
    totalFeeUSD: string
    estimatedTime: number // in seconds
} | null> {
    try {
        const fromToken = USDC_ADDRESSES[fromChainId]
        const toToken = USDC_ADDRESSES[toChainId]

        if (!fromToken || !toToken) return null

        const quote = await getQuote({
            fromChain: fromChainId,
            toChain: toChainId,
            fromToken,
            toToken,
            fromAmount: amount,
            fromAddress,
        })

        if (!quote.routes || quote.routes.length === 0) return null

        const route = quote.routes[0]
        const gasCostUSD = route.gasCostUSD

        // Calculate bridge fee from difference
        const fromAmountUSD = parseFloat(route.fromToken.priceUSD || '1') * parseFloat(formatAmount(route.fromAmount, 6))
        const toAmountUSD = parseFloat(route.toToken.priceUSD || '1') * parseFloat(formatAmount(route.toAmount, 6))
        const bridgeFeeUSD = Math.max(0, fromAmountUSD - toAmountUSD - parseFloat(gasCostUSD)).toFixed(2)

        // Estimate time from steps
        const estimatedTime = route.steps.reduce(
            (total, step) => total + (step.estimate.executionDuration || 60),
            0
        )

        return {
            gasCostUSD,
            bridgeFeeUSD,
            totalFeeUSD: (parseFloat(gasCostUSD) + parseFloat(bridgeFeeUSD)).toFixed(2),
            estimatedTime,
        }
    } catch (error) {
        console.error('Fee estimation error:', error)
        return null
    }
}

/**
 * Get human-readable route description
 */
export function getRouteDescription(route: Route): string {
    const steps = route.steps.map(step => {
        const tool = step.toolDetails.name
        const fromChain = getChainName(step.action.fromChainId)
        const toChain = getChainName(step.action.toChainId)

        if (step.type === 'swap') {
            return `Swap ${step.action.fromToken.symbol} → ${step.action.toToken.symbol} via ${tool}`
        } else {
            return `Bridge ${fromChain} → ${toChain} via ${tool}`
        }
    })

    return steps.join(' → ')
}
