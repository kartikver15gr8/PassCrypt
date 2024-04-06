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
      const passwords = await db.password.findMany({
        where: {
          userId: user.id,
        },
      });
      if (passwords) {
        return Response.json(passwords);
      }
    }
  }
  return Response.json({ message: "passwords" });
}
