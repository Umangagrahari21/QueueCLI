-- ===========================
-- Jobs Table
-- ===========================

CREATE TABLE IF NOT EXISTS jobs (

    id TEXT PRIMARY KEY,

    command TEXT NOT NULL,

    state TEXT NOT NULL DEFAULT 'pending',

    attempts INTEGER DEFAULT 0,

    max_retries INTEGER DEFAULT 3,

    available_at TEXT NOT NULL,

    worker_id TEXT,

    last_error TEXT,

    created_at TEXT NOT NULL,

    updated_at TEXT NOT NULL

);

-- ===========================
-- Config Table
-- ===========================

CREATE TABLE IF NOT EXISTS config (

    key TEXT PRIMARY KEY,

    value TEXT NOT NULL

);

-- ===========================
-- Workers Table
-- ===========================

CREATE TABLE IF NOT EXISTS workers (

    worker_id TEXT PRIMARY KEY,

    pid INTEGER,

    status TEXT,

    started_at TEXT,

    last_heartbeat TEXT

);

-- ===========================
-- Indexes
-- ===========================

CREATE INDEX IF NOT EXISTS idx_jobs_state
ON jobs(state);

CREATE INDEX IF NOT EXISTS idx_jobs_available_at
ON jobs(available_at);

CREATE INDEX IF NOT EXISTS idx_jobs_state_available
ON jobs(state, available_at);