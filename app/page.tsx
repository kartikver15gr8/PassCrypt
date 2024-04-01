"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Landing from "@/components/landing";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  );
}
