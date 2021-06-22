import {useState} from "react";


export function Button() {
  let [counter, setCounter] = useState(0);

  function increment() {
    setCounter(++counter);
  }

  return (
    <button onClick={increment}>
      {counter}
    </button>
  )
}
