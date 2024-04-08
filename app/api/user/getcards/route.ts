import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/db";

export async function GET(req: NextRequest) {
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
          userId: user.id,
        },
      });
      if (cards) {
        return Response.json(cards);
      }
    }
    return Response.json({
      message: "No cards associated with this account, create one!",
    });
  }
  return Response.json("");
}
