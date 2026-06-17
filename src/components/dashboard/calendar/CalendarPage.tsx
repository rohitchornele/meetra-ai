'use client';

import AgendaView from './AgendaView';

import AIActions from './AIActions';

interface CalendarPageProps {
  events?: any[];
}

const meetings = [
  {
    id: 1,

    title: 'Daily Standup',

    time: '09:00 AM',

    date: 'Today',

    attendees: ['Rahul', 'Arjun'],
  },

  {
    id: 2,

    title: 'Product Review',

    time: '11:00 AM',

    date: 'Today',

    attendees: ['Finance', 'Team'],
  },

  {
    id: 3,

    title: 'Team Sync',

    time: '02:00 PM',

    date: 'Today',

    attendees: ['Engineering'],
  },

  {
    id: 4,

    title: 'Client Meeting',

    time: '10:00 AM',

    date: 'Tomorrow',

    attendees: ['Client'],
  },
];

export default function CalendarPage({ events = [] }: CalendarPageProps) {
//   console.log(events);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Calendar
        </h1>

        <p className="mt-3 text-lg text-[var(--text-secondary)]">
          Manage meetings and let AI organize your day.
        </p>
      </div>

      {/* AI Actions */}

      <AIActions />

      {/* Agenda */}

      <div className="mt-12">
        <AgendaView meetings={events} />
      </div>
    </div>
  );
}
