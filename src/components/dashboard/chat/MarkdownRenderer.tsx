"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface MarkdownRendererProps {
    content: string;
}
export default function MarkdownRenderer({
    content,
}: MarkdownRendererProps) {
    return (
        <div className="prose prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold mb-5 mt-8 text-[var(--text-primary)]">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl font-semibold mb-4 mt-7 text-[var(--text-primary)]">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl font-semibold mb-3 mt-6 text-[var(--text-primary)]">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => (
                        <p className="leading-8 text-[15px] text-[var(--text-primary)] mb-4">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc pl-6 space-y-2 mb-5 text-[var(--text-primary)]">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-6 space-y-2 mb-5 text-[var(--text-primary)]">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="leading-7">
                            {children}
                        </li>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                            {children}
                        </strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic">
                            {children}
                        </em>
                    ),
                    code: ({ children, className }) => {
                        const isInline = !className;
                        if (isInline) {
                            return (
                                <code className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-[var(--border)] text-[13px]">
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <code className="text-sm">
                                {children}
                            </code>
                        );
                    },
                    pre: ({ children }) => (
                        <pre className="bg-black/30 border border-[var(--border)] rounded-2xl p-5 overflow-x-auto mb-5">
                            {children}
                        </pre>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto mb-5">
                            <table className="w-full border-collapse">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="border border-[var(--border)] px-4 py-3 text-left bg-white/[0.03]">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border border-[var(--border)] px-4 py-3">
                            {children}
                        </td>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:underline"
                        >
                            {children}
                        </a>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}