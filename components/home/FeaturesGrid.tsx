"use client";
import { motion } from "framer-motion";
import { Calendar, Lock, BarChart3, CreditCard, Brain, MessageCircle, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import StaggerContainer, { staggerItem } from "@/components/shared/StaggerContainer";

const features = [
  {
    icon: Calendar,
    title: "Vaccination Tracker",
    description: "Never miss a vaccine. Track schedules, set reminders, and view your child's complete immunization history with beautiful timelines.",
    gradient: "from-rose-500 to-pink-500",
    softBg: "from-rose-50 to-pink-50",
    softBorder: "border-rose-100",
    iconSoft: "bg-rose-100 text-rose-600",
    wide: false,
  },
  {
    icon: Lock,
    title: "Document Vault",
    description: "Bank-grade encrypted storage for birth certificates, prescriptions, lab reports, and all health documents.",
    gradient: "from-fuchsia-500 to-pink-500",
    softBg: "from-fuchsia-50 to-pink-50",
    softBorder: "border-fuchsia-100",
    iconSoft: "bg-fuchsia-100 text-fuchsia-600",
    wide: false,
  },
  {
    icon: BarChart3,
    title: "Growth Analytics",
    description: "Beautiful WHO-standard growth charts tracking your child's height and weight milestones month over month.",
    gradient: "from-pink-500 to-rose-400",
    softBg: "from-pink-50 to-rose-50",
    softBorder: "border-pink-100",
    iconSoft: "bg-pink-100 text-pink-600",
    wide: true,
  },
  {
    icon: Brain,
    title: "AI Health Predictor",
    description: "Our ML engine analyzes growth patterns to predict health risks and deliver personalized recommendations.",
    gradient: "from-rose-600 to-fuchsia-500",
    softBg: "from-rose-50 to-fuchsia-50",
    softBorder: "border-rose-100",
    iconSoft: "bg-rose-100 text-rose-700",
    wide: false,
  },
  {
    icon: CreditCard,
    title: "Payment Dashboard",
    description: "Monitor medical bills, track insurance, and manage all healthcare expenses in one transparent view.",
    gradient: "from-pink-600 to-rose-500",
    softBg: "from-pink-50 to-rose-50",
    softBorder: "border-pink-100",
    iconSoft: "bg-pink-100 text-pink-700",
    wide: false,
  },
  {
    icon: MessageCircle,
    title: "Smart Chatbot",
    description: "Instant AI-powered answers about vaccination schedules, nutrition, and maternal health — available 24/7.",
    gradient: "from-fuchsia-600 to-pink-400",
    softBg: "from-fuchsia-50 to-pink-50",
    softBorder: "border-fuchsia-100",
    iconSoft: "bg-fuchsia-100 text-fuchsia-700",
    wide: false,
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-28 px-4 bg-[#FDF7F8] relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(252,228,236,1) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(240,98,146,0.4) 0%, transparent 70%)", filter: "blur(100px)" }} />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: "rgba(252,228,236,0.8)", borderColor: "rgba(194,24,91,0.15)", color: "#C2185B" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Complete Healthcare Suite
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#1A0A0D] mb-4 text-heading-shadow"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Everything in{" "}
            <span className="gradient-text italic">one place</span>
          </h2>
          <p className="text-[#4A1E2E] text-lg max-w-2xl mx-auto">
            BabyBloom combines all essential healthcare tools with a stunning interface designed for modern parents.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(194,24,91,0.10)" }}
              className={`group relative p-7 rounded-3xl bg-gradient-to-br ${feature.softBg} border ${feature.softBorder} overflow-hidden cursor-default transition-all duration-300 ${feature.wide ? "lg:col-span-2" : ""}`}
            >
              {/* Inner highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

              <div className={`w-12 h-12 rounded-2xl ${feature.iconSoft} flex items-center justify-center mb-5 shadow-sm`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3
                className="text-xl font-bold text-[#1A0A0D] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {feature.title}
              </h3>
              <p className="text-[#4A1E2E] text-sm leading-relaxed">{feature.description}</p>

              {/* Hover gradient glow bottom line */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
