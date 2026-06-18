'use client';
import { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ToolExecution from './ToolExecution';
import SuggestedPrompts from './SuggestedPrompts';
type ChatItem = {
  id: string | number;
  type: 'message' | 'tool';
  role?: 'user' | 'assistant';
  content?: string;
  title?: string;
  status?: 'running' | 'completed' | 'failed';
  description?: string;
  timestamp?: string;
};

interface ChatWindowProps {
  initialPrompt?: string;
  conversationId?: string | null;
  onConversationCreated?: () => void;
}

export default function ChatWindow({
  initialPrompt,
  conversationId,
  onConversationCreated,
}: ChatWindowProps) {
  const [items, setItems] = useState<ChatItem[]>(
    initialPrompt
      ? [
          {
            id: 1,
            type: 'message',
            role: 'user',
            content: initialPrompt,
            timestamp: 'Just now',
          },
        ]
      : []
  );

  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(conversationId ?? null);

  const handlePromptSelect = (prompt: string) => {
    handleSubmit(prompt);
  };

  async function createNewConversation(message: string) {
    const title = message.trim().replace(/\n/g, ' ').slice(0, 60);

    const response = await fetch(
      '/api/conversations',

      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          title,
        }),
      }
    );

    const conversation = await response.json();

    if (!response.ok) {
      throw new Error(conversation.error ?? 'Failed to create conversation');
    }

    return conversation;
  }

  const handleSubmit = async (message: string) => {
    const now = Date.now();

    const assistantId = now + 2;

    setItems((prev) => [
      ...prev,

      {
        id: now,

        type: 'message',

        role: 'user',

        content: message,

        timestamp: 'Just now',
      },

      {
        id: assistantId,

        type: 'message',

        role: 'assistant',

        content: '',

        timestamp: 'Just now',
      },
    ]);

    try {
      let currentConversationId = activeConversationId;

      if (!currentConversationId) {
        const conversation = await createNewConversation(message);

        currentConversationId = conversation.id;

        setActiveConversationId(currentConversationId);

        onConversationCreated?.();
      }

      const response = await fetch(
        '/api/chat',

        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            conversationId: currentConversationId,

            message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error('No stream found');
      }

      const decoder = new TextDecoder();

      let assistantText = '';

      while (true) {
        const {
          done,

          value,
        } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value);

        assistantText += chunk;

        setItems((prev) =>
          prev.map((item) =>
            item.id === assistantId
              ? {
                  ...item,

                  content: assistantText,
                }
              : item
          )
        );
      }
    } catch (error) {
      console.error(error);

      setItems((prev) =>
        prev.map((item) =>
          item.id === assistantId
            ? {
                ...item,

                content:
                  error instanceof Error
                    ? error.message
                    : 'Something went wrong',
              }
            : item
        )
      );
    }
  };

  const loadConversation = async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}/messages`);
      const messages = await response.json();
      if (!response.ok) {
        throw new Error(messages.error ?? 'Failed to load conversation');
      }
      const chatItems: ChatItem[] = messages.map((message: any) => ({
        id: message.id,

        type: message.role === 'tool' ? 'tool' : 'message',

        role: message.role === 'tool' ? undefined : message.role,

        content: message.content,

        title: message.role === 'tool' ? message.content : undefined,

        timestamp: new Date(message.createdAt).toLocaleString(),
      }));

      setActiveConversationId(id);
      setItems(chatItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (conversationId && conversationId !== activeConversationId) {
      loadConversation(conversationId);
    }
  }, [conversationId]);

  return (
    <div className="w-full flex flex-col min-h-0 p-4 pt-8">
      {/* Empty State */}
      {items.length === 0 && (
        <div className="flex-1 flex flex-col justify-center gap-10 px-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              What can I help you with?
            </h1>
            <p className="mt-3 text-lg text-[var(--text-secondary)]">
              ConvertIQ can search emails, schedule meetings and manage your
              day.
            </p>
          </div>
          <SuggestedPrompts onSelect={handlePromptSelect} />
        </div>
      )}
      {/* Chat Timeline */}
      {items.length > 0 && (
        <div
          className="
          flex-1
          overflow-y-auto
          px-6
          py-8
          space-y-6
          min-h-0
        "
        >
          {items.map((item) => {
            if (item.type === 'message') {
              return (
                <ChatMessage
                  key={item.id}
                  role={item.role!}
                  content={item.content!}
                  timestamp={item.timestamp}
                />
              );
            }
            return (
              <ToolExecution
                key={item.id}
                title={item.title!}
                status={item.status!}
                description={item.description}
              />
            );
          })}
        </div>
      )}
      {/* Input */}
      <div
        className="
        border-t
        border-[var(--border)]
        px-6
        py-4
        shrink-0
        bg-[var(--bg)]
      "
      >
        <ChatInput
          onSubmit={handleSubmit}
          placeholder="Ask ConvertIQ anything..."
        />
      </div>
    </div>
  );
}
