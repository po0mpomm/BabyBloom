"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Flower2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "About", href: "/#about" },
    { label: "ML Predictor", href: "/ml-predictor" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-2xl border-b border-pink-100 shadow-sm shadow-pink-100/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-md"
              style={{ background: "var(--gradient-accent)" }}
            >
              <Flower2 className="w-4.5 h-4.5 text-white" />
            </motion.div>
            <span
              className="font-bold text-xl gradient-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BabyBloom
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`animated-underline text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-rose-600"
                    : "text-[#1A0A0D] hover:text-[#C2185B]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-medium text-[#8C5A6E] hover:text-[#1A0A0D] transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-[#1A0A0D] hover:text-[#C2185B] transition-colors"
                >
                  Sign in
                </Link>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/login"
                    className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md transition-all hover:shadow-lg"
                    style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.25)" }}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <motion.button
            className="md:hidden p-2 rounded-xl text-[#4A1E2E] hover:bg-pink-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.93 }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-pink-100"
          >
            <div className="px-4 py-5 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-[#4A1E2E] hover:text-rose-600 py-1 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {session ? (
                <>
                  <Link href="/dashboard" className="block text-sm font-semibold text-rose-600 py-1" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false); }} className="block text-sm text-[#8C5A6E] py-1 w-full text-left">Sign out</button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block text-center py-3 rounded-xl text-white text-sm font-semibold"
                  style={{ background: "var(--gradient-accent)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
