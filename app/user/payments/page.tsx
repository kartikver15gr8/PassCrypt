"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react";

type Card = {
  id: number;
  cardholder: string;
  cardname: string;
  cardnumber: string;
  cvv: string;
  expiredate: string;
  user: {};
  userId: number;
};

export default function Payments() {
  const session = useSession();
  const router = useRouter();

  if (!session.data?.user?.email) {
    redirect("/login");
  }
  const [cards, setCards] = useState<Card[]>([]);

  const init = async () => {
    try {
      const allCards = await axios.get("/api/user/getcards");
      console.log(allCards.data);
      setCards(allCards.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col text-black">
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <Button
          onClick={() => {
            router.push("/user/payments/addcard");
          }}
        >
          add new
        </Button>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      </div>
      <div>
        {cards.map((elem, key) => {
          return (
            <div key={key}>
              <Cards
                cardname={elem.cardname}
                cardnumber={elem.cardnumber}
                cvv={elem.cvv}
                id={elem.id}
                expiredate={elem.expiredate}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// {
//   id: number;
//   cardholder: string;
//   cardname: string;
//   cardnumber: number;
//   cvv: number;
//   expiredate: Date;
//   user: {};
//   userId: number;
// };

export function Cards({
  id,
  cardname,
  cardnumber,
  cvv,
  expiredate,
}: {
  id: number;
  cardname: string;
  cardnumber: string;
  cvv: string;
  expiredate: string;
}) {
  const cardRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      const divContent = cardRef.current.textContent;
      navigator.clipboard
        .writeText(divContent)
        .then(() => {
          console.log("Content copied to clipboard");
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy content: ", err);
        });
    } else {
      console.error("Clipboard API not supported");
    }
  };

  return (
    <div className="flex m-1 p-2 border rounded items-center">
      <div id={id.toString()} className="m-1">
        <p className="text-lg hover:text-sky-800 font-semibold">{cardname}</p>
        <p className="text-sm">
          ********{cardnumber.substring(cardnumber.length - 4)}
        </p>
      </div>
      <div className="ml-5 flex items-center">
        <p ref={cardRef} className="p-2 mr-5">
          {cvv}
        </p>
        <Button
          className="hover:bg-sky-500 transition-all duration-500"
          onClick={handleCopy}
        >
          {copySuccess ? "Copied!" : "copy"}
        </Button>
      </div>
      {/* <p>{pasword}</p>
      <p>{note}</p> */}
    </div>
  );
}
