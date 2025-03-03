import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/SVGIconsComp";
import Image from "next/image";

const icons = RAW_ICONS;

type UserPassword = {
  id: number;
  website: string;
  username: string;
  password: string;
  note: string;
  userId: number;
  favorites: boolean;
  bin: boolean;
};

export const PasswordLabel = ({
  website,
  username,
  password,
  id,
  favorites,
}: {
  website: string;
  username: string;
  password: string;
  id: number;
  favorites: boolean;
}) => {
  return (
    <div className="flex gap-x-4 p-2 h-[70px]  bg-white shadow-md rounded-[5px] items-center ">
      <Image
        className="w-20 h-14 border rounded"
        src="https://imgs.search.brave.com/p55hIbChvXMjbs6tDNbYRPz5AFF1dGqmwlvqUlecWyk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL3ZlcmNl/bDE4NjguanBn"
        alt=""
        width={200}
        height={200}
      />
      <div className="grid grid-cols-2 gap-x-4">
        <div className=" h-full border col-span-1">
          <p className="">mail</p>
          <p className="">username</p>
        </div>
        <div className="grid grid-cols-3 border gap-x-2 col-span-1 items-center">
          <ActionBtn icon={icons.Eye} />
          <ActionBtn icon={icons.Copy} />
          <ActionBtn icon={icons.Star} />
        </div>
      </div>
    </div>
  );
};

const ActionBtn = ({
  icon,
  toastPrompt,
}: {
  icon: string;
  toastPrompt?: string;
}) => {
  return (
    <button className="flex h-10 w-10 justify-center items-center rounded-full hover:bg-[#eeeeef] transition-all duration-300">
      <SVGIcon className="flex w-5" svgString={icon} />
    </button>
  );
};
