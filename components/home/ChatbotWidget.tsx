"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Message { role: "user" | "bot"; text: string; }

const botResponses: Record<string, string> = {
  vaccination:
    "Vaccination Schedule by Age:\n- Birth: BCG, OPV0, HepB\n- 6 weeks: DTwP/DTaP, IPV, HepB, Hib, PCV\n- 10 weeks: DTwP/DTaP, IPV, Hib, PCV\n- 14 weeks: DTwP/DTaP, IPV, Hib, PCV\n- 9 months: Measles, OPV3\n- 12-15 months: MMR, Varicella, PCV booster\n- 18 months: DTwP booster, IPV, Hib\n- 5 years: DTwP, OPV\nAlways consult your paediatrician!",
  nutrition:
    "Child Nutrition Tips:\n- 0-6 months: Exclusive breastfeeding is ideal.\n- 6-12 months: Introduce soft purees alongside breastfeeding.\n- 1-3 years: Iron-rich foods (meat, beans), calcium (dairy), colourful vegetables.\n- 3-5 years: 3 meals + 2 snacks; limit sugar.\n- Offer water over juice; avoid honey before age 1.",
  maternal:
    "Maternal Health Tips:\n- Take prenatal vitamins with folic acid daily.\n- Attend all scheduled antenatal check-ups.\n- Stay hydrated and eat a balanced diet.\n- Avoid alcohol, smoking, and unprescribed medications.\n- Get 7-9 hours of sleep per night.\n- Light exercise like walking and prenatal yoga.\nAlways consult your OB/GYN for personalised guidance.",
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("vaccin") || lower.includes("immuniz") || lower.includes("shot")) return botResponses.vaccination;
  if (lower.includes("nutri") || lower.includes("food") || lower.includes("diet") || lower.includes("feed")) return botResponses.nutrition;
  if (lower.includes("maternal") || lower.includes("pregnan") || lower.includes("mother") || lower.includes("mom")) return botResponses.maternal;
  return "Hi! I'm your BabyBloom health assistant.\n\nAsk me about:\n- Vaccination schedules\n- Child nutrition tips\n- Maternal health guidance\n\nHow can I help you today?";
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I'm your BabyBloom assistant.\n\nHow can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: getBotReply(userMsg) }]);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl text-white shadow-xl flex items-center justify-center"
        style={{
          background: "var(--gradient-accent)",
          boxShadow: "0 8px 32px rgba(194,24,91,0.35)",
        }}
        animate={{
          boxShadow: [
            "0 8px 32px rgba(194,24,91,0.3)",
            "0 8px 48px rgba(194,24,91,0.55)",
            "0 8px 32px rgba(194,24,91,0.3)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-3xl overflow-hidden flex flex-col bg-white"
            style={{
              maxHeight: "500px",
              border: "1px solid rgba(194,24,91,0.12)",
              boxShadow: "0 32px 80px rgba(194,24,91,0.15), 0 8px 24px rgba(194,24,91,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4"
              style={{ background: "var(--gradient-accent)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">BabyBloom AI</p>
                  <p className="text-white/70 text-xs">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDF7F8]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "bg-white text-[#1A0A0D] rounded-bl-sm shadow-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "var(--gradient-accent)", boxShadow: "0 4px 12px rgba(194,24,91,0.20)" }
                        : { border: "1px solid rgba(194,24,91,0.08)" }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white border border-pink-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-rose-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-pink-100 flex gap-2 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about vaccines, nutrition..."
                className="flex-1 bg-[#FDF7F8] border border-pink-100 rounded-xl px-4 py-2.5 text-sm text-[#1A0A0D] placeholder-[#8C5A6E] outline-none focus:border-rose-300 transition-colors"
              />
              <motion.button
                onClick={sendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ background: "var(--gradient-accent)" }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
