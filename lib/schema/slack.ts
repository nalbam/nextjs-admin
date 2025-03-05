import { pgTable, serial, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const slackSettings = pgTable('slack_settings', {
  id: serial('id').primaryKey(),
  settings: jsonb('settings').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
