"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Btn({
  redirectURI,
  body,
}: {
  redirectURI: string;
  body: string;
}) {
  const router = useRouter();
  return (
    <Button
      className="shadow-md shadow-slate-400 w-32"
      onClick={() => {
        router.push(redirectURI);
      }}
    >
      {body}
    </Button>
  );
}
