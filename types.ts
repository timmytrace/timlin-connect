
export interface ServiceItem {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  includes: string[];
  bestFor: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
