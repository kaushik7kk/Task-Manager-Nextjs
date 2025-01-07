import Link from "next/link";
import React from "react";
import "@/styles/Topbar.css";
import { useSession } from "next-auth/react";
import { ProfileDropdown } from "./ProfileDropdown";
import { BookmarkCheck } from "lucide-react";

export default function Topbar() {
  // Getting session.
  const { data: session, status } = useSession();

  return (
    <>
      <div className="top-container h-12 text-center py-8 flex justify-between px-8 mx-auto items-center">
        {/* Link with dynamic URLs for brand title. */}
        <div className="brand flex justify-between w-40 items-center">
          <BookmarkCheck />
          <Link
            href={
              status === "authenticated"
                ? `/dashboard/${session?.user.username}`
                : "/landing"
            }
            className="work-sans"
          >
            Task Manager
          </Link>
        </div>
        {/* Dashboard button and dropdown menu if user logged in. */}
        {status === "authenticated" ? (
          <>
            <div className="top-links right-links work-sans xs:hidden">
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
            <div className="top-links right-links flex w-40 justify-between">
              <Link href="/login" className="work-sans">
                Login
              </Link>
              <Link href="/signup" className="work-sans">
                Signup
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
