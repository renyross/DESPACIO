-- DESPACIO Database Schema
-- Focus: Performance, Privacy, and "Vibes"

-- Enable PostGIS for location-based discovery
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users & Profiles
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TYPE intention_type AS ENUM ('court_terme', 'casual', 'chill');

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pseudo VARCHAR(50) NOT NULL,
    age INTEGER,
    bio TEXT,
    intention intention_type DEFAULT 'chill',
    location GEOGRAPHY(POINT, 4326),
    photos TEXT[], -- URLs to S3/MinIO
    is_incognito BOOLEAN DEFAULT FALSE,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Matches & Interactions
CREATE TABLE resonances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_a UUID REFERENCES users(id) ON DELETE CASCADE,
    user_b UUID REFERENCES users(id) ON DELETE CASCADE,
    matched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_a, user_b)
);

-- Ephemeral Messages (History for 24h)
-- Messages older than 24h should be cleaned up by a worker
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resonance_id UUID REFERENCES resonances(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id),
    content_encrypted TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Moderation & Logs
CREATE TYPE report_reason AS ENUM ('harassment', 'inappropriate_content', 'fake_profile', 'other');
CREATE TYPE report_status AS ENUM ('pending', 'resolved', 'ignored');

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES users(id),
    reason report_reason NOT NULL,
    details TEXT,
    status report_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analytics (Anonymized)
CREATE TABLE activity_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_type VARCHAR(50) NOT NULL, -- 'swipe', 'match', 'message'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
