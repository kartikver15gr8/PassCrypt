"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

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
      <div className="container mx-auto lg:px-6">
        <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="flex items-center ml-4 hover:scale-110 transform-all duration-100"
              >
                {" "}
                <img
                  className="w-10 mx-2"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' viewBox='0 0 32 32'%3E%3Cpath fill='%2330469c' d='M31.907 3.921A47.937 47.937 0 0 0 2.255 3.12A2.957 2.957 0 0 0 .094 6.787c.532 2.135 1.308 4.588 2.24 6.812c.016.052.041.027.041-.025c-.135-1.043.667-2.36 2.24-2.839a36.71 36.71 0 0 1 23.188.307a2.188 2.188 0 0 0 2.796-1.416c.932-3 1.308-5.037 1.401-5.547c.016-.095-.068-.131-.093-.157zm-23.043 6.6c-1.145.239-2.728.615-3.916 1.009c-2.375.819-2.265 3.709-1 4.631c.093-.536.667-1.265 1.307-1.511c2.371-.932 4.917-1.489 7.491-1.719c-1.308-.531-2.584-1.292-3.865-2.411zm18.907 5.786a28.206 28.206 0 0 0-21.932-.869c-1.131.427-1.839 1.803-1.131 3.109a50.85 50.85 0 0 0 4.199 6.401c-.224-.776.172-2.213 1.692-2.683c4.204-1.292 8.615-.744 11.547.443c.828.333 2 .131 2.657-.853a53.047 53.047 0 0 0 3.052-5.36c.041-.083 0-.145-.084-.188m-6.812 10.36a13.164 13.164 0 0 1-3.333-2.401c-.453-.453-1.12-1.104-1.823-1.88c-1.605 0-3.163.161-4.829.693c-1.547.484-1.692 2.271-1.015 3.203c1.145 1.427 1.948 2.197 3.229 3.521a3.655 3.655 0 0 0 5.093.025c1-1 1.615-1.667 2.745-2.948c.067-.068.041-.187-.068-.213z'/%3E%3C/svg%3E"
                  alt="icon"
                />
                <h1 className="font-bold font-sans pl-2 text-2xl text-blue-900 ">
                  PASSCRYPT
                </h1>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center xl:gap-12 gap-x-4 max-lg:hidden">
            {" "}
            <p className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100">
              Product
            </p>{" "}
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
              <p className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100">
                Resources
              </p>
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
              <p className="leading-normal text-black font-bold text-lg hover:cursor-pointer hover:text-slate-600 hover:scale-110 transform-all duration-100">
                Blog
              </p>
            )}
          </div>
          <div className="flex max-lg:hidden gap-x-4">
            {userEmail ? (
              <div className="flex items-center mr-4 text-emerald-900 font-semibold font-mono">
                <p className="mr-2">{userEmail}</p>
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
                <Button>Try Business for free</Button>
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
          <div
            onClick={showDropdown}
            className="lg:hidden rounded-xl w-96 h-[400px] fixed top-24 ease-in-out duration-100 transition-all  backdrop-blur-lg bg-[rgba(0,0,0,0.2)]"
          >
            <div className="w-full h-[320px] flex flex-col items-baseline pt-8 gap-4">
              <div className="text-center p-0 flex flex-col justify-center w-full gap-y-6">
                {" "}
                <p className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500">
                  Product
                </p>{" "}
                <p className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500">
                  Pricing
                </p>{" "}
                {userEmail ? (
                  <p
                    className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500"
                    onClick={() => {
                      router.push("/user/passwords");
                    }}
                  >
                    Passwords
                  </p>
                ) : (
                  <p className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500">
                    Resources
                  </p>
                )}
                {userEmail ? (
                  <p
                    className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500"
                    onClick={() => {
                      router.push("/user/profile");
                    }}
                  >
                    Profile
                  </p>
                ) : (
                  <p className="leading-normal text-black font-bold text-xl hover:cursor-pointer hover:text-blue-500">
                    Blog
                  </p>
                )}
              </div>
              <div className="flex flex-col justify-center items-center w-full gap-y-8 mt-4">
                {userEmail ? (
                  <div className="flex flex-col items-center mr-4 text-emerald-900 font-semibold font-mono">
                    <p className="mb-4">{userEmail}</p>
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
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
