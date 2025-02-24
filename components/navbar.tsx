"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import passlogo from "@/public/icons/passlogo.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";

const iconVariants = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
};
const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const userEmail = session.data?.user?.email;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full h-16 flex flex-col justify-center items-center fixed z-20 bg-white md:backdrop-blur-lg md:bg-[rgba(0,0,0,0.1)] border-b">
      <div className="w-full lg:px-6">
        <div className="lg:w-full w-11/12 mx-auto relative flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="flex items-center md:ml-2 lg:ml-3 xl:ml-4  sm:ml-1 hover:scale-110 transform-all duration-100"
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
            </p>
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
          <div className="flex max-md:hidden gap-x-4">
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
          <div className="md:hidden w-fit flex ml-4">
            <motion.button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.svg
                className="w-7"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={iconVariants}
              >
                <path
                  d="M1 7H19M1 1H19M1 13H19"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
        {isOpen && (
          <div className="mt-1 rounded absolute top-16 w-full px-2">
            <motion.div
              className="z-50 relative w-full border border-gray-300 bg-gray-100 shadow-lg rounded"
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={wrapperVariants}
            >
              <div className="text-black font-medium  flex flex-col shadow-[inset_5px_2px_30px_rgba(0,0,0,0.1)]">
                <NavLink
                  href="/"
                  text="Product"
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                <NavLink
                  href="/#pricing"
                  text="Pricing"
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                <NavLink
                  href="/user/passwords"
                  text="Passwords"
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                <NavLink
                  href="/user/profile"
                  text="Profile"
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </nav>
  );
}

const NavLink = ({
  href,
  text,
  isOpen,
  setIsOpen,
}: {
  href: string;
  text: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <motion.div variants={itemVariants}>
    <Link
      href={href}
      className="h-16 flex items-center hover:bg-[#E0E0E0] transition-all duration-500 px-5 py-2 hover:rounded-md border-b border-[#E1E1E1]"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {text}
    </Link>
  </motion.div>
);
