"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Star, Sparkles, Activity } from "lucide-react";
import SplitText from "@/components/shared/SplitText";
import MagneticButton from "@/components/shared/MagneticButton";

const badges = [
  { icon: Shield, text: "256+ Vaccines Tracked", color: "text-rose-600 bg-rose-50 border-rose-100" },
  { icon: Sparkles, text: "ML Health Predictor", color: "text-pink-600 bg-pink-50 border-pink-100" },
  { icon: Star, text: "10,000+ Families", color: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDF7F8] pt-16"
    >
      {/* Animated mesh gradient blobs with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(252,228,236,1) 0%, transparent 70%)",
            filter: "blur(60px)",
            y: blobY1,
          }}
          animate={{ x: [0, 40, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(240,98,146,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
            y: blobY2,
          }}
          animate={{ x: [0, -30, 0], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(244,114,182,0.5) 0%, transparent 70%)",
            filter: "blur(70px)",
            y: blobY3,
          }}
          animate={{ x: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Floating abstract shapes instead of emojis */}
      {[
        { x: "10%", y: "22%", size: 12, delay: 0, rotate: 45 },
        { x: "88%", y: "18%", size: 8, delay: 0.5, rotate: 0 },
        { x: "92%", y: "58%", size: 6, delay: 1, rotate: 30 },
        { x: "6%", y: "68%", size: 10, delay: 0.8, rotate: 60 },
        { x: "78%", y: "78%", size: 5, delay: 0.3, rotate: 15 },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            borderRadius: i % 2 === 0 ? "50%" : "3px",
            background: `rgba(194,24,91,${0.12 + i * 0.04})`,
            rotate: shape.rotate,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [shape.rotate, shape.rotate + 90, shape.rotate],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: shape.delay }}
        />
      ))}

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        style={{ y: contentY, opacity }}
      >
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
          style={{ background: "rgba(252,228,236,0.8)", border: "1px solid rgba(194,24,91,0.15)", color: "#C2185B" }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-rose-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Trusted by 10,000+ families worldwide
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Headline */}
        <h1
          className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05] text-heading-shadow"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
        >
          <SplitText text="Modern Care for" className="text-[#1A0A0D]" />
          <br />
          <SplitText text="Every Growing" className="gradient-text" delay={0.18} />
          <br />
          <SplitText text="Family" className="text-[#1A0A0D]" delay={0.36} />
        </h1>

        {/* Underline accent */}
        <motion.div
          className="mx-auto mb-8 h-[3px] rounded-full"
          style={{ background: "var(--gradient-accent)", maxWidth: 180 }}
          initial={{ scaleX: 0, originX: 0.5 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-lg sm:text-xl text-[#4A1E2E] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          BabyBloom brings together vaccination tracking, AI health predictions, document management,
          and growth analytics — beautifully designed for modern parents.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <MagneticButton>
            <Link
              href="/login"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all"
              style={{
                background: "var(--gradient-accent)",
                boxShadow: "0 8px 32px rgba(194,24,91,0.30), 0 2px 8px rgba(194,24,91,0.20)",
              }}
            >
              Start Free Today <ArrowRight className="w-5 h-5" />
            </Link>
          </MagneticButton>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/ml-predictor"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base border-2 transition-all"
              style={{
                borderColor: "rgba(194,24,91,0.25)",
                color: "#C2185B",
                background: "rgba(252,228,236,0.5)",
              }}
            >
              <Activity className="w-5 h-5" />
              Try ML Predictor
            </Link>
          </motion.div>
        </motion.div>

        {/* Social proof badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.text}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${badge.color}`}
            >
              <badge.icon className="w-4 h-4" />
              {badge.text}
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard mockup with scroll parallax */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: "1200px", y: mockupY, scale: mockupScale }}
        >
          <motion.div
            whileHover={{ rotateX: 1.5, rotateY: -1.5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(252,182,196,0.4)",
              boxShadow: "0 32px 80px rgba(194,24,91,0.12), 0 8px 24px rgba(194,24,91,0.08), 0 0 0 1px rgba(255,255,255,0.9)",
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 p-4 border-b border-pink-50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 h-7 bg-pink-50 rounded-lg flex items-center px-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-200" />
                <div className="text-xs text-rose-300 font-mono">app.babybloom.io/dashboard</div>
              </div>
            </div>

            <div className="p-6">
              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Child Age", val: "3 yrs", color: "from-rose-50 to-pink-50", border: "border-rose-100", text: "text-rose-600" },
                  { label: "Next Vaccine", val: "14 days", color: "from-fuchsia-50 to-pink-50", border: "border-fuchsia-100", text: "text-fuchsia-600" },
                  { label: "Documents", val: "12 files", color: "from-pink-50 to-rose-50", border: "border-pink-100", text: "text-pink-600" },
                  { label: "Health Score", val: "92/100", color: "from-red-50 to-rose-50", border: "border-red-100", text: "text-red-500" },
                ].map((card) => (
                  <div key={card.label} className={`bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-3`}>
                    <div className={`text-xs text-[#8C5A6E] mb-0.5`}>{card.label}</div>
                    <div className={`font-bold text-base ${card.text}`}>{card.val}</div>
                  </div>
                ))}
              </div>

              {/* Chart + activity */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 bg-gradient-to-br from-pink-50/60 to-rose-50/40 border border-pink-100 rounded-2xl p-4 h-32 flex flex-col justify-between">
                  <div className="text-xs font-semibold text-[#4A1E2E]">Growth Chart</div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 55, 48, 65, 58, 72, 68, 80].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 1.2 + i * 0.07 }}
                        className="flex-1 rounded-t-md"
                        style={{ background: i === 7 ? "var(--gradient-accent)" : "rgba(194,24,91,0.12)" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-fuchsia-50/60 to-pink-50/40 border border-fuchsia-100 rounded-2xl p-4 h-32">
                  <div className="text-xs font-semibold text-[#4A1E2E] mb-2">Next Vaccines</div>
                  {["BCG Booster", "MMR", "DTP"].map((v, i) => (
                    <div key={v} className="flex items-center gap-1.5 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? "#C2185B" : i === 1 ? "#F06292" : "#F48FB1" }} />
                      <span className="text-xs text-[#4A1E2E]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating AI score badge */}
          <motion.div
            className="absolute -top-4 -right-4 bg-white border border-pink-100 rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Activity className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-semibold text-[#1A0A0D]">AI Health Score: 92</span>
          </motion.div>

          {/* Floating vaccine badge */}
          <motion.div
            className="absolute -bottom-4 -left-4 bg-white border border-pink-100 rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-semibold text-[#1A0A0D]">Next vaccine in 14 days</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: "rgba(194,24,91,0.25)" }}
        >
          <motion.div
            className="w-1.5 h-2 rounded-full"
            style={{ background: "#C2185B" }}
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
