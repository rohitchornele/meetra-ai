"use client";
import { MessageSquareText } from "lucide-react";
interface SuggestedRepliesProps {
    replies: string[];
    onSelect?: (
        reply: string
    ) => void;
}
export default function SuggestedReplies({
    replies,
    onSelect,
}: SuggestedRepliesProps) {
    if (!replies.length) {
        return null;
    }
    return (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center">
                    <MessageSquareText size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        Suggested Replies
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                        AI generated quick responses
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                {
                    replies.map(reply => (
                        <button
                            key={reply}
                            onClick={() =>
                                onSelect?.(
                                    reply
                                )
                            }
                            className="px-4 py-3 rounded-xl bg-white/[0.03] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:bg-white/[0.06] hover:border-white/15 transition"
                        >
                            {reply}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}