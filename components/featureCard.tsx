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
    <div className="border w-80 h-[450px] rounded-lg shadow-md mx-4 hover:scale-110  hover:shadow-xl transition-transform duration-300">
      <p className="m-1 p-2">{topText}</p>
      <div className="flex flex-col items-center">
        <div className="w-48">{svg}</div>
        <h1 className="text-xl font-bold px-4 p-1">{title}</h1>
        <p className="text-md px-4 p-1 mt-1">{description}</p>
      </div>
    </div>
  );
}
