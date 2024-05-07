"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { throttle } from "@/components/user/throttle";
import { z } from "zod";

const CardTypes = z.object({
  cardholder: z.string().min(1).max(100),
  cardname: z.string().min(1).max(50),
  cvv: z.string().min(3).max(3),
  expiredate: z.string().min(1).max(50),
  cardnumber: z.string().min(12).max(12),
});

export default function AddCard() {
  const [cardholder, setCardholder] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [cardname, setCardname] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiredate, setExpiredate] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const session = useSession();
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      setIsAdding(true);

      const isValid = CardTypes.safeParse({
        cardname,
        cardholder,
        cvv,
        expiredate,
        cardnumber,
      });

      if (isValid.success) {
        const apiUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/user/card/createcard"
            : "https://www.passcrypt.pro/api/user/card/createcard";
        const res = await axios.post(apiUrl, {
          cardname: cardname,
          cardholder: cardholder,
          cvv: cvv,
          expiredate: expiredate,
          cardnumber: cardnumber,
        });
        setInvalid(false);
        router.push("/user/payments");

        return res.data;
      } else {
        setInvalid(true);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const throttledAdd = throttle(handleOnClick, 2000);

  return (
    <div className="flex text-black flex-col justify-center items-center p-5 h-100vh mt-16">
      <div className="w-[40%] bg-slate-300 shadow-xl shadow-slate-500 h-[550px] border rounded-xl flex flex-col items-center">
        <p className="text-3xl font-bold p-2 mt-5 mb-5 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 text-transparent inline-block bg-clip-text">
          Card Details
        </p>
        {invalid ? (
          <div className="flex flex-col items-center">
            <input
              className="text-black border-2 border-red-500 shadow-red-600 items-center rounded-lg w-[80%] p-4 mb-2 shadow-md"
              type="text"
              placeholder="Cardholder name required"
              onChange={(e) => {
                setCardholder(e.target.value);
              }}
            />
            <div className="flex w-[80%]">
              <input
                className="text-black border-2 border-red-500 shadow-red-600 rounded-lg w-[52%] mr-[1.5%] p-4 mb-2 shadow-md"
                type="text"
                placeholder="Expiry (MM/YY) Required"
                onChange={(e) => {
                  setExpiredate(e.target.value);
                }}
              />
              <input
                className="text-black border-2 border-red-500 shadow-red-600 rounded-lg w-[45%] ml-[1.5%] p-4 mb-2 shadow-md"
                type="text"
                placeholder="CVV required"
                onChange={(e) => {
                  setCVV(e.target.value);
                }}
              />
            </div>
            <input
              className="text-black border-2 border-red-500 shadow-red-600 rounded-lg w-[80%] p-4 mb-2 shadow-md"
              type="text"
              placeholder="Enter valid card name"
              onChange={(e) => {
                setCardname(e.target.value);
              }}
            />
            <input
              className="text-black border-2 border-red-500 shadow-red-600 rounded-lg w-[80%] p-4 mb-2 shadow-md"
              type="text"
              placeholder="Enter valid 12 digit card number"
              onChange={(e) => {
                setCardnumber(e.target.value);
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <input
              className="text-black border items-center rounded-lg w-[80%] p-4 mb-2 shadow-md"
              type="text"
              placeholder="Card Holder"
              onChange={(e) => {
                setCardholder(e.target.value);
              }}
            />
            <div className="flex w-[80%]">
              <input
                className="text-black border rounded-lg w-[52%] mr-[1.5%] p-4 mb-2 shadow-md"
                type="text"
                placeholder="expiry (MM/YY)"
                onChange={(e) => {
                  setExpiredate(e.target.value);
                }}
              />
              <input
                className="text-black border rounded-lg w-[45%] ml-[1.5%] p-4 mb-2 shadow-md"
                type="text"
                placeholder="CVV"
                onChange={(e) => {
                  setCVV(e.target.value);
                }}
              />
            </div>
            <input
              className="text-black border rounded-lg w-[80%] p-4 mb-2 shadow-md"
              type="text"
              placeholder="Card Name"
              onChange={(e) => {
                setCardname(e.target.value);
              }}
            />
            <input
              className="text-black border rounded-lg w-[80%] p-4 mb-2 shadow-md"
              type="text"
              placeholder="Card Number (XXXX XXXX XXXX)"
              onChange={(e) => {
                setCardnumber(e.target.value);
              }}
            />
          </div>
        )}
        <Button
          className="mt-5 w-36 h-12 rounded-lg shadow-md shadow-slate-400 hover:scale-110 transition-all duration-150"
          onClick={throttledAdd}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add Card"}
        </Button>
      </div>
    </div>
  );
}
