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
      <div>Identities</div>
    </div>
  );
}
