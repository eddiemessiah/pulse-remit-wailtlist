import { GoogleGenerativeAI } from '@google/generative-ai'
import { AIPlanningResponse, RemittanceAgent } from '@/types'
import { resolveRecipient } from '@/services/ens/resolver'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const SYSTEM_PROMPT = `
You are Pulse Agent, an expert AI remittance planner.
Your goal is to parse user intents into structured remittance plans.

Users will ask things like:
- "Send $50 to mom.eth every week from Base"
- "Bridge 100 USDC from Eth to Op for tuition"
- "Create a family channel for my sister"

Extract the following JSON structure:
{
  "sourceChain": "string (e.g. Base, Ethereum, Optimism, Arbitrum)",
  "destChain": "string (e.g. Base, Ethereum, Optimism, Arbitrum)",
  "amount": "number",
  "token": "string (default: USDC)",
  "frequency": "string (one-time, daily, weekly, monthly)",
  "recipient": "string (ENS or address)",
  "type": "string (direct, bridge, channel)"
}

Rules:
1. Default to "USDC" if token not specified.
2. Default to "Base" if source chain not specified.
3. Default to "one-time" if frequency not specified.
4. If source == dest, type is "direct".
5. If source != dest, type is "bridge".
6. If frequency != "one-time", type is "channel" (Yellow Network).
7. Return ONLY the JSON object, no markdown.
`

export async function parseRemittanceRequest(prompt: string): Promise<AIPlanningResponse | null> {
    try {
        const result = await model.generateContent([
            { text: SYSTEM_PROMPT },
            { text: `User Request: "${prompt}"` }
        ])

        const response = await result.response
        const text = response.text()

        // Clean up potential markdown formatting
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
        const plan = JSON.parse(jsonStr)

        // Enhance with ENS resolution if possible (simulated or real)
        // In a real agent, we might do a tool call here
        // For now we just return the plan and let the frontend validate

        return {
            sourceChain: plan.sourceChain,
            destChain: plan.destChain,
            amount: plan.amount,
            token: plan.token,
            frequency: plan.frequency,
            recipient: plan.recipient,
            // Map the type field if needed or handle logic in component
        }

    } catch (error) {
        console.error('Gemini parsing error:', error)
        return null
    }
}

export async function enhancePlanWithEns(plan: AIPlanningResponse) {
    const { address, ensName, isValid } = await resolveRecipient(plan.recipient)

    if (isValid && address) {
        return {
            ...plan,
            recipientAddress: address,
            recipientEns: ensName || plan.recipient
        }
    }
    return plan
}
