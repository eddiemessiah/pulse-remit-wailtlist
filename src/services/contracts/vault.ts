import {
    createPublicClient,
    createWalletClient,
    custom,
    http,
    parseAbiItem,
    encodeFunctionData,
    PublicClient,
    WalletClient,
    Address
} from 'viem'
import { baseSepolia } from 'viem/chains'
import { CONTRACT_ADDRESSES } from '@/lib/config'
import RemittanceVaultABI from './abis/RemittanceVault.json'

export class VaultService {
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
     * Create a new remittance plan
     */
    async createPlan(
        recipient: Address,
        amount: bigint,
        interval: bigint,
        ensNode: `0x${string}`
    ) {
        if (!this.walletClient || !this.walletClient.account) throw new Error('Wallet not connected')

        try {
            // First approve the vault to spend USDC
            // This would typically be a separate tx or part of a multicall, 
            // simplified here for the service structure

            const { request } = await this.publicClient.simulateContract({
                account: this.walletClient.account,
                address: CONTRACT_ADDRESSES.REMITTANCE_VAULT as Address,
                abi: RemittanceVaultABI,
                functionName: 'createPlan',
                args: [recipient, amount, interval, ensNode]
            })

            const hash = await this.walletClient.writeContract(request)
            return hash
        } catch (error) {
            console.error('Create plan error:', error)
            throw error
        }
    }

    /**
     * Get plan details
     */
    async getPlan(planId: bigint) {
        try {
            const plan = await this.publicClient.readContract({
                address: CONTRACT_ADDRESSES.REMITTANCE_VAULT as Address,
                abi: RemittanceVaultABI,
                functionName: 'plans',
                args: [planId]
            })
            return plan
        } catch (error) {
            console.error('Get plan error:', error)
            return null
        }
    }

    /**
     * Top up an existing plan
     */
    async topUpPlan(planId: bigint, amount: bigint) {
        if (!this.walletClient || !this.walletClient.account) throw new Error('Wallet not connected')

        try {
            const { request } = await this.publicClient.simulateContract({
                account: this.walletClient.account,
                address: CONTRACT_ADDRESSES.REMITTANCE_VAULT as Address,
                abi: RemittanceVaultABI,
                functionName: 'topUpPlan',
                args: [planId, amount]
            })

            const hash = await this.walletClient.writeContract(request)
            return hash
        } catch (error) {
            console.error('Top up error:', error)
            throw error
        }
    }

    /**
   * Cancel a plan
   */
    async cancelPlan(planId: bigint) {
        if (!this.walletClient || !this.walletClient.account) throw new Error('Wallet not connected')

        try {
            const { request } = await this.publicClient.simulateContract({
                account: this.walletClient.account,
                address: CONTRACT_ADDRESSES.REMITTANCE_VAULT as Address,
                abi: RemittanceVaultABI,
                functionName: 'cancelPlan',
                args: [planId]
            })

            const hash = await this.walletClient.writeContract(request)
            return hash
        } catch (error) {
            console.error('Cancel plan error:', error)
            throw error
        }
    }
}

export const vaultService = new VaultService()
