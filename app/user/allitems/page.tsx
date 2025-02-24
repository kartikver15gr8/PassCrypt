import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Details from "./details";
import Image from "next/image";
import passlogo from "@/public/icons/passlogo.svg";
import Link from "next/link";

export default function AllItems() {
  return (
    <div className="text-black">
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <Link href="/">
          <Image className="w-12 mx-2" src={passlogo} alt="logo"></Image>
        </Link>
        <Button className="mr-4">Logout</Button>
      </div>
      <Details />
    </div>
  );
}
