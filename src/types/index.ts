export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  demo_url?: string;
  github_url?: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  video_demo_url?: string;
  category: string;
  full_description?: string;
  key_features?: string[];
  challenges?: string;
  client?: string;
  completion_date?: string;
  live_url?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ChatConversation {
  id: string;
  session_id: string;
  created_at: string;
  updated_at: string;
}
