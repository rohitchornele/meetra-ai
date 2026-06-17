'use client';

import { useState } from 'react';

import ChatWindow from '../chat/ChatWindow';
import RecentConversations from '../chat/RecentConversations';

export default function DashboardHome() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="h-full grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <RecentConversations
          key={refreshKey}
          onSelect={setSelectedConversationId}
        />
      </div>

      <div className="col-span-9">
        <ChatWindow
          conversationId={selectedConversationId}
          onConversationCreated={() => {
            setRefreshKey((prev) => prev + 1);
          }}
        />
      </div>
    </div>
  );
}
