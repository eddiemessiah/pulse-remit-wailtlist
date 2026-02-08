// ENS Resolution Service
// Resolves ENS names to addresses and vice versa

import { normalize } from 'viem/ens'
import { createPublicClient, http, namehash as viemNamehash } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

// Public client for ENS resolution (uses mainnet for production ENS)
const ensClient = createPublicClient({
    chain: mainnet,
    transport: http('https://eth.llamarpc.com'),
})

// Sepolia client for testnet ENS
const sepoliaClient = createPublicClient({
    chain: sepolia,
    transport: http('https://rpc.sepolia.org'),
})

export interface ENSProfile {
    name: string | null
    address: `0x${string}` | null
    avatar: string | null
    displayName: string
    isENS: boolean
}

/**
 * Resolve an ENS name to an address
 */
export async function resolveENSName(
    name: string,
    useTestnet = false
): Promise<`0x${string}` | null> {
    try {
        // Normalize the ENS name
        const normalizedName = normalize(name)

        const client = useTestnet ? sepoliaClient : ensClient

        const address = await client.getEnsAddress({
            name: normalizedName,
        })

        return address
    } catch (error) {
        console.error('ENS resolution error:', error)
        return null
    }
}

/**
 * Reverse resolve an address to an ENS name
 */
export async function reverseResolveENS(
    address: `0x${string}`,
    useTestnet = false
): Promise<string | null> {
    try {
        const client = useTestnet ? sepoliaClient : ensClient

        const name = await client.getEnsName({
            address,
        })

        return name
    } catch (error) {
        console.error('ENS reverse resolution error:', error)
        return null
    }
}

/**
 * Get ENS avatar for an address or name
 */
export async function getENSAvatar(
    nameOrAddress: string,
    useTestnet = false
): Promise<string | null> {
    try {
        const client = useTestnet ? sepoliaClient : ensClient

        // If it's an address, first get the name
        let name = nameOrAddress
        if (nameOrAddress.startsWith('0x')) {
            const ensName = await reverseResolveENS(nameOrAddress as `0x${string}`, useTestnet)
            if (!ensName) return null
            name = ensName
        }

        const avatar = await client.getEnsAvatar({
            name: normalize(name),
        })

        return avatar
    } catch (error) {
        console.error('ENS avatar error:', error)
        return null
    }
}

/**
 * Get complete ENS profile for an address
 */
export async function getENSProfile(
    address: `0x${string}`,
    useTestnet = false
): Promise<ENSProfile> {
    const name = await reverseResolveENS(address, useTestnet)
    const avatar = name ? await getENSAvatar(name, useTestnet) : null

    return {
        name,
        address,
        avatar,
        displayName: name || truncateAddress(address),
        isENS: !!name,
    }
}

/**
 * Resolve a recipient (can be ENS name or address)
 */
export async function resolveRecipient(
    recipient: string,
    useTestnet = false
): Promise<{
    address: `0x${string}` | null
    ensName: string | null
    isValid: boolean
}> {
    // Check if it's already an address
    if (recipient.startsWith('0x') && recipient.length === 42) {
        const ensName = await reverseResolveENS(recipient as `0x${string}`, useTestnet)
        return {
            address: recipient as `0x${string}`,
            ensName,
            isValid: true,
        }
    }

    // Check if it looks like an ENS name
    if (recipient.includes('.')) {
        const address = await resolveENSName(recipient, useTestnet)
        return {
            address,
            ensName: address ? recipient : null,
            isValid: !!address,
        }
    }

    return {
        address: null,
        ensName: null,
        isValid: false,
    }
}

/**
 * Compute ENS namehash for a name
 */
export function computeNamehash(name: string): `0x${string}` {
    try {
        const normalizedName = normalize(name)
        return viemNamehash(normalizedName)
    } catch (error) {
        console.error('Namehash error:', error)
        return '0x0000000000000000000000000000000000000000000000000000000000000000'
    }
}

/**
 * Check if a string is a valid ENS name
 */
export function isValidENSName(name: string): boolean {
    try {
        normalize(name)
        return name.includes('.') && !name.startsWith('.') && !name.endsWith('.')
    } catch {
        return false
    }
}

/**
 * Truncate an address for display
 */
export function truncateAddress(address: string): string {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Format a recipient for display (prefers ENS name)
 */
export function formatRecipient(address: string, ensName?: string | null): string {
    if (ensName) return ensName
    return truncateAddress(address)
}
