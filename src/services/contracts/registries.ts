
import {
    createPublicClient,
    http,
    PublicClient,
    Address
} from 'viem'
import { baseSepolia } from 'viem/chains'
import { CONTRACT_ADDRESSES } from '@/lib/config'
import AgentRegistryABI from './abis/AgentRegistry.json'
import IdentityRegistryABI from './abis/IdentityRegistry.json'

export class RegistryService {
    private publicClient

    constructor() {
        this.publicClient = createPublicClient({
            chain: baseSepolia,
            transport: http()
        })
    }

    // --- Agent Registry ---

    async isAgent(address: Address): Promise<boolean> {
        try {
            const isAgent = await this.publicClient.readContract({
                address: CONTRACT_ADDRESSES.AGENT_REGISTRY as Address,
                abi: AgentRegistryABI,
                functionName: 'isAgent',
                args: [address]
            }) as boolean
            return isAgent
        } catch (error) {
            console.error('Check agent error:', error)
            return false
        }
    }

    async getAgentDailyLimit(address: Address): Promise<bigint> {
        try {
            const limit = await this.publicClient.readContract({
                address: CONTRACT_ADDRESSES.AGENT_REGISTRY as Address,
                abi: AgentRegistryABI,
                functionName: 'agentDailyLimits',
                args: [address]
            }) as bigint
            return limit
        } catch (error) {
            console.error('Get agent limit error:', error)
            return 0n
        }
    }

    // --- Identity Registry ---

    async isEnsApproved(account: Address, node: `0x${string}`): Promise<boolean> {
        try {
            const isApproved = await this.publicClient.readContract({
                address: CONTRACT_ADDRESSES.IDENTITY_REGISTRY as Address,
                abi: IdentityRegistryABI,
                functionName: 'isApproved',
                args: [account, node]
            }) as boolean
            return isApproved
        } catch (error) {
            console.error('Check ENS approval error:', error)
            return false
        }
    }
}

export const registryService = new RegistryService()
