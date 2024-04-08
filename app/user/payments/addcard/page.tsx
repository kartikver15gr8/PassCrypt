"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

export default function AddCard() {
  const [cardholder, setCardholder] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [cardname, setCardname] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiredate, setExpiredate] = useState("");

  const session = useSession();
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/createcard",
        {
          cardname: cardname,
          cardholder: cardholder,
          cvv: cvv,
          expiredate: expiredate,
          cardnumber: cardnumber,
        }
      );

      router.push("/user/payments");

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex text-black flex-col justify-center items-center p-5 h-100vh mt-16">
      <div className="w-[40%] shadow-md h-[550px] border rounded-xl flex flex-col items-center">
        <p className="text-xl flex flex-col p-2 mt-5 mb-5">Card Details</p>
        <input
          className="text-black border rounded w-[80%] p-1 mb-2 shadow-md"
          type="text"
          placeholder="Card Holder"
          onChange={(e) => {
            setCardholder(e.target.value);
          }}
        />
        <input
          className="text-black border rounded w-[80%] p-1 mb-2 shadow-md"
          type="text"
          placeholder="Card Name"
          onChange={(e) => {
            setCardname(e.target.value);
          }}
        />
        <input
          className="text-black border rounded w-[80%] p-1 mb-2 shadow-md"
          type="text"
          placeholder="CVV"
          onChange={(e) => {
            setCVV(e.target.value);
          }}
        />
        <input
          className="text-black border rounded w-[80%] p-1 mb-2 shadow-md"
          type="text"
          placeholder="Card Number"
          onChange={(e) => {
            setCardnumber(e.target.value);
          }}
        />
        <input
          className="text-black border rounded w-[80%] p-1 mb-2 shadow-md"
          type="text"
          placeholder="expire date"
          onChange={(e) => {
            setExpiredate(e.target.value);
          }}
        />

        <Button className="mt-5" onClick={handleOnClick}>
          add card
        </Button>
      </div>
    </div>
  );
}
