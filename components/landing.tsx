import { Button } from "./ui/button";
import FeatureCard from "./featureCard";
import Enterprise from "./enterprise";
import bg from "@/public/bg.png";
import ImageBanner from "./imageBanner";
import Pricing from "./pricing";
import Reveal from "./reveal";
import Feature from "./feature";
import BlurFade from "./magicui/blur-fade";
export default async function Landing() {
  return (
    <div className="flex flex-col justify-center p-4 bg-white text-black pt-24 min-h-screen ">
      <div className="flex flex-col items-center mt-16 min-h-[20vh] sm:min-h-[30vh] md:min-h-[40vh] lg:min-h-[60vh] xl:text-8xl lg:text-7xl md:text-6xl text-5xl font-bold text-center ">
        <BlurFade delay={0.5}>
          <div className="flex">
            <span className="ml-3">A more</span>
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-300 text-transparent inline-block bg-clip-text ml-3">
              Humane
            </span>
          </div>
        </BlurFade>
        <BlurFade delay={0.75}>
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300 text-transparent inline-block bg-clip-text ">
            password Manager
          </span>
        </BlurFade>
        <BlurFade delay={1.0}>
          <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-300 text-transparent inline-block bg-clip-text">
            to serve more!
          </span>
        </BlurFade>

        <BlurFade delay={1.5} className=" mt-8 mb-24 flex justify-center ">
          <p className="xl:text-2xl lg:text-xl md:text-lg text-sm w-2/3 text-wrap text-center ">
            A new gen password manager that helps you secure your passwords,
            card details, Ids, secret notes and other credentials seamlessly.
          </p>
        </BlurFade>
      </div>
      <div className=" flex justify-center w-fit">
        <ImageBanner />
      </div>

      {/* <div className="flex justify-center my-10">
        <Enterprise />
      </div> */}

      <div className="m-10 flex justify-center">
        <h1 className="text-3xl">
          Everything you need out of a password manager
        </h1>
      </div>

      <Reveal>
        <Feature />
      </Reveal>
      <Reveal>
        <div id="pricing" className="flex justify-center my-10">
          <Pricing />
        </div>
      </Reveal>
    </div>
  );
}
