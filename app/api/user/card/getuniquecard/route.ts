import db from "@/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    if (user) {
      const card = await db.card.findUnique({
        where: { id: parseInt(id || "") },
      });

      if (card) {
        return Response.json(card);
      }
    }
  }

  return Response.json([
    {
      id: 1,
      cardholder: "johnDoe",
      cardname: "johndoe",
      cardnumber: "johndoe",
      cvv: "string",
      expiredate: "string",
      userId: 1,
    },
  ]);
}
