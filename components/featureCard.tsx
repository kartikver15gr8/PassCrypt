import Image from "next/image";

export default function FeatureCard({
  topText,
  svg,
  title,
  description,
}: {
  topText: string;
  svg: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border xl:w-80 lg:w-72  md:w-64 w-80 lg:h-[450px] md:h-[380px] xl:h-[500px] h-[400px] rounded-lg shadow-md mx-4 md:mx-2 lg:mx-2 sm:my-2 my-2 hover:scale-110  hover:shadow-xl transition-transform duration-300">
      <p className="m-1 p-2 sm:mb-3 xl:text-xl lg:text-lg md:text-sm">
        {topText}
      </p>
      <div className="flex flex-col items-center">
        <div className="w-40 xl:w-48 lg:w-48 md:w-32 md:mb-4">{svg}</div>
        <h1 className="text-xl font-bold px-4 p-1 xl:text-xl lg:text-lg md:text-base">
          {title}
        </h1>
        <p className="text-sm px-4 p-1 mt-1 xl:text-lg lg:text-md md:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
