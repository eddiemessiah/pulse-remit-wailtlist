'use client'

import { useState } from 'react'
import { liFiService, BridgeQuoteParams } from '@/services/lifi/bridge'
import { Route } from '@lifi/sdk'

export function useLiFiBridge() {
    const [loading, setLoading] = useState(false)
    const [quote, setQuote] = useState<Route | null>(null)
    const [error, setError] = useState<string | null>(null)

    const getBridgeQuote = async (params: BridgeQuoteParams) => {
        setLoading(true)
        setError(null)
        try {
            const route = await liFiService.getQuote(params)
            setQuote(route)
            return route
        } catch (err) {
            console.error('Bridge quote error:', err)
            setError('Failed to fetch bridge quote')
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        getBridgeQuote,
        quote,
        loading,
        error
    }
}
