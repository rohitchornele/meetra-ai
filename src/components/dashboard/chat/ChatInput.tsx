'use client';
import { useState } from 'react';
import { Paperclip, ArrowUp, Mic } from 'lucide-react';
interface ChatInputProps {
  onSubmit?: (message: string) => void;
  placeholder?: string;
}
export default function ChatInput({
  onSubmit,
  placeholder = 'Ask ConvertIQ anything...',
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = () => {
    console.log('CHAT INPUT SUBMIT', message);

    if (!message.trim()) return;

    onSubmit?.(message);

    setMessage('');
  };
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-3 shadow-sm">
      <div className="flex items-end gap-3">
        {/* Attach */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)] transition">
          <Paperclip size={18} />
        </button>
        {/* Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          rows={1}
          placeholder={placeholder}
          className="flex-1 bg-transparent resize-none outline-none text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] py-2"
        />
        {/* Voice */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)] transition">
          <Mic size={18} />
        </button>
        {/* Send */}
        <button
          className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition"
          onClick={handleSubmit}
          disabled={!message.trim()}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
}
