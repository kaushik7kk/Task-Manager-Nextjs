import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserData } from "@/models/User";

export function ProfileDialog() {
  // Router.
  const router = useRouter();

  // Session.
  const { data: session, status } = useSession();

  // State for user data.
  const [userData, setUserData] = useState<UserData | null>(() => {
    return session?.user ? (session.user as UserData) : null;
  });

  // Form submission handler.
  const editProfileHandler = (e: any) => {
    
  };

  // Controlled inputs.
  const handleInputChanges = (e: any) => {
    const { id, value } = e.target;
    if (userData) {
      setUserData((prevData) => {
        return {
          ...prevData,
          [id]: value,
        } as UserData;
      });
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserData(session.user as UserData);
    } else {
      router.push(`/landing`);
    }
  }, [status, session, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pen className="mr-4 h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-orange-100">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription className="text-black">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={editProfileHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fname" className="text-right">
                First Name
              </Label>
              <Input
                id="fname"
                className="col-span-3"
                onChange={handleInputChanges}
                value={userData?.fname || ""}
              />
              <Label htmlFor="mname" className="text-right">
                Middle Name
              </Label>
              <Input
                id="mname"
                className="col-span-3"
                onChange={handleInputChanges}
                value={userData?.mname || ""}
              />
              <Label htmlFor="lname" className="text-right">
                Last Name
              </Label>
              <Input
                id="lname"
                className="col-span-3"
                onChange={handleInputChanges}
                value={userData?.lname || ""}
              />
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                className="col-span-3"
                onChange={handleInputChanges}
                value={userData?.username || ""}
              />
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                onChange={handleInputChanges}
                value={userData?.email || ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
