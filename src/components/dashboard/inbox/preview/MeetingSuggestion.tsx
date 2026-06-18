'use client';

import { useState } from 'react';

interface Props {
  meeting: {
    title: string;

    description?: string;

    start: string;

    end: string;

    attendees: string[];
  };
}

export default function MeetingSuggestion({
  meeting,
}: Props) {
  const [title, setTitle] = useState(
    meeting.title
  );

  const [description, setDescription] =
    useState(
      meeting.description ?? ''
    );

  const [start, setStart] =
    useState(
      meeting.start.slice(
        0,
        16
      )
    );

  const [end, setEnd] = useState(
    meeting.end.slice(
      0,
      16
    )
  );

  const [attendees, setAttendees] =
    useState(
      meeting.attendees
    );

  const [
    newAttendee,

    setNewAttendee,
  ] = useState('');

  const [creating, setCreating] =
    useState(false);

  const [created, setCreated] =
    useState(false);

  function addAttendee() {
    const email =
      newAttendee.trim();

    if (!email) {
      return;
    }

    if (
      attendees.includes(email)
    ) {
      return;
    }

    setAttendees(prev => [
      ...prev,

      email,
    ]);

    setNewAttendee('');
  }

  function removeAttendee(
    email: string
  ) {
    setAttendees(prev =>
      prev.filter(
        attendee =>
          attendee !== email
      )
    );
  }

  async function handleCreateEvent() {
    try {
      setCreating(true);

      const res =
        await fetch(
          '/api/calendar/create',

          {
            method:
              'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify({
                title,

                description,

                start:
                  new Date(
                    start
                  ).toISOString(),

                end:
                  new Date(
                    end
                  ).toISOString(),

                attendees,
              }),
          }
        );

      if (!res.ok) {
        throw new Error(
          'Failed to create event'
        );
      }

      const event =
        await res.json();

      console.log(
        'EVENT CREATED',

        event
      );

      setCreated(true);
    } catch (error) {
      console.error(
        error
      );

      alert(
        'Failed to create event'
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">

      <h3 className="text-lg font-semibold mb-6">
        📅 Meeting Suggestion
      </h3>

      <div className="space-y-5">

        {/* Title */}

        <div>
          <label className="text-sm text-[var(--text-secondary)]">
            Title
          </label>

          <input
            value={title}
            onChange={e =>
              setTitle(
                e.target.value
              )
            }
            className="mt-2 w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] outline-none"
          />
        </div>

        {/* Description */}

        <div>
          <label className="text-sm text-[var(--text-secondary)]">
            Description
          </label>

          <textarea
            rows={3}
            value={description}
            onChange={e =>
              setDescription(
                e.target.value
              )
            }
            className="mt-2 w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] outline-none resize-none"
          />
        </div>

        {/* Start */}

        <div>
          <label className="text-sm text-[var(--text-secondary)]">
            Start
          </label>

          <input
            type="datetime-local"
            value={start}
            onChange={e =>
              setStart(
                e.target.value
              )
            }
            className="mt-2 w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] outline-none"
          />
        </div>

        {/* End */}

        <div>
          <label className="text-sm text-[var(--text-secondary)]">
            End
          </label>

          <input
            type="datetime-local"
            value={end}
            onChange={e =>
              setEnd(
                e.target.value
              )
            }
            className="mt-2 w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] outline-none"
          />
        </div>

        {/* Attendees */}

        <div>
          <label className="text-sm text-[var(--text-secondary)]">
            Attendees
          </label>

          <div className="mt-3 flex flex-wrap gap-2">

            {attendees.map(
              email => (
                <div
                  key={email}
                  className="px-3 py-2 rounded-xl bg-white/[0.03] border border-[var(--border)] flex items-center gap-2"
                >
                  <span className="text-sm">
                    {email}
                  </span>

                  <button
                    onClick={() =>
                      removeAttendee(
                        email
                      )
                    }
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              )
            )}

          </div>

          <div className="mt-3 flex gap-2">

            <input
              value={
                newAttendee
              }
              onChange={e =>
                setNewAttendee(
                  e.target.value
                )
              }
              placeholder="Add attendee"
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] outline-none"
            />

            <button
              onClick={
                addAttendee
              }
              className="px-4 rounded-xl border border-[var(--border)] hover:bg-white/[0.03]"
            >
              Add
            </button>

          </div>

        </div>

      </div>

      {/* Create Event */}

      <button
        onClick={
          handleCreateEvent
        }
        disabled={
          creating ||
          created
        }
        className="mt-8 w-full px-4 py-3 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 transition disabled:opacity-50"
      >

        {creating
          ? 'Creating...'
          : created
            ? '✓ Event Created'
            : 'Create Event'}

      </button>

    </div>
  );
}