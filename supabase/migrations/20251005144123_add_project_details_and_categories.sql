/*
  # Enhanced Projects Schema

  ## Overview
  Adds comprehensive project details including video demos, categories, and detailed information

  ## Changes to Existing Tables
  
  ### `projects` table additions:
  - `video_demo_url` (text, nullable) - YouTube/Vimeo video demo URL
  - `category` (text) - Project category (e.g., Web App, Mobile, E-commerce)
  - `full_description` (text) - Detailed project description
  - `key_features` (text array) - Array of key features
  - `challenges` (text) - Challenges faced and solutions implemented
  - `client` (text, nullable) - Client name if applicable
  - `completion_date` (date, nullable) - Project completion date
  - `live_url` (text, nullable) - Live production URL

  ## Notes
  - Maintains backward compatibility with existing projects
  - All new fields are nullable or have defaults
  - Sample data updated with new fields
*/

-- Add new columns to projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'video_demo_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN video_demo_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'category'
  ) THEN
    ALTER TABLE projects ADD COLUMN category text DEFAULT 'Web Application';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'full_description'
  ) THEN
    ALTER TABLE projects ADD COLUMN full_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'key_features'
  ) THEN
    ALTER TABLE projects ADD COLUMN key_features text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'challenges'
  ) THEN
    ALTER TABLE projects ADD COLUMN challenges text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'client'
  ) THEN
    ALTER TABLE projects ADD COLUMN client text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'completion_date'
  ) THEN
    ALTER TABLE projects ADD COLUMN completion_date date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'live_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN live_url text;
  END IF;
END $$;

-- Update existing projects with enhanced data
UPDATE projects 
SET 
  category = 'E-commerce',
  full_description = 'A comprehensive e-commerce platform built with modern technologies, featuring real-time inventory management, secure payment processing via Stripe, and a powerful admin dashboard. The platform handles thousands of products and supports multiple currencies and languages.',
  key_features = ARRAY[
    'Real-time inventory synchronization',
    'Secure payment processing with Stripe',
    'Advanced product search and filtering',
    'Multi-currency support',
    'Responsive design for all devices',
    'Admin dashboard with analytics',
    'Order tracking and management',
    'Customer reviews and ratings'
  ],
  challenges = 'The main challenge was implementing real-time inventory updates across multiple warehouse locations while maintaining data consistency. We solved this by implementing a distributed event-driven architecture using WebSockets and implementing optimistic UI updates with rollback capabilities.',
  video_demo_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  completion_date = '2024-08-15',
  live_url = '#'
WHERE title = 'E-Commerce Platform';

UPDATE projects 
SET 
  category = 'AI/ML',
  full_description = 'An advanced AI-powered content generation tool that leverages GPT-4 to create high-quality marketing copy, blog posts, and social media content. Features customizable tone, style, and length parameters with support for multiple languages and content types.',
  key_features = ARRAY[
    'GPT-4 powered content generation',
    'Multiple content types (blogs, ads, social)',
    'Customizable tone and style',
    'Multi-language support',
    'SEO optimization suggestions',
    'Plagiarism detection',
    'Content history and versioning',
    'Collaborative editing'
  ],
  challenges = 'Managing API costs and response times was crucial. We implemented intelligent caching strategies, request batching, and a tiered pricing model based on usage. We also added streaming responses to improve perceived performance.',
  video_demo_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  completion_date = '2024-06-20',
  client = 'ContentCo Agency'
WHERE title = 'AI Content Generator';

UPDATE projects 
SET 
  category = 'Productivity',
  full_description = 'A collaborative task management application designed for remote teams, featuring real-time updates, team workspaces, deadline tracking, and comprehensive project management tools. Built with modern web technologies for optimal performance.',
  key_features = ARRAY[
    'Real-time collaboration',
    'Drag-and-drop task management',
    'Team workspaces and permissions',
    'Deadline and milestone tracking',
    'File attachments and comments',
    'Calendar integration',
    'Activity timeline',
    'Custom workflows'
  ],
  challenges = 'Handling real-time synchronization for large teams required careful architecture planning. We implemented operational transformation for conflict resolution and optimized database queries with proper indexing and caching strategies.',
  video_demo_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  completion_date = '2024-09-10'
WHERE title = 'Task Management App';

-- Insert additional projects for better showcase
INSERT INTO projects (
  title, 
  description, 
  full_description,
  technologies, 
  image_url, 
  featured, 
  order_index,
  category,
  key_features,
  challenges,
  video_demo_url,
  completion_date,
  demo_url,
  github_url
)
VALUES 
(
  'Real-Time Chat Application',
  'A scalable real-time messaging platform with end-to-end encryption and multimedia support.',
  'Enterprise-grade chat application supporting thousands of concurrent users with features like end-to-end encryption, file sharing, voice messages, and group chats. Built with WebSocket technology for instant message delivery.',
  ARRAY['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
  'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800',
  false,
  4,
  'Communication',
  ARRAY['End-to-end encryption', 'Group chats', 'File sharing', 'Voice messages', 'Read receipts', 'Typing indicators', 'Message reactions', 'Search functionality'],
  'Ensuring message delivery reliability and maintaining encryption while scaling to thousands of users required implementing a message queue system with Redis and optimizing WebSocket connections.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  '2024-07-05',
  '#',
  '#'
),
(
  'Fitness Tracking Dashboard',
  'A comprehensive fitness tracking application with workout plans, nutrition tracking, and progress analytics.',
  'Complete fitness solution featuring workout tracking, meal planning, progress analytics, and social features. Integrates with popular fitness devices and provides personalized recommendations based on user goals.',
  ARRAY['Vue.js', 'TypeScript', 'Python', 'FastAPI', 'MongoDB'],
  'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800',
  false,
  5,
  'Health & Fitness',
  ARRAY['Workout tracking', 'Nutrition logging', 'Progress charts', 'Device integration', 'Social features', 'Custom workout plans', 'Goal setting', 'Achievement system'],
  'Integrating with multiple fitness device APIs while maintaining data accuracy was complex. We created a unified data model and implemented robust sync mechanisms with conflict resolution.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  '2024-05-12',
  '#',
  '#'
),
(
  'Restaurant Management System',
  'Full-featured restaurant management system with POS, inventory, and table reservation capabilities.',
  'Comprehensive restaurant management solution handling everything from point-of-sale transactions to inventory management and table reservations. Features real-time kitchen display system and detailed analytics.',
  ARRAY['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
  'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800',
  false,
  6,
  'Business Management',
  ARRAY['Point of sale', 'Inventory tracking', 'Table reservations', 'Kitchen display system', 'Staff management', 'Sales analytics', 'Menu management', 'Customer database'],
  'Building a reliable POS system that works offline was critical. We implemented service workers and IndexedDB for offline functionality with automatic sync when connection is restored.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  '2024-04-18',
  '#',
  '#'
);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);