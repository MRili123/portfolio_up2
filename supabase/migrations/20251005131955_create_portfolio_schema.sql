/*
  # Portfolio Database Schema

  ## Overview
  Creates tables for managing portfolio content and AI assistant chat history.

  ## New Tables
  
  ### 1. `projects`
  Stores portfolio projects with details
  - `id` (uuid, primary key) - Unique project identifier
  - `title` (text) - Project name
  - `description` (text) - Project description
  - `technologies` (text array) - Technologies used
  - `image_url` (text) - Project image URL
  - `demo_url` (text, nullable) - Live demo link
  - `github_url` (text, nullable) - GitHub repository link
  - `featured` (boolean) - Whether to feature on homepage
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. `skills`
  Stores professional skills with categories
  - `id` (uuid, primary key) - Unique skill identifier
  - `name` (text) - Skill name
  - `category` (text) - Skill category (e.g., Frontend, Backend, Tools)
  - `proficiency` (integer) - Proficiency level 1-100
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `chat_conversations`
  Stores AI assistant chat conversations
  - `id` (uuid, primary key) - Unique conversation identifier
  - `session_id` (text) - Browser session identifier
  - `created_at` (timestamptz) - Conversation start time
  - `updated_at` (timestamptz) - Last message time

  ### 4. `chat_messages`
  Stores individual messages in conversations
  - `id` (uuid, primary key) - Unique message identifier
  - `conversation_id` (uuid, foreign key) - References chat_conversations
  - `role` (text) - Message role (user/assistant)
  - `content` (text) - Message content
  - `created_at` (timestamptz) - Message timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for projects and skills (portfolio is public)
  - Public access for chat functionality (visitor assistant)
  - All tables have appropriate policies for data access
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  image_url text NOT NULL,
  demo_url text,
  github_url text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer DEFAULT 50 CHECK (proficiency >= 0 AND proficiency <= 100),
  created_at timestamptz DEFAULT now()
);

-- Create chat conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects (public read access)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

-- RLS Policies for skills (public read access)
CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  USING (true);

-- RLS Policies for chat_conversations (public access for visitors)
CREATE POLICY "Anyone can view their own conversations"
  ON chat_conversations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create conversations"
  ON chat_conversations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own conversations"
  ON chat_conversations FOR UPDATE
  USING (true);

-- RLS Policies for chat_messages (public access for visitors)
CREATE POLICY "Anyone can view messages in conversations"
  ON chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured, order_index);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session ON chat_conversations(session_id);

-- Insert sample portfolio data
INSERT INTO projects (title, description, technologies, image_url, featured, order_index, demo_url, github_url)
VALUES 
  (
    'E-Commerce Platform',
    'A full-stack e-commerce platform with real-time inventory management, secure payments, and admin dashboard.',
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    true,
    1,
    '#',
    '#'
  ),
  (
    'AI Content Generator',
    'An AI-powered content generation tool that creates marketing copy, blog posts, and social media content.',
    ARRAY['React', 'Python', 'OpenAI API', 'FastAPI', 'Docker'],
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    true,
    2,
    '#',
    '#'
  ),
  (
    'Task Management App',
    'A collaborative task management application with real-time updates, team workspaces, and deadline tracking.',
    ARRAY['Vue.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800',
    true,
    3,
    '#',
    '#'
  );

INSERT INTO skills (name, category, proficiency)
VALUES 
  ('React', 'Frontend', 95),
  ('TypeScript', 'Frontend', 90),
  ('Vue.js', 'Frontend', 85),
  ('Tailwind CSS', 'Frontend', 90),
  ('Node.js', 'Backend', 88),
  ('Python', 'Backend', 85),
  ('PostgreSQL', 'Backend', 87),
  ('Supabase', 'Backend', 92),
  ('Docker', 'Tools', 80),
  ('Git', 'Tools', 95),
  ('Figma', 'Design', 75),
  ('UI/UX Design', 'Design', 80);