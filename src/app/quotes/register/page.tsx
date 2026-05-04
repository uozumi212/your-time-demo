"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addQuote } from "@/utils/quotes";
import Navigation from "@/components/Navigation";
import AiQuoteModal from "@/components/AiQuoteModal";
import { Sparkles, MessageSquarePlus } from "lucide-react";
import "../Quotes.module.css";

export default function RegisterQuote() {
  const router = useRouter();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  // AI Modal State
  const [showAiModal, setShowAiModal] = useState(false);

  const handleAiSelectQuote = (
    selectedQuote: string,
    selectedAuthor: string,
  ) => {
    setQuote(selectedQuote);
    if (selectedAuthor) {
      setAuthor(selectedAuthor);
    }
    setShowAiModal(false);
    setMessage("✨ AIが教えてくれた名言をフォームにセットしました！");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote.trim()) return;

    addQuote(quote, author);
    setMessage("名言を登録しました！");
    setQuote("");
    setAuthor("");

    // 1.5秒後に一覧ページへ遷移
    setTimeout(() => {
      router.push("/quotes");
    }, 1500);
  };

  return (
    <>
      <Navigation />
      <main className="main-container">
        <div className="content-wrapper">
          <header className="header">
            <h1 className="title">
              <span className="title-gradient">名言を登録</span>
            </h1>
            <p className="subtitle">あなたの心に響く言葉を残しましょう</p>
          </header>

          <div className="form-section !p-4 pt-6 max-w-2xl mx-auto relative">
            {/* AI Trigger Area */}
            <div className="!p-2 mb-2 px-4 py-3 sm:pr-5 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-900/10 dark:to-purple-900/10 border border-indigo-500/10 dark:border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-indigo-900 dark:text-indigo-200">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 ring-1 ring-indigo-500/15 dark:ring-indigo-400/15">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                  </span>
                  AIに名言を教えてもらう
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  テーマや人物名を伝えて、AIとお話ししながら名言を探せます。
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAiModal(true)}
                className="shrink-0 sm:mr-1 inline-flex items-center justify-center gap-2.5 !px-4 !py-2 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all font-semibold tracking-wide ring-1 ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 active:translate-y-[1px]"
              >
                <MessageSquarePlus className="w-5 h-5" />
                使ってみる
              </button>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="input-form">
              <div className="form-group">
                <label className="form-label !mt-2" htmlFor="quote">
                  名言の内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="quote"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="ここに名言を入力してください..."
                  className="form-input rounded-xl min-h-[120px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border dark:border-slate-700"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="author">
                  著者 / 出典 (任意)
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="例: スティーブ・ジョブズ"
                  className="form-input rounded-xl min-h-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700"
                />
              </div>

              {message && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-center font-medium">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="submit-button mt-4"
                disabled={!quote.trim()}
              >
                登録する
              </button>
            </form>
          </div>
        </div>
      </main>

      <AiQuoteModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onSelectQuote={handleAiSelectQuote}
      />
    </>
  );
}
