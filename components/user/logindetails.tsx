"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import SVGIcon from "@/lib/SVGIconsComp";
import { RAW_ICONS } from "@/lib/icons";

const icons = RAW_ICONS;

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
        "https://imgs.search.brave.com/nKd3NFbMdj8R87z1rQjwbeGkkfHxaNJhSGoBC4IWSso/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZW5q/aS5jby93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8wNy9YLWxv/Z28tdHdpdHRlci0x/MDI0eDU3NC5qcGc"
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
    toast("Your password is visible!");
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 2000);
  };

  const handleCopy = () => {
    // Check if the Clipboard API is available
    toast("Copied!");
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
      toast("Added to favorites");
      return res.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="flex gap-x-4 p-2 h-[70px]  bg-white shadow-md rounded-[5px] items-center ">
      {webImg ? (
        <Image
          className="w-20 h-14 border rounded-md"
          src={webImg}
          alt=""
          width={200}
          height={200}
        />
      ) : (
        <Image
          className="w-20 h-14 border rounded"
          src="https://imgs.search.brave.com/J2ISWKi_kjMTt725LlMdGU7MhoBV3o-G-eEOZQfrIKw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcy/MTY5NTUxL3Bob3Rv/L2tleS10by1zdWNj/ZXNzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz04VEFLNl8t/YXpLem5MRUJEVmJL/enBFTy1aTGpRWmZm/S1prdm1mS2NFTXE4/PQ"
          alt=""
          width={200}
          height={200}
        />
      )}
      <div className="flex  justify-between  w-full mx-2">
        <div id={id.toString()} className="flex flex-col gap-x-4 ">
          <a className="" href={website} target="_blank">
            {website.split("//")[1] || website}
          </a>
          <p className="">{username}</p>
        </div>
        <div className="flex items-center">
          <p
            ref={passRef}
            className="p-2 mr-5 sm:text-sm text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          >
            {showPassword ? decrypt(password) : `********`}
          </p>

          <div className="grid grid-cols-3  gap-x-2 col-span-1 items-center">
            <ActionBtn
              action="VIEW"
              onClickHandler={togglePasswordVisibility}
              password={password}
              icon={icons.Eye}
            />
            <ActionBtn
              action="COPY"
              onClickHandler={handleCopy}
              password={password}
              icon={icons.Copy}
            />
            <ActionBtn
              action="ADD_TO_FAV"
              onClickHandler={toggleFav}
              password={password}
              icon={icons.Star}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const ActionBtn = ({
  icon,
  toastPrompt,
  password,
  action,
  onClickHandler,
}: {
  icon: string;
  toastPrompt?: string;

  password: string;
  action: "COPY" | "ADD_TO_FAV" | "VIEW";
  onClickHandler: () => void;
}) => {
  return (
    <>
      {action == "COPY" && (
        <button
          onClick={onClickHandler}
          className="flex h-10 w-10 justify-center items-center rounded-full hover:bg-[#eeeeef] transition-all duration-300"
        >
          <SVGIcon className="flex w-5" svgString={icon} />
        </button>
      )}
      {action == "ADD_TO_FAV" && (
        <button
          onClick={onClickHandler}
          className="flex h-10 w-10 justify-center items-center rounded-full hover:bg-[#eeeeef] transition-all duration-300"
        >
          <SVGIcon className="flex w-5" svgString={icon} />
        </button>
      )}
      {action == "VIEW" && (
        <button
          onClick={onClickHandler}
          className="flex h-10 w-10 justify-center items-center rounded-full hover:bg-[#eeeeef] transition-all duration-300"
        >
          <SVGIcon className="flex w-5" svgString={icon} />
        </button>
      )}
    </>
  );
};
