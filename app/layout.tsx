import { Providers } from "./providers";
import opengraphPasscrypt from "@/public/opengraphPasscrypt.png";

import type { Metadata } from "next";
import { Inter, Roboto, Poppins, Kanit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site-config";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900", "300", "100"],
});
const kanit = Kanit({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
