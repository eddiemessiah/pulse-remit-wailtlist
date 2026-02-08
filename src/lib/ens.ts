/**
 * ENS Resolution Utilities
 * Provides ENS name resolution, avatar fetching, and text record retrieval
 */

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from 'viem/ens'

// Public client for ENS resolution (mainnet has the ENS registry)
const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
        ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        : 'https://eth.llamarpc.com'
    ),
})

/**
 * Resolve an ENS name to an Ethereum address
 * @param ensName - The ENS name (e.g., "vitalik.eth")
 * @returns The resolved Ethereum address or null if not found
 */
export async function resolveENSName(ensName: string): Promise<`0x${string}` | null> {
    try {
        const normalizedName = normalize(ensName)
        const address = await publicClient.getEnsAddress({
            name: normalizedName,
        })
        return address
    } catch (error) {
        console.error('ENS resolution error:', error)
        return null
    }
}

/**
 * Reverse resolve an Ethereum address to an ENS name
 * @param address - The Ethereum address
 * @returns The ENS name or null if not found
 */
export async function reverseResolveENS(address: `0x${string}`): Promise<string | null> {
    try {
        const name = await publicClient.getEnsName({
            address,
        })
        return name
    } catch (error) {
        console.error('ENS reverse resolution error:', error)
        return null
    }
}

/**
 * Get the avatar URL for an ENS name
 * @param ensName - The ENS name
 * @returns The avatar URL or null if not set
 */
export async function getENSAvatar(ensName: string): Promise<string | null> {
    try {
        const normalizedName = normalize(ensName)
        const avatar = await publicClient.getEnsAvatar({
            name: normalizedName,
        })
        return avatar
    } catch (error) {
        console.error('ENS avatar error:', error)
        return null
    }
}

/**
 * Get a text record for an ENS name
 * @param ensName - The ENS name
 * @param key - The text record key (e.g., "description", "url", "email")
 * @returns The text record value or null if not set
 */
export async function getENSTextRecord(ensName: string, key: string): Promise<string | null> {
    try {
        const normalizedName = normalize(ensName)
        const text = await publicClient.getEnsText({
            name: normalizedName,
            key,
        })
        return text
    } catch (error) {
        console.error('ENS text record error:', error)
        return null
    }
}

/**
 * Get all common text records for an ENS name
 * @param ensName - The ENS name
 * @returns Object containing common text records
 */
export async function getENSProfile(ensName: string): Promise<{
    address: `0x${string}` | null
    avatar: string | null
    description: string | null
    url: string | null
    twitter: string | null
    github: string | null
    email: string | null
}> {
    const address = await resolveENSName(ensName)
    const avatar = await getENSAvatar(ensName)

    const [description, url, twitter, github, email] = await Promise.all([
        getENSTextRecord(ensName, 'description'),
        getENSTextRecord(ensName, 'url'),
        getENSTextRecord(ensName, 'com.twitter'),
        getENSTextRecord(ensName, 'com.github'),
        getENSTextRecord(ensName, 'email'),
    ])

    return {
        address,
        avatar,
        description,
        url,
        twitter,
        github,
        email,
    }
}

/**
 * Validate if a string is a valid ENS name format
 * @param name - The name to validate
 * @returns Whether the name is a valid ENS format
 */
export function isValidENSName(name: string): boolean {
    // Basic ENS name validation
    const ensPattern = /^[a-zA-Z0-9-]+\.eth$/
    return ensPattern.test(name)
}

/**
 * Check if a string looks like an ENS name
 * @param input - The input string
 * @returns Whether it looks like an ENS name
 */
export function looksLikeENS(input: string): boolean {
    return input.includes('.') && (
        input.endsWith('.eth') ||
        input.endsWith('.xyz') ||
        input.endsWith('.com') ||
        input.endsWith('.org')
    )
}

/**
 * Format an ENS name or address for display
 * @param nameOrAddress - ENS name or address
 * @param maxLength - Maximum display length
 * @returns Formatted display string
 */
export function formatENSOrAddress(nameOrAddress: string, maxLength: number = 20): string {
    if (nameOrAddress.endsWith('.eth')) {
        // It's an ENS name
        if (nameOrAddress.length <= maxLength) {
            return nameOrAddress
        }
        return `${nameOrAddress.slice(0, maxLength - 3)}...`
    }

    // It's an address - show first 6 and last 4 characters
    if (nameOrAddress.length === 42) {
        return `${nameOrAddress.slice(0, 6)}...${nameOrAddress.slice(-4)}`
    }

    return nameOrAddress
}
