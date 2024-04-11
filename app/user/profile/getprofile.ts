import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import db from "@/db";

export const getUserDetails = async () => {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/");
  }
  if (session?.user?.email) {
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user) {
      return {
        id: user.id,
        name: user.name,
        profileimage: user.profileimage,
        email: user.email,
      };
    }
  }
  return { msg: "no user" };
};
