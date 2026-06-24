"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "@/config/business";
import { services, formatPrice } from "@/config/services";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickActions = [
  { label: "Pricing", keyword: "price" },
  { label: "Services", keyword: "service" },
  { label: "Areas", keyword: "area" },
  { label: "Book Now", keyword: "book" },
];

function generateResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
    const serviceList = services
      .map((s) => `  • ${s.title}: ${formatPrice(s.startingPrice)}`)
      .join("\n");
    return `Here are our service prices:\n\n${serviceList}\n\nPrices may vary based on property size and requirements. Want an accurate quote? Contact us on WhatsApp: +${business.whatsapp}`;
  }

  if (lower.includes("service") || lower.includes("offer") || lower.includes("provide")) {
    const serviceList = services.map((s) => `  • ${s.title}`).join("\n");
    return `We offer the following services:\n\n${serviceList}\n\nWould you like details about any specific service? Or WhatsApp us at +${business.whatsapp} for custom requirements.`;
  }

  if (lower.includes("area") || lower.includes("location") || lower.includes("where")) {
    const areaNames = services.length
      ? ""
      : "";
    const areasList = [
      "Kothrud",
      "Baner",
      "Warje",
      "Aundh",
      "Bavdhan",
      "Karve Nagar",
      "Wakad",
      "Pashan",
      "Kharadi",
      "Hinjewadi",
    ]
      .map((a) => `  • ${a}`)
      .join("\n");
    return `We serve the following areas in Pune:\n\n${areasList}\n\nIf your area isn't listed, contact us on WhatsApp (+${business.whatsapp}) — we may still cover it!`;
  }

  if (lower.includes("book") || lower.includes("schedule") || lower.includes("appointment")) {
    return `Great! To book a service, please WhatsApp us at +${business.whatsapp}. Our team will help you schedule a convenient time slot. We're available daily, 8 AM – 11 PM.`;
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return `Hello! Welcome to ${business.name}! I can help you with:\n\n  • Service pricing\n  • List of services offered\n  • Areas we serve\n  • Booking a service\n\nWhat would you like to know?`;
  }

  if (lower.includes("thank")) {
    return `You're welcome! If you have any more questions, feel free to ask. You can also reach us on WhatsApp at +${business.whatsapp} for immediate assistance. Have a great day!`;
  }

  return `Thanks for your message! I can help with pricing, services, areas served, and bookings. Try asking something like "What are your prices?" or "Which areas do you cover?"\n\nOr WhatsApp us directly at +${business.whatsapp} for personalized assistance.`;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Hi! I'm the Classic Assistant. I can help you with pricing, services, areas we serve, and bookings. How can I help you today?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (keyword: string) => {
    sendMessage(keyword);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-20 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        style={{ backgroundColor: "#0B1D3A" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed z-40 shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{
              bottom: "7.5rem",
              right: "1.25rem",
              width: "min(24rem, calc(100vw - 2.5rem))",
              height: "min(500px, calc(100vh - 10rem))",
              borderRadius: "1rem",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between shrink-0"
              style={{ backgroundColor: "#0B1D3A" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#0D9488" }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Classic Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                    <span className="text-gray-300 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1"
                      style={{ backgroundColor: "#0D9488" }}
                    >
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                      message.sender === "user"
                        ? "text-white rounded-br-md"
                        : "text-gray-800 rounded-bl-md"
                    }`}
                    style={{
                      backgroundColor:
                        message.sender === "user" ? "#0B1D3A" : "#F3F4F6",
                    }}
                  >
                    {message.text}
                  </div>
                  {message.sender === "user" && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1"
                      style={{ backgroundColor: "#0B1D3A" }}
                    >
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1"
                    style={{ backgroundColor: "#0D9488" }}
                  >
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md" style={{ backgroundColor: "#F3F4F6" }}>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-gray-100 bg-gray-50 shrink-0">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.keyword)}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors hover:text-white"
                    style={{
                      borderColor: "#0B1D3A",
                      color: "#0B1D3A",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0B1D3A";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#0B1D3A";
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-3 border-t border-gray-200 bg-white flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full outline-none focus:border-[#0D9488] transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
                style={{ backgroundColor: "#0D9488" }}
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
