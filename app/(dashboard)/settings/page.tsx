'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/lib/theme-provider';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Layout Density</h3>
                  <p className="text-sm text-gray-500">Adjust the spacing between dashboard elements</p>
                </div>
                <select className="border rounded p-2">
                  <option>Compact</option>
                  <option>Comfortable</option>
                  <option>Spacious</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-sm text-gray-500">Choose your preferred dashboard theme</p>
                </div>
                <select
                  className="border rounded p-2"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <input type="checkbox" className="h-4 w-4" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Receive browser notifications</p>
                </div>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
