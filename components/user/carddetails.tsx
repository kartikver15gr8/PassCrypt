"use client";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";

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
  }, []);

  const [showCreds, setshowCreds] = useState(false);

  const toggleCredsVisibility = () => {
    setshowCreds(true);
    setTimeout(() => {
      setshowCreds(false);
    }, 2000);
  };

  const handleCopy = () => {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      const divContent = { cvv };
      navigator.clipboard
        .writeText(divContent.cvv)
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
    <div className="flex items-centerflex m-1 p-2 border rounded items-center hover:bg-slate-300 transition-all duration-500">
      <div
        className={`text-white border w-16 h-10 mr-6 ml-2 bg flex justify-center items-center text-2xl  rounded-md bg-cover bg-center`}
        style={{
          backgroundImage: `url(${cardImg})`,
        }}
      ></div>
      <div id={id.toString()} className="m-1 w-[150px]">
        <p className="text-lg hover:text-sky-800 font-semibold">{cardname}</p>
        {showCreds ? (
          <p className="text-sm">{cardnumber}</p>
        ) : (
          <p className="text-sm">
            ********{cardnumber.substring(cardnumber.length - 4)}
          </p>
        )}
      </div>
      <div className="ml-5 flex items-center w-[250px] justify-end">
        {showCreds ? (
          <p ref={cardRef} className="p-2 mr-5">
            {cvv}
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
      {/* <p>{pasword}</p>
        <p>{note}</p> */}
      <Button className="transition-all hover:bg-slate-500 duration-500 ml-10">
        <p className="mr-1">edit</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
          />
        </svg>
      </Button>
    </div>
  );
}