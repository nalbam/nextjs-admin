import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';
import { GitHubIcon, GoogleIcon } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Sign in with your GitHub or Google account.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-2">
          <form
            action={async () => {
              'use server';
              await signIn('github', {
                redirectTo: '/'
              });
            }}
            className="w-full"
          >
            <Button className="w-full flex items-center justify-center gap-2">
              <GitHubIcon className="w-5 h-5" />
              Sign in with GitHub
            </Button>
          </form>
          <form
            action={async () => {
              'use server';
              await signIn('google', {
                redirectTo: '/'
              });
            }}
            className="w-full"
          >
            <Button className="w-full flex items-center justify-center gap-2" variant="outline">
              <GoogleIcon className="w-5 h-5" />
              Sign in with Google
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
