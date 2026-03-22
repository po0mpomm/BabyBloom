import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { age, systolicBP, diastolicBP, bloodSugar, bodyTemp, heartRate } = body;

    let riskScore = 0;
    const recommendations: string[] = [
      "Schedule a follow-up with your obstetrician to discuss these results.",
      "Maintain a balanced diet and stay hydrated.",
    ];

    // 1. Age (Extremes of reproductive age)
    if (age > 35) {
      riskScore += 15;
      recommendations.push("Advanced Maternal Age (>35): Increased risk of chromosomal abnormalities and gestational complications.");
    } else if (age < 18) {
      riskScore += 10;
      recommendations.push("Adolescent Pregnancy (<18): Higher risk of preterm birth and preeclampsia.");
    }

    // 2. Blood Pressure (Based on AHA/ACOG guidelines)
    // Severe Hypertension
    if (systolicBP >= 160 || diastolicBP >= 110) {
      riskScore += 40;
      recommendations.push("URGENT: Severe Hypertension detected. Seek immediate medical attention to rule out preeclampsia/eclampsia.");
    } 
    // Stage 2 Hypertension
    else if (systolicBP >= 140 || diastolicBP >= 90) {
      riskScore += 25;
      recommendations.push("Hypertension Stage 2: Requires close monitoring and potential medical management.");
    }
    // Stage 1 Hypertension
    else if (systolicBP >= 130 || diastolicBP >= 80) {
      riskScore += 10;
      recommendations.push("Hypertension Stage 1: Monitor BP daily and reduce sodium intake.");
    }

    // 3. Blood Sugar (mmol/L) - Gestational Diabetes (GDM) Risk
    if (bloodSugar > 10.0) {
      riskScore += 30;
      recommendations.push("Significant Hyperglycemia: High risk of Gestational Diabetes. Urgent glucose tolerance testing (OGTT) advised.");
    } else if (bloodSugar >= 7.8) {
      riskScore += 15;
      recommendations.push("Elevated Blood Sugar: Borderline GDM risk. Monitor carbohydrate intake.");
    }

    // 4. Body Temperature
    if (bodyTemp > 100.4) {
      riskScore += 15;
      recommendations.push("Fever detected: Infection during pregnancy requires prompt evaluation to protect fetal health.");
    }

    // 5. Heart Rate
    if (heartRate > 100) {
      riskScore += 10;
      recommendations.push("Tachycardia: Can be related to stress, dehydration, or underlying cardiovascular strain.");
    }

    // Calculate level
    let riskLevel: "Low" | "Moderate" | "High" = "Low";
    if (riskScore >= 40) riskLevel = "High";
    else if (riskScore >= 15) riskLevel = "Moderate";

    if (riskScore < 15) {
      recommendations.push("Continue routine prenatal vitamins and regular check-ups.");
    }

    return NextResponse.json({
      riskScore: Math.min(riskScore, 100),
      riskLevel,
      recommendations: Array.from(new Set(recommendations)),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process prediction" }, { status: 500 });
  }
}
