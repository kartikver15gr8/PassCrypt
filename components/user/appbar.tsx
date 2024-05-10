"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import Add from "@/app/user/passwords/add/page";
import { useSession } from "next-auth/react";
import passlogo from "@/public/passlogo.png";
import Image from "next/image";
import Link from "next/link";

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
      <div className="flex items-center mr-4">
        <Link href="/">
          <Image className="w-12 mx-2" src={passlogo} alt="logo"></Image>
        </Link>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
