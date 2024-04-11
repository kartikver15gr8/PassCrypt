"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

export default function Add() {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");

  const session = useSession();
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/password/createpassword",
        {
          website: website,
          username: username,
          password: password,
          note: note,
        }
      );

      router.push("/user/passwords");

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex text-black flex-col justify-center items-center p-5 h-100vh mt-16">
      <div className="w-[40%] shadow-md h-[550px] border rounded-xl flex flex-col items-center">
        <p className="text-xl flex flex-col p-2 mt-5 mb-5">Login Details</p>
        <input
          className="text-black border rounded w-[80%] p-1 mb-2 shadow-md"
          type="text"
          placeholder="Website (https://...)"
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
        />
        <input
          className="text-black border rounded w-[80%] p-1 mb-2 shadow-md"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="text-black border rounded w-[80%] p-1 mb-2 shadow-md"
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <textarea
          className="text-black border w-[80%] rounded p-1 mb-2 shadow-md"
          name="note"
          placeholder="note"
          onChange={(e) => {
            setNote(e.target.value);
          }}
          id=""
          cols={30}
          rows={10}
        ></textarea>
        <Button className="mt-5" onClick={handleOnClick}>
          add password
        </Button>
      </div>
    </div>
  );
}
