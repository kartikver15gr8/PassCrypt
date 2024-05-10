"use client";

import axios from "axios";
import { Button } from "../ui/button";
import { toast } from "sonner";

export function NoteDetails({
  id,
  title,
  description,
  favorites,
}: {
  id: number;
  title: string;
  description: string;
  favorites: boolean;
}) {
  const toggleFav = async () => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/user/notes/addtofav"
          : "https://www.passcrypt.pro/api/user/notes/addtofav";
      const res = await axios.post(apiUrl, { noteId: id });
      toast("Added to favorites");
      return res.data;
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="flex m-2 p-2 border bg-white shadow-md rounded-lg items-center hover:bg-slate-300 transition-all duration-500">
      <div className="flex flex-col w-[500px]">
        <p className="sm:text-sm xs:text-xs text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-bold">
          {title}
        </p>
        <p className="sm:text-sm xs:text-xs text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
          {description}
        </p>
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
      {favorites ? (
        <Button className="ml-5" onClick={toggleFav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 48 48"
          >
            <defs>
              <mask id="ipTStar0">
                <path
                  fill="#555"
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m23.999 5l-6.113 12.478L4 19.49l10.059 9.834L11.654 43L24 36.42L36.345 43L33.96 29.325L44 19.491l-13.809-2.013z"
                />
              </mask>
            </defs>
            <path fill="yellow" d="M0 0h48v48H0z" mask="url(#ipTStar0)" />
          </svg>
        </Button>
      ) : (
        <Button className="ml-5" onClick={toggleFav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 256 256"
          >
            <g fill="white">
              <path
                d="m229.06 108.79l-48.7 42l14.88 62.79a8.4 8.4 0 0 1-12.52 9.17L128 189.09l-54.72 33.65a8.4 8.4 0 0 1-12.52-9.17l14.88-62.79l-48.7-42A8.46 8.46 0 0 1 31.73 94l63.91-5.2l24.62-59.6a8.36 8.36 0 0 1 15.48 0l24.62 59.6l63.91 5.2a8.46 8.46 0 0 1 4.79 14.79"
                opacity="0.2"
              />
              <path d="M239.18 97.26A16.38 16.38 0 0 0 224.92 86l-59-4.76l-22.78-55.09a16.36 16.36 0 0 0-30.27 0L90.11 81.23L31.08 86a16.46 16.46 0 0 0-9.37 28.86l45 38.83L53 211.75a16.38 16.38 0 0 0 24.5 17.82l50.5-31.08l50.53 31.08A16.4 16.4 0 0 0 203 211.75l-13.76-58.07l45-38.83a16.43 16.43 0 0 0 4.94-17.59m-15.34 5.47l-48.7 42a8 8 0 0 0-2.56 7.91l14.88 62.8a.37.37 0 0 1-.17.48c-.18.14-.23.11-.38 0l-54.72-33.65a8 8 0 0 0-8.38 0l-54.72 33.67c-.15.09-.19.12-.38 0a.37.37 0 0 1-.17-.48l14.88-62.8a8 8 0 0 0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16a8 8 0 0 0 6.72-4.94l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153 91.86a8 8 0 0 0 6.75 4.92l63.92 5.16c.15 0 .24 0 .33.29s0 .4-.16.5" />
            </g>
          </svg>
        </Button>
      )}
    </div>
  );
}
