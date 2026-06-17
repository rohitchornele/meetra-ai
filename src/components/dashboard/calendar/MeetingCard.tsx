"use client";

import {
    Calendar,
    Users,
    Video,
    Sparkles,
} from "lucide-react";

interface Meeting {
    id: number;
    title: string;
    time: string;
    date: string;
    attendees?: string[];
    location?: string;
    hasAINotes?: boolean;
}

interface MeetingCardProps {
    meeting: Meeting;
}

export default function MeetingCard({
    meeting,
}: MeetingCardProps) {
    return (
        <div className="group cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-white/15 hover:bg-white/[0.02]">
            {/* Top */}

            <div className="flex items-start justify-between gap-6">
                {/* Left */}

                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {meeting.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                        <div className="flex items-center gap-2">
                            <Calendar size={15} />

                            <span>{meeting.time}</span>
                        </div>

                        {meeting.location && (
                            <div className="flex items-center gap-2">
                                <Video size={15} />

                                <span>{meeting.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right */}

                <div className="shrink-0 text-right">
                    <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                        {new Date(meeting.date).toLocaleDateString(
                            "en-US",
                            {
                                weekday: "short",
                            }
                        )}
                    </p>

                    <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                        {meeting.date}
                    </p>
                </div>
            </div>

            {/* Bottom */}

            {(meeting.attendees?.length ||
                meeting.hasAINotes) && (
                    <div className="mt-5 flex items-center justify-between">
                        {/* Attendees */}

                        {meeting.attendees &&
                            meeting.attendees.length > 0 && (
                                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                    <Users size={15} />

                                    <span className="truncate">
                                        {meeting.attendees.join(
                                            " • "
                                        )}
                                    </span>
                                </div>
                            )}

                        {/* AI Notes */}

                        {meeting.hasAINotes && (
                            <div className="flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                                <Sparkles size={13} />

                                AI Notes
                            </div>
                        )}
                    </div>
                )}
        </div>
    );
}