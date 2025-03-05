'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { NOTIFICATION_EVENTS, SlackConfig, defaultSlackConfig } from '@/types/slack';

interface NotificationPreferencesProps {
  initialConfig?: SlackConfig;
  onSave: (config: SlackConfig) => Promise<{ success: boolean }>;
}

export function NotificationPreferences({
  initialConfig = defaultSlackConfig,
  onSave
}: NotificationPreferencesProps) {
  const [config, setConfig] = useState<SlackConfig>(initialConfig);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(config);
    } catch (error) {
      console.error('Failed to save notification preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="slack-enabled"
              checked={config.enabled}
              onCheckedChange={(checked) =>
                setConfig({ ...config, enabled: checked as boolean })
              }
            />
            <label
              htmlFor="slack-enabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enable Slack Notifications
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Webhook URL</label>
              <Input
                type="url"
                placeholder="https://hooks.slack.com/services/..."
                value={config.webhookUrl || ''}
                onChange={(e) =>
                  setConfig({ ...config, webhookUrl: e.target.value })
                }
                disabled={!config.enabled}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Channel</label>
              <Input
                placeholder="#general"
                value={config.channel || ''}
                onChange={(e) =>
                  setConfig({ ...config, channel: e.target.value })
                }
                disabled={!config.enabled}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Bot Username</label>
              <Input
                placeholder="Notification Bot"
                value={config.username || ''}
                onChange={(e) =>
                  setConfig({ ...config, username: e.target.value })
                }
                disabled={!config.enabled}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Notification Events
              </label>
              <div className="space-y-2">
                {NOTIFICATION_EVENTS.map((event) => (
                  <div key={event} className="flex items-center space-x-2">
                    <Checkbox
                      id={`event-${event}`}
                      checked={config.events.includes(event)}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          events: checked
                            ? [...config.events, event]
                            : config.events.filter((e) => e !== event)
                        })
                      }
                      disabled={!config.enabled}
                    />
                    <label
                      htmlFor={`event-${event}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {event}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSaving || !config.enabled}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
