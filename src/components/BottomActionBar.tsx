"use client";

import { useState } from "react";
import { Phone, MessageCircle, Sparkles, Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "@/config/business";
import { services, formatPrice } from "@/config/services";

export default function BottomActionBar() {
  const [activePanel, setActivePanel] = useState<"none" | "quote" | "chat">("none");
  const [chatMessages, setChatMessages] = useState<{ id: string; text: string; sender: "user" | "bot" }[]>([
    { id: "1", text: "Hi! I'm Classic Assistant. I can help with pricing, services, areas & bookings. How can I help?", sender: "bot" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
      const list = services.map(s => `• ${s.title}: ${formatPrice(s.startingPrice)}`).join("\n");
      return `Here are our prices:\n\n${list}\n\nWant an accurate quote? WhatsApp us: +${business.whatsapp}`;
    }
    if (lower.includes("service") || lower.includes("offer")) {
      return `We offer:\n\n${services.map(s => `• ${s.title}`).join("\n")}\n\nAsk me about any service or WhatsApp +${business.whatsapp} for details.`;
    }
    if (lower.includes("area") || lower.includes("location")) {
      return `We serve: Kothrud, Baner, Warje, Aundh, Bavdhan, Karve Nagar, Wakad, Pashan, Kharadi, Hinjewadi & more!\n\nNot sure? WhatsApp +${business.whatsapp} — we probably cover your area!`;
    }
    if (lower.includes("book") || lower.includes("schedule")) {
      return `To book, WhatsApp us at +${business.whatsapp}. We'll schedule a convenient slot. Available 8 AM – 11 PM daily!`;
    }
    return `I can help with pricing, services, areas & bookings!\n\nOr WhatsApp us directly: +${business.whatsapp}`;
  };

  const sendChat = (text: string) => {
    if (!text.trim()) return;
    setChatMessages(prev => [...prev, { id: Date.now().toString(), text, sender: "user" }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: generateResponse(text), sender: "bot" }]);
      setIsTyping(false);
    }, 600 + Math.random() * 500);
  };

  return (
    <>
      {/* Expandable Panels */}
      <AnimatePresence>
        {activePanel !== "none" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 z-50 lg:left-auto lg:right-8 lg:w-96"
            style={{ maxHeight: "calc(100vh - 7rem)" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col" style={{ maxHeight: "min(500px, calc(100vh - 7rem))" }}>
              {/* Panel Header */}
              <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ backgroundColor: "#0B1D3A" }}>
                <div className="flex items-center gap-2">
                  {activePanel === "chat" ? <Bot className="w-5 h-5 text-teal-400" /> : <Sparkles className="w-5 h-5 text-orange" />}
                  <span className="text-white font-semibold text-sm">
                    {activePanel === "chat" ? "Classic Assistant" : "Get Free Quote"}
                  </span>
                </div>
                <button onClick={() => setActivePanel("none")} className="text-gray-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Panel */}
              {activePanel === "chat" && (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user" ? "bg-[#0B1D3A] text-white rounded-br-md" : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-md shadow-sm">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Chat Input */}
              {activePanel === "chat" && (
                <form onSubmit={e => { e.preventDefault(); sendChat(chatInput); }} className="px-3 py-2 border-t border-gray-100 bg-white flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Ask about pricing, services..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full outline-none focus:border-[#0D9488]"
                    disabled={isTyping}
                  />
                  <button type="submit" disabled={!chatInput.trim() || isTyping} className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-40" style={{ backgroundColor: "#0D9488" }}>
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>
              )}

              {/* Quote Panel */}
              {activePanel === "quote" && (
                <div className="p-4 bg-white">
                  <p className="text-sm text-gray-600 mb-3">Get a response within 15 minutes!</p>
                  <a
                    href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hi! I'd like a free quote for cleaning services.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm"
                    style={{ backgroundColor: "#0D9488" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get Quote on WhatsApp
                  </a>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {services.slice(0, 4).map(s => (
                      <a key={s.id} href={`/services/${s.slug}`} className="text-xs text-center py-2 px-1 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                        {s.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] pb-safe">
        <div className="flex items-stretch">
          {/* Call */}
          <a
            href={`tel:${business.phone}`}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:bg-gray-50 transition-colors"
          >
            <Phone className="w-5 h-5 text-navy" />
            <span className="text-[10px] font-semibold text-navy">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald" />
            <span className="text-[10px] font-semibold text-emerald">WhatsApp</span>
          </a>

          {/* Get Free Quote */}
          <button
            onClick={() => setActivePanel(activePanel === "quote" ? "none" : "quote")}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:bg-gray-50 transition-colors"
          >
            <Sparkles className={`w-5 h-5 ${activePanel === "quote" ? "text-orange" : "text-orange-500"}`} />
            <span className="text-[10px] font-semibold text-orange-500">Quote</span>
          </button>

          {/* AI Chat */}
          <button
            onClick={() => setActivePanel(activePanel === "chat" ? "none" : "chat")}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:bg-gray-50 transition-colors"
          >
            <Bot className={`w-5 h-5 ${activePanel === "chat" ? "text-[#0D9488]" : "text-[#0B1D3A]"}`} />
            <span className="text-[10px] font-semibold text-[#0B1D3A]">AI Chat</span>
          </button>
        </div>
      </div>
    </>
  );
}
