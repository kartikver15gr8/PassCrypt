"use client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function SignoutBtn() {
  return (
    <div>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
