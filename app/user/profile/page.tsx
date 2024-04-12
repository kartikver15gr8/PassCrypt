import AppBar from "@/components/user/appbar";
import { getUserDetails } from "./getprofile";
import SignoutBtn from "@/components/user/signoutBtn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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

  return (
    <div className="flex flex-col text-black">
      <div className="flex p-2 px-8 items-center h-16 shadow-md flex-row justify-between">
        <p className="text-2xl font-bold">User Profile</p>
        <SignoutBtn />
      </div>

      <div className="text-black p-5 flex flex-col border w-full ">
        {data.profileimage ? (
          <img
            className="w-[200px] rounded-full flex"
            src={data.profileimage}
            alt="profile"
          />
        ) : (
          <img
            className="w-[200px] rounded-full flex"
            src="https://imgs.search.brave.com/5TAO179mq7HichdWUB1S5QQmmEIU5dVXyK0s3GhtHx8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q2L2Nk/L2YyL2Q2Y2RmMmE1/ZGFhZjk2NDYyMTI3/Y2MzMWZiNjIxODUx/LmpwZw"
            alt="profile"
          />
        )}
        <p className="flex text-2xl mt-10 font-bold">{data.name}</p>
        <p className="flex">{data.email}</p>
      </div>
    </div>
  );
}
