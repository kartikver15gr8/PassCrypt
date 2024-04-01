"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickHandler = async () => {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    console.log(res?.ok);
    if (res?.ok) {
      console.log(res);

      router.push("/");
      return res.ok;
    } else {
      console.log(`Error is: ${res?.error}`);

      return res?.error;
    }
  };

  const router = useRouter();
  return (
    <div className="grid grid-cols-2  h-[100vh]">
      <div className="grid bg-[#F5F5F5] p-5 ">
        <div className="flex w-[80%] h-[20%]">
          <div
            className="flex items-center h-12 ml-9 mt-4"
            onClick={() => {
              router.push("/");
            }}
          >
            <img
              className="w-12 h-12"
              src="https://www.svgrepo.com/show/490935/lock.svg"
              alt=""
            />
            <p className="text-black text-2xl">PassCrypt</p>
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
          <div className="flex flex-col w-80">
            <h1 className="text-black text-2xl pb-5">Log in to PassCrypt</h1>
            <input
              className="text-black p-3 border rounded shadow-sm mb-2"
              type="text"
              placeholder="Enter your email."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="text-black p-3 border rounded shadow-sm mb-5"
              type="password"
              placeholder="Enter your password."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button className="bg-sky-900" onClick={onClickHandler}>
              Log in
            </Button>
            <div className="flex mt-4 justify-center">
              <Button
                className="flex bg-slate-700 p-1 mr-1 w-[50%] rounded-md"
                onClick={async () => {
                  await signIn("github");
                }}
              >
                <img
                  className="mr-2"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E"
                  alt="GitHub"
                />
                GitHub
              </Button>
              <Button
                className="flex bg-slate-700 p-1 ml-1 w-[50%] rounded-md"
                onClick={async () => {
                  await signIn("google");
                }}
              >
                <img
                  className="mr-2"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'%3E%3Cpath fill='%23ffc107' d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917'/%3E%3Cpath fill='%23ff3d00' d='m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691'/%3E%3Cpath fill='%234caf50' d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44'/%3E%3Cpath fill='%231976d2' d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917'/%3E%3C/svg%3E"
                  alt="Google"
                />
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
