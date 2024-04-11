import { getServerSession } from "next-auth";
import db from "@/db";

export default async function GetNotes() {
  const session = await getServerSession();
  if (session?.user?.email) {
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user) {
      const notes = await db.note.findMany({
        where: {
          userId: user.id,
        },
      });
      if (notes) {
        return notes;
      }
    }
  }
  return [
    {
      id: 1,
      title: "string",
      description: "string",
      userId: 2,
    },
  ];
}
