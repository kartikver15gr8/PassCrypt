import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import db from "@/db";

export async function GetItem() {
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
          userId: user.id,
        },
      });
      const cards = await db.card.findMany({
        where: {
          userId: user.id,
        },
      });
      const securenotes = await db.note.findMany({
        where: {
          userId: user.id,
        },
      });

      return [passwords.length, cards.length, securenotes.length];
    }
  }
  return [0, 0, 0];
}
