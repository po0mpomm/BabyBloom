"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Minimize2, Sparkles, User, Bot, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm Baby Blooms, your warm and knowledgeable AI assistant specializing in newborn healthcare. How can I support you and your little one today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev: Message[]) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Use our new local Gemini serverless API
      const response = await fetch("/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          chat_history: messages.map((m: Message) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      const botMsg: Message = { 
        role: "bot", 
        content: data.answer || "I'm sorry, I couldn't process that. Please try again." 
      };
      setMessages((prev: Message[]) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev: Message[]) => [...prev, { 
        role: "bot", 
        content: "I'm having a brief connection issue. Please try again in a few seconds! 🧠✨" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2147483647] pointer-events-auto chatbot-container">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] group transition-all duration-300 pointer-events-auto cursor-pointer border border-white/20"
            style={{ background: "var(--gradient-accent)" }}
            title="Chat with Baby Blooms"
          >
            {/* Soft pulsing ambient glow underneath */}
            <div className="absolute inset-0 bg-rose-400 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
            
            {/* Icon */}
            <div className="relative z-10 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            
            {/* Notification Badge */}
            <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#10B981] rounded-full border-2 border-white shadow-sm z-20" />
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
                  <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>Baby Blooms AI</h3>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDF7F8] overscroll-contain" data-lenis-prevent="true">
              {messages.map((msg: Message, idx: number) => (
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
                  placeholder="Ask Baby Blooms about newborn health..."
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
