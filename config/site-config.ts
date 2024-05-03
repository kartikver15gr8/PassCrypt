import { Metadata } from "next";

const TITLE = "Passcrypt - Secure Password Manager and Digital Vault";
const DESCRIPTION = "A more humane password manager to serve more";

const PREVIEW_IMAGE_URL = "https://ibb.co/GFmgFZT";
const ALT_TITLE = "A more humane password manager to serve more";
const BASE_URL = "https://www.passcrypt.pro";

export const siteConfig: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  applicationName: "Passcrypt",
  creator: "Kartikey",
  twitter: {
    creator: "@KartikeyStack",
    title: TITLE,
    description: DESCRIPTION,
    card: "summary_large_image",
    images: [
      {
        url: PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: ALT_TITLE,
      },
    ],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "PassCrypt",
    url: BASE_URL,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: ALT_TITLE,
      },
    ],
  },
  category: "Technology",
  alternates: {
    canonical: BASE_URL,
  },
  keywords: [
    "Password manager",
    "Passcrypt",
    "Secure your credentials",
    "more humane password manager",
    "Kartikey Verma app",
    "A single place to keep your passwords safe",
    "Most secure password manager",
    "Free Vault",
  ],
  metadataBase: new URL(BASE_URL),
};
