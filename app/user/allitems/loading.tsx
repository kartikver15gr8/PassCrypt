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
          Loading All Items...
        </p>
      </div>
      <ul className="px-2 flex list-none w-full h-[90vh]  items-center justify-center">
        {[...Array(3).keys()].map((i) => (
          <li className="mx-4" key={i}>
            <div
              className="flex flex-col mt-1.5 animate-pulse w-64 h-96 rounded-xl bg-slate-300  border items-center"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1s",
              }}
            >
              <p className="w-[70%] h-6 animate-pulse bg-slate-500 rounded-md mt-6"></p>
              <p className="h-28 w-28 animate-pulse bg-slate-500 rounded-full mt-10"></p>
              <p className="w-[60%] h-10 animate-pulse bg-slate-500 rounded-md mt-16"></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
