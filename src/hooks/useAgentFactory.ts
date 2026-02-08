
import { useState } from 'react'
import { agentFactoryService } from '@/services/contracts/factory'
import { useWalletClient } from 'wagmi'

export function useAgentFactory() {
    const { data: walletClient } = useWalletClient()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createAgent = async () => {
        if (!walletClient) {
            console.error("Wallet not connected")
            return null
        }

        setLoading(true)
        setError(null)

        try {
            await agentFactoryService.setWalletClient(walletClient)
            const hash = await agentFactoryService.createAgent()

            console.log("Agent creation transaction sent:", hash)

            return hash
        } catch (err: any) {
            console.error("Failed to create agent:", err)
            const msg = err.message || "Failed to create agent"
            setError(msg)
            return null
        } finally {
            setLoading(false)
        }
    }

    const [agentAddress, setAgentAddress] = useState<string | null>(null)

    const checkAgent = async (address: string) => {
        const agent = await agentFactoryService.getAgent(address as any)
        if (agent) setAgentAddress(agent)
        return agent
    }

    return {
        createAgent,
        checkAgent,
        agentAddress,
        loading,
        error
    }
}
