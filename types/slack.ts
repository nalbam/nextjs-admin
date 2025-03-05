import { z } from 'zod';

export const slackConfigSchema = z.object({
  enabled: z.boolean().default(false),
  webhookUrl: z.string().url().optional(),
  channel: z.string().optional(),
  username: z.string().optional(),
  events: z.array(z.string()).default([])
});

export type SlackConfig = z.infer<typeof slackConfigSchema>;

export const defaultSlackConfig: SlackConfig = {
  enabled: false,
  webhookUrl: undefined,
  channel: undefined,
  username: undefined,
  events: []
};

export const NOTIFICATION_EVENTS = [
  'user.created',
  'user.updated',
  'user.deleted',
  'system.error',
  'system.warning'
] as const;

export type NotificationEvent = typeof NOTIFICATION_EVENTS[number];
