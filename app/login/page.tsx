"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickHandler = async () => {
    const response = await axios.post("/api/signup", { email, password });
    console.log(response.data);
    router.push("/");
    return response.data;
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
          </div>
        </div>
      </div>
    </div>
  );
}
