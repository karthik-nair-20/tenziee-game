import React from "react";

export default function Die(props) {
  return (
    <div 
      className={props.isHeld ? "die-face isHeld" : "die-face"} 
      onClick={props.onSelectDie}
      style={{
        // backgroundImage: `url(${dieFace})`,/
        backgroundSize: "cover",
      }}
      >
      <h2 className="">{props.value}</h2>
    </div>
  )
}