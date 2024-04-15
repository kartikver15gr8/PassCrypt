"use client";
import Image from "next/image";
import bg2 from "@/public/bg2.png";
import bg1 from "@/public/bg1.png";
import bg3 from "@/public/bg3.png";
import { useEffect, useState } from "react";

export default function ImageBanner() {
  const [bannerImg, setBannerImg] = useState(bg1);
  const [index, setIndex] = useState(0);
  const images = [bg1, bg2, bg3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setBannerImg(images[index]);
  }, [index]);
  return (
    <div className="relative mb-20 w-[80%]  flex justify-center border-8 border-gray-800 border-solid rounded-xl shadow-xl shadow-slate-600 hover:scale-110 transform-all duration-200">
      <div className="">
        <Image className="rounded" src={bannerImg} alt="img" />
      </div>
      <div className="flex absolute bottom-0 rounded-lg justify-center text-center text-white  p-2">
        <button
          className="bg-black rounded-full m-1 w-4 h-4 justify-center items-center flex text-black hover:bg-slate-600 hover:text-slate-600 transform-all duration-150"
          onClick={() => {
            setBannerImg(bg1);
          }}
        >
          o
        </button>
        <button
          className="bg-black rounded-full m-1 w-4 h-4 justify-center items-center flex text-black hover:bg-slate-600 hover:text-slate-600 transform-all duration-150"
          onClick={() => {
            setBannerImg(bg2);
          }}
        >
          o
        </button>
        <button
          className="bg-black rounded-full m-1 w-4 h-4 justify-center items-center flex text-black hover:bg-slate-600 hover:text-slate-600 transform-all duration-150"
          onClick={() => {
            setBannerImg(bg3);
          }}
        >
          o
        </button>
      </div>
    </div>
  );
}
