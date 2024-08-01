import React from "react";
import "./App.css";
import Die from "./components/Die";

function App() {

  const [array, setArray] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const dieElement = array.map((index, value) => (
    <Die key={index} index={index} value={value} />
  ));

  // i want the values of array to change
  function handleClick() {
    const newArray = [...array]
    for(let i=newArray.length - 1; i>0;i--) {
      const j = Math.floor(Math.random() * (i+1))
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setArray(newArray)
    console.log(setArray)
  }

  return (
    <div className="bg-slate-700 w-screen h-screen m-0 p-0">
      <div className="grid grid-cols-5 grid-rows-2 gap-2 bg-slate-50 mx-32 p-8 my-auto w-1/2">
        {dieElement}
        <button className="bg-blue-500 w-full h-full p-2 text-white text-lg rounded-lg hover:bg-blue-600"
          onClick={handleClick}
        >
          Roll
        </button>
      </div>
    </div>
  );
}

export default App;
