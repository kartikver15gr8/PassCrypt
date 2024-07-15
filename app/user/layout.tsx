import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import Sidebar from "./sidebar";

const inter = Inter({ subsets: ["latin"] });
const kanit = Kanit({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "PassCrypt",
  description: "Add Creds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="bg-slate-100 w-full">{children}</div>
      </div>
    </>
  );
}
