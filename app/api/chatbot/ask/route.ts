import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const question = body.question || "";
    
    // Convert to lowercase for easier keyword matching
    const lowerQ = question.toLowerCase();

    // Check if the question is at all relevant to maternal or newborn health
    const isRelevant = 
      lowerQ.includes("maternal") || 
      lowerQ.includes("health") || 
      lowerQ.includes("baby") || 
      lowerQ.includes("mother") || 
      lowerQ.includes("pregnancy") ||
      lowerQ.includes("pregnant") ||
      lowerQ.includes("newborn") ||
      lowerQ.includes("postpartum") ||
      lowerQ.includes("breastfeeding") ||
      lowerQ.includes("infant") ||
      lowerQ.includes("neonatal") ||
      lowerQ.includes("birth") ||
      lowerQ.includes("pediatrician");

    // Enforce strict out-of-bounds rule
    if (!isRelevant) {
      return NextResponse.json({
        answer: "My system is developed to answer on Maternal health and newborn health.",
        modelUsed: "hardcoded"
      });
    }

    // Hardcoded responses for known contexts
    if (lowerQ.includes("fever") || lowerQ.includes("temperature")) {
      return NextResponse.json({
        answer: "For a newborn, any fever (rectal temperature of 100.4°F/38°C or higher) is a medical emergency. Please contact your pediatrician or go to the emergency room immediately. (Note: AI is not a substitute for medical advice.)",
        modelUsed: "hardcoded"
      });
    }

    if (lowerQ.includes("sleep")) {
      return NextResponse.json({
        answer: "Remember the 'ABC's of Safe Sleep: Babies should sleep Alone, on their Backs, in a empty Crib. Keep soft objects, toys, and loose bedding out of the crib to reduce the risk of SIDS.",
        modelUsed: "hardcoded"
      });
    }

    if (lowerQ.includes("breastfeed") || lowerQ.includes("milk") || lowerQ.includes("feed")) {
      return NextResponse.json({
        answer: "Breastfeeding should ideally be exclusive for the first 6 months. Feed your baby on demand, typically 8 to 12 times a day. If you experience severe pain or your baby isn't gaining weight, consult a lactation consultant or pediatrician.",
        modelUsed: "hardcoded"
      });
    }

    if (lowerQ.includes("sepsis") || lowerQ.includes("infection")) {
      return NextResponse.json({
        answer: "Neonatal Sepsis requires immediate medical attention. High risk markers include Gestational Age < 37 weeks and Birth Weight < 1500g. Please consult a doctor.",
        modelUsed: "hardcoded"
      });
    }

    if (lowerQ.includes("hypertension") || lowerQ.includes("blood pressure")) {
      return NextResponse.json({
        answer: "Pregnancy Risk: Hypertension (>= 140/90) or Gestational Diabetes (Fasting BS > 95) requires careful monitoring. Contact your healthcare provider.",
        modelUsed: "hardcoded"
      });
    }

    // Default relevant response
    return NextResponse.json({
      answer: "This is a generalized response for maternal and newborn health. Please consult with your healthcare provider or pediatrician for specific medical concerns and advice. We recommend always seeking professional help for newborn care.",
      modelUsed: "hardcoded"
    });

  } catch (error: any) {
    console.error("Chatbot Error:", error.message);
    return NextResponse.json({
      answer: `Chatbot Error: ${error.message}. Please try again later.`,
      error: error.message
    });
  }
}
