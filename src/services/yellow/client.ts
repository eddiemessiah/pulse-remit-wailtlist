// Yellow Network Client
// Handles WebSocket connection to ClearNode and state channel operations

import { YELLOW_CONFIG } from '@/lib/config'

export interface YellowChannelState {
    sessionId: string | null
    isConnected: boolean
    isReady: boolean
    balance: bigint
    allocations: ChannelAllocation[]
    lastUpdate: number
}

export interface ChannelAllocation {
    participant: `0x${string}`
    asset: string
    amount: string
}

export interface PaymentMessage {
    type: 'payment'
    amount: string
    recipient: `0x${string}`
    timestamp: number
    signature?: string
    sender?: `0x${string}`
}

export interface AppDefinition {
    protocol: string
    participants: `0x${string}`[]
    weights: number[]
    quorum: number
    challenge: number
    nonce: number
}

export type MessageSigner = (message: string) => Promise<string>

export type YellowMessageHandler = (message: YellowMessage) => void

export interface YellowMessage {
    type: 'session_created' | 'payment' | 'session_message' | 'error' | 'balance_update'
    sessionId?: string
    amount?: string
    sender?: `0x${string}`
    data?: unknown
    error?: string
}

/**
 * Yellow Network Client for managing state channels
 * Uses Nitrolite SDK for off-chain, gasless payments
 */
export class YellowClient {
    private ws: WebSocket | null = null
    private messageSigner: MessageSigner | null = null
    private userAddress: `0x${string}` | null = null
    private sessionId: string | null = null
    private isConnected: boolean = false
    private messageHandlers: Set<YellowMessageHandler> = new Set()
    private reconnectAttempts: number = 0
    private maxReconnectAttempts: number = 5

    constructor() {
        // Client is initialized but not connected
    }

    /**
     * Initialize the client with wallet connection
     */
    async init(
        userAddress: `0x${string}`,
        messageSigner: MessageSigner
    ): Promise<boolean> {
        this.userAddress = userAddress
        this.messageSigner = messageSigner

        return this.connect()
    }

    /**
     * Connect to Yellow Network ClearNode
     */
    private async connect(): Promise<boolean> {
        return new Promise((resolve) => {
            try {
                this.ws = new WebSocket(YELLOW_CONFIG.CURRENT_WS_URL)

                this.ws.onopen = () => {
                    console.log('🟢 Connected to Yellow Network!')
                    this.isConnected = true
                    this.reconnectAttempts = 0
                    resolve(true)
                }

                this.ws.onmessage = (event) => {
                    this.handleMessage(event.data)
                }

                this.ws.onerror = (error) => {
                    console.error('Yellow Network error:', error)
                    this.isConnected = false
                }

                this.ws.onclose = () => {
                    console.log('Yellow Network connection closed')
                    this.isConnected = false
                    this.attemptReconnect()
                }

                // Timeout for connection
                setTimeout(() => {
                    if (!this.isConnected) {
                        console.warn('Yellow Network connection timeout')
                        resolve(false)
                    }
                }, 10000)
            } catch (error) {
                console.error('Failed to connect to Yellow Network:', error)
                resolve(false)
            }
        })
    }

    /**
     * Attempt to reconnect on disconnect
     */
    private async attemptReconnect(): Promise<void> {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached')
            return
        }

