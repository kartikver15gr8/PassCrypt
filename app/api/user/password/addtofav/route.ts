import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const { passwordId } = await req.json();
  const userEmail = session?.user?.email;

  if (userEmail) {
    try {
      const updatedPassword = await db.password.update({
        where: {
          id: passwordId,
        },
        data: {
          favorites: true,
        },
      });

      return Response.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      return Response.json(
        { error: "Failed to update password" },
        { status: 500 }
      );
    }
  }

  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
