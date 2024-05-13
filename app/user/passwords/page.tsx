import { LoginDetails } from "@/components/user/logindetails";
import AppBar from "@/components/user/appbar";
import { getPassword } from "./getpassword";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

type UserPassword = {
  id: number;
  website: string;
  username: string;
  password: string;
  note: string;
  user: {};
  userId: number;
};

const bg1 = "sky-900";
const bg2 = "red-300";
const bg3 = "yellow-400";
const bg4 = "blue-300";
const bg5 = "slate-700";

export default async function Passwords() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const passwords = await getPassword();

  return (
    <div className="flex flex-col text-black">
      <AppBar redirectURI="/user/passwords/add" />
      <div>
        {passwords.length <= 0 && (
          <div className="font-bold flex justify-center items-center h-[80vh] p-5 text-5xl">
            Start adding your login info!
          </div>
        )}
        {passwords.map((elem, key) => {
          return (
            <div key={key}>
              <LoginDetails
                website={elem.website}
                username={elem.username}
                password={elem.password}
                id={elem.id}
                favorites={elem.favorites}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
