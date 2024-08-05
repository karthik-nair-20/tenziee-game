import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
// import Confetti from 'react-confetti'
import Scorecard from "./components/Scorecard";
import Footer from "./components/Footer";

function App() {
  // dice is an array of object
  const [dice, setDice] = React.useState(allNewDice());
  const [tenziee, setTenziee] = React.useState(false);
  const [roll, setRoll] = React.useState(0);

  const [bestRoll, setBestRoll] = React.useState(
    JSON.parse(localStorage.getItem("bestRoll")) || 0
  );

  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("bestTime")) || 0
  );

  // effects START
  React.useEffect(() => {
    if (gameOverCheck(dice)) {
      setTenziee(true);
      console.log("you won mf");
      console.log(tenziee)
      setStart(false);
      setRecord()
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
    if(!tenziee)
    {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld ? die : { ...die, value: getRandomVal() };
        });
      });
      updateRoll()
    }
    else {
      resetGame()
    }
  }

  function gameOverCheck(dice) {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value;
    const checkSameValue = dice.every((die) => die.value === firstValue)

    return allHeld && checkSameValue;
  }

  function updateRoll() {
    setRoll(prevRoll => ++prevRoll)
  }
  // -----------------Best Time and Roll----------------------------------

  function setRecord() {
    if (!bestRoll || roll < bestRoll) {
      setBestRoll(roll)
    }
    // divide by 10 for precision
    const timeFloored = Math.floor(timer / 10)
    if (!bestTime || timeFloored < bestTime) {
      setBestTime(timeFloored)
    }
  }

  // save value of Best roll and best Time everytime they change
  React.useEffect(()=> {
    localStorage.setItem("bestRoll", JSON.stringify(bestRoll))
  },[bestRoll])

  React.useEffect(()=>{
    localStorage.setItem("bestTime", JSON.stringify(bestTime))
  },[bestTime])

  function resetGame() {
    setTenziee(false)
    setRoll(0)
    setDice(allNewDice())
    setStart(true)
    setTimer(0)
  }

  // ---------------------TIMER--------------------------------------------
  const [timer, setTimer] = React.useState(0)
  const [start, setStart] = React.useState(true) //To start and stop game

  React.useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 20)
      }, 20)
    }
    else {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [start])


  function formatTime(time) {
    // gives me the latest value of timer which is increase by 20 every 20 milisecond.
    const getMinutes = `${Math.floor((time / 60000) % 60)}`.slice(-2);
    const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const getMilliseconds = `00${(time % 1000)}`.slice(-3);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`
  }


  return (
    <div className="app-container shadow-shorter">
      {/* {tenziee && <Confetti /> } */}
      <div className="main">
        <h1 className="title">Tenzies</h1>
        {!tenziee && (
          <p className="instructions">
            Roll until all dice are the same.
            <br /> Click each die to freeze it at its current value between
            rolls.
          </p>
        )}
        {tenziee && <p className="winner gradient-text"> YOU WON!</p>}
        <div className="stats-container">
          <p>{roll}</p>
          <p>{formatTime(timer)}</p>
        </div>
        <div className="dice-container">
          {diceElement}
        </div>
        <button className="roll-dice" onClick={onDiceRoll}> {tenziee ? "New game" : "Roll"}</button>
        <Scorecard bestRoll= {bestRoll} bestTime= {bestTime} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
