import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // Auth using Credentials.
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        // Connect to database.
        await dbConnect();

        try {
          // Find user by username or email in database.
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          // User not found.
          if (!user) {
            throw new Error("No user found with this email or username.");
          }

          // Compare password.
          const correctPassword = await bcryptjs.compare(
            credentials.password,
            user.password
          );

          if (correctPassword) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    // Use token to access data.
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.fname = user.fname;
        token.mname = user.mname;
        token.lname = user.lname;
        token.username = user.username;
        token.email = user.email;
        token.imgUrl = user.imgUrl;
        token.tasks = user.tasks;
      }
      return token;
    },

    // Transfer data from token to session.
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id?.toString();
        session.user.fname = token.fname;
        session.user.mname = token.mname;
        session.user.lname = token.lname;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.imgUrl = token.imgUrl;
        session.user.tasks = token.tasks;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
