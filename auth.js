import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "./src/service/auth.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  try {
    const response = await loginService({
      email: credentials.email,
      password: credentials.password,
    });

    const payload = response?.payload;

    if (!payload?.token) return null;

    return {
      id: credentials.email,
      name: credentials.email,
      email: credentials.email,
      accessToken: payload.token,
    };
  } catch (error) {
    return null;
  }
}
    }),
  ],

  secret: process.env.BETTER_AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      session.accessToken = token.accessToken;

      return session;
    },
  },
});