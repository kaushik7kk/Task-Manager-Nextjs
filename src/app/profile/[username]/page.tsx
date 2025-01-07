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
      <div className="profile-container mx-auto flex mt-5">
        <div className="profile-left my-auto">
          <div className="profile-picture-container mx-auto mt-5">
            <img src={session?.user.imgUrl} alt="" />
          </div>
          <div className="left-button-list mx-auto mt-2 flex flex-col items-center">
            {/* <ProfilePictureDialog /> */}
          </div>
        </div>
        <div className="profile-right my-auto">
          <div className="right-header flex justify-between p-5">
            <div className="details-title">Profile details</div>
            <div className="edit-profile-button">Edit profile</div>
          </div>
          <div className="right-content mx-auto flex flex-col">
            <div className="content-r1 p-5">
              <div className="profile-input-group flex">
                <label htmlFor="">First Name&nbsp;&nbsp;</label>
                <input type="text" className="w-40" />
              </div>
            </div>
            <div className="content-r2"></div>
          </div>
        </div>
      </div>
      <div className="profile-analysis-container mx-auto mt-5 flex items-center justify-center">
        PROFILE ANALYSIS COMING SOON
      </div>
    </>
  );
}
