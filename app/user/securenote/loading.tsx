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
          Loading Notes...
        </p>
      </div>
      <ul className="px-2 mt-4 list-none">
        {[...Array(10).keys()].map((i) => (
          <li className="mx-1" key={i}>
            <div
              className="flex p-1 mt-1.5 animate-pulse w-full h-20 bg-slate-300 rounded-md border items-center"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1s",
              }}
            >
              <div className="m-1 w-[200px]">
                <p className="m-1 text-lg w-36 h-4 font-semibold border rounded-md  bg-slate-500"></p>
                <p className="m-1 text-lg w-64 h-4 font-semibold border rounded-md  bg-slate-500"></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
