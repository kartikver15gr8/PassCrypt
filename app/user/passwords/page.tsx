"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import Add from "./add/page";
import { useSession } from "next-auth/react";

type UserPassword = {
  id: number;
  website: string;
  username: string;
  password: string;
  note: string;
  user: {};
  userId: number;
};

export default function Passwords() {
  const session = useSession();
  const router = useRouter();

  if (!session.data?.user?.email) {
    redirect("/login");
  }
  const [passwords, setPasswords] = useState<UserPassword[]>([]);

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
                id={elem.id}
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
  id,
}: {
  website: string;
  username: string;
  password: string;
  note: string;
  id: number;
}) {
  const passRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      const divContent = passRef.current.textContent;
      navigator.clipboard
        .writeText(divContent)
        .then(() => {
          console.log("Content copied to clipboard");
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy content: ", err);
        });
    } else {
      console.error("Clipboard API not supported");
    }
  };

  return (
    <div className="flex m-1 p-2 border rounded items-center">
      <div id={id.toString()} className="m-1">
        <a
          className="text-lg hover:text-sky-800 font-semibold"
          href={website}
          target="_blank"
        >
          {website.split("//")[1]}
        </a>
        <p className="text-sm">{username}</p>
      </div>
      <div className="ml-5 flex items-center">
        <p ref={passRef} className="p-2 mr-5">
          {password}
        </p>
        <Button
          className="hover:bg-sky-500 transition-all duration-500"
          onClick={handleCopy}
        >
          {copySuccess ? "Copied!" : "copy"}
        </Button>
      </div>
      {/* <p>{pasword}</p>
      <p>{note}</p> */}
    </div>
  );
}
