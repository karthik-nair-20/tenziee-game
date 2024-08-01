import React from "react";

export default function Die({value}) {
  return (
      <div className="flex justify-center items-center border-6 bg-white w-9 p-3 m-2 shadow-[0px_2px_2px_rgba(0,0,0,0.15)] cursor-pointer rounded-lg">
        <h2 className="text-2xl">{value}</h2>
      </div>
  )
}