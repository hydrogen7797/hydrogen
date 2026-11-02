"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LINKS } from "@/data/home";

const SUGGESTIONS = [
  "グッドパッチってどんな会社？",
  "採用について教えて",
  "デザインの支援は？",
  "ぱっちーについて教えて",
];

// Canned replies — the original is backed by an AI assistant; this clone is a front-end demo.
const REPLIES: Record<string, string> = {
  "グッドパッチってどんな会社？":
    "グッドパッチは「デザインの力を証明する」をミッションに、事業・プロダクト・ブランド・組織の変革をデザインでリードするデザインカンパニーです。",
  採用について教えて:
    "デザイナーはもちろん、エンジニアやビジネス職など多様なスペシャリストが活躍しています。詳しくは採用サイトをご覧ください！",
  "デザインの支援は？":
    "UI/UXデザイン、ブランド体験、事業・戦略デザイン、AIソリューションなど、パートナーとして幅広くご支援しています。",
  ぱっちーについて教えて: "ぼくはグッドパッチのキャラクター、ぱっちー！ハートを揺さぶるデザインが大好きだワン🐶",
};
const FALLBACK = "ありがとうございます！詳しくは担当者よりご案内しますので、お問い合わせフォームからご連絡ください。";

type Msg = { from: "user" | "bot"; text: string };

export function PatchyLauncher() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // Patchy shows up once the hero (which has its own Patchy) is behind us.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 2.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setDraft("");
    setTimeout(() => setMessages((m) => [...m, { from: "bot", text: REPLIES[q] ?? FALLBACK }]), 650);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="ぱっちーに質問する"
        className={`group fixed right-3 bottom-3 z-40 flex items-end gap-1 transition-[translate,opacity] ease-emphasized-out ${
          visible && !open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0"
        }`}
      >
        <span className="mb-3 inline-flex h-9 w-10 items-center justify-center rounded-xl bg-white shadow-md">
          <svg viewBox="0 0 24 24" className="size-5 text-primary" fill="currentColor" aria-hidden="true">
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5v-8Z" />
          </svg>
        </span>
        <span className="relative block w-[62px]">
          <Image
            src="/images/patchy/launcher-patchy.png"
            alt=""
            width={220}
            height={378}
            className="h-auto w-full group-hover:opacity-0"
          />
          <Image
            src="/images/patchy/launcher-patchy-hover.png"
            alt=""
            width={220}
            height={378}
            className="absolute inset-0 h-auto w-full opacity-0 group-hover:opacity-100"
          />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="ぱっちーチャット"
          className="fixed right-3 bottom-3 z-50 flex h-[min(560px,calc(100svh-24px))] w-[min(360px,calc(100vw-24px))] animate-[chat-in_0.35s_var(--ease-power3-out)] flex-col overflow-visible rounded-xl bg-white text-text shadow-[0_20px_60px_rgba(0,30,80,0.25)]"
          data-lenis-prevent
        >
          <Image
            src="/images/patchy/launcher-patchy.png"
            alt=""
            width={220}
            height={378}
            className="absolute -top-[64px] right-8 h-auto w-[44px]"
          />
          <div className="flex items-center justify-between gap-3 border-b border-text/10 px-3 py-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="閉じる"
              className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-white"
            >
              <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <a href={LINKS.contact} className="text-[11px] font-bold text-primary underline underline-offset-2">
              グッドパッチの担当者に直接問い合わせする →
            </a>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-6">
            <p className="text-center text-[13px] leading-[1.8] font-bold">
              グッドパッチに関して気になることやご相談、
              <br />
              何でも気軽にご相談ください！😊
            </p>
            {messages.length === 0 && (
              <div className="mt-5 grid justify-items-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-full bg-surface-muted px-4 py-2 text-xs font-bold text-text/70 transition-colors hover:bg-primary-pale hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-5 grid gap-3">
              {messages.map((m, i) => (
                <p
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-[1.7] ${
                    m.from === "user" ? "justify-self-end bg-primary text-white" : "justify-self-start bg-surface-muted"
                  }`}
                >
                  {m.text}
                </p>
              ))}
            </div>
          </div>

          <form
            className="px-3 pb-2"
            onSubmit={(e) => {
              e.preventDefault();
              ask(draft);
            }}
          >
            <div className="relative rounded-lg bg-surface-muted">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    ask(draft);
                  }
                }}
                rows={2}
                placeholder="例）グッドパッチの強みや事例を教えてください。"
                className="block w-full resize-none bg-transparent px-3 py-3 pr-12 text-[13px] outline-none placeholder:text-text/40"
              />
              <button
                type="submit"
                aria-label="送信"
                disabled={!draft.trim()}
                className="absolute right-2 bottom-2 inline-flex size-7 items-center justify-center rounded-md bg-primary text-white disabled:opacity-40"
              >
                <svg viewBox="0 0 12 12" className="size-3 -rotate-90" fill="none" aria-hidden="true">
                  <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-text/60">※このチャットはデモ用の定型回答です。</p>
          </form>
        </div>
      )}
    </>
  );
}
