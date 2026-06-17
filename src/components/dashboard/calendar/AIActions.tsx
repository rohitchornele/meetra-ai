"use client";
import {
    Sparkles,
    CalendarPlus,
    Clock3,
    ListTodo,
    FileText,
} from "lucide-react";
const actions = [
    {
        title: "Schedule Meeting",
        description:
            "Create a new event with AI",
        icon: CalendarPlus,
    },
    {
        title: "Find Free Slot",
        description:
            "AI finds the best time",
        icon: Clock3,
    },
    {
        title: "Plan My Day",
        description:
            "Organize meetings & tasks",
        icon: ListTodo,
    },
    {
        title: "Generate Agenda",
        description:
            "Prepare meeting notes",
        icon: FileText,
    },
];
export default function AIActions() {
    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center">
                    <Sparkles size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                        AI Actions
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Let ConvertIQ manage your calendar.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    actions.map(action => {
                        const Icon =
                            action.icon;
                        return (
                            <button
                                key={action.title}
                                className="group text-left bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 hover:border-white/15 hover:bg-white/[0.02] transition-all"
                            >
                                <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4 group-hover:scale-105 transition">
                                    <Icon size={20} />
                                </div>
                                <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-6">
                                    {action.description}
                                </p>
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
}