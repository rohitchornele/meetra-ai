'use client';
import { Inbox, Send, FileText, ShieldAlert, Trash2 } from 'lucide-react';
const folders = [
  {
    id: 'INBOX',
    label: 'Inbox',
    icon: Inbox,
    count: 23,
  },
  {
    id: 'SENT',
    label: 'Sent',
    icon: Send,
    count: 0,
  },
  {
    id: 'DRAFT',
    label: 'Drafts',
    icon: FileText,
    count: 4,
  },
  {
    id: 'SPAM',
    label: 'Spam',
    icon: ShieldAlert,
    count: 2,
  },
  {
    id: 'TRASH',
    label: 'Trash',
    icon: Trash2,
    count: 0,
  },
];
interface InboxFoldersProps {
  selected?: string;
  onSelect?: (folder: string) => void;
}
export default function InboxFolders({
  selected = 'INBOX',
  onSelect,
}: InboxFoldersProps) {
  return (
    <div className="h-full w-[220px] border-r border-[var(--border)] bg-[var(--bg)] p-4">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
        Mail
      </h2>
      <div className="space-y-1">
        {folders.map((folder) => {
          const Icon = folder.icon;
          const active = selected === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => onSelect?.(folder.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                active
                  ? 'bg-white/[0.05] border border-[var(--border)]'
                  : 'hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={
                    active
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-secondary)]'
                  }
                />
                <span
                  className={
                    active
                      ? 'font-medium text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)]'
                  }
                >
                  {folder.label}
                </span>
              </div>
              {folder.count > 0 && (
                <span className="text-xs px-2 py-1 rounded-full bg-white/[0.05] text-[var(--text-secondary)]">
                  {folder.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
