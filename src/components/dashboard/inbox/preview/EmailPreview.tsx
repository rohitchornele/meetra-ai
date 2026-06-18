'use client';

import { useState } from 'react';

import {
  CalendarPlus,
  Reply,
  ListTodo,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import AISummary from './AISummary';

import SuggestedReplies from './SuggestedReplies';

import { getHeader } from '../utils/getHeader';
import { getEmailBody } from '@/server/utils/getEmailBody';
import DraftReply from './DraftReply';
import MeetingSuggestion from './MeetingSuggestion';

interface EmailPreviewProps {
  email: any;

  onClose?: () => void;
}

export default function EmailPreview({ email, onClose }: EmailPreviewProps) {
  const [showOriginalEmail, setShowOriginalEmail] = useState(false);

  const [meeting, setMeeting] = useState(null);

  const [loadingMeeting, setLoadingMeeting] = useState(false);

  const [showDraft, setShowDraft] = useState(false);

  const { text, html } = getEmailBody(email.payload);

  //   console.log('email = ', email);

  if (!email) {
    return (
      <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
        Select an email to view
      </div>
    );
  }

  async function handleScheduleMeeting() {
    try {
      setLoadingMeeting(true);

      const res = await fetch(`/api/email-service/extract-meeting/${email.id}`);

      if (!res.ok) {
        throw new Error('Failed to extract meeting');
      }

      const data = await res.json();

      setMeeting(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMeeting(false);
    }
  }

  const headers = email.payload?.headers ?? [];

  const from =
    getHeader(
      headers,

      'From'
    ) ?? 'Unknown';

  const to =
    getHeader(
      headers,

      'To'
    ) ?? '';

  const subject =
    getHeader(
      headers,

      'Subject'
    ) ?? '(No Subject)';

  const date =
    getHeader(
      headers,

      'Date'
    ) ?? '';

  return (
    <div className="h-full overflow-y-auto bg-[var(--bg)] px-8 py-8">
      {/* Subject */}

      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          {subject}
        </h1>

        <button
          onClick={onClose}
          className="w-10 h-10 shrink-0 rounded-xl border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Meta */}

      <div className="flex items-start justify-between pb-6 border-b border-[var(--border)]">
        <div>
          <div className="text-sm text-[var(--text-secondary)]">From</div>

          <div className="mt-1 text-[var(--text-primary)] font-medium">
            {from}
          </div>

          <div className="mt-4 text-sm text-[var(--text-secondary)]">To</div>

          <div className="mt-1 text-[var(--text-primary)]">{to}</div>
        </div>

        <div className="text-sm text-[var(--text-secondary)]">{date}</div>
      </div>

      {/* AI Summary */}

      <div className="mt-8">
        <AISummary messageId={email.id} />
      </div>

      {/* Suggested Replies */}

      {/* <div className="mt-8">
        <SuggestedReplies
          replies={[
            'Sounds good!',

            "Let's schedule a meeting.",

            'Can you share more details?',
          ]}
        />
      </div> */}

      {/* AI Actions */}

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          AI Actions
        </h2>

        {meeting && (
          <div className="mt-8">
            <MeetingSuggestion meeting={meeting} />
          </div>
        )}

        {showDraft && (
          <div className="mt-8">
            <DraftReply
              messageId={email.id}
              email={{
                from,

                subject,

                threadId: email.threadId,
              }}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowDraft((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition"
          >
            <Reply size={16} />
            Draft Reply
          </button>

          <button
            onClick={handleScheduleMeeting}
            disabled={loadingMeeting}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition"
          >
            <CalendarPlus size={16} />
            {loadingMeeting
              ? 'Analyzing...'
              : meeting
                ? 'Meeting Found ✓'
                : 'Schedule Meeting'}
          </button>

          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-white/[0.03] transition">
            <ListTodo size={16} />
            Extract Tasks
          </button>
        </div>
      </div>

      {/* Original Email */}

      <div className="mt-10 pt-8 border-t border-[var(--border)]">
        <button
          onClick={() => setShowOriginalEmail((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition"
        >
          {showOriginalEmail ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}

          {showOriginalEmail ? 'Hide Original Email' : 'Show Original Email'}
        </button>

        {showOriginalEmail && (
          <div className="mt-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            {/* <p className="text-[15px] leading-8 text-[var(--text-primary)] whitespace-pre-wrap">
              {emailBody ? (
                emailBody
              ) : (
                <div className="text-[var(--text-secondary)]">
                  Original email preview unavailable.
                </div>
              )}
            </p> */}

            {html ? (
              <iframe
                srcDoc={html}
                className="w-full h-[700px] rounded-2xl border border-[var(--border)] bg-white"
                sandbox=""
              />
            ) : (
              <p className="whitespace-pre-wrap text-[15px] leading-8">
                {text}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
