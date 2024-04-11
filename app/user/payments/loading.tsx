export default function Loading() {
  return (
    <div>
      <div className="text-2xl font-bold text-sky-900 flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <p
          className="inline-block animate-pulse"
          style={{
            animationDuration: "1s",
          }}
        >
          Loading Passwords...
        </p>
      </div>
      <ul className="px-2 mt-4 list-none">
        {[...Array(10).keys()].map((i) => (
          <li className="mx-1" key={i}>
            <div
              className="flex p-1 mt-1.5 animate-pulse w-full h-16 bg-slate-300 rounded-md border items-center"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1s",
              }}
            >
              <div
                className={` border w-16 h-10 mr-6 ml-2 bg flex justify-center items-center text-2xl  rounded-md  bg-slate-400`}
              ></div>
              <div className="m-1 w-[200px]">
                <p className="m-1 text-lg w-16 h-4 font-semibold border rounded-md  bg-slate-500"></p>
                <p className="m-1 text-lg w-24 h-4 font-semibold border rounded-md  bg-slate-500"></p>
              </div>
              <div className="ml-5 flex items-center w-[200px] justify-end">
                <p className="mr-5 text-lg w-8 h-4 border rounded-md border-slate-700 bg-slate-500"></p>
                <div className="mx-1 text-lg w-12 h-10 font-semibold border rounded-md border-slate-700 bg-slate-600"></div>
                <div className="mx-1 text-lg w-12 h-10 font-semibold border rounded-md border-slate-700 bg-slate-600"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
