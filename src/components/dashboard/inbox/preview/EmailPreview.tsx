"use client";
import { CalendarPlus, Reply, ListTodo } from "lucide-react";
import AISummary from "./AISummary";
import SuggestedReplies from "./SuggestedReplies";
import { getHeader } from "../utils/getHeader";
interface EmailPreviewProps {
    email: any;
}
export default function EmailPreview({
    email,
}: EmailPreviewProps) {
    if (!email) {
        return (
            <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
                Select an email to view
            </div>
        );
    }
    const headers =
        email.payload?.headers ?? [];
    const from =
        getHeader(
            headers,
            "From"
        ) ?? "Unknown";
    const to =
        getHeader(
            headers,
            "To"
        ) ?? "";
    const subject =
        getHeader(
            headers,
            "Subject"
        ) ?? "(No Subject)";
    const date =
        getHeader(
            headers,
            "Date"
        ) ?? "";
    return (
        <div className="h-full overflow-y-auto bg-[var(--bg)] px-8 py-8">
            {/* Subject */}
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                {subject}
            </h1>
            {/* Meta */}
            <div className="flex items-start justify-between pb-6 border-b border-[var(--border)]">
                <div>
                    <div className="text-sm text-[var(--text-secondary)]">
                        From
                    </div>
                    <div className="mt-1 text-[var(--text-primary)] font-medium">
                        {from}
                    </div>
                    <div className="mt-4 text-sm text-[var(--text-secondary)]">
                        To
                    </div>
                    <div className="mt-1 text-[var(--text-primary)]">
                        {to}
                    </div>
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                    {date}
                </div>
            </div>
            {/* Email Body */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Message
                </h2>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                    <p className="text-[15px] leading-8 text-[var(--text-primary)] whitespace-pre-wrap">
                        {email.snippet}
                    </p>
                </div>
            </div>
            {/* AI Summary */}
            <div className="mt-8">
                <AISummary
                    summary="Proposal approved. Schedule a review meeting next week."
                />
            </div>
            {/* Suggested Replies */}
            <div className="mt-8">
                <SuggestedReplies
                    replies={[
                        "Sounds good!",
                        "Let's schedule a meeting.",
                        "Can you share more details?",
                    ]}
                />
            </div>
            {/* AI Actions */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    AI Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition">
                        <Reply size={16} />
                        Draft Reply
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition">
                        <CalendarPlus size={16} />
                        Schedule Meeting
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition">
                        <ListTodo size={16} />
                        Extract Tasks
                    </button>
                </div>
            </div>
        </div>
    );
}