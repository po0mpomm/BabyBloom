import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are BabyBloom AI, a high-performance neonatal and maternal health assistant. 
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
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "GROQ_API_KEY is missing. Please **RESTART YOUR SERVER** (npm run dev)! 🚀",
        error: "API_KEY_MISSING"
      });
    }

    // Using Groq's LPU-accelerated Llama model for near-instant response
    const url = "https://api.groq.com/openai/v1/chat/completions";

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (chat_history) {
      chat_history.forEach((msg: any) => {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content
        });
      });
    }

    messages.push({ role: "user", content: question });

    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile", // Powerful and incredibly fast
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Groq API Error");
    }

    return NextResponse.json({
      answer: data.choices[0].message.content
    });

  } catch (error: any) {
    console.error("Groq API Error:", error.message);
    return NextResponse.json({
      answer: `Groq Error: ${error.message}. Please ensure your Groq API key is correct! 🚀✨`,
      error: error.message
    });
  }
}
