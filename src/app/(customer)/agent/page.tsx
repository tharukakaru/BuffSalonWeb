"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  Sparkles,
  Calendar,
  Scissors,
  CheckCircle2,
  Plus,
  History,
  X,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string; card?: string };
type Conversation = { id: string; title: string; messages: Message[]; createdAt: string };

const quickPrompts = [
  { label: "Wedding next week", icon: Calendar },
  { label: "Hair falling out", icon: Sparkles },
  { label: "Need a stylist today", icon: Scissors },
  { label: "Recommend a salon", icon: Sparkles },
];

const defaultMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm your BUFF SALON AI beauty agent. I can help you find styles, book stylists, shop products, and plan events. What can I help you with?",
  },
];

const workflowSteps = [
  { label: "Analyzing your hair profile", done: true },
  { label: "Generating bridal styles", done: true },
  { label: "Finding bridal stylists nearby", done: true },
  { label: "Suggesting hair care products", done: false },
  { label: "Preparing booking options", done: false },
];

const botReplies: Record<string, { content: string; card?: string }> = {
  "wedding next week": {
    content: "I'd love to help you plan your bridal look! Let me pull together some options.",
    card: "workflow",
  },
  "hair falling out": {
    content:
      "I'm sorry to hear that. Let me recommend some treatments and top-rated trichologists near you.",
  },
  "need a stylist today": {
    content:
      "Got it. I can find stylists with same-day availability near your location. Do you prefer home visit or salon?",
    card: "booking",
  },
  "recommend a salon": {
    content:
      "Sure! Tell me your area and what service you need (haircut, color, bridal, etc.) and I'll shortlist the best salons.",
  },
};

function formatTitleFromFirstUserMessage(messages: Message[]) {
  const firstUser = messages.find((m) => m.role === "user")?.content?.trim();
  if (!firstUser) return "New chat";
  return firstUser.length > 26 ? `${firstUser.slice(0, 26)}…` : firstUser;
}

export default function AgentPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load conversation history (frontend demo)
    try {
      const raw = window.localStorage.getItem("buff_agent_conversations");
      if (raw) {
        const parsed = JSON.parse(raw) as Conversation[];
        setConversations(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    // Persist conversation history (frontend demo)
    try {
      window.localStorage.setItem("buff_agent_conversations", JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  useEffect(() => {
    // Auto-scroll to bottom
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const startNewChat = () => {
    setMessages(defaultMessages);
    setActiveConversationId(null);
    setShowHistory(false);
    toast.success("New chat started");
  };

  const openConversation = (conv: Conversation) => {
    setMessages(conv.messages);
    setActiveConversationId(conv.id);
    setShowHistory(false);
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
      setMessages(defaultMessages);
    }
    toast("Deleted conversation");
  };

  const saveConversationSnapshot = (updatedMessages: Message[]) => {
    const id = activeConversationId ?? `c_${Date.now()}`;
    const title = formatTitleFromFirstUserMessage(updatedMessages);
    const existing = conversations.find((c) => c.id === id);

    const next: Conversation = {
      id,
      title,
      messages: updatedMessages,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };

    setConversations((prev) => {
      const rest = prev.filter((c) => c.id !== id);
      return [next, ...rest].slice(0, 30);
    });

    setActiveConversationId(id);
  };

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    // Frontend-only bot reply simulation
    const key = trimmed.toLowerCase();
    const reply = botReplies[key] ?? {
      content:
        "Thanks! Tell me a bit more — what service do you want and where are you located? (City/area is enough.)",
    };

    setTimeout(() => {
      // ✅ FIX: Build a fully typed Message object (no spread that confuses TS)
      const finalMessages: Message[] = [
        ...nextMessages,
        {
          role: "assistant",
          content: reply.content ?? "",
          card: reply.card,
        },
      ];

      setMessages(finalMessages);
      setIsTyping(false);
      saveConversationSnapshot(finalMessages);
    }, 800);
  };

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-gold" />
            AI Agent
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Chat with BUFF SALON AI to plan styles, bookings, and more.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10" onClick={() => setShowHistory(true)}>
            <History className="h-4 w-4 mr-2" /> History
          </Button>
          <Button className="h-10" onClick={startNewChat}>
            <Plus className="h-4 w-4 mr-2" /> New chat
          </Button>
        </div>
      </div>

      {/* History Drawer (simple) */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              className="w-full max-w-lg bg-card border-t md:border border-border rounded-t-2xl md:rounded-2xl p-5"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">Chat history</h3>
                <button
                  className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
                  onClick={() => setShowHistory(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {conversations.length === 0 ? (
                <div className="rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
                  No conversations yet.
                </div>
              ) : (
                <div className="space-y-2 max-h-[55vh] overflow-auto pr-1">
                  {conversations.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-xl border border-border bg-card hover:border-accent-gold/25 transition-colors p-3 flex items-center gap-3"
                    >
                      <button className="flex-1 text-left min-w-0" onClick={() => openConversation(c)}>
                        <p className="text-sm font-semibold truncate">{c.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {new Date(c.createdAt).toLocaleString()}
                        </p>
                      </button>
                      <button
                        onClick={() => deleteConversation(c.id)}
                        className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick prompts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
        {quickPrompts.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.label}
              onClick={() => handleSend(p.label)}
              className="rounded-2xl border border-border bg-card p-3 hover:border-accent-gold/30 transition-colors flex items-center gap-2"
            >
              <div className="h-9 w-9 rounded-xl bg-accent-gold/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-accent-gold" />
              </div>
              <span className="text-sm font-medium">{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chat box */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {/* Messages */}
        <div ref={scrollRef} className="h-[55vh] md:h-[60vh] overflow-auto p-4 space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-accent-gold text-background" : "bg-secondary text-foreground"
                }`}
              >
                {m.content}

                {/* Cards */}
                {m.card === "workflow" && (
                  <div className="mt-3 rounded-xl border border-border bg-background/40 p-3 space-y-2">
                    <p className="text-xs font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent-gold" />
                      Bridal workflow
                    </p>
                    <div className="space-y-1">
                      {workflowSteps.map((s) => (
                        <div key={s.label} className="flex items-center gap-2 text-xs">
                          {s.done ? (
                            <CheckCircle2 className="h-4 w-4 text-accent-gold" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                          )}
                          <span className="text-muted-foreground">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {m.card === "booking" && (
                  <div className="mt-3 rounded-xl border border-border bg-background/40 p-3 space-y-2">
                    <p className="text-xs font-semibold flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-accent-gold" />
                      Quick booking
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" onClick={() => toast.success("Home visit preference saved (frontend demo)")}>
                        Home Visit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.success("Salon visit preference saved (frontend demo)")}
                      >
                        Salon
                      </Button>
                    </div>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => toast.info("We’ll connect this to real booking later")}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" /> Continue
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-secondary text-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="border-t border-border p-3 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask BUFF SALON AI..."
            className="flex-1 bg-transparent text-sm outline-none px-3 py-2 rounded-xl border border-border focus:border-accent-gold/40"
          />
          <button
            type="button"
            className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => toast.info("Voice input")}
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            className="h-8 w-8 rounded-lg bg-accent-gold flex items-center justify-center text-background"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
