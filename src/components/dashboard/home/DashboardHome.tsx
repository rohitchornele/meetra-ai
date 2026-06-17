// 'use client';

// import { useState } from 'react';

// import ChatWindow from '../chat/ChatWindow';
// import RecentConversations from '../chat/RecentConversations';

// export default function DashboardHome() {
//   const [selectedConversationId, setSelectedConversationId] = useState<
//     string | null
//   >(null);

//   const [refreshKey, setRefreshKey] = useState(0);

//   return (
//     <div className="h-full grid grid-cols-12 gap-6">
//       <div className="col-span-3">
//         <RecentConversations
//           key={refreshKey}
//           onSelect={setSelectedConversationId}
//         />
//       </div>

//       <div className="col-span-9">
//         <ChatWindow
//           conversationId={selectedConversationId}
//           onConversationCreated={() => {
//             setRefreshKey((prev) => prev + 1);
//           }}
//         />
//       </div>
//     </div>
//   );
// }




// New Version, will delete old one later :


'use client';

import Greeting from './Greeting';
import KPICards from './KPICards';
import SuggestedActions from './SuggestedActions';

export default function DashboardHome() {
  return (
    <div className="h-full overflow-hidden p-6 space-y-6">
      <Greeting />

      <KPICards />

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="text-lg font-semibold text-[var(--text-primary)]">
            Inbox Summary
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Unread</span>

              <span className="font-semibold text-[var(--text-primary)]">
                12
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Priority</span>

              <span className="font-semibold text-[var(--text-primary)]">
                4
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">
                Newsletters
              </span>

              <span className="font-semibold text-[var(--text-primary)]">
                2
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="text-lg font-semibold text-[var(--text-primary)]">
            Upcoming Meetings
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <div className="text-sm text-[var(--text-secondary)]">
                Today · 5 PM
              </div>

              <div className="mt-1 font-semibold text-[var(--text-primary)]">
                MOM Review
              </div>
            </div>

            <div>
              <div className="text-sm text-[var(--text-secondary)]">
                Tomorrow · 11 AM
              </div>

              <div className="mt-1 font-semibold text-[var(--text-primary)]">
                Client Meeting
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuggestedActions />
    </div>
  );
}