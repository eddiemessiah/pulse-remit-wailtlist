
import { GoogleGenAI, Type } from "@google/genai";
import { AIPlanningResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "A friendly name for the agent" },
            amount: { type: Type.NUMBER },
            recipient: { type: Type.STRING },
            frequency: { type: Type.STRING, enum: ["once", "daily", "weekly", "monthly"] },
            sourceChain: { type: Type.STRING },
            destChain: { type: Type.STRING },
            actionRequired: { type: Type.STRING, description: "Brief summary of what will happen" }
          },
          required: ["name", "amount", "recipient", "frequency", "sourceChain", "destChain", "actionRequired"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as AIPlanningResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
