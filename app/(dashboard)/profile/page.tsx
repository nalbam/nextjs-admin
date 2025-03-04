import { auth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={session?.user?.image || '/placeholder-user.jpg'}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-medium">{session?.user?.name}</h3>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Account Details</h4>
              <dl className="space-y-2">
                <div className="flex">
                  <dt className="w-32 text-gray-500">Provider</dt>
                  <dd className="capitalize">{session?.user?.provider || 'Unknown'}</dd>
                </div>
                <div className="flex">
                  <dt className="w-32 text-gray-500">Account Created</dt>
                  <dd>{new Date().toISOString().split('T')[0]}</dd>
                </div>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
