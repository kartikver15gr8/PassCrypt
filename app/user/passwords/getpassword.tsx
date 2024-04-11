import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import db from "@/db";

export const getPassword = async () => {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session?.user?.email) {
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user) {
      const passwords = await db.password.findMany({
        where: {
          userId: user.id,
        },
      });
      if (passwords) {
        return passwords;
      }
    }
  }
  return [
    {
      id: 1,
      website: "string",
      username: "string",
      password: "string",
      note: "string",
      user: {},
      userId: 1,
    },
  ];
};
