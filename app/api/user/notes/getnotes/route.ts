import db from "@/db";
import { getServerSession } from "next-auth";

export async function GET() {
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
          userId: user.id,
        },
      });
      return Response.json(notes);
    }
  }
  return Response.json("Error");
}
