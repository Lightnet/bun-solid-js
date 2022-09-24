
import html from "solid-js/html";
import {
    createSignal,
    onCleanup
} from "solid-js";

export default function App(){
    const [count, setCount] = createSignal(0),
      timer = setInterval(() => setCount(count() + 1), 1000);
      onCleanup(() => clearInterval(timer));
  return (html`<div>Count: ${count}</div>`);
}