export type SearchCategory = "email" | "meeting" | "contact" | "chat";
export interface SearchResult {
    id: string;
    title: string;
    description?: string;
    category: SearchCategory;
    url?: string;
}