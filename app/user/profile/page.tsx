import AppBar from "@/components/user/appbar";
import { getUserDetails } from "./getprofile";
import SignoutBtn from "@/components/user/signoutBtn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
// type UserType = {
//   id: number;
//   name: string;
//   profileimage: string;
//   email: string;
//   password: string;
// };

export default async function Profile() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/login");
  }

  let data = await getUserDetails();

  // <div className="w-64 h-96 flex-col border m-4 rounded-xl items-center flex p-4 shadow-lg  hover:bg-slate-300 transition-all duration-300 hover:shadow-2xl bg-white hover:scale-110">
  //       <p className="text-2xl font-bold bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 text-transparent inline-block bg-clip-text">
  //         Personal Notes
  //       </p>
  //       <p className="text-9xl mt-4 font-bold bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 text-transparent inline-block bg-clip-text">
  //         {notesLength}
  //       </p>
  //       <div className="mt-14">
  //         <Btn redirectURI="/user/securenote" body="Notes" />
  //       </div>
  //     </div>

  return (
    <div className="flex flex-col text-black ">
      <div className="flex p-2 px-8 items-center h-16 shadow-md flex-row justify-between">
        <p className="text-2xl font-bold">User Profile</p>
        <SignoutBtn />
      </div>

      <div className="text-black p-5 flex flex-col border w-full items-center min-h-[80vh] justify-center  ">
        <div className="border text-white bg-white hover:bg-slate-200 h-96 p-4 w-72 flex shadow-xl shadow-slate-400 rounded-xl flex-col items-center hover:scale-110 transition-all duration-200 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-300 text-transparent ">
          {data.profileimage ? (
            <Image
              className="w-[200px] rounded-full flex"
              src={data.profileimage}
              alt="profile"
              width={500}
              height={500}
            />
          ) : (
            <Image
              className="w-[200px] rounded-full flex"
              src="https://imgs.search.brave.com/5TAO179mq7HichdWUB1S5QQmmEIU5dVXyK0s3GhtHx8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q2L2Nk/L2YyL2Q2Y2RmMmE1/ZGFhZjk2NDYyMTI3/Y2MzMWZiNjIxODUx/LmpwZw"
              alt="profile"
              width={500}
              height={500}
            />
          )}
          <p className="flex text-2xl mt-10 font-bold ">{data.name}</p>
          <p className="flex ">{data.email}</p>
        </div>
      </div>
    </div>
  );
}
