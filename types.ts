export enum ViewState {
  HOME = 'HOME',
  TRANSLATE = 'TRANSLATE',
  WRITE = 'WRITE',
  EXPLAIN = 'EXPLAIN',
  GOVT = 'GOVT',
  CHAT = 'CHAT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface WritingResponse {
  tamil: string;
  english: string;
}

export const TOPICS = {
  WRITE: [
    "Professional Letter",
    "Leave Letter",
    "Complaint Letter",
    "WhatsApp Message",
    "Email Reply",
    "Resume Summary"
  ],
  GOVT: [
    "Aadhaar Update",
    "Birth Certificate",
    "Income Certificate",
    "Job Application",
    "PF / ESI Explanation",
    "Police Verification"
  ]
};