import { Button } from "./ui/button";

export default function PricingCard() {
  return (
    <div className="flex flex-col border w-[800px] rounded-lg">
      <div className="h-14 p-3 font-bold text-2xl bg-slate-200 rounded-t-lg">
        Personal Plans
      </div>
      <div className="flex w-[100%]">
        <div className="w-[50%] border flex-col p-6">
          <h1 className="text-3xl font-bold">Premium</h1>
          <p className="mb-10">Individual protection plus VPN</p>
          <h1 className="text-4xl font-bold my-4">$4.99</h1>
          <p className="font-bold">Per Month</p>
          <p className="font-bold">Billed Annually</p>
          <div className="flex flex-col my-10">
            <Button className="my-1 h-14">Purchase now</Button>
            <Button className="my-1 h-14 bg-slate-600">Try it free</Button>
          </div>
          <ul>
            <li className="my-1">Unlimited devices</li>
            <li className="my-1">Unlimited password</li>
            <li className="my-1">Secure sharing</li>
            <li className="my-1">Real-time phishing alerts</li>
            <li className="my-1">Passwordless login</li>
          </ul>
        </div>
        <div className="w-[50%] border flex-col p-6">
          <h1 className="text-3xl font-bold">Friends & Family</h1>
          <p className="mb-10">10 accounts 1 subscription</p>
          <h1 className="text-4xl font-bold my-4">$4.99</h1>
          <p className="font-bold">Per Month for 10 members billed annually</p>
          <p className="font-bold">Billed Annually</p>
          <div className="flex flex-col my-10">
            <Button className="my-1 h-14">Purchase now</Button>
          </div>
          <ul>
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
