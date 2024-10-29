"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const {data:session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/dashboard/${session.user.username}`);
    } else {
      router.push(`/landing`);
    }
  }, [session, status, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HOME
    </main>
  );
}
