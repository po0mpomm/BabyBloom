"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";
import StaggerContainer, { staggerItem } from "@/components/shared/StaggerContainer";
import { motion } from "framer-motion";
import { Users, FileText, Zap, ShieldCheck } from "lucide-react";

const stats = [
  { value: 10000, suffix: "+", label: "Families Served", icon: Users, gradient: "from-rose-500 to-pink-500", soft: "from-rose-50 to-pink-50", border: "border-rose-100" },
  { value: 50000, suffix: "+", label: "Records Managed", icon: FileText, gradient: "from-fuchsia-500 to-pink-500", soft: "from-fuchsia-50 to-pink-50", border: "border-fuchsia-100" },
  { value: 99.9, suffix: "%", label: "Uptime Reliability", icon: Zap, gradient: "from-pink-500 to-rose-400", soft: "from-pink-50 to-rose-50", border: "border-pink-100" },
  { value: 256, suffix: "-bit", label: "Encryption", icon: ShieldCheck, gradient: "from-rose-600 to-fuchsia-500", soft: "from-rose-50 to-fuchsia-50", border: "border-rose-100" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const step = end / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start * 10) / 10);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {value % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section id="about" className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(252,228,236,0.5) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: "rgba(252,228,236,0.8)", borderColor: "rgba(194,24,91,0.15)", color: "#C2185B" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Numbers that matter
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#1A0A0D] mb-4 text-heading-shadow"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Trusted by families{" "}
            <span className="gradient-text italic">everywhere</span>
          </h2>
          <p className="text-[#4A1E2E] text-lg max-w-xl mx-auto">
            Thousands of parents rely on BabyBloom every day to keep their children healthy and thriving.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(194,24,91,0.10)" }}
              className={`text-center p-7 rounded-3xl bg-gradient-to-br ${stat.soft} border ${stat.border} transition-all duration-300 cursor-default shadow-sm`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className="text-4xl sm:text-5xl font-bold gradient-text mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#8C5A6E] text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
