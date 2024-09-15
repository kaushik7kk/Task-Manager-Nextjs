import Link from "next/link";
import React, { useState } from "react";
import "@/styles/Topbar.css";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Topbar() {
  const { data: session, status } = useSession();
  const [menuStatus, setMenuStatus] = useState(false);

  return (
    <>
      <div className="top-container h-12 bg-cyan-100 text-center text-black py-2 flex justify-around">
        <Link
          href={status === "authenticated" ? "/dashboard" : "/landing"}
          className="nunito-sans hover:text-teal-700"
        >
          Task Manager
        </Link>
        {status === "authenticated" ? (
          <>
            <div className="top-links right-links kanit-medium">
              <Link href="/dashboard" className="mx-5">
                Dashboard
              </Link>
              <Link href={`/profile/${session.user.username}`}>
              <FontAwesomeIcon icon={faUser} />
              </Link>
            </div>
          </>
        ) : (
          <>
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
