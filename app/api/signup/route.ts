import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const token = jwt.sign({ email, role: "user" }, "SeCR3T", {
    expiresIn: "1h",
  });
  console.log(token);
  return Response.json({
    email: email,
    password: password,
    token: token,
  });
}
