"use client";

import Topbar from "@/components/Topbar";
import React, { useEffect, useState } from "react";
import "@/styles/Profile.css";
import { useSession } from "next-auth/react";
import { UserData } from "@/models/User";

export default function Profile({ params }: any) {
  // Username retrieved from url.
  const username = params.username;

  // Session.
  const { data: session, status } = useSession();

  // User data for controlled inputs.
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserData(session.user as UserData);
    }
  }, [session, status, userData]);

  return (
    <>
      <Topbar />
    </>
  );
}
