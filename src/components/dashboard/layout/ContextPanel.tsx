'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import ImportantEmails from '../context/ImportantEmails';

import TodayAgenda from '../context/TodayAgenda';

import Suggestions from '../context/Suggestions';

import ConnectedServices from '../context/ConnectedServices';
import RecentConversations from '../chat/RecentConversations';

interface ContextData {
  importantEmails: any[];

  todaysAgenda: any[];

  suggestions: {
    text: string;
  }[];
}

export default function ContextPanel() {
  const [data, setData] = useState<ContextData>({
    importantEmails: [],

    todaysAgenda: [],

    suggestions: [],
  });

  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const isHome = pathname === '/dashboard';

  const isChat = pathname.startsWith('/dashboard/chat');

  const isInbox = pathname.startsWith('/dashboard/inbox');

  const isCalendar = pathname.startsWith('/dashboard/calendar');

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);

        const res = await fetch('/api/dashboard/context');

        if (!res.ok) {
          throw new Error('Failed to fetch context');
        }

        const json = await res.json();

        if (!ignore) {
          setData(json);
        }
      } catch (error) {
        console.error(
          'CONTEXT PANEL',

          error
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <aside className="hidden lg:flex flex-col h-full bg-[var(--bg)] border-l border-[var(--border)] overflow-hidden">
      {/* Scrollable Content */}

      <div className="flex-1 min-h-0 overflow-hidden p-4 flex flex-col">
        {loading && (
          <div className="text-sm text-[var(--text-secondary)]">Loading...</div>
        )}

        {!loading && isHome && (
          <div className="space-y-4 overflow-y-auto">
            <ImportantEmails emails={data.importantEmails} />

            <TodayAgenda agenda={data.todaysAgenda} />
          </div>
        )}

        {!loading && isChat && (
          <div className="flex flex-col flex-1 min-h-0 gap-4 overflow-hidden">
            {/* <RecentChats /> */}

            <Suggestions suggestions={data.suggestions} />
            <RecentConversations />
          </div>
        )}

        {!loading && isInbox && (
          <>
            <ImportantEmails emails={data.importantEmails} />

            <Suggestions suggestions={data.suggestions} />
          </>
        )}

        {!loading && isCalendar && (
          <>
            <TodayAgenda agenda={data.todaysAgenda} />

            <Suggestions suggestions={data.suggestions} />
          </>
        )}
      </div>

      {/* Fixed Bottom */}

      <div className="shrink-0 p-4 border-t border-[var(--border)] bg-[var(--bg)]">
        <ConnectedServices />
      </div>
    </aside>
  );
}
