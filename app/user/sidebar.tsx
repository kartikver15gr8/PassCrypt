"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

import { useRecoilValue } from "recoil";
import { userState } from "@/store/atom/userState";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { importSPKI } from "jose";
import Link from "next/link";
import passLogo from "@/public/icons/passlogo.svg";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/SVGIconsComp";
import { sidebar_options } from "@/lib/SidebarOptions";

const icons = RAW_ICONS;

const options = sidebar_options;

const ACTIVE_ROUTE =
  "h-14 rounded flex items-center px-4 bg-[#ECECEF] border-[#DBDAD8] border gap-x-2";
const INACTIVE_ROUTE =
  "h-14 rounded flex items-center px-4 gap-x-2 hover:bg-[#ECECEF] transition-all duration-300";

export default function Sidebar() {
  return (
    <div className="w-72 bg-white text-black border-r border-[#DBDAD8]">
      <Link
        href={"/"}
        className="h-16 border-b border-r border-[#DBDAD8] shadow-sm shadow-[#DBDAD8] p-2 flex items-center gap-x-2"
      >
        <Image className="w-10" src={passLogo} alt="" />
        <p className="font-medium text-xl">PassCrypt</p>
      </Link>
      <div className="grid grid-cols-1 p-[6px] gap-y-[6px]">
        {options.map((option, key) => {
          return (
            <OptionLabel
              key={key}
              routePath={option.routePath}
              icon={option.icon}
              optName={option.optName}
              className=""
            />
          );
        })}
      </div>
    </div>
  );
}

const OptionLabel = ({
  routePath,
  icon,
  optName,
  className,
}: {
  routePath: string;
  icon: string;
  optName: string;
  className?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Link
      href={routePath}
      className={pathname == routePath ? ACTIVE_ROUTE : INACTIVE_ROUTE}
    >
      <SVGIcon svgString={icon} />
      <p>{optName}</p>
    </Link>
  );
};
