import React from "react";

export default function Die(props) {
  return (
      <div className= {`flex justify-center items-center border-4 bg-white w-9 p-3 m-2 shadow-[0px_2px_2px_rgba(0,0,0,0.15)] cursor-pointer rounded-lg ${props.isHeld ? 'bg-green-500' : 'bg-white' }`} onClick={props.onSelectDie}>
        <h2 className="text-2xl">{props.value}</h2>
      </div>
  ) 
}