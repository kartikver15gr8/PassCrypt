import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import db from "@/db";

export async function GetCards() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/login");
  }
  if (session.user.email) {
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user) {
      const cards = await db.card.findMany({
        where: {
          userId: user.id,
        },
      });
      if (cards) {
        return cards;
      }
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
      userId: "number",
    },
  ];
}
