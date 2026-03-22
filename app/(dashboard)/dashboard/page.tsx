"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { User, Syringe, FileText, CreditCard, Bell, ArrowRight, Brain, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageTransition from "@/components/shared/PageTransition";
import { SkeletonCard } from "@/components/shared/LoadingSpinner";
import Navbar from "@/components/layout/Navbar";

interface Patient { childName: string; age: number; weight: number; height: number; }
interface Vaccine { status: string; dueDate: string; }
interface Payment { amount: number; paymentStatus: string; }

const growthData = [
  { month: "Jan", weight: 5.2, height: 55 },
  { month: "Feb", weight: 5.8, height: 57 },
  { month: "Mar", weight: 6.4, height: 60 },
  { month: "Apr", weight: 7.0, height: 62 },
  { month: "May", weight: 7.5, height: 65 },
  { month: "Jun", weight: 8.1, height: 68 },
];

const navCards = [
  { title: "Patient Details", desc: "View & update child health profile", icon: User, href: "/dashboard/patient", gradient: "from-rose-500 to-pink-500", soft: "from-rose-50 to-pink-50", border: "border-rose-100" },
  { title: "Vaccination Records", desc: "Track vaccine history & upcoming doses", icon: Syringe, href: "/dashboard/vaccinations", gradient: "from-fuchsia-500 to-pink-500", soft: "from-fuchsia-50 to-pink-50", border: "border-fuchsia-100" },
  { title: "Medical Documents", desc: "Upload and manage health records", icon: FileText, href: "/dashboard/documents", gradient: "from-pink-500 to-rose-400", soft: "from-pink-50 to-rose-50", border: "border-pink-100" },
  { title: "Payment Status", desc: "View billing history and status", icon: CreditCard, href: "/dashboard/payments", gradient: "from-rose-600 to-fuchsia-500", soft: "from-rose-50 to-fuchsia-50", border: "border-rose-100" },
];

