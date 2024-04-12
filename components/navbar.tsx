"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const userEmail = session.data?.user?.email;

  return (
    <div className="flex p-1 bg-slate-300 shadow-md justify-between h-16">
      <div className="flex items-center ml-10">
        <img
          className="w-10 mx-2"
          src="https://www.svgrepo.com/show/490935/lock.svg"
          alt="icon"
        />
        <h1 className="font-bold font-sans text-xl text-emerald-950">
          PASSCRYPT
        </h1>
      </div>
      <div className="flex ml-4 mr-4 items-center">
        <p className="p-1 mx-2 text-slate-800 hover:cursor-pointer">Product</p>
        <p className="p-1 mx-2 text-slate-800 hover:cursor-pointer">Pricing</p>

        {userEmail ? (
          <p
            className="p-1 mx-2 text-slate-800 hover:cursor-pointer"
            onClick={() => {
              router.push("/user/passwords");
            }}
          >
            Passwords
          </p>
        ) : (
          <p className="p-1 mx-2 text-slate-800 hover:cursor-pointer">
            Resources
          </p>
        )}
        {userEmail ? (
          <p
            className="p-1 mx-2 text-slate-800 hover:cursor-pointer"
            onClick={() => {
              router.push("/user/profile");
            }}
          >
            Profile
          </p>
        ) : (
          <p className="p-1 mx-2 text-slate-800 hover:cursor-pointer">Blog</p>
        )}
      </div>

      {userEmail ? (
        <div className="flex items-center mr-6 text-emerald-900 font-semibold font-mono">
          <p className="mr-2">{userEmail}</p>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center mr-5">
          <Button
            className="bg-sky-700 m-2"
            onClick={() => {
              router.push("/login");
            }}
          >
            Log in
          </Button>
          <Button>Try Business for free</Button>
        </div>
      )}
    </div>
  );
}
