import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS slack_settings (
        id SERIAL PRIMARY KEY,
        settings JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    return NextResponse.json({ message: 'Slack settings table created successfully' });
  } catch (error) {
    console.error('Failed to create slack settings table:', error);
    return NextResponse.json(
      { error: 'Failed to create slack settings table' },
      { status: 500 }
    );
  }
}
