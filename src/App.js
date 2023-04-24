import { useLayoutEffect } from "react";
import "./App.css";

function App() {
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
  });
  return (
    <canvas id="canvas" width={window.innerWidth} height={window.innerHeight}>
      Canvas
    </canvas>
  );
}

export default App;
