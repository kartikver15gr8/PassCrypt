import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const { cardId } = await req.json();
  const userEmail = session?.user?.email;

  if (userEmail) {
    try {
      const updatedCard = await db.card.update({
        where: {
          id: cardId,
        },
        data: {
          favorites: true,
        },
      });

      return Response.json({ message: "Card updated successfully" });
    } catch (error) {
      console.error("Error updating card:", error);
      return Response.json({ error: "Failed to update card" }, { status: 500 });
    }
  }

  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
