import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { eq, desc } from 'drizzle-orm';
import { slackSettings } from '@/lib/schema/slack';
import { slackConfigSchema } from '@/types/slack';
import { initializeSlackService } from '@/lib/slack';

export async function GET() {
  try {
    const result = await db
      .select({ settings: slackSettings.settings })
      .from(slackSettings)
      .orderBy(desc(slackSettings.id))
      .limit(1);

    const settings = result[0]?.settings;
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
    await db.insert(slackSettings).values({
      settings: config
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to save Slack settings:', error);
    return Response.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
