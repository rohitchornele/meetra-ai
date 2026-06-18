import ChatWindow from "@/components/dashboard/chat/ChatWindow";
interface ChatPageProps {
    searchParams: Promise<{
        prompt?: string;
    }>;
}
export default async function ChatPage({
    searchParams,
}: ChatPageProps) {
    const {
        prompt,
    } = await searchParams;
    return (
        <div className="h-full">
            <ChatWindow initialPrompt={prompt}
            />
        </div>
    );
}