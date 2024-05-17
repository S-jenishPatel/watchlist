import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user in sign in callback", user);

      return true;
    },

    async session({ session, user, token }) {
      session.user.id = token.id as string;
      return session;
    },

    async jwt({ token, user, account, profile }) {
      console.log("token in jwt callback", token);
      console.log("user in jwt callback", user);

      try {
        if (user) {
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            token.id = existingUser._id;
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        return token;
      }
    },
  },
});
