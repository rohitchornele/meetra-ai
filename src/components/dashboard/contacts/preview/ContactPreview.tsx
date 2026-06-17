"use client";
import {
    Mail,
    Building2,
    Clock3,
    Pencil,
    CalendarPlus,
    FileText,
} from "lucide-react";
import AIInsights from "./AIInsights";
import { Contact } from "../types";
interface ContactPreviewProps {
    contact: Contact | null;
}
function getInitials(
    name: string
) {
    const parts =
        name
            .split(" ")
            .filter(Boolean);
    if (
        parts.length === 0
    ) {
        return "?";
    }
    if (
        parts.length === 1
    ) {
        return parts[0][0]
            .toUpperCase();
    }
    return (
        parts[0][0] +
        parts[
        parts.length - 1
        ][0]
    ).toUpperCase();
}
export default function ContactPreview({
    contact,
}: ContactPreviewProps) {
    if (!contact) {
        return (
            <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
                Select a contact
            </div>
        );
    }
    return (
        <div className="h-full overflow-y-auto px-10 py-10">
            {/* Header */}
            <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center text-2xl font-semibold shrink-0">
                    {
                        contact.avatar
                            ? (
                                <img
                                    src={contact.avatar}
                                    alt={contact.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            )
                            : (
                                getInitials(
                                    contact.name
                                )
                            )
                    }
                </div>
                <div className="flex-1">
                    <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                        {contact.name}
                    </h1>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                            <Mail size={16} />
                            <span>
                                {contact.email}
                            </span>
                        </div>
                        {
                            contact.organization && (
                                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                                    <Building2 size={16} />
                                    <span>
                                        {
                                            contact.organization
                                        }
                                    </span>
                                </div>
                            )
                        }
                        {
                            contact.lastInteraction && (
                                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                                    <Clock3 size={16} />
                                    <span>
                                        Last contacted {
                                            contact.lastInteraction
                                        }
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* Divider */}
            <div className="my-10 h-px bg-[var(--border)]" />
            {/* AI Insights */}
            <AIInsights
                insights={
                    contact.insights
                }
            />
            {/* Divider */}
            <div className="my-10 h-px bg-[var(--border)]" />
            {/* Actions */}
            <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-5">
                    Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition">
                        <Pencil size={16} />
                        Draft Email
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition">
                        <CalendarPlus size={16} />
                        Schedule Meeting
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition">
                        <FileText size={16} />
                        Summarize History
                    </button>
                </div>
            </div>
        </div>
    );
}