import { Suspense } from "react";
import ServerComponent from "./ServerComponent";
import ClientComponent from "./ClientComponent";

export default function App() {
  console.log("Rendering app server component");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>notes app</h1>
      <ServerComponent />
      <ClientComponent />
    </Suspense>
  );
}
