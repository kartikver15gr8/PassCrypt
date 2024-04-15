"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import CryptoJS from "crypto-js";
import { PASS_ENCRYPT_SEC } from "@/secrets";

export function LoginDetails({
  website,
  username,
  password,
  id,
}: {
  website: string;
  username: string;
  password: string;
  id: number;
}) {
  const passRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [webImg, setWebImg] = useState("");

  useEffect(() => {
    if (website.indexOf("google.com") > -1) {
      setWebImg(
        "https://cdn.mos.cms.futurecdn.net/rjqJEKv6P9Yjy9d3KMGvp8-1200-80.jpg.webp"
      );
    } else if (website.indexOf("vercel.com") > -1) {
      setWebImg(
        "https://imgs.search.brave.com/p55hIbChvXMjbs6tDNbYRPz5AFF1dGqmwlvqUlecWyk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL3ZlcmNl/bDE4NjguanBn"
      );
    } else if (website.indexOf("stripe.com") > -1) {
      setWebImg(
        "https://imgs.search.brave.com/mKQrJcJ78rpcLWcnweT0K7IK4DIBX7yeUgq3vWLyoaU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL3N0cmlw/ZTE0NjEuanBn"
      );
    } else if (website.indexOf("facebook.com") > -1) {
      setWebImg(
        "https://imgs.search.brave.com/4Q66bgjShg3SWohmNCJbTbr6QGsc3ppU3XCiJ4vDKQ4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZGVzaWduYm9v/bS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDkvZmFj/ZWJvb2stbmV3LWxv/Z28tY2hhbmdlLWRl/c2lnbmJvb20tMDIu/anBn"
      );
    } else if (
      website.indexOf("x.com") > -1 ||
      website.indexOf("twitter.com") > -1
    ) {
      setWebImg(
        "https://imgs.search.brave.com/2me7CdPyquP0PBwlEUE2B1NisolIyb3HlbRTEdKM8Yw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nYWRn/ZXRtYXRlcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDcveC1jb20tbG9n/by5wbmc"
      );
    } else if (website.indexOf("youtube.com") > -1) {
      setWebImg(
        "https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg.webp"
      );
    } else if (website.indexOf("instagram.com") > -1) {
      setWebImg(
        "https://i.guim.co.uk/img/media/22e32c1b1de40ed7103e2e2e8995b742ac600bd6/70_0_717_430/master/717.jpg?width=620&dpr=2&s=none"
      );
    } else if (website.indexOf("github.com") > -1) {
      setWebImg(
        "https://imgs.search.brave.com/KXL45Ky6mn4L5JZiL_5V069ITX6UnIz6ZTlN8LGDJfI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9HaXRIdWIv/R2l0SHViLUljb24t/V2hpdGUtRGFyay1C/YWNrZ3JvdW5kLUxv/Z28ud2luZS5zdmc.svg"
      );
    }
  }, [website]);
  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 2000);
  };

  const handleCopy = () => {
    // Check if the Clipboard API is available
    const decryptPs = decrypt(password);
    if (navigator.clipboard) {
      const divContent = { decryptPs };
      navigator.clipboard
        .writeText(divContent.decryptPs)
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

  const decrypt = (password: string): string => {
    try {
      const secret = PASS_ENCRYPT_SEC || "SeCR3T";
      const decryptedBytes = CryptoJS.AES.decrypt(password, secret);
      const decryptedPass = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return decryptedPass;
    } catch (error) {
      return JSON.stringify(error);
    }
  };

  return (
    <div className="flex m-2 p-2 bg-white shadow-md rounded-lg items-center hover:bg-slate-300 transition-all duration-500">
      {webImg ? (
        <div
          className={`text-white border w-16 h-10 mr-6 ml-2 bg flex justify-center items-center text-2xl  rounded-md bg-cover bg-center`}
          style={{
            backgroundImage: `url(${webImg})`,
          }}
        ></div>
      ) : (
        <div
          className={`text-white border w-16 h-10 mr-6 ml-2 bg flex justify-center items-center text-2xl  rounded-md bg-cover bg-center`}
          style={{
            backgroundImage: `url(https://imgs.search.brave.com/J2ISWKi_kjMTt725LlMdGU7MhoBV3o-G-eEOZQfrIKw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcy/MTY5NTUxL3Bob3Rv/L2tleS10by1zdWNj/ZXNzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz04VEFLNl8t/YXpLem5MRUJEVmJL/enBFTy1aTGpRWmZm/S1prdm1mS2NFTXE4/PQ)`,
          }}
        ></div>
      )}

      <div id={id.toString()} className="m-1 w-[300px]">
        <a
          className="text-lg hover:text-sky-800 font-semibold"
          href={website}
          target="_blank"
        >
          {website.split("//")[1]}
        </a>
        <p className="text-sm">{username}</p>
      </div>
      <div className="ml-5 flex items-center w-[200px] justify-end">
        {showPassword ? (
          <p ref={passRef} className="p-2 mr-5">
            {decrypt(password)}
          </p>
        ) : (
          <p ref={passRef} className="p-2 mr-5">
            ******
          </p>
        )}
        <Button
          className="transition-all hover:bg-slate-500 duration-500 mr-1"
          onClick={handleCopy}
        >
          {copySuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="none"
                stroke="#18ec62"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m2.75 8.75l3.5 3.5l7-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
              />
            </svg>
          )}
        </Button>
        <Button
          className="bg-sky-900 hover:bg-sky-500 m-1"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
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
