
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { AIPlanningResponse } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Pulse AI, the engine for Pulse Remit. Your job is to parse user natural language requests for setting up remittance agents.
You must identify:
1. Amount (number)
2. Recipient ENS (e.g., chidi.ens)
3. Frequency (once, daily, weekly, monthly)
4. Source Chain (Ethereum, Base, Optimism, Polygon)
5. Destination Chain (Ethereum, Base, Optimism, Polygon)

If information is missing, use sensible defaults (Frequency: weekly, Source: Base, Dest: Optimism).
Response MUST be in JSON.
`;

export const parseRemittanceRequest = async (prompt: string): Promise<AIPlanningResponse | null> => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT
        });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        name: { type: SchemaType.STRING, description: "A friendly name for the agent" },
                        amount: { type: SchemaType.NUMBER },
                        recipient: { type: SchemaType.STRING },
                        frequency: {
                            type: SchemaType.STRING,
                            enum: ["once", "daily", "weekly", "monthly"],
                            format: "enum"
                        },
                        sourceChain: { type: SchemaType.STRING },
                        destChain: { type: SchemaType.STRING },
                        actionRequired: { type: SchemaType.STRING, description: "Brief summary of what will happen" }
                    },
                    required: ["name", "amount", "recipient", "frequency", "sourceChain", "destChain", "actionRequired"]
                }
            }
        });

        const text = result.response.text();
        if (!text) return null;
        return JSON.parse(text) as AIPlanningResponse;
    } catch (error) {
        console.error("Gemini Error:", error);
        return null;
    }
};
