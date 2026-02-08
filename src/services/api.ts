/**
 * Backend API Service
 * Communication layer between frontend and Python backend
 */

import { AIPlanningResponse, RemittanceAgent, TransactionRecord } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.detail || `API error: ${response.status}`)
        }

        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        console.error('API Error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

// ============================================================================
// Remittance Agent Endpoints
// ============================================================================

/**
 * Parse a natural language remittance request
 */
export async function parseRemittanceNL(prompt: string): Promise<ApiResponse<AIPlanningResponse>> {
    return apiFetch('/api/parse', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
    })
}

/**
 * Create a new remittance agent
 */
export async function createAgent(
    plan: AIPlanningResponse,
    userAddress: string
): Promise<ApiResponse<RemittanceAgent>> {
    return apiFetch('/api/agents', {
        method: 'POST',
        body: JSON.stringify({
            ...plan,
            userAddress,
        }),
    })
}

/**
 * Get all agents for a user
 */
export async function getAgents(userAddress: string): Promise<ApiResponse<RemittanceAgent[]>> {
    return apiFetch(`/api/agents?address=${userAddress}`)
}

/**
 * Get a specific agent by ID
 */
export async function getAgent(agentId: string): Promise<ApiResponse<RemittanceAgent>> {
    return apiFetch(`/api/agents/${agentId}`)
}

/**
 * Update an agent
 */
export async function updateAgent(
    agentId: string,
    updates: Partial<RemittanceAgent>
): Promise<ApiResponse<RemittanceAgent>> {
    return apiFetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
    })
}

/**
 * Delete an agent
 */
export async function deleteAgent(agentId: string): Promise<ApiResponse<void>> {
    return apiFetch(`/api/agents/${agentId}`, {
        method: 'DELETE',
    })
}

/**
 * Execute an agent manually
 */
export async function executeAgent(agentId: string): Promise<ApiResponse<TransactionRecord>> {
    return apiFetch(`/api/agents/${agentId}/execute`, {
        method: 'POST',
    })
}

/**
 * Pause an agent
 */
export async function pauseAgent(agentId: string): Promise<ApiResponse<RemittanceAgent>> {
    return apiFetch(`/api/agents/${agentId}/pause`, {
        method: 'POST',
    })
}

/**
 * Resume a paused agent
 */
export async function resumeAgent(agentId: string): Promise<ApiResponse<RemittanceAgent>> {
    return apiFetch(`/api/agents/${agentId}/resume`, {
        method: 'POST',
    })
}

// ============================================================================
// Transaction Endpoints
// ============================================================================

/**
 * Get transaction history for a user
 */
export async function getTransactionHistory(
    userAddress: string,
    limit: number = 50
): Promise<ApiResponse<TransactionRecord[]>> {
    return apiFetch(`/api/transactions?address=${userAddress}&limit=${limit}`)
}

/**
 * Get a specific transaction
 */
export async function getTransaction(txId: string): Promise<ApiResponse<TransactionRecord>> {
    return apiFetch(`/api/transactions/${txId}`)
}

// ============================================================================
// Yellow Network Endpoints
// ============================================================================

interface YellowSession {
    id: string
    status: 'OPEN' | 'ACTIVE' | 'CLOSING' | 'CLOSED'
    balance: string
    deposit: string
}

/**
 * Create a Yellow state channel session
 */
export async function createYellowSession(
    deposit: string,
    userAddress: string
): Promise<ApiResponse<YellowSession>> {
    return apiFetch('/api/yellow/session', {
        method: 'POST',
        body: JSON.stringify({ deposit, userAddress }),
    })
}

/**
 * Get Yellow session status
 */
export async function getYellowSession(sessionId: string): Promise<ApiResponse<YellowSession>> {
    return apiFetch(`/api/yellow/session/${sessionId}`)
}

/**
 * Execute off-chain transfer via Yellow
 */
export async function yellowTransfer(
    sessionId: string,
    to: string,
    amount: string
): Promise<ApiResponse<{ transferId: string; newBalance: string }>> {
    return apiFetch('/api/yellow/transfer', {
        method: 'POST',
        body: JSON.stringify({ sessionId, to, amount }),
    })
}

/**
 * Settle Yellow channel on-chain
 */
export async function settleYellowChannel(
    sessionId: string
): Promise<ApiResponse<{ txHash: string; finalBalances: Record<string, string> }>> {
    return apiFetch(`/api/yellow/session/${sessionId}/settle`, {
        method: 'POST',
    })
}

// ============================================================================
// ENS Endpoints
// ============================================================================

interface ENSResolution {
    name: string
    address: string | null
    avatar: string | null
}

/**
 * Resolve ENS name via backend (with caching)
 */
export async function resolveENS(name: string): Promise<ApiResponse<ENSResolution>> {
    return apiFetch(`/api/ens/resolve?name=${encodeURIComponent(name)}`)
}

/**
 * Reverse resolve address to ENS
 */
export async function reverseENS(address: string): Promise<ApiResponse<{ name: string | null }>> {
    return apiFetch(`/api/ens/reverse?address=${encodeURIComponent(address)}`)
}

// ============================================================================
// LI.FI Endpoints
// ============================================================================

interface BridgeQuote {
    routeId: string
    fromChain: string
    toChain: string
    fromToken: string
    toToken: string
    fromAmount: string
    toAmount: string
    estimatedGas: string
    estimatedTime: number
}

/**
 * Get bridge quote via backend
 */
export async function getBridgeQuote(params: {
    fromChain: number
    toChain: number
    fromToken: string
    toToken: string
    amount: string
    fromAddress: string
}): Promise<ApiResponse<BridgeQuote>> {
    return apiFetch('/api/bridge/quote', {
        method: 'POST',
        body: JSON.stringify(params),
    })
}

/**
 * Execute bridge transaction
 */
export async function executeBridge(
    routeId: string,
    userAddress: string
): Promise<ApiResponse<{ txHash: string; status: string }>> {
    return apiFetch('/api/bridge/execute', {
        method: 'POST',
        body: JSON.stringify({ routeId, userAddress }),
    })
}

// ============================================================================
// Analytics Endpoints
// ============================================================================

interface AnalyticsData {
    totalVolume: string
    totalTransactions: number
    totalAgents: number
    feesSaved: string
    activeCorridors: number
}

/**
 * Get user analytics
 */
export async function getUserAnalytics(userAddress: string): Promise<ApiResponse<AnalyticsData>> {
    return apiFetch(`/api/analytics?address=${userAddress}`)
}

// ============================================================================
// Health Check
// ============================================================================

/**
 * Check if backend is healthy
 */
export async function healthCheck(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`)
        return response.ok
    } catch {
        return false
    }
}
