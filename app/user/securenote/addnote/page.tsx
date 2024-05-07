"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { throttle } from "@/components/user/throttle";

export default function AddCard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const session = useSession();
  const router = useRouter();

  const SecureNotesTypes = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(5).max(100),
  });

  const handleOnClick = async () => {
    try {
      setIsAdding(true);
      const isValid = SecureNotesTypes.safeParse({ title, description });
      if (isValid.success) {
        const apiUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/user/notes/createnotes"
            : "https://www.passcrypt.pro/api/user/notes/createnotes";
        const res = await axios.post(apiUrl, {
          title: title,
          description: description,
        });
        setInvalid(false);
        router.push("/user/securenote");

        return res.data;
      } else {
        setInvalid(true);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const throttledAdd = throttle(handleOnClick, 2000);

  return (
    <div className="flex text-black flex-col justify-center items-center p-5 h-100vh mt-16">
      <div className="w-[40%] bg-slate-200 shadow-xl shadow-slate-400 h-[550px] border rounded-xl flex flex-col items-center">
        <p className="text-3xl font-bold flex-col p-2 mt-5 mb-5 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-500 text-transparent inline-block bg-clip-text">
          Personal Note
        </p>
        {invalid ? (
          <div className="flex flex-col">
            <input
              className="text-black border border-red-400 shadow-red-400 rounded-lg w-[100%] p-4 mb-2 shadow-md"
              type="text"
              placeholder="Enter valid title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <textarea
              className="flex text-black border border-red-400 shadow-red-400 w-[100%] rounded-lg p-4 mb-2 shadow-md"
              name="note"
              placeholder="Enter at least more than 5 characters..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id=""
              cols={30}
              rows={10}
            ></textarea>
          </div>
        ) : (
          <div className="flex flex-col">
            <input
              className="text-black border rounded-lg w-[100%] p-4 mb-2 shadow-md"
              type="text"
              placeholder="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <textarea
              className="flex text-black border w-[100%] rounded-lg p-4 mb-2 shadow-md"
              name="note"
              placeholder="start writing from here..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id=""
              cols={30}
              rows={10}
            ></textarea>
          </div>
        )}

        <Button
          className="mt-5 w-36 shadow-lg shadow-slate-500 rounded-lg h-12 hover:scale-110 transition-all duration-150"
          onClick={throttledAdd}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add note"}
        </Button>
      </div>
    </div>
  );
}
