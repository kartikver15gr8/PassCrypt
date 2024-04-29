import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import db from "@/db";

export async function FavCards() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      const cards = await db.card.findMany({
        where: {
          favorites: true,
        },
      });

      return cards;
    }
  }
  return [
    {
      id: 1,
      cardholder: "string",
      cardname: "string",
      cardnumber: "string",
      cvv: "string",
      expiredate: "string",
      userId: 1,
      favorites: false,
      bin: false,
    },
  ];
}
