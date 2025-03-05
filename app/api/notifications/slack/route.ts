import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { slackConfigSchema } from '@/types/slack';
import { initializeSlackService } from '@/lib/slack';

export async function GET() {
  try {
    const result = await db.execute(
      sql`SELECT settings FROM slack_settings ORDER BY id DESC LIMIT 1`
    );

    const settings = result.rows[0]?.settings;
    return Response.json(settings || {});
  } catch (error) {
    console.error('Failed to fetch Slack settings:', error);
    return Response.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const config = slackConfigSchema.parse(body);

    // Initialize the Slack service with new config
    initializeSlackService(config);

    // Store the settings in the database
    await db.execute(
      sql`INSERT INTO slack_settings (settings) VALUES (${JSON.stringify(config)})`
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to save Slack settings:', error);
    return Response.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
