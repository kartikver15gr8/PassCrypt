import db from "@/db";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const { cardname, cardholder, cvv, expiredate, cardnumber } =
    await req.json();

  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    if (user) {
      const newCard = await db.card.create({
        data: {
          cardname: cardname,
          cardholder: cardholder,
          cvv: cvv,
          expiredate: expiredate,
          cardnumber: cardnumber,
          userId: user.id,
        },
      });
      if (newCard) {
        return Response.json({ message: "New Card Details Added" });
      }
    }
  }
}
