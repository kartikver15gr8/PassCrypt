import { Button } from "./ui/button";
export default async function Landing() {
  return (
    <div className="flex p-4 bg-sky-900  ">
      <div className="w-[50%] p-9">
        <h1 className="mb-4 md:mb-6 text-4xl md:text-5xl lg:text-6xl font-medium text-blue-8">
          The security-first password manager
        </h1>
        <p className="text-gray-300 text-sm">
          PassCrypt Password Manager is always private and secure. Our
          zero-knowledge patented encryption means not even we can see your
          passwords and passkeys.
        </p>
        <div className="flex mt-5 ">
          <Button className="mr-4 bg-sky-700 ">Get PassCrypt</Button>
          <Button className="text-slate-900 bg-[#D1E8EC] hover:text-slate-300 transition-colors duration-300">
            Contact Business Sales
          </Button>
        </div>
        <p className="text-slate-300 text-[10px] mt-4">
          No credit card required
        </p>
      </div>
      <div className="flex w-[50%] justify-center ">
        <img
          className="h-[80%]"
          src="https://www.dashlane.com/_next/image?url=https%3A%2F%2Fripleyprd.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fhome-hero%403x.png&w=3840&q=75"
          alt=""
        />
      </div>
    </div>
  );
}
