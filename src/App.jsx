import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  // thie is an array of object
  const [dice, setDice] = React.useState(allNewDice())


  function allNewDice() {
    let newDice = []
    for(let i=0;i<10;i++)
    {
      newDice.push(generateDice())
    }
    return newDice
  }

  function generateDice() {
    return {
      value: getRandomVal(),
      isHeld: false,
      id:nanoid()
    }
  }

  function getRandomVal() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function onHold(id) {
    // is held to false on this particular ID
    setDice((prevDice) => {
      return prevDice.map((die) => (
          die.id === id ? {...die, isHeld : !die.isHeld} : die
        ))
    })
  }

  const diceElement = dice.map((ele) =>  {
    return (
      <Die 
        key ={ele.id}
        value ={ele.value}
        isHeld={ele.isHeld}
        onSelectDie ={() => onHold(ele.id)}
      />
    )}
  )

  return (
    <div className="bg-slate-700 w-screen h-screen m-0 p-0">
      <div className="grid grid-cols-5 grid-rows-2 gap-2 bg-slate-50 mx-32 p-8 my-auto w-1/2">
        {diceElement}
        <button className="bg-blue-500 w-full h-full p-2 text-white text-lg rounded-lg hover:bg-blue-600">
          Roll
        </button>
      </div>
    </div>
  );
}

export default App;
