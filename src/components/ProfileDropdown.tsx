"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import "@/styles/ProfileDropdown.css";

export function ProfileDropdown() {
  // Getting session.
  const { data: session, status } = useSession();

  // Username from session data to use in links.
  const username = session?.user.username;

  // Logout handler.
  const logoutClickHandler = async () => {
    await signOut({ callbackUrl: "/landing" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FontAwesomeIcon icon={faUser} cursor="pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 container-dd text-black">
        <DropdownMenuLabel className="defpoint">Menu</DropdownMenuLabel>
        <DropdownMenuSeparator className="sep" />
        <DropdownMenuGroup>
          <Link href={`/profile/${username}`}>
            <DropdownMenuItem className="pointer">Profile</DropdownMenuItem>
          </Link>
          <Link href={`/u/${username}/tasks`}>
            <DropdownMenuItem className="pointer">My Tasks</DropdownMenuItem>
          </Link>
          <Link href={`/u/${username}/categories`}>
            <DropdownMenuItem className="pointer">
              My Categories
            </DropdownMenuItem>
          </Link>
          <Link href={`/u/${username}/groups`}>
            <DropdownMenuItem className="pointer">My Groups</DropdownMenuItem>
          </Link>
          <Link href={`/u/${username}/friends`}>
            <DropdownMenuItem className="pointer">My Friends</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="sep" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="pointer" onClick={logoutClickHandler}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
