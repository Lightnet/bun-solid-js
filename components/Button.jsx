

import { createSignal } from "solid-js"

export default function App(){

  const [count, setCount] = createSignal(0)

  function clickButton(){
    console.log("Hello World!")
  }

  function clickAdd(){
    console.log("Hello?")
    console.log(count())
    setCount(count()+1)
  }

  function clickSubtract(){
    console.log(count())
    setCount(count()-1)
  }

  return (<>
    <button onClick={clickButton}> Hello World! </button><br/>
    <button onClick={clickAdd}> + </button>
    <button onClick={clickSubtract}> - </button>
    <label>  COUNT: {count()} </label>
  </>)
}