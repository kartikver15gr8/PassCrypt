import { Button } from "./ui/button";
import fingerprintIcon from "@/public/fingerprint.png";

export default function Navbar() {
  return (
    <div className="flex p-1 bg-slate-300 shadow-md justify-between">
      <div className="flex items-center ml-10">
        <img
          className="w-10 mx-2"
          src="https://www.svgrepo.com/show/490935/lock.svg"
          alt="icon"
        />
        <h1 className="font-bold font-sans text-xl text-emerald-950">
          PASSCRYPT
        </h1>
      </div>
      <div className="flex ml-4 mr-4 items-center">
        <p className="p-1 mx-2 text-slate-800">Product</p>
        <p className="p-1 mx-2 text-slate-800">Pricing</p>
        <p className="p-1 mx-2 text-slate-800">Blogs</p>
        <p className="p-1 mx-2 text-slate-800">Resource</p>
      </div>
      <div className="flex items-center mr-5">
        <Button className="bg-sky-700 m-2">Log in</Button>
        <Button>Try Business for free</Button>
      </div>
    </div>
  );
}
