"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Minimize2, Sparkles, User, Bot, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const RENDER_API_URL = "https://baby-bloom-api-onbj.onrender.com/ask";
const RENDER_API_ROOT = "https://baby-bloom-api-onbj.onrender.com/";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm your AI Newborn Health Assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Pre-warm the API on page load to minimize cold-start latency
  useEffect(() => {
    fetch(RENDER_API_ROOT)
      .then(() => console.log("AI Engine pre-warmed"))
      .catch(() => {}); // Silent ping
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 2. Fetch with Auto-Retry Logic
  const fetchWithRetry = async (question: string, chatHistory: any[], attempts = 3): Promise<any> => {
    for (let i = 0; i < attempts; i++) {
      try {
        const res = await fetch(RENDER_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, chat_history: chatHistory }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data = await res.json();

        // If Render is still waking up, wait 12s and retry
        const answer = data?.answer?.toLowerCase() || "";
        if ((answer.includes("waking up") || answer.includes("warming")) && i < attempts - 1) {
          console.log(`Retry attempt ${i + 1} - Engine still warming up...`);
          await new Promise(r => setTimeout(r, 12000));
          continue;
        }
        
        return data;
      } catch (err) {
        if (i < attempts - 1) {
          console.log(`Retry attempt ${i + 1} after error:`, err);
          await new Promise(r => setTimeout(r, 12000));
          continue;
        }
        throw err;
      }
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const chatHistory = messages.map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content
      }));

      const data = await fetchWithRetry(input, chatHistory);
      
      const botMsg: Message = { 
        role: "bot", 
        content: data.answer || "I'm sorry, I couldn't process that. Please try again." 
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, { 
        role: "bot", 
        content: "I'm having some trouble connecting to my brain. The connection timed out—please try asking again in a moment! 🧠✨" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white relative group"
            style={{ background: "var(--gradient-accent)" }}
          >
            <MessageCircle className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-pink-100"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between text-white" style={{ background: "var(--gradient-accent)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>BabyBloom AI</h3>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDF7F8]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-rose-100 text-rose-600" : "bg-white border border-pink-100 text-rose-500 shadow-sm"}`}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${msg.role === "user" ? "bg-rose-500 text-white rounded-tr-none" : "bg-white text-[#4A1E2E] border border-pink-50 rounded-tl-none"}`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center text-rose-400 text-xs italic">
                    <Loader2 className="w-4 h-4 animate-spin" /> BabyBloom is thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-pink-50">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about newborn health..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FDF7F8] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="p-3 rounded-xl text-white shadow-md disabled:opacity-50"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[9px] text-center text-[#8C5A6E] mt-3">
                AI assistance isn't a substitute for medical advice.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
