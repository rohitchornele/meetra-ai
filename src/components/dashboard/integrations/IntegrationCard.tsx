"use client";
import Link from "next/link";
import { CheckCircle2,  Mail, Calendar, PlugZap,} from "lucide-react";
import { Integration,} from "./types";

interface IntegrationCardProps extends Integration { }

export default function IntegrationCard({
    id,
    name,
    description,
    connected,
    email,
    lastSynced,
    connectUrl,
    disconnectUrl,
}: IntegrationCardProps) {
    const Icon = id === "gmail" ? Mail : id === "googlecalendar" ? Calendar : PlugZap;
    return (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 flex items-center justify-between transition hover:border-white/15">
            {/* Left */}
            <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Icon size={24} />
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            {name}
                        </h2>
                        {
                            connected && (
                                <div className="flex items-center gap-1 text-green-500 text-sm">
                                    <CheckCircle2
                                        size={16}
                                    />
                                    <span>
                                        Connected
                                    </span>
                                </div>
                            )
                        }
                    </div>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {description}
                    </p>
                    {
                        connected && (
                            <div className="mt-4 space-y-1 text-sm">
                                {
                                    email && (
                                        <p className="text-[var(--text-secondary)]">
                                            Connected as
                                            <span className="ml-2 text-[var(--text-primary)]">
                                                {
                                                    email
                                                }
                                            </span>
                                        </p>
                                    )
                                }
                                {
                                    lastSynced && (
                                        <p className="text-[var(--text-secondary)]">
                                            Last synced
                                            <span className="ml-2 text-[var(--text-primary)]">
                                                {
                                                    lastSynced
                                                }
                                            </span>
                                        </p>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            {/* Right */}
            <div>
                {
                    connected ? (
                        <Link href={ disconnectUrl } className="px-5 py-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition" >
                            Disconnect
                        </Link>
                    ) : (
                        <Link href={  connectUrl  } className="px-5 py-2 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 transition" >
                            Connect
                        </Link>
                    )
                }
            </div>
        </div>
    );
}