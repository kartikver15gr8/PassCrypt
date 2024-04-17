import db from "@/db";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import CryptoJS from "crypto-js";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const { cardname, cardholder, cvv, expiredate, cardnumber } =
    await req.json();

  const userEmail = session?.user?.email;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    // const cvv_secret = CVV_ENCRYPT_SEC || "S3CrET";
    const cvv_secret = process.env.NEXT_PUBLIC_CVV_ENCRYPT_SEC || "SECRET";
    const encryptedCVV = CryptoJS.AES.encrypt(cvv, cvv_secret).toString();

    // const account_secret = CARD_NO_SEC || "SecR3T";
    const account_secret = process.env.NEXT_PUBLIC_CARD_NO_SEC || "SECRET";
    const encryptedCardNo = CryptoJS.AES.encrypt(
      cardnumber,
      account_secret
    ).toString();

    if (user) {
      const newCard = await db.card.create({
        data: {
          cardname: cardname,
          cardholder: cardholder,
          cvv: encryptedCVV,
          expiredate: expiredate,
          cardnumber: encryptedCardNo,
          userId: user.id,
        },
      });
      if (newCard) {
        return Response.json({ message: "New Card Details Added" });
      }
    }
  }
}
