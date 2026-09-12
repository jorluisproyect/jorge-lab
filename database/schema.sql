-- JORGE LAB / esquema de referencia para Neon
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id text PRIMARY KEY,
  content jsonb NOT NULL,
  visibility text NOT NULL DEFAULT 'draft',
  revision integer NOT NULL DEFAULT 1,
  updated_at bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mime text NOT NULL,
  body bytea NOT NULL,
  size bigint NOT NULL,
  created_at bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_settings (
  key text PRIMARY KEY,
  value text NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_login_limits (
  key text PRIMARY KEY,
  attempts integer NOT NULL DEFAULT 0,
  expires_at bigint NOT NULL
);
