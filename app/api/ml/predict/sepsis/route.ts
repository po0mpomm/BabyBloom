import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      gestationalAge, birthWeight, temperature, heartRate, respiratoryRate,
      wbcCount, anc, crp, plateletCount, bloodGlucose,
      maternalGBS, prolongedROM, apgarScore
    } = body;

    let riskScore = 0;
    const recommendations: string[] = [
      "Consult a neonatologist immediately for a comprehensive evaluation.",
      "Monitor vital signs (heart rate, temperature, respiratory rate) every 1-2 hours.",
    ];

    // 1. Gestational Age & Birth Weight (Major risk factors)
    if (gestationalAge < 32) {
      riskScore += 25;
      recommendations.push("Extremely preterm (<32w): Initiate standard sepsis protocol regardless of symptoms.");
    } else if (gestationalAge < 37) {
      riskScore += 15;
    }

    if (birthWeight < 1500) {
      riskScore += 20;
      recommendations.push("Very Low Birth Weight (VLBW): High susceptibility to systemic infection.");
    } else if (birthWeight < 2500) {
      riskScore += 10;
    }

    // 2. Clinical Indicators
    if (temperature > 38.0 || temperature < 36.0) {
      riskScore += 15;
      recommendations.push("Abnormal core temperature: Maintain neutral thermal environment.");
    }
    if (heartRate > 160 || heartRate < 100) {
      riskScore += 10;
      recommendations.push("Cardiovascular instability: Monitor for signs of shock.");
    }
    if (respiratoryRate > 60) {
      riskScore += 10;
      recommendations.push("Tachypnea: Assess for respiratory distress or pneumonia.");
    }
    if (apgarScore < 7) {
      riskScore += 10;
      recommendations.push("Low 1/5-min APGAR score: History of perinatal depression increases sepsis risk.");
    }

    // 3. Laboratory Markers (Highly predictive)
    if (anc < 1500) {
      riskScore += 20; // Neutropenia is a very strong indicator
      recommendations.push("Significant Neutropenia (ANC < 1500): High risk of bacterial sepsis.");
    }
    if (crp > 10) {
      riskScore += 15;
      recommendations.push("Elevated CRP (>10 mg/L): Suggestive of active inflammatory process.");
    }
    if (wbcCount > 30 || wbcCount < 5) {
      riskScore += 10;
      recommendations.push("Abnormal WBC count: Sign of hematopoietic response to infection.");
    }
    if (plateletCount < 100) {
      riskScore += 10;
      recommendations.push("Thrombocytopenia: Common in late-stage neonatal sepsis; monitor for bleeding.");
    }
    if (bloodGlucose < 2.5) {
      riskScore += 5;
      recommendations.push("Neonatal Hypoglycemia: High metabolic demand often seen in sepsis.");
    }

    // 4. Maternal/Perinatal Factors
    if (maternalGBS) {
      riskScore += 10;
      recommendations.push("Maternal GBS+: Ensure adequate intrapartum antibiotic prophylaxis (IAP) was given.");
    }
    if (prolongedROM) {
      riskScore += 10;
      recommendations.push("Prolonged ROM (>18h): Increased risk of ascending infection.");
    }

    // Calculate level
    let riskLevel: "Low" | "Moderate" | "High" = "Low";
    if (riskScore >= 45) riskLevel = "High";
    else if (riskScore >= 20) riskLevel = "Moderate";

    if (riskScore < 20) {
      recommendations.push("Continue routine newborn care and daily clinical follow-up.");
    }

    return NextResponse.json({
      riskScore: Math.min(riskScore, 100),
      riskLevel,
      recommendations: Array.from(new Set(recommendations)), // Remove duplicates
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process prediction" }, { status: 500 });
  }
}
