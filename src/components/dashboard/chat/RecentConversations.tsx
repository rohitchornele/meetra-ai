'use client';

import { useEffect, useMemo, useState } from 'react';

type Conversation = {
  id: string;

  title: string;

  createdAt: string;

  updatedAt: string;
};

interface RecentConversationsProps {
  onSelect?: (conversationId: string) => void;
}

export default function RecentConversations({
  onSelect,
}: RecentConversationsProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    try {
      const response = await fetch('/api/conversations');

      const data = await response.json();

      setConversations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const visibleConversations = useMemo(() => {
    return conversations.slice(0, visibleCount);
  }, [conversations, visibleCount]);

  const hasMore = conversations.length > visibleCount;

  if (loading) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
          Recent Chats
        </h3>

        <div className="text-sm text-[var(--text-secondary)]">Loading...</div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
          Recent Chats
        </h3>

        <div className="text-sm text-[var(--text-secondary)]">
          No conversations yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex flex-1 flex-col min-h-0 overflow-hidden">
      {/* Header */}
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 shrink-0">
        Recent Chats
      </h3>

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-1">
        <div className="">
          {visibleConversations.map((conversation) => (
            <div className="" key={conversation.id}>
              <button
                onClick={() => onSelect?.(conversation.id)}
                className="group w-full text-left rounded-lg px-3 py-3 hover:bg-white/[0.03] transition-colors"
              >
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                  {conversation.title}
                </p>

                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {new Date(conversation.updatedAt).toLocaleDateString(
                    'en-IN',
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }
                  )}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {hasMore && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="mt-4 shrink-0 w-full py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:bg-white/[0.03] transition"
        >
          Load More
        </button>
      )}
    </div>
  );
}
