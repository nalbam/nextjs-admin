import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from "next-auth/providers/google"

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
