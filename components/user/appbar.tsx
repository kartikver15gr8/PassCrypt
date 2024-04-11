"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import Add from "@/app/user/passwords/add/page";
import { useSession } from "next-auth/react";

export default function AppBar({ redirectURI }: { redirectURI: string }) {
  const router = useRouter();
  return (
    <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
      <Button
        onClick={() => {
          router.push(redirectURI);
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
  );
}
