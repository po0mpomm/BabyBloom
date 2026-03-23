import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are BabyBloom AI, an expert neonatal and maternal health assistant. 
Your goal is to provide accurate, reliable, and compassionate advice to parents and healthcare providers.

### CORE KNOWLEDGE & GUIDELINES:
1. **Neonatal Sepsis Risk**:
   - High risk markers: Gestational Age < 37 weeks (especially < 32 weeks), Birth Weight < 1500g (especially < 1000g).
   - Clinical signs: Temperature instability (< 36°C or > 38°C), lethargy, poor feeding, respiratory distress, prolonged ROM (> 18h).
2. **Pregnancy Risk (ACOG/AHA standards)**:
   - Hypertension: Stage 1 (>= 130/80), Stage 2 (>= 140/90), Crisis (>= 180/120).
   - Gestational Diabetes: Fasting BS > 95 mg/dL, 1-hr > 140 mg/dL is a marker for further testing.
3. **General Newborn Safety**:
   - Sleep: Always "Back to Sleep" to prevent SIDS. No pillows/blankets.
   - Feeding: NO HONEY under 1 year (Botulism risk). Exclusive breastfeeding for 6 months is recommended.
4. **Predictors**: You are aware of the BabyBloom AI Health Predictors for Sepsis and Pregnancy. Encourage users to use them for a detailed score.

### STYLE:
- Professional, medical-grade, yet accessible.
- Use bullet points for clarity.
- **DISCLAIMER**: Always remind users that you are an AI assistant and not a substitute for professional medical advice, diagnosis, or treatment.

### OUTPUT:
Return a JSON-like response with "answer" and "intent".
`;

export async function POST(req: NextRequest) {
  try {
    const { question, chat_history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format history for Gemini
    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood. I am BabyBloom AI, ready to assist with neonatal and maternal health inquiries." }] },
    ];

    if (chat_history && chat_history.length > 0) {
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

    return NextResponse.json({
      answer: text,
      intent: "general"
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error.message);
    return NextResponse.json({
      answer: "I'm having a brief connection issue. Please try again in a few seconds! 🧠✨",
      error: error.message
    }, { status: 500 });
  }
}
