'use client';

import { Sparkles, ArrowRight } from 'lucide-react';

interface SuggestionsProps {
  suggestions: {
    text: string;
  }[];
}

export default function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-[var(--accent)]" />

        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Suggestions
        </h3>
      </div>

      {suggestions.length === 0 ? (
        <div className="text-sm text-[var(--text-secondary)]">
          No suggestions available
        </div>
      ) : (
        <div className="space-y-2">
          {suggestions.map((item, index) => (
            <button
              key={`${item.text}-${index}`}
              className="w-full text-left rounded-lg px-3 py-3 hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {item.text}
                  </p>
                </div>

                <ArrowRight
                  size={14}
                  className="mt-1 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
