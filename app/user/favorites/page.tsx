import { Button } from "@/components/ui/button";
import { FavPass } from "./favPass";
import { LoginDetails } from "@/components/user/logindetails";
import { FavCards } from "./favCards";
import { CardDetails } from "@/components/user/carddetails";
import { NoteDetails } from "@/components/user/notesdetails";
import { FavNotes } from "./favNotes";

export default async function Favorites() {
  let favorites = await FavPass();
  let favCards = await FavCards();
  let favNotes = await FavNotes();

  return (
    <div>
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <svg
          className="ml-4"
          xmlns="http://www.w3.org/2000/svg"
          width="2.5em"
          height="2.5em"
          viewBox="0 0 32 32"
        >
          <path
            fill="#31469C"
            d="M31.907 3.921A47.937 47.937 0 0 0 2.255 3.12A2.957 2.957 0 0 0 .094 6.787c.532 2.135 1.308 4.588 2.24 6.812c.016.052.041.027.041-.025c-.135-1.043.667-2.36 2.24-2.839a36.71 36.71 0 0 1 23.188.307a2.188 2.188 0 0 0 2.796-1.416c.932-3 1.308-5.037 1.401-5.547c.016-.095-.068-.131-.093-.157zm-23.043 6.6c-1.145.239-2.728.615-3.916 1.009c-2.375.819-2.265 3.709-1 4.631c.093-.536.667-1.265 1.307-1.511c2.371-.932 4.917-1.489 7.491-1.719c-1.308-.531-2.584-1.292-3.865-2.411zm18.907 5.786a28.206 28.206 0 0 0-21.932-.869c-1.131.427-1.839 1.803-1.131 3.109a50.85 50.85 0 0 0 4.199 6.401c-.224-.776.172-2.213 1.692-2.683c4.204-1.292 8.615-.744 11.547.443c.828.333 2 .131 2.657-.853a53.047 53.047 0 0 0 3.052-5.36c.041-.083 0-.145-.084-.188m-6.812 10.36a13.164 13.164 0 0 1-3.333-2.401c-.453-.453-1.12-1.104-1.823-1.88c-1.605 0-3.163.161-4.829.693c-1.547.484-1.692 2.271-1.015 3.203c1.145 1.427 1.948 2.197 3.229 3.521a3.655 3.655 0 0 0 5.093.025c1-1 1.615-1.667 2.745-2.948c.067-.068.041-.187-.068-.213z"
          />
        </svg>
        <Button className="mr-4">Logout</Button>
      </div>
      <div>Favorites</div>
      {favorites.map((e) => {
        return (
          <div className="text-black">
            <LoginDetails
              website={e.website}
              username={e.username}
              password={e.password}
              id={e.id}
            />
          </div>
        );
      })}
      <div>Cards</div>
      {favCards.map((elem, key) => {
        return (
          <div key={key}>
            <CardDetails
              cardname={elem.cardname}
              cardnumber={elem.cardnumber}
              cvv={elem.cvv}
              id={elem.id}
              expiredate={elem.expiredate}
            />
          </div>
        );
      })}
      <div>Secure Notes</div>
      {favNotes.map((elem, key) => {
        return (
          <div key={key}>
            <NoteDetails
              title={elem.title}
              description={elem.description}
              id={elem.id}
            />
          </div>
        );
      })}
    </div>
  );
}
