import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import "./App.css";

const generator = rough.generator();

const createElement = (x1, y1, x2, y2) => {
  const roughElement = generator.line(x1, y1, x2, y2);
  return { x1, y1, x2, y2, roughElement };
};

function App() {
  const [drawing, setDrawing] = useState(false);
  const [elements, setElements] = useState([]);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => {
      roughCanvas.draw(roughElement);
    });
  }, [elements]);

  const handleMouseDown = (event) => {
    setDrawing(true);

    const { clientX, clientY } = event;

    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prevState) => [...prevState, element]);
  };
  const handleMouseMove = (event) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };
  const handleMouseUp = (event) => {
    setDrawing(false);
  };

  return (
    <canvas
      id="canvas"
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      Canvas
    </canvas>
  );
}

export default App;
