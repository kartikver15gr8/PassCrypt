import db from "@/db";

import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  if (user) {
    return Response.json({ user });
  }

  return Response.json({ session });
}
