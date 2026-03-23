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
        answer: "GEMINI_API_KEY is missing. Please **RESTART YOUR SERVER** (npm run dev) to load the new environment variables! 🚀",
        error: "API_KEY_MISSING"
      });
    }

    // Direct Fetch to the stable v1 endpoint (more robust than SDK v1beta)
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If Flash fails, try Pro as a fallback on the stable v1 endpoint
      const proUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
      const proRes = await fetch(proUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });
      
      const proData = await proRes.json();
      if (!proRes.ok) {
        throw new Error(proData.error?.message || data.error?.message || "Gemini API rejected the key");
      }
      
      return NextResponse.json({
        answer: proData.candidates[0].content.parts[0].text
      });
    }

    return NextResponse.json({
      answer: data.candidates[0].content.parts[0].text
    });

  } catch (error: any) {
    console.error("Gemini Direct Error:", error.message);
    return NextResponse.json({
      answer: `Gemini Error: ${error.message}. Please ensure the "Generative Language API" is enabled for your API key in the Google Cloud Console or use a key from Google AI Studio. 🧠✨`,
      error: error.message
    });
  }
}
