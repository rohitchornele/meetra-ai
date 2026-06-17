"use client";
import { useEffect, useState } from "react";
interface ChatPanelProps {
  className?: string;
}
const messages = [
  {
    type: "user",
    content: "Summarize my unread emails",
  },
  {
    type: "ai",
    checks: ["14 emails analyzed"],
    list: [
      "Client approved proposal",
      "Team meeting moved to 3 PM",
      "Invoice received",
    ],
  },
  {
    type: "user",
    content:
      "Schedule a meeting with Rahul tomorrow at 11 AM",
  },
  {
    type: "ai",
    checks: [
      "Event created",
      "Rahul invited",
    ],
  },
];
export default function ChatPanel({
  className = "",
}: ChatPanelProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    const timers = messages.map((_, i) =>
      setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1200 + i * 900)
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);
  return (
    <div
      className={`
      ${className}
      hidden lg:flex
      flex-col
      bg-card
      border border-border
      rounded-[16px]
      overflow-hidden
      shadow-[var(--shadow-float)]
    `}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border uppercase tracking-[0.06em] text-[0.72rem] font-bold text-text2"
      >
        ConvertIQ Chat
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
      >
        {messages.map((msg, index) => {
          const visible = index < visibleCount;
          if (msg.type === "user") {
            return (
              <div key={index} className={`max-w-[90%] self-end px-4 py-3 rounded-xl rounded-br-[3px] text-[0.78rem] leading-relaxed bg-accent text-white transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
              >
                {msg.content}
              </div>
            );
          }
          return (
            <div key={index} className={`max-w-[90%] self-start px-4 py-3 rounded-xl rounded-bl-[3px] border border-border bg-bg text-text text-[0.78rem] leading-relaxed transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} >
              {/* Checks */}
              {msg.checks?.map((check) => (
                <div key={check} className="text-accent2 font-bold text-[0.72rem] mb-1"
                >
                  ✓ {check}
                </div>
              ))}
              {/* Bullet List */}
              {msg.list && (
                <ul className="mt-2 space-y-1">
                  {msg.list.map((item) => (
                    <li key={item} className="flex gap-2 text-[0.74rem] text-text2"
                    >
                      <span className="text-accent2">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {/* Fake Input */}
      <div className="border-t border-border p-3 flex gap-2"
      >
        <div className="flex-1 px-3 py-2 rounded-lg border border-border bg-bg text-[0.72rem] text-text2 relative"
        >
          Ask anything...
          <span className="ml-1 animate-pulse text-accent"
          >
            |
          </span>
        </div>
        <button className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-4 fill-white">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}