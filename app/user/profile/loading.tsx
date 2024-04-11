export default function Loading() {
  return (
    <div>
      <div className="text-2xl font-bold text-sky-900 flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <p
          className="inline-block ml-5 animate-pulse"
          style={{
            animationDuration: "1s",
          }}
        >
          Loading Profile...
        </p>
        <div
          className="w-20 h-10 animate-pulse rounded-md bg-black mr-6"
          style={{
            animationDuration: "1s",
          }}
        ></div>
      </div>

      <div
        className="flex animate-pulse flex-col m-2 w-[300px] h-[500px] bg-slate-400 rounded-md"
        style={{
          animationDuration: "1s",
        }}
      >
        <div className="text-black p-5 flex flex-col rounded-md m-2 w-full ">
          <div className="w-[200px] h-[200px] rounded-full flex bg-slate-600 mb-10"></div>
          <p className="mt-1 text-lg w-36 h-5 font-semibold  rounded-md  bg-slate-500"></p>
          <p className="mt-1 text-lg w-48 h-5 font-semibold  rounded-md  bg-slate-500"></p>
        </div>
      </div>
    </div>
  );
}
