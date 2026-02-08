import {
    createPublicClient,
    createWalletClient,
    custom,
    http,
    PublicClient,
    WalletClient,
    Address
} from 'viem'
import { baseSepolia } from 'viem/chains'
import { CONTRACT_ADDRESSES } from '@/lib/config'
import AgentFactoryABI from './abis/AgentFactory.json'

export class AgentFactoryService {
    private publicClient
    private walletClient: WalletClient | null = null

    constructor() {
        this.publicClient = createPublicClient({
            chain: baseSepolia,
            transport: http()
        })
    }

    async setWalletClient(client: WalletClient) {
        this.walletClient = client
    }

    /**
     * Create a new agent for the user
     */
    async createAgent() {
        if (!this.walletClient || !this.walletClient.account) throw new Error('Wallet not connected')

        try {
            const { request } = await this.publicClient.simulateContract({
                account: this.walletClient.account,
                address: CONTRACT_ADDRESSES.AGENT_FACTORY as Address,
                abi: AgentFactoryABI,
                functionName: 'createAgent',
                args: [this.walletClient.account.address || this.walletClient.account, CONTRACT_ADDRESSES.REMITTANCE_VAULT]
            })

            const hash = await this.walletClient.writeContract(request)
            return hash
        } catch (error) {
            console.error('Create agent error:', error)
            throw error
        }
    }

    /**
     * Get user's agent address
     */
    async getAgent(userAddress: Address): Promise<Address | null> {
        try {
            const agent = await this.publicClient.readContract({
                address: CONTRACT_ADDRESSES.AGENT_FACTORY as Address,
                abi: AgentFactoryABI,
                functionName: 'getAgent',
                args: [userAddress]
            }) as Address

            if (agent === '0x0000000000000000000000000000000000000000') return null
            return agent
        } catch (error) {
            console.error('Get agent error:', error)
            return null
        }
    }
}

export const agentFactoryService = new AgentFactoryService()
