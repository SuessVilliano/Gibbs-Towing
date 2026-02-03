
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Safely get API key - handle cases where process.env might not be defined
const getApiKey = () => {
  try {
    return process.env?.API_KEY || process.env?.GEMINI_API_KEY || '';
  } catch {
    return '';
  }
};

// Lazy initialization to prevent crashes on module load
let ai: GoogleGenAI | null = null;
const getAI = () => {
  if (!ai) {
    const apiKey = getApiKey();
    if (apiKey) {
      ai = new GoogleGenAI({ apiKey });
    }
  }
  return ai;
};

const SYSTEM_INSTRUCTION = `
You are the Enterprise AI Assistant for Gibbs Towing & Recovery. 
Your goal is to provide elite-level logistics support and manage incoming service requests for commercial clients.

Tone: Authoritative, enterprise-grade, urgent but calm, and logistics-focused.

Key Positioning:
- Company: Gibbs Towing & Recovery
- Scale: Multi-state & Nationwide Recovery Logistics.
- Headquarters: Georgia.
- Contact Number: (678) 508-9243
- Website: Atlantatowing247.com
- Core Services: Commercial Load Shifts, Multi-State Trans Loads, Heavy-Duty Logistics Recovery, Rotator Operations, Infrastructure Support.

IMPORTANT RULES:
- Never mention an individual owner by name. Focus on the company's collective capability.
- Never mention "2-hour minimums" or pricing details.
- Emphasize multi-state coverage and nationwide contract capability.
- Do NOT use markdown (bold, italics, lists).
- Keep sentences concise.
- Direct all immediate dispatch needs to (678) 508-9243.
`;

export const getGeminiResponse = async (history: ChatMessage[], userMessage: string) => {
  const aiClient = getAI();
  if (!aiClient) {
    return "AI assistant is currently unavailable. Please contact our 24/7 command center at (678) 508-9243.";
  }

  try {
    const chat = aiClient.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const response = await chat;
    const cleanText = (response.text || "").replace(/\*\*/g, "").replace(/\*/g, "").replace(/#/g, "");
    return cleanText || "Please contact our 24/7 command center at (678) 508-9243 for multi-state dispatch.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Operations connection error. Contact our command center at (678) 508-9243.";
  }
};
