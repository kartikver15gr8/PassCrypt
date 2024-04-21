"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { throttle } from "@/components/user/throttle";

export default function AddCard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const session = useSession();
  const router = useRouter();

  // const handleOnClick = async () => {
  //   try {
  //     setIsAdding(true);
  //     const res = await axios.post(
  //       "http://localhost:3000/api/user/notes/createnotes",
  //       {
  //         title: title,
  //         description: description,
  //       }
  //     );

  //     router.push("/user/securenote");

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
          ? "http://localhost:3000/api/user/notes/createnotes"
          : "https://pass-crypt.vercel.app/api/user/notes/createnotes";
      const res = await axios.post(apiUrl, {
        title: title,
        description: description,
      });

      router.push("/user/securenote");

      return res.data;
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
        <input
          className="text-black border rounded-lg w-[80%] p-4 mb-2 shadow-md"
          type="text"
          placeholder="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <textarea
          className="flex text-black border w-[80%] rounded-lg p-4 mb-2 shadow-md"
          name="note"
          placeholder="start writing from here..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          id=""
          cols={30}
          rows={10}
        ></textarea>

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
