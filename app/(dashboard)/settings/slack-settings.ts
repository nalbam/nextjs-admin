'use server';

import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { SlackConfig, defaultSlackConfig } from '@/types/slack';

export async function loadSlackSettings(): Promise<SlackConfig> {
  try {
    // Create table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS slack_settings (
        id SERIAL PRIMARY KEY,
        settings JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    const result = await db.execute(
      sql`SELECT settings FROM slack_settings ORDER BY id DESC LIMIT 1`
    );

    const settings = result.rows[0]?.settings;
    return settings ? (settings as SlackConfig) : defaultSlackConfig;
  } catch (error) {
    console.error('Failed to load Slack settings:', error);
    return defaultSlackConfig;
  }
}