const activityItems = [
  { label: "Profile updated", time: "2h ago", icon: User, bg: "bg-rose-50 border-rose-100", iconColor: "text-rose-500" },
  { label: "Vaccine recorded", time: "1d ago", icon: Syringe, bg: "bg-fuchsia-50 border-fuchsia-100", iconColor: "text-fuchsia-500" },
  { label: "Document uploaded", time: "3d ago", icon: FileText, bg: "bg-pink-50 border-pink-100", iconColor: "text-pink-500" },
  { label: "Payment received", time: "1w ago", icon: CreditCard, bg: "bg-rose-50 border-rose-100", iconColor: "text-rose-500" },
  { label: "AI check completed", time: "2w ago", icon: Brain, bg: "bg-fuchsia-50 border-fuchsia-100", iconColor: "text-fuchsia-500" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function getDaysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const staggerCard = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [docCount, setDocCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("/api/patient"),
      axios.get("/api/vaccines"),
      axios.get("/api/documents"),
      axios.get("/api/payments"),
    ]).then(([p, v, d, pay]) => {
      setPatient(p.data.patient);
      setVaccines(v.data.vaccines || []);
      setDocCount((d.data.documents || []).length);
      setPayments(pay.data.payments || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const nextVaccine = vaccines.find((v) => v.status === "Pending");
  const daysUntil = nextVaccine ? getDaysUntil(nextVaccine.dueDate) : null;
  const totalPending = payments.filter((p) => p.paymentStatus === "Pending").reduce((s, p) => s + p.amount, 0);

  const statsCards = [
    { label: "Child Age", value: patient ? `${patient.age} yrs` : "\u2014", icon: User, gradient: "from-rose-500 to-pink-500", soft: "from-rose-50 to-pink-50", border: "border-rose-100", text: "text-rose-600" },
    { label: "Next Vaccine", value: daysUntil !== null ? `${daysUntil}d` : "\u2014", icon: Syringe, gradient: "from-fuchsia-500 to-pink-500", soft: "from-fuchsia-50 to-pink-50", border: "border-fuchsia-100", text: daysUntil !== null && daysUntil <= 7 ? "text-red-600" : "text-fuchsia-600" },
    { label: "Documents", value: String(docCount), icon: FileText, gradient: "from-pink-500 to-rose-400", soft: "from-pink-50 to-rose-50", border: "border-pink-100", text: "text-pink-600" },
    { label: "Pending Bills", value: `$${totalPending}`, icon: CreditCard, gradient: "from-rose-600 to-fuchsia-500", soft: "from-rose-50 to-fuchsia-50", border: "border-rose-100", text: totalPending > 0 ? "text-orange-600" : "text-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-[#FDF7F8]">
      <Navbar />
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#8C5A6E] text-sm mb-1"
              >
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="text-3xl sm:text-4xl font-bold text-[#1A0A0D] text-heading-shadow"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                {getGreeting()}, {session?.user?.name?.split(" ")[0]}
              </motion.h1>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-2.5 rounded-xl bg-white border border-pink-100 text-[#8C5A6E] hover:text-rose-500 transition-colors shadow-sm"
              >
                <Bell className="w-5 h-5" />
              </motion.button>
              {session?.user?.image ? (
                <img src={session.user.image} alt="avatar" className="w-10 h-10 rounded-xl object-cover border-2 border-rose-200 shadow-sm" />
              ) : (
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  {session?.user?.name?.[0] || "U"}
                </div>
              )}
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {loading
              ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : statsCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={staggerCard}
                  whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(194,24,91,0.10)" }}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${card.soft} border ${card.border} bg-white shadow-sm transition-all duration-300`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-md`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[#8C5A6E] text-xs font-medium mb-1">{card.label}</p>
                  <p className={`text-2xl font-bold ${card.text}`} style={{ fontFamily: "var(--font-display)" }}>
                    {card.value}
                  </p>
                </motion.div>
              ))}
          </div>

          {/* Navigation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {navCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i + 4}
                initial="hidden"
                animate="visible"
                variants={staggerCard}
              >
                <Link href={card.href}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(194,24,91,0.10)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`group p-6 rounded-2xl bg-gradient-to-br ${card.soft} border ${card.border} shadow-sm cursor-pointer transition-all duration-300 relative overflow-hidden`}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-md`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-[#1A0A0D] font-bold text-base mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      {card.title}
                    </h3>
                    <p className="text-[#8C5A6E] text-xs leading-relaxed mb-3">{card.desc}</p>
                    <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 group-hover:text-rose-600 transition-all duration-200" />
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Growth chart + activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 p-6 rounded-2xl bg-white border border-pink-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1A0A0D] flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <TrendingUp className="w-5 h-5 text-rose-500" />
                  Growth Chart
                </h3>
                <span className="text-xs text-[#8C5A6E] bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C2185B" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#C2185B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="hGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F06292" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#F06292" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(194,24,91,0.06)" />
                  <XAxis dataKey="month" stroke="#B08090" tick={{ fill: "#B08090", fontSize: 12 }} />
                  <YAxis stroke="#B08090" tick={{ fill: "#B08090", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: "#fff", border: "1px solid rgba(194,24,91,0.12)", borderRadius: "12px", color: "#1A0A0D", boxShadow: "0 8px 24px rgba(194,24,91,0.10)" }}
                  />
                  <Area type="monotone" dataKey="weight" stroke="#C2185B" fill="url(#wGrad)" strokeWidth={2.5} name="Weight (kg)" />
                  <Area type="monotone" dataKey="height" stroke="#F06292" fill="url(#hGrad)" strokeWidth={2.5} name="Height (cm)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm"
            >
              <h3 className="font-bold text-[#1A0A0D] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                {activityItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${item.bg} border flex items-center justify-center shrink-0`}>
                      <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1A0A0D] text-xs font-semibold truncate">{item.label}</p>
                      <p className="text-[#8C5A6E] text-xs">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ML Predictor promo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative overflow-hidden p-6 rounded-2xl border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ background: "linear-gradient(135deg, rgba(252,228,236,0.8), rgba(253,247,248,0.9))" }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-60" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="w-6 h-6 text-rose-600" />
                <h3 className="font-bold text-xl text-[#1A0A0D]" style={{ fontFamily: "var(--font-display)" }}>
                  Predict Health Risks with AI
                </h3>
              </div>
              <p className="text-[#4A1E2E] text-sm">Personalised risk analysis powered by our ML engine.</p>
            </div>
            <Link href="/ml-predictor">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 px-6 py-2.5 rounded-xl text-white font-semibold text-sm shadow-md flex items-center gap-2"
                style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.25)" }}
              >
                Try Now <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </PageTransition>
    </div>
  );
}
