import { dbConnect } from "@/lib/dbConnect";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: {label: "uname", type: "text"},
        password: {label: "pass", type: "password"}
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        
      }
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
