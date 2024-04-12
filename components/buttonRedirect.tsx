"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ButtonRedirect({
  body,
  redirectURI,
  style,
}: {
  body: string;
  redirectURI: string;
  style: string;
}) {
  const router = useRouter();
  return (
    <Button
      className={style}
      onClick={() => {
        router.push(redirectURI);
      }}
    >
      {body}
    </Button>
  );
}
