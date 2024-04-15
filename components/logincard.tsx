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

export default function LoginCard() {
  const session = useSession();

  const userEmail = session?.data?.user?.email;

  useEffect(() => {
    if (userEmail) {
      console.log("sd");

      redirect("/");
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
    <div className="grid grid-cols-2  h-[100vh]">
      <div className="grid bg-[#F5F5F5] p-5 ">
        <div className="flex w-[80%] h-[20%]">
          <div className="flex items-center h-12 ml-9 mt-4 hover:scale-110 transition-all duration-200">
            <img
              className="w-12 h-12"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' viewBox='0 0 32 32'%3E%3Cpath fill='%2330469c' d='M31.907 3.921A47.937 47.937 0 0 0 2.255 3.12A2.957 2.957 0 0 0 .094 6.787c.532 2.135 1.308 4.588 2.24 6.812c.016.052.041.027.041-.025c-.135-1.043.667-2.36 2.24-2.839a36.71 36.71 0 0 1 23.188.307a2.188 2.188 0 0 0 2.796-1.416c.932-3 1.308-5.037 1.401-5.547c.016-.095-.068-.131-.093-.157zm-23.043 6.6c-1.145.239-2.728.615-3.916 1.009c-2.375.819-2.265 3.709-1 4.631c.093-.536.667-1.265 1.307-1.511c2.371-.932 4.917-1.489 7.491-1.719c-1.308-.531-2.584-1.292-3.865-2.411zm18.907 5.786a28.206 28.206 0 0 0-21.932-.869c-1.131.427-1.839 1.803-1.131 3.109a50.85 50.85 0 0 0 4.199 6.401c-.224-.776.172-2.213 1.692-2.683c4.204-1.292 8.615-.744 11.547.443c.828.333 2 .131 2.657-.853a53.047 53.047 0 0 0 3.052-5.36c.041-.083 0-.145-.084-.188m-6.812 10.36a13.164 13.164 0 0 1-3.333-2.401c-.453-.453-1.12-1.104-1.823-1.88c-1.605 0-3.163.161-4.829.693c-1.547.484-1.692 2.271-1.015 3.203c1.145 1.427 1.948 2.197 3.229 3.521a3.655 3.655 0 0 0 5.093.025c1-1 1.615-1.667 2.745-2.948c.067-.068.041-.187-.068-.213z'/%3E%3C/svg%3E"
              alt=""
            />
            <p className="text-blue-900 pl-2 text-3xl font-bold">PassCrypt</p>
          </div>
        </div>
        <div className="flex flex-col h-[40%] w-[60%] ml-9">
          <div className="text-6xl text-slate-700 mb-7">
            Welcome to PassCrypt on the web
          </div>
          <p className="text-slate-900 text-sm">
            Access your logins and personal data in the web app - quiclky and
            securely
          </p>
        </div>
      </div>

      <div className="flex flex-col bg-[#FFFFFF] p-5">
        <div className="flex items-center justify-end pr-8 mb-[10em]">
          <p className="text-black mx-4">New to PassCrypt?</p>
          <Button className="bg-sky-900">Create an account</Button>
        </div>
        <div className="flex justify-center  p-5">
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
                  className="bg-sky-900 m-1"
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
              <h1 className="text-black text-2xl pb-5">Log in to PassCrypt</h1>

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
                  className="bg-sky-900 m-1"
                  onClick={togglePasswordVisibility}
                >
                  view
                </Button>
              </div>

              <Button
                className="bg-sky-900 shadow-md shadow-sky-600"
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
