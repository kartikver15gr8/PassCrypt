"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Identity() {
  const router = useRouter();
  return (
    <div className="text-black flex flex-col">
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <Button
          onClick={() => {
            router.push("/user/payments/addcard");
          }}
        >
          add new
        </Button>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      </div>
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <p className="text-5xl font-bold">This page is under development!</p>
        </div>
      </div>
    </div>
  );
}
