import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { loginSchema } from "./schemas";
import User from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          return validatedFields.data;
        }
        return null;
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async session({ session, user, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;

      return session;
    },

    async jwt({ token, user, account, profile }) {
      try {
        if (user) {
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            token.id = existingUser._id;
            token.name = existingUser.username;
          }
        }
      } catch (error) {
        console.log("JWT callback error", error);
      } finally {
        return token;
      }
    },
  },
});
