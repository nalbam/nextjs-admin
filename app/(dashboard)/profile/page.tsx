import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubIcon, GoogleIcon } from "@/components/icons"
import Image from "next/image"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) return null

  const ProviderIcon = () => {
    switch (session.user.provider) {
      case "github":
        return <GitHubIcon className="h-5 w-5" />
      case "google":
        return <GoogleIcon className="h-5 w-5" />
      default:
        return null
    }
  }

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
              <div className="relative h-16 w-16">
                <Image
                  src={session.user.image || "/placeholder-user.jpg"}
                  alt={session.user.name || "Profile"}
                  className="rounded-full"
                  fill
                  sizes="64px"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{session.user.name}</h3>
                  <div className="flex items-center space-x-1">
                    <ProviderIcon />
                    <span className="text-sm text-gray-500 capitalize">
                      {session.user.provider}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{session.user.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Account Information</h4>
              <dl className="space-y-2">
                <div className="flex">
                  <dt className="w-32 text-gray-500">Created Date</dt>
                  <dd>{new Date().toISOString().split('T')[0]}</dd>
                </div>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
