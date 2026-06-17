"use client";
import { Bot, User } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import StreamingCursor from "./StreamingCursor";
interface ChatMessageProps {
	role: "user" | "assistant";
	content: string;
	timestamp?: string;
	isStreaming?: boolean;
}
export default function ChatMessage({
	role,
	content,
	timestamp,
	isStreaming = false,
}: ChatMessageProps) {
	const isUser = role === "user";
	return (
		<div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`} >
			<div className={`max-w-[80%] flex gap-4 ${isUser ? "flex-row-reverse" : ""}`}
			>
				{/* Avatar */}
				<div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${isUser ? "bg-[var(--accent)]" : "bg-[var(--card)] border border-[var(--border)]"}`}
				>
					{isUser ? (
						<User size={18} className="text-white"
						/>
					) : (
						<Bot size={18} className="text-[var(--accent)]"
						/>
					)}
				</div>
				{/* Bubble */}
				<div className="space-y-2">
					<div className={`px-5 py-4 rounded-2xl leading-7 text-[15px] whitespace-pre-wrap ${isUser
							? "bg-[var(--accent)] text-white"
							: "bg-[var(--card)] border border-[var(--border)] text-[var(--text-primary)]"
						}`}
					>
						<MarkdownRenderer
							content={content}
						/>
						{isStreaming && <StreamingCursor />}
					</div>
					{timestamp && (
						<div className={`text-xs text-[var(--text-secondary)] ${isUser ? "text-right" : ""}`}
						>
							{timestamp}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}