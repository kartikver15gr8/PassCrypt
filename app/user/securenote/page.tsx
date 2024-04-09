"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

type NoteType = {
  title: string;
  description: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const init = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/user/notes/getnotes"
      );
      console.log(res.data);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const router = useRouter();
  return (
    <div className="text-black flex flex-col">
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <Button
          onClick={() => {
            router.push("/user/securenote/addnote");
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
        {notes.map((elem, key) => {
          return (
            <div key={key}>
              <Note title={elem.title} description={elem.description} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Note({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="items-centerflex m-1 p-2 border rounded items-center hover:bg-slate-300 transition-all duration-500">
      <div>
        <p className="text-xl">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
