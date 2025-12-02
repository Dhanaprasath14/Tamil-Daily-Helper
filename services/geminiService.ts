import { GoogleGenAI, Type } from "@google/genai";
import { WritingResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

export const translateText = async (text: string): Promise<string> => {
  if (!text.trim()) return "";
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `You are a helpful Tamil-English translator. 
      Detect the language of the following text. 
      If it is in Tamil, translate it to English. 
      If it is in English, translate it to Tamil. 
      Return ONLY the translated text, nothing else.
      
      Text: "${text}"`,
    });
    return response.text || "Translation failed.";
  } catch (error) {
    console.error("Translation error:", error);
    return "Error translating text. Please try again.";
  }
};

export const generateWriting = async (type: string, topic: string): Promise<WritingResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Write a ${type} about "${topic}".
      I need two versions:
      1. A professional/polite version in English.
      2. A professional/polite version in Tamil.
      
      Ensure the tone is respectful and clear.
      
      Return the output as a JSON object with keys "english" and "tamil".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            english: { type: Type.STRING },
            tamil: { type: Type.STRING }
          },
          required: ["english", "tamil"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text) as WritingResponse;
  } catch (error) {
    console.error("Writing error:", error);
    return { english: "Error generating text.", tamil: "Error generating text." };
  }
};

export const explainConcept = async (query: string): Promise<WritingResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Explain the concept "${query}".
      
      Requirements:
      1. Explanation in Simple Tamil (easy to understand, like for a 6th grade student).
      2. Explanation in clear English.
      3. Keep it brief and friendly.
      
      Return the output as a JSON object with keys "english" and "tamil".`,
       config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            english: { type: Type.STRING },
            tamil: { type: Type.STRING }
          },
          required: ["english", "tamil"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text) as WritingResponse;
  } catch (error) {
    console.error("Explanation error:", error);
    return { english: "Error generating explanation.", tamil: "Error generating explanation." };
  }
};

export const getGovtHelp = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Provide a helpful guide or explanation for: "${query}" in the context of Indian Government services or Jobs in Tamil Nadu.
      
      Format:
      - Use clear headings (English & Tamil mixed is okay if helpful).
      - Step-by-step instructions.
      - Explain technical terms (like PF, ESI, Challan) simply in Tamil.
      - Be polite and encouraging.
      - Return the result in Markdown format.
      `,
    });
    return response.text || "No information found.";
  } catch (error) {
    console.error("Govt help error:", error);
    return "Error fetching information. Please check your connection.";
  }
};

export const sendChatMessage = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: history,
      config: {
        systemInstruction: "You are a friendly, polite, and helpful assistant called 'Tamil Helper'. You speak both Tamil and English fluently. Your answers should be clear, respectful, and easy to understand for everyone. Avoid slang. Always try to be helpful."
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I am having trouble connecting right now.";
  }
};