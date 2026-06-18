'use client';

import { Mail } from 'lucide-react';

interface ImportantEmailsProps {
  emails: {
    id: string;

    from: string;

    subject: string;

    date: string;

    snippet?: string;
  }[];
}

export default function ImportantEmails({ emails }: ImportantEmailsProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Mail size={16} className="text-[var(--accent)]" />

        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Important Emails
        </h3>
      </div>

      {emails.length === 0 ? (
        <div className="text-sm text-[var(--text-secondary)]">
          No emails found
        </div>
      ) : (
        <div className="space-y-3">
          {emails.map((email) => {
            const sender =
              email.from?.split('<')[0]?.replace(/"/g, '')?.trim() ?? 'Unknown';

            return (
              <button
                key={email.id}
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />

                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {sender}
                    </p>
                  </div>

                  <span className="text-xs text-[var(--text-secondary)] shrink-0">
                    {new Date(email.date).toLocaleDateString([], {
                      day: 'numeric',

                      month: 'short',
                    })}
                  </span>
                </div>

                <p className="mt-1 text-xs text-[var(--text-secondary)] truncate">
                  {email.subject}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
