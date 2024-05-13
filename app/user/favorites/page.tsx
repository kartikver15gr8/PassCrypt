import { Button } from "@/components/ui/button";
import { FavPass } from "./favPass";
import { LoginDetails } from "@/components/user/logindetails";
import { FavCards } from "./favCards";
import Image from "next/image";
import passlogo from "@/public/passlogo.png";
import { CardDetails } from "@/components/user/carddetails";
import { NoteDetails } from "@/components/user/notesdetails";
import { FavNotes } from "./favNotes";
import Link from "next/link";

export default async function Favorites() {
  let favorites = await FavPass();
  let favCards = await FavCards();
  let favNotes = await FavNotes();

  return (
    <div className="text-black">
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <Link href="/">
          <Image className="w-12 mx-2" src={passlogo} alt="logo"></Image>
        </Link>
        <Button className="mr-4">Logout</Button>
      </div>
      <div className="text-xl font-bold p-4">Favorites</div>
      {favorites.length <= 0 && (
        <div className="font-bold text-sky-950 flex items-center p-5 text-2xl">
          0
        </div>
      )}
      {favorites.map((e, key) => {
        return (
          <div key={key} className="text-black">
            <LoginDetails
              website={e.website}
              username={e.username}
              password={e.password}
              id={e.id}
              favorites={e.favorites}
            />
          </div>
        );
      })}
      <div className="text-xl font-bold p-4">Cards</div>
      {favCards.length <= 0 && (
        <div className="font-bold text-sky-950 flex items-center p-5 text-2xl">
          0
        </div>
      )}
      {favCards.map((elem, key) => {
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
      <div className="text-xl font-bold p-4">Secure Notes</div>
      {favNotes.length <= 0 && (
        <div className="font-bold text-sky-950 flex items-center p-5 text-2xl">
          0
        </div>
      )}
      {favNotes.map((elem, key) => {
        return (
          <div key={key}>
            <NoteDetails
              title={elem.title}
              description={elem.description}
              id={elem.id}
              favorites={elem.favorites}
            />
          </div>
        );
      })}
    </div>
  );
}
