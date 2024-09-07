"use client"

import Topbar from "@/components/Topbar";
import React, { useEffect } from "react";
import "@/styles/Landing.css";
import Link from "next/link";
import { getSession } from "next-auth/react";

export default function Landing() {

  return (
    <>
      {/* <div className="mx-auto text-center">LANDING PAGE</div> */}
      <Topbar />
      <div className="tagline text-center mt-16 montserrat">
        Management made easy
      </div>
      <div className="mx-auto mt-10 p-5 content text-center montserrat">
        <div className="text">
          Welcome to Task Manager, your all-in-one solution for streamlined task
          management. Whether you're coordinating teams, organizing projects, or
          categorizing tasks, our app empowers your organization to operate
          efficiently and with ease. Enhance collaboration,
          improve productivity, and simplify your workflow, ensuring that
          everyone stays on the same page and that nothing falls through the
          cracks. With Task Manager, managing your organization's tasks has
          never been easier.
        </div>
        <button className="mx-auto p-5 mt-7">
          <Link href="/login">Get started</Link>
        </button>
      </div>
    </>
  );
}
