import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are BabyBloom AI, an expert neonatal and maternal health assistant. 
Your goal is to provide accurate, reliable, and compassionate advice to parents and healthcare providers.

### CORE KNOWLEDGE & GUIDELINES:
1. **Neonatal Sepsis Risk**:
   - High risk markers: Gestational Age < 37 weeks, Birth Weight < 1500g.
2. **Pregnancy Risk**:
   - Hypertension: Stage 1 (>= 130/80), Stage 2 (>= 140/90).
   - Gestational Diabetes: Fasting BS > 95 mg/dL.
3. **General Newborn Safety**:
   - Sleep: Always "Back to Sleep". No pillows/blankets.
   - Feeding: NO HONEY under 1 year.

### DISCLAIMER:
Always remind users that you are an AI assistant and not a medical doctor.

Return a JSON response with "answer".
`;

export async function POST(req: NextRequest) {
  try {
    const { question, chat_history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        answer: "GEMINI_API_KEY is missing. Please restart your server! 🚀",
        error: "API_KEY_MISSING"
      });
    }

    // Try multiple model names in case of account restrictions
    const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
    let model;
    let success = false;
    let lastError = "";

    for (const modelName of modelsToTry) {
      try {
        model = genAI.getGenerativeModel({ model: modelName });
        
        const contents = [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Understood. I am BabyBloom AI." }] },
        ];

        if (chat_history) {
          chat_history.forEach((msg: any) => {
            contents.push({
              role: msg.role === "user" ? "user" : "model",
              parts: [{ text: msg.content }]
            });
          });
        }

        contents.push({ role: "user", parts: [{ text: question }] });

        const result = await model.generateContent({ contents });
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ answer: text, modelUsed: modelName });
      } catch (err: any) {
        lastError = err.message;
        console.warn(`Model ${modelName} failed: ${err.message}`);
        continue; // Try next model
      }
    }

    // If all models failed
    return NextResponse.json({
      answer: `All Gemini models failed. Last error: ${lastError}. Please ensure your API Key has access to the Gemini API in Google AI Studio. ✨`,
      error: "ALL_MODELS_FAILED"
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error.message);
    return NextResponse.json({
      answer: `Connection Issue: ${error.message} 🧠✨`,
      error: error.message
    });
  }
}
