import { NextRequest, NextResponse } from "next/server";

interface PredictInput {
  age: number;
  weight: number;
  height: number;
  gender: string;
  healthIssues: string[];
}

function calcBMI(weight: number, height: number) {
  const h = height / 100;
  return weight / (h * h);
}

function getBMIScore(bmi: number, age: number): number {
  // WHO child growth standards rough thresholds
  if (age < 2) {
    if (bmi < 14) return 30;
    if (bmi < 16) return 10;
    if (bmi > 20) return 20;
    return 0;
  }
  if (age < 5) {
    if (bmi < 13) return 30;
    if (bmi < 15) return 10;
    if (bmi > 19) return 20;
    return 0;
  }
  if (age < 10) {
    if (bmi < 12) return 30;
    if (bmi < 14) return 10;
    if (bmi > 21) return 20;
    return 0;
  }
  if (bmi < 13) return 30;
  if (bmi < 16) return 10;
  if (bmi > 25) return 20;
  return 0;
}

function getIssueScore(issues: string[]): number {
  const filtered = issues.filter((i) => i !== "None");
  if (filtered.length === 0) return 0;
  if (filtered.length === 1) return 15;
  if (filtered.length === 2) return 30;
  return 45;
}

function getRiskLevel(score: number): "Low" | "Moderate" | "High" {
  if (score <= 20) return "Low";
  if (score <= 50) return "Moderate";
  return "High";
}

function getRecommendations(level: string, issues: string[], bmi: number): string[] {
  const base: string[] = [];

  if (level === "Low") {
    base.push("Continue regular wellness check-ups every 6 months.");
    base.push("Maintain a balanced diet rich in fruits, vegetables, and protein.");
    base.push("Ensure all vaccinations are up to date per national schedule.");
  } else if (level === "Moderate") {
    base.push("Schedule a detailed pediatric evaluation within 2 weeks.");
    base.push("Monitor weight and height monthly to track growth trends.");
    base.push("Consult a nutritionist for a personalized diet plan.");
    base.push("Ensure all vaccinations are completed and booster doses given.");
  } else {
    base.push("Seek immediate medical consultation with a pediatric specialist.");
    base.push("Conduct comprehensive blood panel and nutritional deficiency tests.");
    base.push("Implement a structured medical monitoring plan (bi-weekly check-ins).");
    base.push("Consider specialist referrals for each identified health concern.");
  }

  if (bmi < 14) base.push("Child shows signs of underweight — nutritional support is critical.");
  if (bmi > 22) base.push("Child may be overweight — reduce processed foods and increase physical activity.");
  if (issues.includes("Respiratory")) base.push("Respiratory issues detected — avoid allergens and ensure clean air quality.");
  if (issues.includes("Fever")) base.push("Recurrent fever reported — monitor temperature and hydration closely.");
  if (issues.includes("Digestive")) base.push("Digestive issues present — consider probiotic-rich foods and a gastroenterology consult.");

  return base;
}

export async function POST(req: NextRequest) {
  try {
    const body: PredictInput = await req.json();
    const { age, weight, height, healthIssues } = body;

    if (!age || !weight || !height) {
      return NextResponse.json({ error: "age, weight, height required" }, { status: 400 });
    }

    const bmi = calcBMI(weight, height);
    const bmiScore = getBMIScore(bmi, age);
    const issueScore = getIssueScore(healthIssues ?? []);
    const totalScore = Math.min(bmiScore + issueScore, 100);
    const riskLevel = getRiskLevel(totalScore);
    const recommendations = getRecommendations(riskLevel, healthIssues ?? [], bmi);

    return NextResponse.json({
      bmi: parseFloat(bmi.toFixed(1)),
      riskScore: totalScore,
      riskLevel,
      recommendations,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
