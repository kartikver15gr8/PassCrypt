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
    <div className="text-black p-5 shadow-lg rounded-md flex flex-col border items-center w-[300px] h-[500px]">
      {data.profileimage ? (
        <img
          className="w-[100px] rounded-full flex"
          src={data.profileimage}
          alt="profile"
        />
      ) : (
        <img
          className="w-[100px] rounded-full flex"
          src="https://imgs.search.brave.com/5TAO179mq7HichdWUB1S5QQmmEIU5dVXyK0s3GhtHx8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q2L2Nk/L2YyL2Q2Y2RmMmE1/ZGFhZjk2NDYyMTI3/Y2MzMWZiNjIxODUx/LmpwZw"
        />
      )}
      <p className="flex text-xl mt-5 font-bold">{data.name}</p>
      <p className="flex">{data.email}</p>
      <SignoutBtn />
    </div>
  );
}
