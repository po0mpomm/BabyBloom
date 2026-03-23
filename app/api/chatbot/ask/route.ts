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
        answer: "GROQ_API_KEY is missing. Please restart your server! 🚀",
        error: "API_KEY_MISSING"
      });
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";

    const baseMessages = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (chat_history) {
      chat_history.forEach((msg: any) => {
        baseMessages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content
        });
      });
    }

    baseMessages.push({ role: "user", content: question });

    // Try current flagship models, then reliable fallbacks
    const modelsToTry = [
      "llama-3.3-70b-versatile", // Latest flagship
      "llama-3.1-70b-versatile", // Re-checking in case it was a transient error or alias
      "llama3-70b-8192",         // Super stable legacy
      "llama-3.1-8b-instant"     // Always available fallback
    ];

    let lastError = "";

    for (const modelId of modelsToTry) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelId,
            messages: baseMessages,
            temperature: 0.7,
            max_tokens: 1024,
          }),
        });

        const data = await response.json();

        if (response.ok && data.choices?.[0]?.message?.content) {
          return NextResponse.json({
            answer: data.choices[0].message.content,
            modelUsed: modelId
          });
        } else {
          lastError = data.error?.message || "Unknown Error";
          console.warn(`Model ${modelId} failed: ${lastError}`);
        }
      } catch (e: any) {
        lastError = e.message;
        continue;
      }
    }

    throw new Error(`All Groq models failed. Last error: ${lastError}`);

  } catch (error: any) {
    console.error("Groq Final Error:", error.message);
    return NextResponse.json({
      answer: `Chatbot Error: ${error.message}. Please check your Groq API console. 🚀✨`,
      error: error.message
    });
  }
}
