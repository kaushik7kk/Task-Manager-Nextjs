import React, { useEffect } from "react";

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

export function ProfileDialog() {

  const router = useRouter();

  const {data: session, status} = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push(`/landing`);
    }
  }, [status]);

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
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fname" className="text-right">
              First Name
            </Label>
            <Input
              id="fname"
              defaultValue={session?.user.fname}
              className="col-span-3"
            />
            <Label htmlFor="mname" className="text-right">
              Middle Name
            </Label>
            <Input
              id="mname"
              defaultValue={session?.user.mname}
              className="col-span-3"
            />
            <Label htmlFor="lname" className="text-right">
              Last Name
            </Label>
            <Input
              id="lname"
              defaultValue={session?.user.lname}
              className="col-span-3"
            />
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue={session?.user.username}
              className="col-span-3"
            />
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={session?.user.email}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
