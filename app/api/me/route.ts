import db from "@/db";

import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (user) {
      return Response.json({ user });
    }
  }
  return Response.json({ session });
}
