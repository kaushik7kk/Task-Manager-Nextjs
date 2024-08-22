import Link from "next/link";
import React from "react";
import "@/styles/Topbar.css";

export default function Topbar() {
  return (
    <>
      <div className="top-container h-12 bg-cyan-100 text-center text-black py-2 flex justify-around">
        <Link href="/landing" className="nunito-sans hover:text-teal-700">
          Task Manager
        </Link>
        <div className="top-links right-links flex w-32 justify-between kanit-medium">
          <Link href="/login" className="hover:text-teal-700">
            Login
          </Link>
          <Link href="/signup" className="hover:text-teal-700">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}
