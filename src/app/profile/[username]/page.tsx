"use client";

import Topbar from "@/components/Topbar";
import React, { useEffect, useState } from "react";
import "@/styles/Profile.css";
import { Image, Lock, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserData } from "@/models/User";
import { ProfileDialog } from "@/components/ProfileDialog";

export default function Profile({ params }: any) {
  const username = params.username;

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserData(session.user as UserData);
    }
    console.log(userData);
  }, [session, status]);

  return (
    <>
      <Topbar />
      <div className="profile-container mx-auto mt-5 text-center p-5 flex justify-around">
        <div className="profile-img mt-10 flex flex-col justify-start">
          <img
            src={userData?.imgUrl}
            alt="profile"
            width="100%"
            height="100%"
          />
          <Button className="mt-4">
            <Image className="mr-2 h-4 w-4" /> Update profile picture
          </Button>

          <Button className="mt-2">
            <Lock className="mr-2 h-4 w-4" /> Change password
          </Button>
        </div>
        <div className="details flex flex-col justify-start items-center p-3">
          <div className="name-field flex justify-between items-center">
            <label htmlFor="">First Name</label>
            <input type="text" value={userData?.fname} disabled />
          </div>
          <div className="name-field flex justify-between items-center">
            <label htmlFor="">Middle Name</label>
            <input type="text" value={userData?.mname} disabled />
          </div>
          <div className="name-field flex justify-between items-center">
            <label htmlFor="">Last Name</label>
            <input type="text" value={userData?.lname} disabled />
          </div>

          <div className="username-field flex justify-between items-center">
            <label htmlFor="">Username</label>
            <input type="text" value={userData?.username} disabled />
          </div>
          <div className="email-field flex justify-between items-center">
            <label htmlFor="">Email</label>
            <input type="email" value={userData?.email} disabled />
          </div>

          <div className="buttons p-4 flex justify-around items-center">
            {/* <Button className="pen px-8">
              <Pen className="mr-4 h-4 w-4" /> Edit
            </Button> */}
            <ProfileDialog />
          </div>
        </div>
      </div>
    </>
  );
}
