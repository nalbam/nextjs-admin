import { NotificationPreferences } from '@/components/notification-preferences';
import { Card } from '@/components/ui/card';

export default async function NotificationsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground">
          Configure your notification preferences for various system events.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Slack Integration</h2>
          <NotificationPreferences
            onSave={async (config) => {
              'use server';
              const response = await fetch('/api/notifications/slack', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(config),
              });

              if (!response.ok) {
                throw new Error('Failed to save notification settings');
              }
            }}
          />
        </Card>
      </div>
    </div>
  );
}
