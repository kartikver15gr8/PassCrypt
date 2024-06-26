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

const ACTIVE_ROUTE =
  "p-2 h-12 items-center m-1 flex text-xl bg-slate-900 rounded-md text-white shadow-xl ";
const INACTIVE_ROUTE =
  "p-2 h-12 items-center m-1 flex text-xl rounded-md hover:bg-slate-900 hover:text-white transition-all duration-300";
const ACTIVE =
  "p-2 h-16 items-center m-1 flex text-xl bg-slate-900 rounded-md text-white shadow-xl";
const INACTIVE =
  "p-2 h-16 items-center m-1 flex text-xl rounded-md hover:bg-slate-900 hover:text-white transition-all duration-300";

export default function Sidebar() {
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const userEmail = session.data?.user?.email;

  return (
    <div
      className={` ${
        open ? "w-[30%]" : "w-20 "
      } bg-slate-300 relative duration-300`}
    >
      <svg
        className={`absolute cursor-pointer -right-3 top-14 w-fit border-slate-700 bg-blue-300
        border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 48 48"
      >
        <g fill="none" stroke="#0d3e63" strokeLinejoin="round" strokeWidth="2">
          <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
          <path strokeLinecap="round" d="m27 33l-9-9l9-9" />
        </g>
      </svg>
      <div className="flex text-black p-5 shadow-md flex-row items-center">
        <svg
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          onClick={() => {
            router.push("/user/profile");
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 1280 1536"
        >
          <path
            fill="#08363F"
            d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5m-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384"
          />
        </svg>

        <h1
          className={`text-black ml-4 origin-left text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          {userEmail}
        </h1>
      </div>
      <div
        className={`flex  text-black flex-col  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm gap-x-4`}
      >
        <ul className="">
          <li
            className={
              pathname === "/user/allitems" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
            onClick={() => {
              router.push("/user/allitems");
            }}
          >
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 3h13a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v3h5V4zM3 19a2 2 0 0 0 2 2h3v-5H3zm5-9H3v5h5zm10 11a2 2 0 0 0 2-2v-3h-5v5zm2-11h-5v5h5zm0-4a2 2 0 0 0-2-2h-3v5h5zM9 4v5h5V4zm0 17h5v-5H9zm5-11H9v5h5z"
              />
            </svg>
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              All items
            </p>
          </li>
          <li
            className={
              pathname === "/user/favorites" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
            onClick={() => {
              router.push("/user/favorites");
            }}
          >
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
              />
            </svg>
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Favorities
            </p>
          </li>
          <li
            className={pathname === "/user/bin" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          >
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m19.262 17.038l1.676-12.575a.6.6 0 0 0-.372-.636L16 2h-5.5l-.682 1.5L5 2L3.21 3.79a.6.6 0 0 0-.17.504l1.698 12.744a4 4 0 0 0 1.98 2.944l.32.183a10 10 0 0 0 9.923 0l.32-.183a4 4 0 0 0 1.98-2.944ZM16 2l-2 5m-5-.5l.818-3" />
                <path d="M3 5c2.571 2.667 15.429 2.667 18 0" />
              </g>
            </svg>
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Bin
            </p>
          </li>
        </ul>
      </div>
      <div
        className={`flex-col rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 `}
      >
        <ul className=" w-[100%]">
          <li
            className={pathname === "/user/passwords" ? ACTIVE : INACTIVE}
            onClick={() => {
              router.push("/user/passwords");
            }}
          >
            {" "}
            <div className="flex p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6zM6 20V10z"
                />
              </svg>
            </div>{" "}
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Logins
            </p>
          </li>
          <li
            className={pathname === "/user/payments" ? ACTIVE : INACTIVE}
            onClick={() => {
              router.push("/user/payments");
            }}
          >
            {" "}
            <div className="flex p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M22 12c0-3.771 0-5.657-1.172-6.828C19.657 4 17.771 4 14 4h-4C6.229 4 4.343 4 3.172 5.172C2 6.343 2 8.229 2 12c0 3.771 0 5.657 1.172 6.828C4.343 20 6.229 20 10 20h4c3.771 0 5.657 0 6.828-1.172c.654-.653.943-1.528 1.07-2.828M10 16H6m8 0h-1.5M2 10h5m15 0H11"
                />
              </svg>
            </div>{" "}
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Payments
            </p>
          </li>
          <li
            className={pathname === "/user/securenote" ? ACTIVE : INACTIVE}
            onClick={() => {
              router.push("/user/securenote");
            }}
          >
            {" "}
            <div className="flex p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13V4H6v16h12V9zM6 4v5zv16z"
                />
              </svg>
            </div>{" "}
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Secure note
            </p>
          </li>
          <li
            className={pathname === "/user/identity" ? ACTIVE : INACTIVE}
            onClick={() => {
              router.push("/user/identity");
            }}
          >
            {" "}
            <div className="flex p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  d="M2 12.5v.5h1v-.5zm5 0v.5h1v-.5zm-4 0V12H2v.5zm4-.5v.5h1V12zm-2-2a2 2 0 0 1 2 2h1a3 3 0 0 0-3-3zm-2 2a2 2 0 0 1 2-2V9a3 3 0 0 0-3 3zm2-8a2 2 0 0 0-2 2h1a1 1 0 0 1 1-1zm2 2a2 2 0 0 0-2-2v1a1 1 0 0 1 1 1zM5 8a2 2 0 0 0 2-2H6a1 1 0 0 1-1 1zm0-1a1 1 0 0 1-1-1H3a2 2 0 0 0 2 2zM1.5 3h12V2h-12zm12.5.5v8h1v-8zm-.5 8.5h-12v1h12zM1 11.5v-8H0v8zm.5.5a.5.5 0 0 1-.5-.5H0A1.5 1.5 0 0 0 1.5 13zm12.5-.5a.5.5 0 0 1-.5.5v1a1.5 1.5 0 0 0 1.5-1.5zM13.5 3a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 13.5 2zm-12-1A1.5 1.5 0 0 0 0 3.5h1a.5.5 0 0 1 .5-.5zM9 6h3V5H9zm0 3h3V8H9z"
                />
              </svg>
            </div>{" "}
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Identity
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
