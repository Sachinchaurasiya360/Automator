import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginTypes } from "@/lib/types/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = loginTypes.safeParse(credentials);
        if (!result.success) {
          throw new Error("Invalid input");
        }
        const { email, password } = result.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error("Email does not exist");
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
          throw new Error("Invalid Password");
        }

        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
