"use client";

import Topbar from "@/components/Topbar";
import React, { useEffect } from "react";
import "@/styles/Landing.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Landing() {

  // Router for navigation.
  const router = useRouter();

  // Getting session.
  const { data: session, status } = useSession();

  // Checking for authorization before rendering page.
  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/dashboard/${session.user.username}`);
    }
  }, [session, status, router]);

  return (
    <>
      <Topbar />
      <div className="tagline text-center mt-16 montserrat">
        Management made easy
      </div>
      <div className="mx-auto mt-10 p-5 content text-center montserrat">
        <div className="text">
          Welcome to Task Manager, your all-in-one solution for streamlined task
          management. Whether you&apos;re coordinating teams, organizing projects, or
          categorizing tasks, our app empowers your organization to operate
          efficiently and with ease. Enhance collaboration, improve
          productivity, and simplify your workflow, ensuring that everyone stays
          on the same page and that nothing falls through the cracks. With Task
          Manager, managing your organization&apos;s tasks has never been easier.
        </div>
        <button className="mx-auto p-5 mt-7">
          <Link href="/signup">Get started</Link>
        </button>
      </div>
    </>
  );
}
