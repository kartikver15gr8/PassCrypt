"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useRecoilValue } from "recoil";
import { userState } from "@/store/atom/userState";
import { useEffect } from "react";
import Passwords from "./passwords/page";
import Payments from "./payments/page";

export default function User() {
  const router = useRouter();
  const session = useSession();

  const userEmail = session.data?.user?.email;

  useEffect(() => {
    if (!userEmail) {
      redirect("/login");
    }
  }, [userEmail, router]);

  return (
    <div className="flex flex-col text-black">
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <p className="mr-2">Search PassCrypt</p>
        <Button
          className="mr-5"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      </div>
      <h1>Page</h1>
    </div>
  );
}
