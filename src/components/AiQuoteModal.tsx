"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, Bot, User, Loader2, Check, Sparkles } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  quoteData?: { quote: string; author: string };
};

interface AiQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuote: (quote: string, author: string) => void;
}

export default function AiQuoteModal({
  isOpen,
  onClose,
  onSelectQuote,
}: AiQuoteModalProps) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      text: "こんにちは！誰の名言、あるいはどんなテーマの名言が知りたいですか？\n例: 「スティーブ・ジョブズ」「努力」「アニメ」など",
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isGenerating]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: userMessage.text }),
      });

      if (!res.ok) throw new Error("生成失敗");
      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: "こちらの名言はいかがでしょうか？✨",
        quoteData: { quote: data.quote, author: data.author || "" },
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          text: "すみません、名言の生成に失敗しました。時間をおいてからもう一度お試しください。",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 背景の美しいブラーとグラデーション */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(58, 101, 200, 0.4)",
          backdropFilter: "blur(8px)",
        }}
        onClick={handleBackdropClick}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "32rem",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          height: "650px",
          maxHeight: "85vh",
          overflow: "hidden",
          borderRadius: "1.5rem",
          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)",
          padding: "1rem",
        }}
        className="animate-in zoom-in-95 duration-200"
      >
        {/* モーダル本体のグラスモーフィズムデザイン */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            zIndex: 10,
            width: "100%",
          }}
        >
          {/* Header */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="px-6 py-5 border-b border-indigo-500/10 dark:border-indigo-400/10 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent"
          >
            <h2 className="font-bold text-xl flex items-center gap-3 text-slate-800 dark:text-slate-100">
              <span className="relative flex items-center justify-center md:w-10 md:h-10 w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 text-white">
                <Sparkles className="w-5 h-5" />
              </span>
              AIアシスタント
            </h2>
            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="px-6 py-6 space-y-6"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-2 mt-2"
                style={{
                  display: "flex",
                  gap: "0.3rem",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "ai" && (
	                  <div
	                    style={{
	                      display: "flex",
	                      flexShrink: 0,
	                      alignItems: "center",
	                      justifyContent: "center",
	                    }}
	                    className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 shadow-sm border border-indigo-200/50 dark:border-indigo-700/50 mt-2"
	                  >
	                    <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
	                  </div>
	                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                  }}
                >
                  <div
                    className={`px-5 py-3 rounded-2xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-sm shadow-indigo-500/20"
                        : "bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white dark:border-slate-700/50 rounded-tl-sm text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <p
                      style={{ zIndex: 10, position: "relative" }}
                      className="whitespace-pre-wrap text-[15px] leading-relaxed"
                    >
                      {msg.text}
                    </p>
                  </div>

                  {msg.quoteData && (
                    <div
                      style={{ width: "100%" }}
                      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-indigo-100/50 dark:border-indigo-500/20 rounded-2xl p-6 shadow-sm shadow-indigo-500/5 mt-2"
                    >
                      <p className="text-slate-800 dark:text-slate-100 font-medium text-md md:text-xl leading-relaxed mb-4 mt-2">
                        &quot;{msg.quoteData.quote}&quot;
                      </p>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 text-right mb-5 font-bold tracking-wide">
                        — {msg.quoteData.author}
                      </p>
                      <button
                        onClick={() =>
                          onSelectQuote(
                            msg.quoteData!.quote,
                            msg.quoteData!.author,
                          )
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          width: "100%",
                        }}
                        className="py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-[15px] font-bold shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 group"
                      >
                        <Check className="m-4 w-5 h-5 group-hover:scale-110 transition-transform" />
                        この名言をフォームに入力する
                      </button>
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div
                    style={{
                      display: "flex",
                      flexShrink: 0,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 shadow-sm mt-1"
                  >
                    <User className="w-5 h-5 text-slate-500 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {isGenerating && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexShrink: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 shadow-sm mt-1"
                >
                  <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                  className="px-5 py-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white dark:border-slate-700/50 rounded-2xl rounded-tl-sm shadow-sm"
                >
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                  <span className="text-[15px] font-medium text-slate-600 dark:text-slate-300">
                    名言を検索中...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            style={{ flexShrink: 0 }}
            className="w-full p-6 border-t border-indigo-500/10  rounded-b-3xl"
          >
            <div
              style={{ position: "relative", display: "flex" }}
              className="group"
            >
              <input
                name="famousPerson"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="テーマや有名人の名前を入力..."
                disabled={isGenerating}
                style={{
                  width: "100%",
                  height: "50px",
                  paddingLeft: "0.5rem",
                  marginBottom: "0.5rem",
                }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all disabled:opacity-50 text-[15px] shadow-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: "0.5rem",
                  marginTop: "1rem",
                }}
                disabled={!input.trim() || isGenerating}
                className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:hover:from-indigo-500 transition-all shadow-md shadow-indigo-500/20"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            <p className="text-[13px] text-center text-slate-400 dark:text-slate-300 mt-1 font-medium tracking-wide">
              AIは不正確な情報を生成する場合があります。
            </p>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
