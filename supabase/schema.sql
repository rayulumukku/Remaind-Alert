-- Create tables for ResumeFlow

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    icon_key VARCHAR(100),
    color_hex VARCHAR(7) DEFAULT '#b0c6ff',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    settings JSONB DEFAULT '{"theme": "dark", "notification_preferences": {"email": false, "browser": true, "mobile_push": true}}'::jsonb
);

-- Journeys table
CREATE TABLE IF NOT EXISTS public.journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    start_url TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'interrupted', 'resumed', 'completed')),
    progress_pct INTEGER DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    tags TEXT[] DEFAULT '{}'::text[]
);

-- Sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id UUID REFERENCES public.journeys(id) ON DELETE CASCADE,
    tab_url TEXT NOT NULL,
    tab_title TEXT,
    duration_seconds INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{"scroll_position": 0, "interaction_count": 0}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Reminders table
CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id UUID REFERENCES public.journeys(id) ON DELETE CASCADE,
    trigger_type VARCHAR(50) DEFAULT 'inactivity' CHECK (trigger_type IN ('inactivity', 'fixed_time')),
    duration_threshold_seconds INTEGER DEFAULT 7200, -- 2 hours default
    is_triggered BOOLEAN DEFAULT FALSE,
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES public.journeys(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'browser' CHECK (type IN ('browser', 'mobile_push')),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE
);

-- Analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL,
    metric_value NUMERIC NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Infert default categories
INSERT INTO public.categories (name, icon_key, color_hex) VALUES
('Learning', 'school', '#b0c6ff'),
('Coding', 'code', '#ecb2ff'),
('Documentation', 'description', '#7df4ff'),
('Shopping', 'shopping_bag', '#00dbe9'),
('Research', 'explore', '#00a0aa')
ON CONFLICT (name) DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_journeys_user_id ON public.journeys(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_journey_id ON public.sessions(journey_id);
CREATE INDEX IF NOT EXISTS idx_reminders_journey_id ON public.reminders(journey_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics(user_id);
