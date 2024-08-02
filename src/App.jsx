import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ConfettiExplosion from 'react-confetti-explosion';

function App() {
  // thie is an array of object
  const [dice, setDice] = React.useState(allNewDice());
  const [tenziee, setTenziee] = React.useState(false);

  // effects START
    React.useEffect(() => {
      if(gameOverCheck(dice))
      {
        setTenziee(true);
        console.log("you won mf");
        console.log(tenziee)
      }
    },[dice])

  // effects END

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }
    return newDice;
  }

  function generateDice() {
    return {
      value: getRandomVal(),
      isHeld: false,
      id: nanoid(),
    };
  }

  function getRandomVal() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function onHold(id) {
    // is held to false on this particular ID
    setDice((prevDice) => {
      return prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
    });
  }

  const diceElement = dice.map((ele) => {
    return (
      <Die
        key={ele.id}
        value={ele.value}
        isHeld={ele.isHeld}
        onSelectDie={() => onHold(ele.id)}
      />
    );
  });

  function onDiceRoll() {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.isHeld ? die : { ...die, value: getRandomVal() };
      });
    });
  }

  function gameOverCheck(dice) {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value;
    const checkSameValue = dice.every((die) => die.value === firstValue)

    return allHeld && checkSameValue;
  }

  return (
    <div className="bg-slate-700 w-screen h-screen m-0 p-0">
      {tenziee && <ConfettiExplosion /> }
      <div className=" bg-slate-50 mx-32 p-8 my-auto w-1/2">
      <h1 className="">Tenzies</h1>
      {!tenziee && (
          <p className="instructions">
            Roll until all dice are the same.
            <br /> Click each die to freeze it at its current value between
            rolls.
          </p>
        )}
        {tenziee && <p className="winner gradient-text"> YOU WON!</p>}
        <div className="grid grid-cols-5 grid-rows-2 gap-">
          {diceElement}
          <button
            className="bg-blue-500 w-full h-full p-2 text-white text-lg rounded-lg hover:bg-blue-600"
            onClick={onDiceRoll}
          >
            {tenziee ? "New game" : "Roll"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
