import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { NoteDetails } from "@/components/user/notesdetails";
import AppBar from "@/components/user/appbar";
import GetNotes from "./getnotes";

type NoteType = {
  title: string;
  description: string;
};

export default async function Notes() {
  const notes = await GetNotes();

  return (
    <div className="text-black flex flex-col">
      <AppBar redirectURI="/user/securenote/addnote" />
      <div>
        {notes.map((elem, key) => {
          return (
            <div key={key}>
              <NoteDetails title={elem.title} description={elem.description} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
