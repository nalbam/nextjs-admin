import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from "next-auth/providers/google"
import { db, users } from './db';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session?.user) {
        session.user.provider = token.provider || 'unknown';
      }
      return session;
    },
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        // Check if user exists
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email));

        const userData = {
          email: user.email,
          name: user.name || 'Unknown',
          image: user.image || null,
          provider: account?.provider || 'unknown'
        };

        if (existingUser.length === 0) {
          // Create new user
          await db.insert(users).values(userData);
        } else {
          // Update existing user
          await db
            .update(users)
            .set(userData)
            .where(eq(users.email, user.email));
        }
        return true;
      } catch (error) {
        console.error('Error saving user:', error);
        return false;
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/(dashboard)') ||
                           nextUrl.pathname === '/';

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (nextUrl.pathname === '/login') {
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return true;
      }
      return true;
    }
  }
});
