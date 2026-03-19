import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signupTypes } from "@/lib/types/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = signupTypes.safeParse(credentials);
        if (!result.success) {
          throw new Error("Invalid input");
        }
        const { name, email, password } = result.data;

        // Check if user already exists
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Create new user (signup)
          let saltRound = 10;
          let salt = await bcrypt.genSalt(saltRound);
          const hashedPassword = await bcrypt.hash(password, salt);
          user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
          });
        } else {
          let verifyPassword = await bcrypt.compare(password, user.password);
          if (!verifyPassword) {
            throw new Error("Invalid Password");
          }
        }
        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };