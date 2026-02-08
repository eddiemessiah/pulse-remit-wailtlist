/**
 * Yellow Network React Hook
 * Provides easy integration with Yellow Network state channels
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import {
    YellowSession,
    OffchainTransfer,
    ChannelState,
    getYellowSessionManager,
    calculateFeesSaved,
    formatBalance,
} from '@/lib/yellow'

interface UseYellowReturn {
    // State
    isConnected: boolean
    isConnecting: boolean
    sessions: YellowSession[]
    currentSession: YellowSession | null
    error: string | null

    // Actions
    connect: () => Promise<boolean>
    disconnect: () => void
    createSession: (deposit: bigint, recipient: string) => Promise<YellowSession | null>
    sendPayment: (sessionId: string, to: string, amount: bigint) => Promise<OffchainTransfer | null>
    settleSession: (sessionId: string) => Promise<string | null>
    getSessionTransfers: (sessionId: string) => Promise<OffchainTransfer[]>
    getFeesSaved: (sessionId: string) => Promise<{
        totalTransfers: number
        savings: number
        savingsPercent: number
    }>

    // Utilities
    formatBalance: (balance: bigint, decimals?: number) => string
}

export function useYellow(): UseYellowReturn {
    const { address, isConnected: isWalletConnected } = useAccount()
    const { signMessageAsync } = useSignMessage()

    const [isConnected, setIsConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [sessions, setSessions] = useState<YellowSession[]>([])
    const [currentSession, setCurrentSession] = useState<YellowSession | null>(null)
    const [error, setError] = useState<string | null>(null)

    const manager = getYellowSessionManager()

    /**
     * Connect to Yellow Network
     */
    const connect = useCallback(async (): Promise<boolean> => {
        if (!address || !isWalletConnected) {
            setError('Wallet not connected')
            return false
        }

        setIsConnecting(true)
        setError(null)

        try {
            const signMessage = async (message: string): Promise<string> => {
                return signMessageAsync({ message })
            }

            const success = await manager.connect(address, signMessage)
            setIsConnected(success)

            if (success) {
                // Load existing sessions
                const userSessions = await manager.getUserSessions()
                setSessions(userSessions)
            }

            return success
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Connection failed'
            setError(message)
            console.error('[useYellow] Connect error:', err)
            return false
        } finally {
            setIsConnecting(false)
        }
    }, [address, isWalletConnected, signMessageAsync, manager])

    /**
     * Disconnect from Yellow Network
     */
    const disconnect = useCallback(() => {
        manager.disconnect()
        setIsConnected(false)
        setSessions([])
        setCurrentSession(null)
    }, [manager])

    /**
     * Create a new state channel session
     */
    const createSession = useCallback(async (
        deposit: bigint,
        recipient: string
    ): Promise<YellowSession | null> => {
        if (!address) {
            setError('Wallet not connected')
            return null
        }

        try {
            setError(null)
            const participants = [address, recipient]
            const session = await manager.createSession(deposit, participants)

            setSessions(prev => [...prev, session])
            setCurrentSession(session)

            return session
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Session creation failed'
            setError(message)
            console.error('[useYellow] Create session error:', err)
            return null
        }
    }, [address, manager])

    /**
     * Send an off-chain payment
     */
    const sendPayment = useCallback(async (
        sessionId: string,
        to: string,
        amount: bigint
    ): Promise<OffchainTransfer | null> => {
        if (!address) {
            setError('Wallet not connected')
            return null
        }

        try {
            setError(null)
            const transfer = await manager.offchainTransfer(sessionId, address, to, amount)

            // Update session in state
            const updatedSession = await manager.getSession(sessionId)
            if (updatedSession) {
                setSessions(prev =>
                    prev.map(s => s.id === sessionId ? updatedSession : s)
                )
                if (currentSession?.id === sessionId) {
                    setCurrentSession(updatedSession)
                }
            }

            return transfer
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Payment failed'
            setError(message)
            console.error('[useYellow] Payment error:', err)
            return null
        }
    }, [address, manager, currentSession])

    /**
     * Settle a session on-chain
     */
    const settleSession = useCallback(async (
        sessionId: string
    ): Promise<string | null> => {
        try {
            setError(null)
            const settlement = await manager.initiateSettlement(sessionId)

            // Return settlement data for on-chain tx
            return settlement.settlementData
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Settlement failed'
            setError(message)
            console.error('[useYellow] Settlement error:', err)
            return null
        }
    }, [manager])

    /**
     * Get transfers for a session
     */
    const getSessionTransfers = useCallback(async (
        sessionId: string
    ): Promise<OffchainTransfer[]> => {
        return manager.getSessionTransfers(sessionId)
    }, [manager])

    /**
     * Get fees saved by using Yellow
     */
    const getFeesSaved = useCallback(async (
        sessionId: string
    ): Promise<{
        totalTransfers: number
        savings: number
        savingsPercent: number
    }> => {
        const result = await calculateFeesSaved(sessionId)
        return {
            totalTransfers: result.totalTransfers,
            savings: result.savings,
            savingsPercent: result.savingsPercent,
        }
    }, [])

    // Auto-connect when wallet connects
    useEffect(() => {
        if (isWalletConnected && address && !isConnected && !isConnecting) {
            // Auto-connect in background
            connect().catch(console.error)
        }
    }, [isWalletConnected, address, isConnected, isConnecting, connect])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Don't disconnect on unmount - manager is singleton
        }
    }, [])

    return {
        isConnected,
        isConnecting,
        sessions,
        currentSession,
        error,
        connect,
        disconnect,
        createSession,
        sendPayment,
        settleSession,
        getSessionTransfers,
        getFeesSaved,
        formatBalance,
    }
}
