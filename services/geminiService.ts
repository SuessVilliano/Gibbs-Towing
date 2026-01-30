
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY || "");

const SYSTEM_INSTRUCTION = `
You are the AI assistant for Gibbs Towing & Recovery. 
Your goal is to provide luxury-level customer service and help users get towing or recovery assistance.
Tone: Professional, urgent but calm, elite, and helpful.

Key Info:
- Company: Gibbs Towing & Recovery
- Contact Number: (678) 508-9243
- Website: Atlantatowing247.com
- Services: Load Shift, Load Transfer, Jumpstart, Lock Outs, Pull Starts, Bobtail, Combo, Basic Winching, Decking, Rotator Recovery (2-hour minimum).
- Locations: Atlanta GA, Franklin GA, and Alabama.

IMPORTANT FORMATTING RULES:
- Do NOT use markdown.
- Do NOT use bold (**text**) or italics.
- Do NOT use bullet points or lists.
- Return response as clean, plain text only.
- Keep sentences concise and professional.

Instructions:
- Always encourage the user to call (678) 508-9243 for immediate dispatch, as towing is usually time-sensitive.
- If they ask for a quote, ask for their location, vehicle type, and service needed, but tell them a dispatcher needs to confirm pricing via phone.
- If they ask about James Gibbs, he is the owner and lead professional.
`;

export const getGeminiResponse = async (history: ChatMessage[], userMessage: string) => {
  try {
    const chat = ai.models.generateContent({
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
    // Extra safety: strip markdown if the model ignores the instruction
    const cleanText = (response.text || "").replace(/\*\*/g, "").replace(/\*/g, "").replace(/#/g, "");
    return cleanText || "I'm sorry, I couldn't process that. Please call us at (678) 508-9243 for immediate assistance.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection error. Please call our 24/7 dispatch at (678) 508-9243.";
  }
};