        this.reconnectAttempts++
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)

        console.log(`Attempting reconnect in ${delay}ms...`)

        setTimeout(() => {
            if (!this.isConnected) {
                this.connect()
            }
        }, delay)
    }

    /**
     * Handle incoming WebSocket messages
     */
    private handleMessage(data: string): void {
        try {
            const message = JSON.parse(data) as YellowMessage

            // Process different message types
            switch (message.type) {
                case 'session_created':
                    this.sessionId = message.sessionId || null
                    console.log('✅ Yellow session confirmed:', this.sessionId)
                    break

                case 'payment':
                    console.log('💰 Payment received:', message.amount)
                    break

                case 'balance_update':
                    console.log('📊 Balance updated')
                    break

                case 'error':
                    console.error('❌ Yellow error:', message.error)
                    break
            }

            // Notify all registered handlers
            this.messageHandlers.forEach(handler => handler(message))
        } catch (error) {
            console.error('Failed to parse Yellow message:', error)
        }
    }

    /**
     * Register a message handler
     */
    onMessage(handler: YellowMessageHandler): () => void {
        this.messageHandlers.add(handler)
        return () => this.messageHandlers.delete(handler)
    }

    /**
     * Create a payment session (state channel)
     */
    async createSession(
        partnerAddress: `0x${string}`,
        initialDeposit: bigint
    ): Promise<string | null> {
        if (!this.isConnected || !this.userAddress || !this.messageSigner || !this.ws) {
            console.error('Yellow client not initialized')
            return null
        }

        try {
            const appDefinition: AppDefinition = {
                protocol: YELLOW_CONFIG.PROTOCOL,
                participants: [this.userAddress, partnerAddress],
                weights: [50, 50],
                quorum: YELLOW_CONFIG.DEFAULT_QUORUM,
                challenge: YELLOW_CONFIG.DEFAULT_CHALLENGE_PERIOD,
                nonce: Date.now(),
            }

            // Initial allocations (deposit from sender)
            const allocations: ChannelAllocation[] = [
                {
                    participant: this.userAddress,
                    asset: 'usdc',
                    amount: initialDeposit.toString(),
                },
                {
                    participant: partnerAddress,
                    asset: 'usdc',
                    amount: '0',
                },
            ]

            // Create signed session message
            const sessionData = {
                method: 'create_session',
                params: {
                    definition: appDefinition,
                    allocations,
                },
                timestamp: Date.now(),
            }

            const messageToSign = JSON.stringify(sessionData)
            const signature = await this.messageSigner(messageToSign)

            const signedMessage = {
                ...sessionData,
                signature,
                sender: this.userAddress,
            }

            this.ws.send(JSON.stringify(signedMessage))
            console.log('✅ Yellow session creation request sent')

            // Wait for session confirmation
            return new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    resolve(null)
                }, 15000)

                const unsubscribe = this.onMessage((msg) => {
                    if (msg.type === 'session_created' && msg.sessionId) {
                        clearTimeout(timeout)
                        unsubscribe()
                        resolve(msg.sessionId)
                    }
                })
            })
        } catch (error) {
            console.error('Failed to create Yellow session:', error)
            return null
        }
    }

    /**
     * Send an instant payment through the state channel
     */
    async sendPayment(
        amount: bigint,
        recipient: `0x${string}`
    ): Promise<boolean> {
        if (!this.isConnected || !this.messageSigner || !this.userAddress || !this.ws) {
            console.error('Yellow client not ready for payments')
            return false
        }

        try {
            const paymentData: PaymentMessage = {
                type: 'payment',
                amount: amount.toString(),
                recipient,
                timestamp: Date.now(),
            }

            const signature = await this.messageSigner(JSON.stringify(paymentData))

            const signedPayment = {
                ...paymentData,
                signature,
                sender: this.userAddress,
            }

            this.ws.send(JSON.stringify(signedPayment))
            console.log(`💸 Sent ${amount} to ${recipient} via Yellow!`)

            return true
        } catch (error) {
            console.error('Failed to send Yellow payment:', error)
            return false
        }
    }

    /**
     * Close a session and settle on-chain
     */
    async closeSession(): Promise<boolean> {
        if (!this.isConnected || !this.sessionId || !this.ws) {
            return false
        }

        try {
            const closeMessage = {
                method: 'close_session',
                params: {
                    sessionId: this.sessionId,
                },
                timestamp: Date.now(),
            }

            this.ws.send(JSON.stringify(closeMessage))
            console.log('📤 Session close request sent')

            return true
        } catch (error) {
            console.error('Failed to close Yellow session:', error)
            return false
        }
    }

    /**
     * Disconnect from Yellow Network
     */
    disconnect(): void {
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
        this.isConnected = false
        this.sessionId = null
        this.messageHandlers.clear()
    }

    /**
     * Get current connection status
     */
    getStatus(): {
        isConnected: boolean
        sessionId: string | null
        userAddress: `0x${string}` | null
    } {
        return {
            isConnected: this.isConnected,
            sessionId: this.sessionId,
            userAddress: this.userAddress,
        }
    }
}

// Singleton instance
let yellowClientInstance: YellowClient | null = null

export function getYellowClient(): YellowClient {
    if (!yellowClientInstance) {
        yellowClientInstance = new YellowClient()
    }
    return yellowClientInstance
}
