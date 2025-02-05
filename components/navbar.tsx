"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import passlogo from "@/public/passlogo.png";
import Image from "next/image";
import { toast } from "sonner";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const userEmail = session.data?.user?.email;
  const [dropdown, setDropdown] = useState(false);

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <nav className="w-full h-16 flex flex-col justify-center items-center fixed z-20  backdrop-blur-lg bg-[rgba(0,0,0,0.1)]">
      <div className="w-full lg:px-6">
        <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="flex items-center ml-1 md:ml-2 lg:ml-3 xl:ml-4  sm:ml-1 hover:scale-110 transform-all duration-100"
              >
                <Image className="w-10 mx-1" src={passlogo} alt="logo"></Image>
                <h1 className="font-bold font-sans pl-2  text-2xl text-emerald-950 ">
                  PASSCRYPT
                </h1>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center xl:gap-12 gap-x-4 max-lg:hidden">
            <p
              className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100"
              onClick={() => {
                toast("You'll soon see this section available!");
              }}
            >
              Product
            </p>
            <p
              onClick={() => {
                router.push("/#pricing");
              }}
              className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100"
            >
              Pricing
            </p>{" "}
            {userEmail ? (
              <p
                className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100"
                onClick={() => {
                  router.push("/user/passwords");
                }}
              >
                Passwords
              </p>
            ) : (
              <a
                href="https://www.kartikeyverma.com"
                target="_blank"
                className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100"
              >
                Contact
              </a>
            )}
            {userEmail ? (
              <p
                className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100"
                onClick={() => {
                  router.push("/user/profile");
                }}
              >
                Profile
              </p>
            ) : (
              <a
                href="https://kartikeyverma.hashnode.dev"
                target="_blank"
                className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100"
              >
                Blog
              </a>
            )}
          </div>
          <div className="flex max-lg:hidden gap-x-4">
            {userEmail ? (
              <div className="flex items-center mr-4 text-emerald-900 font-semibold font-mono">
                <p className="mr-2 text-sky-950 text-sm">
                  Welcome Back {userEmail.split("@")[0]}!
                </p>
                <Button
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <Button
                  className="bg-sky-700 m-2"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Log in
                </Button>
                <Button
                  onClick={() => {
                    toast("Under development!");
                  }}
                >
                  Try Business for free
                </Button>
              </div>
            )}
          </div>
          {dropdown ? (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 15 15"
              >
                <path
                  fill="black"
                  d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
                />
              </svg>
            </div>
          ) : (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  fillRule="evenodd"
                  d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1M4 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm2 5h2v2H6zm5 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm-3 4H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1m-2 3H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {dropdown ? (
          <div className="flex justify-center">
            <div
              onClick={showDropdown}
              className="lg:hidden shadow-inner shadow-slate-400 rounded-xl w-96 h-[400px] fixed top-24 ease-in-out duration-100 transition-all  backdrop-blur-lg bg-slate-300"
            >
              <div className="w-full h-[320px] flex flex-col items-baseline pt-8 gap-4">
                <div className="text-center p-0 flex flex-col justify-center w-full gap-y-6">
                  {" "}
                  <p className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500 hover:scale-110 transition-all duration-200">
                    Product
                  </p>{" "}
                  <p className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500 hover:scale-110 transition-all duration-200">
                    Pricing
                  </p>{" "}
                  {userEmail ? (
                    <p
                      className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500 hover:scale-110 transition-all duration-200"
                      onClick={() => {
                        router.push("/user/passwords");
                      }}
                    >
                      Passwords
                    </p>
                  ) : (
                    <p className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500 hover:scale-110 transition-all duration-200">
                      Resources
                    </p>
                  )}
                  {userEmail ? (
                    <p
                      className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500 hover:scale-110 transition-all duration-200"
                      onClick={() => {
                        router.push("/user/profile");
                      }}
                    >
                      Profile
                    </p>
                  ) : (
                    <p className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500 hover:scale-110 transition-all duration-200">
                      Blog
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-y-8 mt-4">
                  {userEmail ? (
                    <div className="flex flex-col items-center mr-4 text-emerald-900 font-semibold font-mono">
                      <p className="mb-4">{userEmail}</p>
                      <Button
                        className="hover:scale-110 transition-all duration-200"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Button
                        className="bg-sky-700 m-2 hover:scale-110 transition-all duration-200"
                        onClick={() => {
                          router.push("/login");
                        }}
                      >
                        Log in
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
