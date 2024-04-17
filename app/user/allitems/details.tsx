import { GetItem } from "./getItem";
import Btn from "./btn";

type Passwords = {
  id: number;
  website: string;
  username: string;
  password: string;
  note: string | null;
  userId: number;
};

type Cards = {
  id: 1;
  cardholder: "";
  cardname: "";
  cardnumber: "";
  cvv: "";
  expiredate: "";
  userId: 1;
};

type SecureNotes = {
  id: 1;
  title: "";
  description: "";
  userId: 1;
};

export default async function Details() {
  let userData = await GetItem();

  let passLength = userData[0];
  let cardLength = userData[1];
  let notesLength = userData[2];

  return (
    <div className="text-black flex p-4 justify-center items-center min-h-[80vh]">
      <div className="w-64 h-96 flex-col border m-4 rounded-xl items-center flex p-4 shadow-lg  hover:bg-slate-300 transition-all duration-300 hover:shadow-2xl bg-white hover:scale-110">
        <p className="text-2xl font-bold bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 text-transparent inline-block bg-clip-text">
          Passwords
        </p>
        <p className="text-9xl mt-4 font-bold bg-gradient-to-r from-sky-900 via-sky-600 to-sky-400 text-transparent inline-block bg-clip-text">
          {passLength}
        </p>
        <div className="mt-14">
          <Btn redirectURI="/user/passwords" body="Password" />
        </div>
      </div>
      <div className="w-64 h-96 flex-col border m-4 rounded-xl items-center flex p-4 shadow-lg  hover:bg-slate-300 transition-all duration-300 hover:shadow-2xl bg-white hover:scale-110">
        <p className="text-2xl font-bold bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 text-transparent inline-block bg-clip-text">
          Cards
        </p>
        <p className="text-9xl mt-4 font-bold bg-gradient-to-r from-orange-900 via-orange-600 to-orange-400 text-transparent inline-block bg-clip-text">
          {cardLength}
        </p>
        <div className="mt-14">
          <Btn redirectURI="/user/payments" body="Cards" />
        </div>
      </div>
      <div className="w-64 h-96 flex-col border m-4 rounded-xl items-center flex p-4 shadow-lg  hover:bg-slate-300 transition-all duration-300 hover:shadow-2xl bg-white hover:scale-110">
        <p className="text-2xl font-bold bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 text-transparent inline-block bg-clip-text">
          Personal Notes
        </p>
        <p className="text-9xl mt-4 font-bold bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 text-transparent inline-block bg-clip-text">
          {notesLength}
        </p>
        <div className="mt-14">
          <Btn redirectURI="/user/securenote" body="Notes" />
        </div>
      </div>
    </div>
  );
}
