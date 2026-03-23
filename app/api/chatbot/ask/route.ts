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

    // Specific check for API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        answer: "GEMINI_API_KEY is not loaded yet. Please **RESTART YOUR SERVER** (npm run dev) to load the new environment variables! 🚀",
        error: "API_KEY_MISSING"
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    return NextResponse.json({ answer: text });
  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    return NextResponse.json({
      answer: "I'm having a brief connection issue. Please try again in a few seconds! 🧠✨",
      error: error.message
    });
  }
}
