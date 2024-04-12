"use client";

import { Button } from "../ui/button";

export function NoteDetails({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex m-1 p-2 border rounded items-center hover:bg-slate-300 transition-all duration-500">
      <div className="flex flex-col w-[500px]">
        <p className="text-xl font-bold">{title}</p>
        <p>{description}</p>
      </div>
      <Button className="transition-all hover:bg-slate-500 duration-500 ml-10">
        <p className="mr-1">edit</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
          />
        </svg>
      </Button>
    </div>
  );
}
