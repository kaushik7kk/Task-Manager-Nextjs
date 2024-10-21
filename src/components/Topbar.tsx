import Link from "next/link";
import React from "react";
import "@/styles/Topbar.css";
import { useSession } from "next-auth/react";
import { ProfileDropdown } from "./ProfileDropdown";
import { ClipboardCheck } from "lucide-react";

export default function Topbar() {
  // Getting session.
  const { data: session, status } = useSession();

  return (
    <>
      <div className="top-container h-12 bg-cyan-100 text-center text-black py-2 flex justify-between px-8">
        {/* Link with dynamic URLs for brand title. */}
        <div className="brand flex justify-between w-40 items-center">
          <ClipboardCheck />
          <Link
            href={
              status === "authenticated"
                ? `/dashboard/${session?.user.username}`
                : "/landing"
            }
            className="barlow-extrabold hover:text-teal-900"
          >
            Task Manager
          </Link>
        </div>
        {/* Dashboard button and dropdown menu if user logged in. */}
        {status === "authenticated" ? (
          <>
            <div className="top-links right-links barlow-extrabold hover:text-teal-900">
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
            <div className="top-links right-links flex w-36 justify-between">
              <Link
                href="/login"
                className="hover:text-teal-900 barlow-extrabold"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:text-teal-900 barlow-extrabold"
              >
                Signup
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
