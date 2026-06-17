'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    try {
      const response = await fetch('/api/conversations');

      const data = await response.json();

    //   console.log('CONVERSATIONS =', data);

      setConversations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--text-secondary)]">
          Recent Conversations
        </h2>

        <div className="text-sm text-[var(--text-secondary)]">Loading...</div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--text-secondary)]">
          Recent Conversations
        </h2>

        <div className="text-sm text-[var(--text-secondary)]">
          No conversations yet
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-[var(--text-secondary)]">
        Recent Conversations
      </h2>

      <div className="space-y-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect?.(conversation.id)}
            className="w-full
                text-left
                p-4
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                hover:border-[var(--accent)]
                transition
              "
          >
            <div className="font-medium text-[var(--text-primary)]">
              {conversation.title}
            </div>

            <div className="text-xs mt-1 text-[var(--text-secondary)]">
              {new Date(conversation.updatedAt).toLocaleString()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
