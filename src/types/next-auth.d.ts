import { Task } from "@/models/Task";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    fname?: string;
    mname?: string;
    lname?: string;
    username?: string;
    email?: string;
    tasks?: Task[];
  }
  interface Session {
    user: {
        _id?: string;
        fname?: string;
        mname?: string;
        lname?: string;
        username?: string;
        email?: string;
        tasks?: Task[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    fname?: string;
    mname?: string;
    lname?: string;
    username?: string;
    email?: string;
    tasks?: Task[];
  }
}
