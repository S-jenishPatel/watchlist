import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { loginSchema } from "./schemas";

import User from "./models/user.model";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    watchlist?: [string];
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    watchlist?: [string];
  }
}

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
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async session({ session, user, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.watchlist = token.watchlist as [string];

      return session;
    },

    async jwt({ token, user, account, profile }) {
      try {
        let existingUser;
        if (token.id) {
          existingUser = await User.findById(token.id);
        } else {
          existingUser = await User.findOne({
            email: token.email,
          });
        }

        if (existingUser) {
          token.id = existingUser._id;
          token.name = existingUser.username;
          token.watchlist = existingUser.watchlist;
        }
      } catch (error) {
        throw error;
      } finally {
        return token;
      }
    },
  },
});
