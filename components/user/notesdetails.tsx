"use client";

export function NoteDetails({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="items-centerflex m-1 p-2 border rounded items-center hover:bg-slate-300 transition-all duration-500">
      <div>
        <p className="text-xl">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
