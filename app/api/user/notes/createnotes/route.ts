import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const { title, description } = await req.json();

  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      const note = await db.note.create({
        data: {
          title: title,
          description: description,
          userId: user.id,
        },
      });

      return Response.json(note);
    }
  }
  return Response.json("Error");
}
