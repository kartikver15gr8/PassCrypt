import AppBar from "@/components/user/appbar";

export default async function User() {
  return (
    <div className="flex flex-col text-black">
      <AppBar redirectURI="https://pass-crypt.vercel.app/" />
    </div>
  );
}
