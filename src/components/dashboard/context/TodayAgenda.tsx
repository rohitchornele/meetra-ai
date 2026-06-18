'use client';

import { CalendarDays } from 'lucide-react';

interface TodayAgendaProps {
  agenda: {
    id: string;

    title: string;

    start: string;

    end: string;

    time: string;

    date: string;
  }[];
}

export default function TodayAgenda({ agenda }: TodayAgendaProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={16} className="text-[var(--accent)]" />

        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Today's Agenda
        </h3>
      </div>

      {agenda.length === 0 ? (
        <div className="text-sm text-[var(--text-secondary)]">
          No meetings today
        </div>
      ) : (
        <div className="space-y-3">
          {agenda.map((event) => {
            const duration =
              event.start && event.end
                ? `${Math.round(
                    (new Date(event.end).getTime() -
                      new Date(event.start).getTime()) /
                      (1000 * 60)
                  )} min`
                : '';

            return (
              <div
                key={event.id}
                className="flex gap-3 rounded-lg px-3 py-2 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1" />

                  <div className="w-px flex-1 bg-[var(--border)] mt-1" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">
                      {event.time}
                    </span>

                    <span className="text-xs text-[var(--text-secondary)]">
                      {duration}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                    {event.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
