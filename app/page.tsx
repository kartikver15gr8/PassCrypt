"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Landing from "@/components/landing";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  );
}
