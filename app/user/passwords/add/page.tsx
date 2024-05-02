"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { throttle } from "@/components/user/throttle";

export default function Add() {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const session = useSession();
  const router = useRouter();

  // const handleOnClick = async () => {
  //   try {
  //     setIsAdding(true);
  //     const res = await axios.post(
  //       "http://localhost:3000/api/user/password/createpassword",
  //       {
  //         website: website,
  //         username: username,
  //         password: password,
  //         note: note,
  //       }
  //     );

  //     router.push("/user/passwords");

  //     return res.data;
  //   } finally {
  //     setIsAdding(false);
  //   }
  // };

  const handleOnClick = async () => {
    try {
      setIsAdding(true);
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/user/password/createpassword"
          : "https://www.passcrypt.pro/api/user/password/createpassword";

      const res = await axios.post(apiUrl, {
        website: website,
        username: username,
        password: password,
        note: note,
      });

      router.push("/user/passwords");
      return res.data;
    } finally {
      setIsAdding(false);
    }
  };

  const throttledAdd = throttle(handleOnClick, 2000);

  return (
    <div className="flex text-black flex-col justify-center items-center p-5 h-100vh mt-16">
      <div className="w-[40%] bg-slate-200 shadow-lg shadow-slate-500 h-[600px] border rounded-xl flex flex-col items-center">
        <p className="text-3xl font-bold flex-col p-2 mt-5 mb-5 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 text-transparent inline-block bg-clip-text">
          Secure Creds
        </p>
        <input
          className="text-black border rounded-xl w-[80%] p-4 mb-2 shadow-md"
          type="text"
          placeholder="Website (https://...)"
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
        />
        <input
          className="text-black border rounded-xl w-[80%] p-4 mb-2 shadow-md"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="text-black border rounded-xl w-[80%] p-4 mb-2 shadow-md"
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <textarea
          className="text-black border w-[80%] rounded-xl p-4 mb-2 shadow-md"
          name="note"
          placeholder="Note..."
          onChange={(e) => {
            setNote(e.target.value);
          }}
          id=""
          cols={30}
          rows={6}
        ></textarea>
        <Button
          className="mt-5 shadow-lg shadow-slate-400 hover:scale-110 transition-all duration-150"
          onClick={throttledAdd}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add Password"}
        </Button>
      </div>
    </div>
  );
}
