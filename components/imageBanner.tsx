"use client";
import Image from "next/image";
import bg2 from "@/public/bg2.png";
import bg1 from "@/public/bg1.png";
import bg3 from "@/public/bg3.png";
import { useEffect, useState, useMemo } from "react";

export default function ImageBanner() {
  const [bannerImg, setBannerImg] = useState(bg1);
  const [index, setIndex] = useState(0);
  // const images = [bg1, bg2, bg3];
  const images = useMemo(() => [bg1, bg2, bg3], []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  useEffect(() => {
    setBannerImg(images[index]);
  }, [index, images]);
  return (
    <div className="relative w-[100%] sm:w-[90%] lg:w-[85%] xl:w-[80%]  flex justify-center border-4 md:border-8 border-gray-800 border-solid rounded-xl shadow-xl shadow-slate-600 hover:scale-105 transform-all duration-200">
      <div className="">
        <Image className="rounded-lg md:rounded-sm" src={bannerImg} alt="img" />
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
