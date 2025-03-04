import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      provider?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
  }
}
