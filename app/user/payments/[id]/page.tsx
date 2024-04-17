"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function Edit({ params }: any) {
  const [cardholder, setCardholder] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [cardname, setCardname] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiredate, setExpiredate] = useState("");
  const [id, setId] = useState<Number>(params.id);

  const session = useSession();
  const router = useRouter();

  const decrypt = (cvv: string): string => {
    try {
      // const cvv_secret = CVV_ENCRYPT_SEC || "S3CrET";
      const cvv_secret = process.env.NEXT_PUBLIC_CVV_ENCRYPT_SEC || "SECRET";
      const decryptedBytes = CryptoJS.AES.decrypt(cvv, cvv_secret);
      const decryptedCVV = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return decryptedCVV;
    } catch (error) {
      return JSON.stringify(error);
    }
  };
  const decryptCardNo = (cardnumber: string): string => {
    try {
      // const account_secret = CARD_NO_SEC || "SecR3T";
      const account_secret = process.env.NEXT_PUBLIC_CARD_NO_SEC || "SECRET";
      const decryptedBytes = CryptoJS.AES.decrypt(cardnumber, account_secret);
      const decryptedNo = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return decryptedNo;
    } catch (error) {
      return JSON.stringify(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/user/card/getuniquecard?id=${id}`);
      const data = await res.json();
      if (data) {
        setCardholder(data.cardholder);
        setCardname(data.cardname);
        setCVV(data.cvv);
        setCardnumber(data.cardnumber);
        setExpiredate(data.expiredate);
        setId(data.id);
      }

      return data;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex text-black flex-col justify-center items-center p-5 h-100vh mt-16">
      <div className="w-[40%] bg-slate-300 shadow-xl shadow-slate-500 h-[550px] border rounded-xl flex flex-col items-center">
        <p className="text-3xl font-bold p-2 mt-5 mb-5 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 text-transparent inline-block bg-clip-text">
          Card Details
        </p>
        <input
          className="text-black border items-center rounded-lg w-[80%] p-4 mb-2 shadow-md"
          type="text"
          placeholder="Card Holder"
          value={cardholder}
          onChange={(e) => {
            setCardholder(e.target.value);
          }}
        />
        <div className="flex w-[80%]">
          <input
            className="text-black border rounded-lg w-[52%] mr-[1.5%] p-4 mb-2 shadow-md"
            type="text"
            placeholder="expiry (MM/YY)"
            value={expiredate}
            onChange={(e) => {
              setExpiredate(e.target.value);
            }}
          />
          <input
            className="text-black border rounded-lg w-[45%] ml-[1.5%] p-4 mb-2 shadow-md"
            type="text"
            placeholder="CVV"
            value={decrypt(cvv)}
            onChange={(e) => {
              setCVV(e.target.value);
            }}
          />
        </div>
        <input
          className="text-black border rounded-lg w-[80%] p-4 mb-2 shadow-md"
          type="text"
          placeholder="Card Name"
          value={cardname}
          onChange={(e) => {
            setCardname(e.target.value);
          }}
        />
        <input
          className="text-black border rounded-lg w-[80%] p-4 mb-2 shadow-md"
          type="text"
          placeholder="Card Number (XXXX XXXX XXXX)"
          value={decryptCardNo(cardnumber)}
          onChange={(e) => {
            setCardnumber(e.target.value);
          }}
        />
        <Button
          className="mt-5 w-36 h-12 rounded-lg shadow-md shadow-slate-400 hover:scale-110 transition-all duration-150"
          onClick={() => {
            router.push("/user/payments");
          }}
        >
          Check out
        </Button>
      </div>
    </div>
  );
}
