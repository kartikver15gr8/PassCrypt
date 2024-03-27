import { Button } from "./ui/button";
import fingerprintIcon from "@/public/fingerprint.png";

export default function Navbar() {
  return (
    <div className="flex p-1 bg-slate-300 shadow-md">
      <div className="flex items-center ">
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
        <p className="p-1 mx-2">Product</p>
        <p className="p-1 mx-2">Pricing</p>
        <p className="p-1 mx-2">Blogs</p>
        <p className="p-1 mx-2">Resource</p>
      </div>
      <div className="flex items-center ">
        <Button className="bg-sky-900 m-2">Log in</Button>
        <Button>Try Business for free</Button>
      </div>
    </div>
  );
}
