"use client";

import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import axios from "axios";

export function CardDetails({
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
  const [cardImg, setCardImg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (cardname.toLowerCase() == "visa") {
      setCardImg(
        "https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg"
      );
    } else if (cardname.toLowerCase() == "mastercard") {
      setCardImg(
        "https://imgs.search.brave.com/cwWBQ_Jw7B4RgvUAHe-1A9I7o_6GGJo0VvT6q5HYuS4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbmti/b3RkZXNpZ24uY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIw/LzAyL01hc3RlcmNh/cmQtbG9nby4wLTEw/MjR4NjgzLmpwZw"
      );
    } else if (cardname.toLowerCase() == "american express") {
      setCardImg(
        "https://imgs.search.brave.com/oDAsF9pPnByiQsPj1PjwTMeyXq8eRKUf3dZFsI632dQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2M5LzEw/Lzk0L2M5MTA5NDRh/YzYyNDdlZDJkMGQ0/NzI3OTQ1M2M1OTU5/LmpwZw"
      );
    } else if (cardname.toLowerCase() == "discover") {
      setCardImg(
        "https://imgs.search.brave.com/fEjLdNJ1YHS5q7cPiWCO3WCtTf03_v6LBYBVk_FB58Y/rs:fit:860:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIwLzEx/L0Rpc2NvdmVyLUxv/Z28tNTAweDMxMy5q/cGc"
      );
    }
  }, [cardname]);

  const [showCreds, setshowCreds] = useState(false);

  const toggleCredsVisibility = () => {
    setshowCreds(true);
    setTimeout(() => {
      setshowCreds(false);
    }, 2000);
  };

  const handleCopy = () => {
    // Check if the Clipboard API is available
    const decryptedCVV = decrypt(cvv);
    if (navigator.clipboard) {
      const divContent = { decryptedCVV };
      navigator.clipboard
        .writeText(divContent.decryptedCVV)
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

  const toggleFav = async () => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/user/card/addtofav"
          : "https://www.passcrypt.pro/api/user/card/addtofav";
      const res = await axios.post(apiUrl, { cardId: id });
      return res.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="flex items-centerflex m-2 p-2 bg-white shadow-md rounded-lg items-center hover:bg-slate-300 transition-all duration-500">
      <div
        className={`text-white border w-16 h-10 mr-6 ml-2 bg flex justify-center items-center text-2xl  rounded-md bg-cover bg-center`}
        style={{
          backgroundImage: `url(${cardImg})`,
        }}
      ></div>
      <div id={id.toString()} className="m-1 w-[150px]">
        <p className="text-lg hover:text-sky-800 font-semibold">{cardname}</p>
        {showCreds ? (
          <p className="text-sm">{decryptCardNo(cardnumber)}</p>
        ) : (
          <p className="text-sm">
            ********
            {decryptCardNo(cardnumber).substring(
              decryptCardNo(cardnumber).length - 4
            )}
          </p>
        )}
      </div>
      <div className="ml-5 flex items-center w-[250px] justify-end">
        {showCreds ? (
          <p ref={cardRef} className="p-2 mr-5">
            {decrypt(cvv)}
          </p>
        ) : (
          <p ref={cardRef} className="p-2 mr-5">
            ***
          </p>
        )}

        <Button
          className="hover:bg-slate-500 transition-all duration-500"
          onClick={handleCopy}
        >
          {copySuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
            >
              <path
                fill="#12c471"
                fillRule="evenodd"
                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
            >
              <path
                fill="white"
                fillRule="evenodd"
                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
              />
            </svg>
          )}
        </Button>
        <Button
          className="bg-sky-900 hover:bg-sky-500 m-1"
          onClick={toggleCredsVisibility}
        >
          {showCreds ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#12c471"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M3 13c3.6-8 14.4-8 18 0" />
                <path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M3.26 11.602C3.942 8.327 6.793 6 10 6s6.057 2.327 6.74 5.602a.5.5 0 0 0 .98-.204C16.943 7.673 13.693 5 10 5s-6.943 2.673-7.72 6.398a.5.5 0 0 0 .98.204M10 8a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m-2.5 3.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0"
              />
            </svg>
          )}
        </Button>
      </div>
      <Button
        onClick={() => {
          console.log(id);
          // router.push(`https://pass-crypt.vercel.app/user/payments/${id}`);
          router.push(
            process.env.NODE_ENV === "development"
              ? `http://localhost:3000/user/payments/${id}`
              : `https://www.passcrypt.pro/user/payments/${id}`
          );
        }}
        className="transition-all hover:bg-slate-500 duration-500 ml-10"
      >
        <p className="mr-1">view</p>
      </Button>
      <Button className="ml-5" onClick={toggleFav}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 256 256"
        >
          <g fill="white">
            <path
              d="m229.06 108.79l-48.7 42l14.88 62.79a8.4 8.4 0 0 1-12.52 9.17L128 189.09l-54.72 33.65a8.4 8.4 0 0 1-12.52-9.17l14.88-62.79l-48.7-42A8.46 8.46 0 0 1 31.73 94l63.91-5.2l24.62-59.6a8.36 8.36 0 0 1 15.48 0l24.62 59.6l63.91 5.2a8.46 8.46 0 0 1 4.79 14.79"
              opacity="0.2"
            />
            <path d="M239.18 97.26A16.38 16.38 0 0 0 224.92 86l-59-4.76l-22.78-55.09a16.36 16.36 0 0 0-30.27 0L90.11 81.23L31.08 86a16.46 16.46 0 0 0-9.37 28.86l45 38.83L53 211.75a16.38 16.38 0 0 0 24.5 17.82l50.5-31.08l50.53 31.08A16.4 16.4 0 0 0 203 211.75l-13.76-58.07l45-38.83a16.43 16.43 0 0 0 4.94-17.59m-15.34 5.47l-48.7 42a8 8 0 0 0-2.56 7.91l14.88 62.8a.37.37 0 0 1-.17.48c-.18.14-.23.11-.38 0l-54.72-33.65a8 8 0 0 0-8.38 0l-54.72 33.67c-.15.09-.19.12-.38 0a.37.37 0 0 1-.17-.48l14.88-62.8a8 8 0 0 0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16a8 8 0 0 0 6.72-4.94l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153 91.86a8 8 0 0 0 6.75 4.92l63.92 5.16c.15 0 .24 0 .33.29s0 .4-.16.5" />
          </g>
        </svg>
      </Button>
    </div>
  );
}
