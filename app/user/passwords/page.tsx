"use client";

import { LoginDetails } from "@/components/user/logindetails";
import AppBar from "@/components/user/appbar";
import { redirect } from "next/navigation";
import PasswordLoading from "@/components/PasswordLoading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { PasswordLabel } from "@/components/user/passwordLabel";

type UserPassword = {
  id: number;
  website: string;
  username: string;
  password: string;
  note: string;
  userId: number;
  favorites: boolean;
  bin: boolean;
};

const bg1 = "sky-900";
const bg2 = "red-300";
const bg3 = "yellow-400";
const bg4 = "blue-300";
const bg5 = "slate-700";

export default function Passwords() {
  const session = useSession();
  const [passwords, setPasswords] = useState<UserPassword[]>([]);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get("/api/user/password/getpassword");
      console.log(response.data);

      setPasswords(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session.data?.user) {
      fetchPasswords();
    }
  }, [session]);

  return (
    <div className="flex flex-col text-black">
      <AppBar redirectURI="/user/passwords/add" />
      <div className="p-2 grid grid-cols-1 gap-y-2">
        {passwords.length <= 0 && <PasswordLoading />}
        {passwords.map((elem, key) => {
          return (
            <LoginDetails
              key={key}
              website={elem.website}
              username={elem.username}
              password={elem.password}
              id={elem.id}
              favorites={elem.favorites}
            />
          );
        })}
      </div>
    </div>
  );
}
