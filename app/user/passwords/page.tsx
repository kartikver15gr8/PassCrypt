"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Add from "./add/page";

export default function Passwords() {
  const router = useRouter();
  const [passwords, setPasswords] = useState([]);

  const init = async () => {
    try {
      const allPass = await axios.get("/api/user/getpassword");
      console.log(allPass.data);
      setPasswords(allPass.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col text-black">
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <Button
          onClick={() => {
            router.push("/user/passwords/add");
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
      <div>
        {passwords.map((elem, key) => {
          return (
            <div key={key}>
              <Pass
                website={elem.website}
                username={elem.username}
                password={elem.password}
                note={elem.note}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Pass({
  website,
  username,
  password,
  note,
}: {
  website: string;
  username: string;
  password: string;
  note: string;
}) {
  return (
    <div className="flex m-1 p-2 border rounded items-center">
      <div className="m-1">
        <p className="text-lg">{website.split("//")[1]}</p>
        <p className="text-sm">{username}</p>
      </div>
      {/* <p>{pasword}</p>
      <p>{note}</p> */}
    </div>
  );
}
