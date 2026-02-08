'use client'

import { useState, useEffect, useCallback } from 'react'
import { getYellowClient, YellowChannelState, YellowMessage } from '@/services/yellow/client'
import { useAccount, useWalletClient } from 'wagmi'

export function useYellowChannel() {
    const { address } = useAccount()
    const { data: walletClient } = useWalletClient()
    const [state, setState] = useState<YellowChannelState>({
        sessionId: null,
        isConnected: false,
        isReady: false,
        balance: 0n,
        allocations: [],
        lastUpdate: Date.now()
    })
    const [error, setError] = useState<string | null>(null)

    const yellowClient = getYellowClient()

    // Initialize client when wallet is ready
    useEffect(() => {
        async function init() {
            if (address && walletClient) {
                try {
                    const signer = async (msg: string) => {
                        return await walletClient.request({
                            method: 'personal_sign',
                            params: [msg as `0x${string}`, address]
                        })
                    }

                    const connected = await yellowClient.init(address, signer)
                    setState(prev => ({ ...prev, isConnected: connected, isReady: true }))
                } catch (err) {
                    console.error('Failed to init Yellow client:', err)
                    setError('Failed to connect to Yellow Network')
                }
            }
        }

        init()

        // Cleanup on unmount
        return () => {
            // yellowClient.disconnect() // Persist connection for demo feel
        }
    }, [address, walletClient])

    // Subscribe to messages
    useEffect(() => {
        const unsubscribe = yellowClient.onMessage((msg: YellowMessage) => {
            if (msg.type === 'session_created') {
                setState(prev => ({ ...prev, sessionId: msg.sessionId || null }))
            }
            if (msg.type === 'error') {
                setError(msg.error || 'Unknown error')
            }
        })

        return unsubscribe
    }, [])

    const createChannel = useCallback(async (partner: `0x${string}`, amount: bigint) => {
        setError(null)
        const sessionId = await yellowClient.createSession(partner, amount)
        if (!sessionId) {
            setError('Failed to create session')
        }
        return sessionId
    }, [])

    const sendPayment = useCallback(async (amount: bigint, recipient: `0x${string}`) => {
        setError(null)
        const success = await yellowClient.sendPayment(amount, recipient)
        if (!success) {
            setError('Failed to send payment')
        }
        return success
    }, [])

    return {
        state,
        error,
        createChannel,
        sendPayment,
        isConnected: state.isConnected
    }
}
