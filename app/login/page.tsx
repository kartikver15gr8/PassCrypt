import LoginCard from "@/components/logincard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  return <LoginCard />;
}
