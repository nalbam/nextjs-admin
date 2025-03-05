import { IncomingWebhook } from '@slack/webhook';
import { SlackConfig } from '@/types/slack';

export class SlackNotificationService {
  private webhook: IncomingWebhook | null = null;
  private config: SlackConfig;

  constructor(config: SlackConfig) {
    this.config = config;
    if (config.enabled && config.webhookUrl) {
      this.webhook = new IncomingWebhook(config.webhookUrl);
    }
  }

  async notify(event: string, message: string, data?: any) {
    if (!this.webhook || !this.config.enabled || !this.config.events.includes(event)) {
      return;
    }

    try {
      await this.webhook.send({
        channel: this.config.channel,
        username: this.config.username,
        text: message,
        attachments: data ? [
          {
            color: '#36a64f',
            fields: Object.entries(data).map(([key, value]) => ({
              title: key,
              value: JSON.stringify(value),
              short: false
            }))
          }
        ] : undefined
      });
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
    }
  }
}

let slackService: SlackNotificationService | null = null;

export const initializeSlackService = (config: SlackConfig) => {
  slackService = new SlackNotificationService(config);
};

export const getSlackService = () => {
  if (!slackService) {
    throw new Error('Slack service not initialized');
  }
  return slackService;
};
