import { Button } from "./ui/button";

export default function PricingCard() {
  return (
    <div className="flex flex-col border w-[800px] md:w-[600px] lg:w-[800px] rounded-lg hover:scale-105 transition-all duration-200">
      <div className="h-14 p-3 font-bold text-2xl bg-slate-200 rounded-t-lg">
        Personal Plans
      </div>
      <div className="flex w-[100%] h-full">
        <div className="w-[50%] border flex-col p-6">
          <h1 className="text-3xl font-bold md:text-2xl sm:text-xl">Free</h1>
          <p className="mb-10 md:text-md sm:text-sm lg:text-lg sm:mb-2">
            Individual protection plus VPN
          </p>
          <h1 className="text-4xl font-bold my-4">$0</h1>
          <p className="font-bold">Per Month</p>
          <p className="font-bold">Billed Annually</p>
          <div className="flex flex-col my-10 sm:my-4">
            <Button className="my-1 h-14">Get started today</Button>
          </div>
          <ul className="sm:text-sm">
            <li className="my-1">Unlimited devices</li>
            <li className="my-1">Unlimited password</li>
            <li className="my-1">Secure sharing</li>
            <li className="my-1">Real-time phishing alerts</li>
            <li className="my-1">Passwordless login</li>
          </ul>
        </div>
        <div className="w-[50%] border flex-col p-6">
          <h1 className="text-3xl font-bold md:text-2xl sm:text-xl">
            Friends & Family
          </h1>
          <p className="mb-10 md:text-md sm:text-sm lg:text-lg sm:mb-2">
            10 accounts 1 subscription
          </p>
          <h1 className="text-4xl font-bold my-4 ">$4.99</h1>
          <p className="font-bold sm:text-sm">
            Per Month for 10 members billed annually
          </p>
          <p className="font-bold sm:text-sm">Billed Annually</p>
          <div className="flex flex-col my-10 sm:my-3 sm:text-sm sm:flex-row sm:justify-center">
            <Button className="my-1 h-14 flex sm:w-24 sm:mx-1 sm:text-[12px]">
              Purchase now
            </Button>

            <Button className="my-1 h-14 flex sm:w-24 sm:mx-1 bg-slate-600 sm:text-[12px]">
              Free 7 day trial
            </Button>
          </div>
          <ul className="sm:text-sm">
            <li className="my-1">Unlimited devices</li>
            <li className="my-1">Unlimited password</li>
            <li className="my-1">Secure sharing</li>
            <li className="my-1">Real-time phishing alerts</li>
            <li className="my-1">Passwordless login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
