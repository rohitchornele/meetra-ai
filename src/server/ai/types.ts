export interface EmailSummary {
    summary: string;
    actionItems: string[];
    priority: | "low" | "mwdium" | "high";
  suggestedReplies: string[];

}