import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '@/lib/supabase';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists in Supabase
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (selectError && selectError.code !== 'PGRST116') {
          throw selectError;
        }

        // Create user if doesn't exist
        if (!existingUser) {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              auth_id: user.id,
              email: user.email || '',
              full_name: user.name || '',
              avatar_url: user.image || null,
              preferred_language: 'zh',
              preferred_currency: 'HKD',
            });

          if (insertError) throw insertError;
        }

        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
