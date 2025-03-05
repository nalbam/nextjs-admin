import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export async function User() {
  let session = await auth();
  let user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user?.image ?? '/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile" className="w-full">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {user ? (
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
            className="w-full"
          >
            <DropdownMenuItem asChild>
              <button type="submit" className="w-full text-left">Sign Out</button>
            </DropdownMenuItem>
          </form>
        ) : (
          <Link href="/login" className="w-full">
            <DropdownMenuItem>Sign In</DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
