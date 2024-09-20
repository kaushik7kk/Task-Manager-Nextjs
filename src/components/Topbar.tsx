import Link from "next/link";
import React from "react";
import "@/styles/Topbar.css";
import { useSession } from "next-auth/react";
import { ProfileDropdown } from "./ProfileDropdown";

export default function Topbar() {

  // Getting session.
  const { data: session, status } = useSession();

  return (
    <>
      <div className="top-container h-12 bg-cyan-100 text-center text-black py-2 flex justify-around">
        {/* Link with optional URLs for brand title. */}
        <Link
          href={
            status === "authenticated"
              ? `/dashboard/${session?.user.username}`
              : "/landing"
          }
          className="nunito-sans hover:text-teal-700"
        >
          Task Manager
        </Link>
        {/* Dashboard button and dropdown menu if user logged in. */}
        {status === "authenticated" ? (
          <>
            <div className="top-links right-links kanit-medium">
              <Link
                href={`/dashboard/${session.user.username}`}
                className="mx-5"
              >
                Dashboard
              </Link>
              <ProfileDropdown />
            </div>
          </>
        ) : (
          <>
            {/* User logged out case. */}
            <div className="top-links right-links flex w-32 justify-between kanit-medium">
              <Link href="/login" className="hover:text-teal-700">
                Login
              </Link>
              <Link href="/signup" className="hover:text-teal-700">
                Signup
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
