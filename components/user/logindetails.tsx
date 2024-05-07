"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import CryptoJS from "crypto-js";
import axios from "axios";

export function LoginDetails({
  website,
  username,
  password,
  id,
  favorites,
}: {
  website: string;
  username: string;
  password: string;
  id: number;
  favorites: boolean;
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
    } else if (website.indexOf("linkedin.com") > -1) {
      setWebImg(
        "https://blog.waalaxy.com/wp-content/uploads/2021/01/logo-linkedin-actuel.jpg.webp"
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
      const secret = process.env.NEXT_PUBLIC_PASS_ENCRYPT_SEC || "SeCR3T";
      const decryptedBytes = CryptoJS.AES.decrypt(password, secret);
      const decryptedPass = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return decryptedPass;
    } catch (error) {
      return JSON.stringify(error);
    }
  };

  const toggleFav = async () => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/user/password/addtofav"
          : "https://www.passcrypt.pro/api/user/password/addtofav";
      const res = await axios.post(apiUrl, { passwordId: id });
      return res.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="flex m-2 p-2  bg-white shadow-md rounded-lg items-center hover:bg-slate-300 transition-all duration-500">
      {webImg ? (
        <div
          className={`text-white border  mr-2 sm:mr-4 md:mr-6 lg:mr-6  xl:mr-6 ml-2 bg flex justify-center items-center text-2xl  rounded-md bg-cover bg-center  w-10 h-10 sm:w-12 md:w-16 `}
          style={{
            backgroundImage: `url(${webImg})`,
          }}
        ></div>
      ) : (
        <div
          className={`text-white border w-10 h-10 sm:w-12 md:w-16 mr-2 sm:mr-4 md:mr-6 lg:mr-6  xl:mr-6 ml-2 bg flex justify-center items-center text-2xl  rounded-md bg-cover bg-center`}
          style={{
            backgroundImage: `url(https://imgs.search.brave.com/J2ISWKi_kjMTt725LlMdGU7MhoBV3o-G-eEOZQfrIKw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcy/MTY5NTUxL3Bob3Rv/L2tleS10by1zdWNj/ZXNzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz04VEFLNl8t/YXpLem5MRUJEVmJL/enBFTy1aTGpRWmZm/S1prdm1mS2NFTXE4/PQ)`,
          }}
        ></div>
      )}

      <div id={id.toString()} className="m-1 w-[300px]">
        <a
          className=" hover:text-sky-800 sm:text-sm text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-semibold "
          href={website}
          target="_blank"
        >
          {website.split("//")[1] || website}
        </a>
        <p className="sm:text-sm text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
          {username}
        </p>
      </div>
      <div className="ml-5 flex items-center w-[200px] justify-right">
        {showPassword ? (
          <p
            ref={passRef}
            className="p-2 mr-5 sm:text-sm text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          >
            {decrypt(password)}
          </p>
        ) : (
          <p
            ref={passRef}
            className="p-2 mr-5 sm:text-sm text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          >
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
        {favorites ? (
          <Button className="ml-5" onClick={toggleFav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 48 48"
            >
              <defs>
                <mask id="ipTStar0">
                  <path
                    fill="#555"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m23.999 5l-6.113 12.478L4 19.49l10.059 9.834L11.654 43L24 36.42L36.345 43L33.96 29.325L44 19.491l-13.809-2.013z"
                  />
                </mask>
              </defs>
              <path fill="yellow" d="M0 0h48v48H0z" mask="url(#ipTStar0)" />
            </svg>
          </Button>
        ) : (
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
        )}
      </div>
    </div>
  );
}
