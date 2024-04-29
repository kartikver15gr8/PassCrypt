import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const { noteId } = await req.json();
  const userEmail = session?.user?.email;

  if (userEmail) {
    try {
      const updatedNote = await db.note.update({
        where: {
          id: noteId,
        },
        data: {
          favorites: true,
        },
      });

      return Response.json({ message: "Note updated successfully" });
    } catch (error) {
      console.error("Error updating Note:", error);
      return Response.json({ error: "Failed to update Note" }, { status: 500 });
    }
  }

  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
