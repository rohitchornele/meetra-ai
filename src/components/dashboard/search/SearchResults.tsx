"use client";
import SearchSection from "./SearchSection";
import {
    SearchResult,
} from "./types";
interface SearchResultsProps {
    results: SearchResult[];
    selectedId?: string;
    onSelect?: (
        item: SearchResult
    ) => void;
}
export default function SearchResults({
    results,
    selectedId,
    onSelect,
}: SearchResultsProps) {
    const emails = results.filter(
        item =>
            item.category ===
            "email"
    );
    const meetings = results.filter(
        item =>
            item.category ===
            "meeting"
    );
    const contacts = results.filter(
        item =>
            item.category ===
            "contact"
    );
    const chats = results.filter(
        item =>
            item.category ===
            "chat"
    );
    if (
        results.length === 0
    ) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-4xl mb-4">
                    🔍
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    No results found
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Try searching emails, meetings, contacts or chats.
                </p>
            </div>
        );
    }
    return (
        <div className="py-3">
            <SearchSection
                title="Emails"
                items={emails}
                selectedId={selectedId}
                onSelect={onSelect}
            />
            <SearchSection
                title="Meetings"
                items={meetings}
                selectedId={selectedId}
                onSelect={onSelect}
            />
            <SearchSection
                title="Contacts"
                items={contacts}
                selectedId={selectedId}
                onSelect={onSelect}
            />
            <SearchSection
                title="Chats"
                items={chats}
                selectedId={selectedId}
                onSelect={onSelect}
            />
        </div>
    );
}