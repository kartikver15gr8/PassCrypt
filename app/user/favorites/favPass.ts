import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import db from "@/db";

export async function FavPass() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      const passwords = await db.password.findMany({
        where: {
          favorites: true,
          userId: user.id,
        },
      });

      return passwords;
    }
  }
  return [
    {
      id: 1,
      website: "string",
      username: "string",
      password: "string",
      note: "null",
      userId: 1,
      favorites: "boolean",
      bin: "boolean",
    },
  ];
}
