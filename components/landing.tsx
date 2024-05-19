import { Button } from "./ui/button";
import FeatureCard from "./featureCard";
import Enterprise from "./enterprise";
import bg from "@/public/bg.png";
import ImageBanner from "./imageBanner";
import Pricing from "./pricing";
import Reveal from "./reveal";
import Feature from "./feature";
export default async function Landing() {
  return (
    <div className="flex flex-col justify-center p-4 bg-white text-black pt-24 min-h-screen ">
      <Reveal>
        <div className="flex flex-col items-center mt-16 min-h-[60vh] ">
          <h1 className="xl:text-8xl lg:text-7xl md:text-6xl text-5xl font-bold text-center">
            A more{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-300 text-transparent inline-block bg-clip-text">
              Humane
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300 text-transparent inline-block bg-clip-text ">
              password Manager
            </span>
            <br />{" "}
            <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-300 text-transparent inline-block bg-clip-text">
              to serve more!
            </span>
          </h1>
          <p className="xl:text-2xl lg:text-xl md:text-lg text-sm w-2/3 text-wrap text-center my-8 mb-32">
            {/* PassCrypt lets you store your private creds seamlessely. Only you
            know your passwords and passkeys. */}
            A new gen password manager that helps you secure your passwords,
            card details, Ids, secret notes and other credentials seamlessly.
          </p>
          <ImageBanner />
        </div>
      </Reveal>

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
