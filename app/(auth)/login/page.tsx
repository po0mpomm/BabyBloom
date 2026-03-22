"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Flower2, Mail, Lock, User, CheckCircle } from "lucide-react";
import axios from "axios";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});
const signUpSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;

const inputClass = "w-full bg-[#FDF7F8] border border-pink-100 rounded-xl px-4 py-3 text-[#1A0A0D] text-sm placeholder-[#8C5A6E] outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all";

export default function LoginPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signInForm = useForm<SignInData>({ resolver: zodResolver(signInSchema) });
  const signUpForm = useForm<SignUpData>({ resolver: zodResolver(signUpSchema) });

  const password = signUpForm.watch("password") || "";
  const strengthScore = Math.min(
    (password.length >= 8 ? 1 : 0) + (/[A-Z]/.test(password) ? 1 : 0) + (/[0-9]/.test(password) ? 1 : 0) + (/[^A-Za-z0-9]/.test(password) ? 1 : 0),
    4
  );
  const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  const onSignIn = async (data: SignInData) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
      if (result?.error) toast.error("Invalid email or password");
      else { toast.success("Welcome back!"); router.push("/dashboard"); }
    } catch { toast.error("Something went wrong"); }
    finally { setLoading(false); }
  };

  const onSignUp = async (data: SignUpData) => {
    setLoading(true);
    try {
      await axios.post("/api/auth/register", { name: data.name, email: data.email, password: data.password });
      toast.success("Account created!");
      const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
      if (!result?.error) router.push("/dashboard");
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      toast.error(message || "Registration failed");
    } finally { setLoading(false); }
  };

  const Spinner = () => (
    <motion.div
      className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );

  return (
    <div className="min-h-screen flex bg-[#FDF7F8]">
      <Toaster position="top-right" toastOptions={{ style: { background: "#fff", color: "#1A0A0D", border: "1px solid rgba(194,24,91,0.12)", boxShadow: "0 8px 24px rgba(194,24,91,0.10)" } }} />

      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-white border-r border-pink-100">
        {/* Background blobs */}
        <motion.div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-60 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(252,228,236,1) 0%, transparent 70%)", filter: "blur(60px)" }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(240,98,146,0.3) 0%, transparent 70%)", filter: "blur(80px)" }}
          animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 10, repeat: Infinity }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "var(--gradient-accent)" }}>
            <Flower2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl gradient-text" style={{ fontFamily: "var(--font-display)" }}>BabyBloom</span>
        </div>

        {/* Main pitch */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-5xl font-bold text-[#1A0A0D] leading-tight text-heading-shadow" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
              Healthcare made
              <br />
              <span className="gradient-text italic">beautiful</span>
            </h2>
            <p className="text-[#4A1E2E] text-lg leading-relaxed">
              Join thousands of families tracking their child's health journey with BabyBloom.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Vaccination schedule tracking & reminders",
              "Secure medical document vault",
              "AI-powered health risk prediction",
              "Growth charts & analytics",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(252,228,236,0.8)", border: "1px solid rgba(194,24,91,0.2)" }}>
                  <CheckCircle className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <span className="text-[#4A1E2E] text-sm">{f}</span>
              </div>
            ))}
          </div>

          {/* Floating stat badges */}
          <div className="flex gap-3 flex-wrap">
            {["3 yrs", "14 days", "92/100"].map((badge) => (
              <div key={badge} className="px-3 py-1.5 rounded-full bg-[#FDF7F8] border border-rose-100 text-sm text-[#4A1E2E] font-medium shadow-sm">
                {badge}
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[#8C5A6E] text-sm">© 2024 BabyBloom. All rights reserved.</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(252,228,236,0.3) 0%, transparent 70%)" }} />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "var(--gradient-accent)" }}>
              <Flower2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text" style={{ fontFamily: "var(--font-display)" }}>BabyBloom</span>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-xl" style={{ boxShadow: "0 20px 60px rgba(194,24,91,0.08)" }}>
            {/* Inner highlight */}
            <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent pointer-events-none" />

            <h1 className="text-2xl font-bold text-[#1A0A0D] mb-1 text-heading-shadow" style={{ fontFamily: "var(--font-display)" }}>
              Welcome to BabyBloom
            </h1>
            <p className="text-[#8C5A6E] text-sm mb-6">Sign in or create your account</p>

            {/* Tab switcher */}
            <div className="relative flex bg-[#FDF7F8] border border-pink-100 rounded-2xl p-1 mb-6 overflow-hidden">
              <motion.div
                className="absolute top-1 bottom-1 rounded-xl"
                layout
                animate={{ left: tab === "signin" ? "4px" : "50%", width: "calc(50% - 4px)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.25)" }}
              />
              {(["signin", "signup"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-xl relative z-10 transition-colors ${tab === t ? "text-white" : "text-[#8C5A6E]"}`}>
                  {t === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "signin" ? (
                <motion.form key="signin"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }} onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                  <div>
                    <label className="text-xs text-[#4A1E2E] font-semibold uppercase tracking-wide block mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                      <input {...signInForm.register("email")} type="email" placeholder="you@example.com" className={`${inputClass} pl-10`} />
                    </div>
                    {signInForm.formState.errors.email && <p className="text-red-500 text-xs mt-1">{signInForm.formState.errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs text-[#4A1E2E] font-semibold uppercase tracking-wide block mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                      <input {...signInForm.register("password")} type={showPass ? "text" : "password"} placeholder="••••••••" className={`${inputClass} pl-10 pr-10`} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300 hover:text-rose-500">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signInForm.formState.errors.password && <p className="text-red-500 text-xs mt-1">{signInForm.formState.errors.password.message}</p>}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-[#8C5A6E] cursor-pointer">
                      <input type="checkbox" className="rounded accent-rose-500" /> Remember me
                    </label>
                    <button type="button" className="text-rose-500 hover:text-rose-600 text-xs font-medium">Forgot password?</button>
                  </div>

                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.25)" }}>
                    {loading ? <Spinner /> : "Sign In →"}
                  </motion.button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-pink-100" /></div>
                    <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-[#8C5A6E]">or continue with</span></div>
                  </div>

                  <motion.button type="button" onClick={() => signIn("google", { callbackUrl: "/dashboard" })} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full py-3 rounded-xl bg-[#FDF7F8] border border-pink-100 text-[#1A0A0D] font-medium text-sm flex items-center justify-center gap-3 hover:bg-pink-50 hover:border-pink-200 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </motion.button>

                  <p className="text-center text-sm text-[#8C5A6E] mt-4">
                    Don&apos;t have an account?{" "}
                    <button type="button" onClick={() => setTab("signup")} className="text-rose-500 hover:text-rose-600 font-semibold">Sign Up</button>
                  </p>
                </motion.form>
              ) : (
                <motion.form key="signup"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }} onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                  {[
                    { label: "Full Name", key: "name", icon: User, type: "text", placeholder: "Your full name" },
                    { label: "Email", key: "email", icon: Mail, type: "email", placeholder: "you@example.com" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-xs text-[#4A1E2E] font-semibold uppercase tracking-wide block mb-1.5">{f.label}</label>
                      <div className="relative">
                        <f.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                        <input {...signUpForm.register(f.key as "name" | "email")} type={f.type} placeholder={f.placeholder} className={`${inputClass} pl-10`} />
                      </div>
                      {signUpForm.formState.errors[f.key as "name" | "email"] && (
                        <p className="text-red-500 text-xs mt-1">{signUpForm.formState.errors[f.key as "name" | "email"]?.message}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="text-xs text-[#4A1E2E] font-semibold uppercase tracking-wide block mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                      <input {...signUpForm.register("password")} type={showPass ? "text" : "password"} placeholder="••••••••" className={`${inputClass} pl-10 pr-10`} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300 hover:text-rose-500">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[0,1,2,3].map((i) => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < strengthScore ? strengthColors[strengthScore - 1] : "bg-pink-100"}`} />
                          ))}
                        </div>
                        {strengthScore > 0 && <p className="text-xs text-[#8C5A6E]">Strength: <span className="font-medium">{strengthLabels[strengthScore - 1]}</span></p>}
                      </div>
                    )}
                    {signUpForm.formState.errors.password && <p className="text-red-500 text-xs mt-1">{signUpForm.formState.errors.password.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs text-[#4A1E2E] font-semibold uppercase tracking-wide block mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                      <input {...signUpForm.register("confirmPassword")} type={showConfirmPass ? "text" : "password"} placeholder="••••••••" className={`${inputClass} pl-10 pr-10`} />
                      <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300 hover:text-rose-500">
                        {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signUpForm.formState.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{signUpForm.formState.errors.confirmPassword.message}</p>}
                  </div>

                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.25)" }}>
                    {loading ? <Spinner /> : "Create Account"}
                  </motion.button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-pink-100" /></div>
                    <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-[#8C5A6E]">or continue with</span></div>
                  </div>

                  <motion.button type="button" onClick={() => signIn("google", { callbackUrl: "/dashboard" })} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full py-3 rounded-xl bg-[#FDF7F8] border border-pink-100 text-[#1A0A0D] font-medium text-sm flex items-center justify-center gap-3 hover:bg-pink-50 hover:border-pink-200 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </motion.button>

                  <p className="text-center text-sm text-[#8C5A6E] mt-4">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setTab("signin")} className="text-rose-500 hover:text-rose-600 font-semibold">Sign In</button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
