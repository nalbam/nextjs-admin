'use server';

import { SlackConfig } from '@/types/slack';

import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { initializeSlackService } from '@/lib/slack';

export async function saveSlackSettings(config: SlackConfig) {
  try {
    // Initialize the Slack service with new config
    initializeSlackService(config);

    // Store the settings in the database
    await db.execute(
      sql`INSERT INTO slack_settings (settings) VALUES (${JSON.stringify(config)})`
    );

    return { success: true };
  } catch (error) {
    console.error('Failed to save Slack settings:', error);
    throw new Error('Failed to save notification settings');
  }
}
