import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are BabyBloom AI, a specialized medical assistant dedicated SOLELY to **Maternal Health** and **Newborn Health**.

### STRICT SCOPE RULE:
1. **ONLY** answer questions related to Maternal Health (pregnancy, prenatal care, postpartum) and Newborn Health (neonatal care, infant safety, breastfeeding, common baby illnesses).
2. For **ANY** other topic (e.g., weather, general politics, sports, general technology, jokes, or even other medical fields like adult surgery or dentistry), you must directly reply with:
   "My system is developed to answer on Maternal health and newborn health."
3. Do not engage in small talk or provide opinions on unauthorized topics.

### CORE KNOWLEDGE (ONLY used for Maternal/Newborn queries):
- Neonatal Sepsis: High risk markers include Gestational Age < 37 weeks, Birth Weight < 1500g.
- Pregnancy Risk: Hypertension (>= 140/90), Gestational Diabetes (Fasting BS > 95).
- Newborn Safety: "Back to Sleep", NO HONEY under 1 year.

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
      "llama-3.3-70b-versatile", 
      "llama-3.1-70b-versatile", 
      "llama3-70b-8192",         
      "llama-3.1-8b-instant"     
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
            temperature: 0.1, // Lower temperature for stricter adherence to the prompt
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
