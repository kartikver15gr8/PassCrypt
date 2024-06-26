import { redirect } from "next/navigation";
import { CardDetails } from "@/components/user/carddetails";
import { getServerSession } from "next-auth";
import AppBar from "@/components/user/appbar";
import { GetCards } from "./getcards";

export default async function Payments() {
  const session = await getServerSession();
  const cards = await GetCards();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col text-black">
      <AppBar redirectURI="payments/addcard" />
      <div>
        {cards.length <= 0 && (
          <div className="font-bold flex justify-center items-center h-[80vh] p-5 text-5xl">
            Start adding your card details!
          </div>
        )}
        {cards.map((elem, key) => {
          return (
            <div key={key}>
              <CardDetails
                cardname={elem.cardname}
                cardnumber={elem.cardnumber}
                cvv={elem.cvv}
                id={elem.id}
                expiredate={elem.expiredate}
                favorites={elem.favorites}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
