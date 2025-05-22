"use client";

import { useState } from "react";

export default function ClientComponent() {
  console.log("Rendering client component");
  const [counter, setCounter] = useState(0);

  return (
    <fieldset>
      <legend>client component</legend>
      <p>counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
    </fieldset>
  );
}
