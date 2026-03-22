"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Brain, ArrowRight, CheckCircle, AlertTriangle, AlertOctagon, Sparkles,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const HEALTH_ISSUES = ["None", "Fever", "Respiratory", "Digestive", "Other"];

interface PredictResult {
  riskScore: number;
  riskLevel: "Low" | "Moderate" | "High";
  recommendations: string[];
}

type PredictorType = "none" | "sepsis" | "pregnancy";

const riskConfig = {
  Low: {
    color: "#10b981",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    icon: CheckCircle,
    label: "Low Risk",
    textColor: "text-emerald-600",
    pieFill: "#10b981",
  },
  Moderate: {
    color: "#f59e0b",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    icon: AlertTriangle,
    label: "Moderate Risk",
    textColor: "text-amber-600",
    pieFill: "#f59e0b",
  },
  High: {
    color: "#ef4444",
    bg: "from-red-50 to-rose-50",
    border: "border-red-200",
    icon: AlertOctagon,
    label: "High Risk",
    textColor: "text-red-600",
    pieFill: "#ef4444",
  },
};

export default function MLPredictorPage() {
  const [activePredictor, setActivePredictor] = useState<PredictorType>("none");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResult | null>(null);

  // Sepsis Form State
  const [sepsisForm, setSepsisForm] = useState({
    gestationalAge: 40,
    birthWeight: 3200,
    temperature: 37.0,
    heartRate: 130,
    respiratoryRate: 40,
    wbcCount: 15,
    anc: 3000,
    crp: 5,
    plateletCount: 250,
    bloodGlucose: 3.5,
    maternalGBS: false,
    prolongedROM: false,
    apgarScore: 9
  });

  // Pregnancy Form State
  const [pregnancyForm, setPregnancyForm] = useState({
    age: 28,
    systolicBP: 120,
    diastolicBP: 80,
    bloodSugar: 5.5,
    bodyTemp: 98.6,
    heartRate: 75
  });

  const predictSepsis = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("/api/ml/predict/sepsis", sepsisForm);
      setResult(res.data);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const predictPregnancy = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("/api/ml/predict/pregnancy", pregnancyForm);
      setResult(res.data);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const pieData = result
    ? [{ name: "Risk", value: result.riskScore }, { name: "Safe", value: 100 - result.riskScore }]
    : [{ name: "Safe", value: 100 }];

  return (
    <div className="min-h-screen bg-[#FDF7F8]">
      <Navbar />
      <PageTransition>
        {/* Hero */}
        <div className="relative pt-20 pb-10 px-4 text-center overflow-hidden">
          {/* Background blobs */}
          <motion.div
            className="absolute top-10 left-1/3 w-72 h-72 rounded-full opacity-40 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(252,228,236,1) 0%, transparent 70%)", filter: "blur(60px)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-20 right-1/4 w-56 h-56 rounded-full opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(240,98,146,0.5) 0%, transparent 70%)", filter: "blur(80px)" }}
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6"
              style={{ background: "rgba(252,228,236,0.8)", borderColor: "rgba(194,24,91,0.15)", color: "#C2185B" }}
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Clinical Analysis
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-4 text-[#1A0A0D] text-heading-shadow"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Advanced AI{" "}
              <span className="gradient-text italic">Predictors</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#4A1E2E] text-lg"
            >
              Choose a clinical predictor to receive an AI-driven risk assessment and medical recommendations.
            </motion.p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-20">
          {activePredictor === "none" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Neonatal Sepsis Box */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(194,24,91,0.12)" }}
                className="p-8 rounded-3xl bg-white border border-pink-100 shadow-sm cursor-pointer group transition-all"
                onClick={() => setActivePredictor("sepsis")}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A0A0D] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Neonatal Sepsis Prediction
                </h3>
                <p className="text-[#8C5A6E] mb-6">
                  Early screening for systemic infections in newborns using clinical and laboratory markers like CRP, WBC, and ANC.
                </p>
                <div className="flex items-center text-rose-600 font-bold gap-2 group-hover:gap-3 transition-all">
                  Open Predictor <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>

              {/* Pregnancy Risk Box */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(194,24,91,0.12)" }}
                className="p-8 rounded-3xl bg-white border border-pink-100 shadow-sm cursor-pointer group transition-all"
                onClick={() => setActivePredictor("pregnancy")}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A0A0D] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Pregnancy Risk Prediction
                </h3>
                <p className="text-[#8C5A6E] mb-6">
                  Assess maternal health risks by analyzing age, blood pressure, and sugar levels to predict potential complications.
                </p>
                <div className="flex items-center text-rose-600 font-bold gap-2 group-hover:gap-3 transition-all">
                  Open Predictor <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Back button */}
              <div className="lg:col-span-2">
                <button 
                  onClick={() => { setActivePredictor("none"); setResult(null); }}
                  className="flex items-center gap-2 text-[#8C5A6E] font-medium hover:text-rose-600 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to Predictors
                </button>
              </div>

              {/* Sepsis Form */}
              {activePredictor === "sepsis" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm h-fit"
                >
                  <h2 className="text-[#1A0A0D] font-bold text-xl mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    Neonatal Sepsis Parameters
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Form fields for sepsis */}
                    <div className="space-y-4 md:col-span-2">
                      <div>
                        <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Gestational Age (Weeks)</label>
                        <input 
                          type="number" value={sepsisForm.gestationalAge} 
                          onChange={(e) => setSepsisForm({...sepsisForm, gestationalAge: +e.target.value})}
                          className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Birth Weight (Grams)</label>
                        <input 
                          type="number" value={sepsisForm.birthWeight} 
                          onChange={(e) => setSepsisForm({...sepsisForm, birthWeight: +e.target.value})}
                          className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Temp (°C)</label>
                      <input 
                        type="number" step="0.1" value={sepsisForm.temperature} 
                        onChange={(e) => setSepsisForm({...sepsisForm, temperature: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Heart Rate (BPM)</label>
                      <input 
                        type="number" value={sepsisForm.heartRate} 
                        onChange={(e) => setSepsisForm({...sepsisForm, heartRate: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Resp Rate (BPM)</label>
                      <input 
                        type="number" value={sepsisForm.respiratoryRate} 
                        onChange={(e) => setSepsisForm({...sepsisForm, respiratoryRate: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">WBC Count (x10³)</label>
                      <input 
                        type="number" step="0.1" value={sepsisForm.wbcCount} 
                        onChange={(e) => setSepsisForm({...sepsisForm, wbcCount: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">ANC (x10³)</label>
                      <input 
                        type="number" value={sepsisForm.anc} 
                        onChange={(e) => setSepsisForm({...sepsisForm, anc: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">CRP (mg/L)</label>
                      <input 
                        type="number" step="0.1" value={sepsisForm.crp} 
                        onChange={(e) => setSepsisForm({...sepsisForm, crp: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Platelets (x10³)</label>
                      <input 
                        type="number" value={sepsisForm.plateletCount} 
                        onChange={(e) => setSepsisForm({...sepsisForm, plateletCount: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Glucose (mmol/L)</label>
                      <input 
                        type="number" step="0.1" value={sepsisForm.bloodGlucose} 
                        onChange={(e) => setSepsisForm({...sepsisForm, bloodGlucose: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-3 mt-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-[#FDF7F8] border border-pink-100">
                        <label className="text-sm text-[#4A1E2E] font-medium">Maternal GBS Positive</label>
                        <input 
                          type="checkbox" checked={sepsisForm.maternalGBS} 
                          onChange={(e) => setSepsisForm({...sepsisForm, maternalGBS: e.target.checked})}
                          className="w-5 h-5 accent-rose-500"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-[#FDF7F8] border border-pink-100">
                        <label className="text-sm text-[#4A1E2E] font-medium">Prolonged ROM ({">"}18 hrs)</label>
                        <input 
                          type="checkbox" checked={sepsisForm.prolongedROM} 
                          onChange={(e) => setSepsisForm({...sepsisForm, prolongedROM: e.target.checked})}
                          className="w-5 h-5 accent-rose-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">APGAR Score (5-min)</label>
                        <input 
                          type="range" min="0" max="10" value={sepsisForm.apgarScore} 
                          onChange={(e) => setSepsisForm({...sepsisForm, apgarScore: +e.target.value})}
                          className="w-full h-2 rounded-full appearance-none bg-rose-100 accent-rose-500"
                        />
                        <div className="flex justify-between text-[10px] text-[#8C5A6E] mt-1">
                          <span>0 (Critical)</span><span>10 (Excellent)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={predictSepsis}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 py-4 rounded-xl text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    {loading ? "Analyzing Neonatal Data..." : "Predict Sepsis Risk"}
                  </motion.button>
                </motion.div>
              )}

              {/* Pregnancy Form */}
              {activePredictor === "pregnancy" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm h-fit"
                >
                  <h2 className="text-[#1A0A0D] font-bold text-xl mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    Maternal Health Data
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Age (Years)</label>
                      <input 
                        type="number" value={pregnancyForm.age} 
                        onChange={(e) => setPregnancyForm({...pregnancyForm, age: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Systolic BP</label>
                        <input 
                          type="number" value={pregnancyForm.systolicBP} 
                          onChange={(e) => setPregnancyForm({...pregnancyForm, systolicBP: +e.target.value})}
                          className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Diastolic BP</label>
                        <input 
                          type="number" value={pregnancyForm.diastolicBP} 
                          onChange={(e) => setPregnancyForm({...pregnancyForm, diastolicBP: +e.target.value})}
                          className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Blood Sugar (mmol/L)</label>
                      <input 
                        type="number" step="0.1" value={pregnancyForm.bloodSugar} 
                        onChange={(e) => setPregnancyForm({...pregnancyForm, bloodSugar: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Body Temp (°F)</label>
                      <input 
                        type="number" step="0.1" value={pregnancyForm.bodyTemp} 
                        onChange={(e) => setPregnancyForm({...pregnancyForm, bodyTemp: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8C5A6E] font-bold uppercase mb-1 block">Heart Rate (BPM)</label>
                      <input 
                        type="number" value={pregnancyForm.heartRate} 
                        onChange={(e) => setPregnancyForm({...pregnancyForm, heartRate: +e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-[#FDF7F8] border border-pink-100 text-sm"
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={predictPregnancy}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 py-4 rounded-xl text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    {loading ? "Analyzing Pregnancy Risk..." : "Predict Pregnancy Risk"}
                  </motion.button>
                </motion.div>
              )}

            {/* Results panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[300px] flex flex-col items-center justify-center p-12 rounded-2xl bg-white border-2 border-dashed border-pink-200 text-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                      <Brain className="w-10 h-10 text-rose-300" />
                    </div>
                    <p className="text-[#8C5A6E]">
                      Fill in the health data and click{" "}
                      <strong className="text-rose-600">Analyze Risk</strong>{" "}
                      to see your personalised assessment.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="space-y-4"
                  >
                    {/* Risk level card */}
                    {(() => {
                      const config = riskConfig[result.riskLevel];
                      const RiskIcon = config.icon;
                      return (
                        <div className={`p-6 rounded-2xl bg-gradient-to-br ${config.bg} border ${config.border} shadow-sm`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <RiskIcon className={`w-6 h-6 ${config.textColor}`} />
                                <h3 className={`text-xl font-bold ${config.textColor}`} style={{ fontFamily: "var(--font-display)" }}>
                                  {config.label}
                                </h3>
                              </div>
                              <p className="text-[#8C5A6E] text-sm">
                                Risk Score:{" "}
                                <span className="text-[#1A0A0D] font-bold">{result.riskScore}/100</span>
                              </p>
                            </div>
                            <div className="w-28 h-28">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={pieData}
                                    cx="50%" cy="50%"
                                    innerRadius={32} outerRadius={50}
                                    startAngle={90} endAngle={-270}
                                    dataKey="value"
                                    strokeWidth={0}
                                  >
                                    <Cell fill={config.pieFill} />
                                    <Cell fill="rgba(194,24,91,0.06)" />
                                  </Pie>
                                  <Tooltip
                                    formatter={(v) => [`${v}%`]}
                                    contentStyle={{
                                      background: "#fff", border: "1px solid rgba(194,24,91,0.12)",
                                      borderRadius: "8px", color: "#1A0A0D",
                                    }}
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Recommendations */}
                    <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm">
                      <h3 className="text-[#1A0A0D] font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                        <Sparkles className="w-5 h-5 text-rose-500" />
                        Personalised Recommendations
                      </h3>
                      <div className="space-y-3">
                        {result.recommendations.map((rec, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-3"
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-xs font-bold shadow-sm"
                              style={{ background: "var(--gradient-accent)" }}
                            >
                              {i + 1}
                            </div>
                            <p className="text-[#4A1E2E] text-sm leading-relaxed">{rec}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-amber-700 text-xs leading-relaxed">
                        <strong>Disclaimer:</strong> This AI assessment is for informational purposes only and does not replace professional medical advice. Always consult a qualified healthcare provider for medical decisions.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
      <Footer />
    </div>
  );
}
