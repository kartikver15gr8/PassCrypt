import db from "@/db";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import CryptoJS from "crypto-js";
import { PASS_ENCRYPT_SEC } from "@/secrets";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const { website, username, password, note } = await req.json();

  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    const SECRET = PASS_ENCRYPT_SEC || "SeCR3T";

    const encryptedPass = CryptoJS.AES.encrypt(password, SECRET).toString();

    if (user) {
      const newPass = await db.password.create({
        data: {
          website: website,
          username: username,
          password: encryptedPass,
          note: note,
          userId: user.id,
        },
      });
      if (newPass) {
        return Response.json({ message: "New Password created" });
      }
    }
  }
}
