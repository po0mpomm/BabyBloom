"use client";
import { motion } from "framer-motion";

export default function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <motion.div
      className="rounded-full border-2 border-pink-200 border-t-rose-500"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF7F8]">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size={48} />
        <p className="text-rose-400 text-sm animate-pulse" style={{ fontFamily: "var(--font-body)" }}>
          Loading BabyBloom...
        </p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-pink-100 p-6 space-y-3 shadow-sm">
      <div className="h-4 bg-pink-50 rounded-lg w-3/4 animate-pulse" />
      <div className="h-3 bg-pink-50 rounded-lg w-1/2 animate-pulse" />
      <div className="h-3 bg-pink-50 rounded-lg w-5/6 animate-pulse" />
    </div>
  );
}
