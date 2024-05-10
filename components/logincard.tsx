"use client";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { z } from "zod";
import { throttle } from "./user/throttle";
import passlogo from "@/public/passlogo.png";
import Image from "next/image";
import Link from "next/link";

export default function LoginCard() {
  const session = useSession();

  const userEmail = session?.data?.user?.email;

  useEffect(() => {
    if (userEmail) {
      console.log("sd");

      redirect("/user/passwords");
    }
  }, [userEmail]);

  const SignInTypes = z.object({
    email: z.string().email().min(10).max(50),
    password: z.string().min(10).max(50),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const [isLogging, setIsLogging] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 2000);
  };

  const onClickHandler = async () => {
    const isValidInputs = SignInTypes.safeParse({ email, password });

    if (isValidInputs.success) {
      setIsLogging(true);
      const res = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      });

      console.log(res?.ok);
      if (res?.ok) {
        console.log(res);
        setIsLogging(false);
        return res.ok;
      } else {
        console.log(`Error is: ${res?.error}`);
        setIsLogging(false);
        return res?.error;
      }
    } else if (!isValidInputs.success) {
      setInvalidInput(true);
      setIsLogging(false);
      return "Invalid input types";
    }
  };

  const throttledLogin = throttle(onClickHandler, 2000);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 h-[100vh]">
      <div className="grid bg-slate-200 p-5 ">
        <div className="flex w-[80%] h-[20%]">
          <div className="flex items-center h-12 ml-9 mt-4 hover:scale-110 transition-all duration-200">
            <Link href="/" className="flex items-center">
              <Image className="w-14 mx-1" src={passlogo} alt="logo"></Image>
              <p className="text-black pl-2 text-4xl font-bold">PassCrypt</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col h-[40%] w-[60%] ml-9">
          <div className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-slate-700 mb-7 ">
            Welcome to PassCrypt on the web
          </div>
          <p className="text-slate-900 text-sm">
            Access your logins and personal data in the web app - quickly and
            securely
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-col bg-[#FFFFFF] p-5">
        {/* <div className="flex items-center justify-end pr-8 mb-[10em]">
          <p className="text-black mx-4">New to PassCrypt?</p>
          <Button className="bg-sky-900">Create an account</Button>
        </div> */}
        <div className="flex justify-center p-5">
          {invalidInput ? (
            <div className="flex flex-col w-80 border-red-500">
              <h1 className="text-2xl text-red-600 pb-5">
                Invalid Credentials Type
              </h1>

              <input
                className="text-black p-3  border rounded shadow-md shadow-red-500 mb-2"
                type="text"
                placeholder="at least 10 characters."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div className="border rounded shadow-md mb-5 flex justify-between items-center">
                <input
                  className="text-black border-none p-3"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password."
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Button
                  className="bg-red-900 m-1"
                  onClick={togglePasswordVisibility}
                >
                  view
                </Button>
              </div>

              <Button
                className="bg-red-900 shadow-md shadow-red-600"
                onClick={throttledLogin}
                disabled={isLogging}
              >
                {isLogging ? "Logging in..." : "Log in"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col w-80">
              <h1 className="text-black text-2xl">Check-in to PassCrypt</h1>
              <p className="text-black text-sm pb-5">
                Register or Login using your credentials
              </p>

              <input
                className="text-black p-3 border rounded shadow-md mb-2"
                type="text"
                placeholder="Enter your email."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <div className="border rounded shadow-md mb-5 flex justify-between items-center">
                <input
                  className="text-black border-none p-3"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password."
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Button
                  className="bg-slate-900 m-1"
                  onClick={togglePasswordVisibility}
                >
                  view
                </Button>
              </div>

              <Button
                className="bg-slate-900 shadow-md shadow-slate-600"
                onClick={throttledLogin}
                disabled={isLogging}
              >
                {isLogging ? "Logging in..." : "Log in"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
