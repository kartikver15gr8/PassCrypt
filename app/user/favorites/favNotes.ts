import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import db from "@/db";

export async function FavNotes() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      const notes = await db.note.findMany({
        where: {
          favorites: true,
          userId: user.id,
        },
      });

      return notes;
    }
  }
  return [
    {
      id: 1,
      title: "string",
      description: "string",
      userId: "number",
      favorites: true,
      bin: true,
    },
  ];
}
