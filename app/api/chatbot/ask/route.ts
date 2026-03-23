import { NextRequest, NextResponse } from "next/server";

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
`;

export async function POST(req: NextRequest) {
  try {
    const { question, chat_history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "GEMINI_API_KEY is missing. Please **RESTART YOUR SERVER** (npm run dev)! 🚀",
        error: "API_KEY_MISSING"
      });
    }

    // Using the recommended v1beta endpoint and gemini-1.5-flash model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood. I am BabyBloom AI, your neonatal health assistant." }] },
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

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini API Error");
    }

    return NextResponse.json({
      answer: data.candidates[0].content.parts[0].text
    });

  } catch (error: any) {
    console.error("Gemini Final Error:", error.message);
    return NextResponse.json({
      answer: `Gemini Error: ${error.message}. Please ensure your API key from Google AI Studio is correct! 🧠✨`,
      error: error.message
    });
  }
}
