import React, { useState } from "react";
import { Stage, Layer, Circle, Rect } from "react-konva";
import Konva from "konva";
export default function CreateSquare() {
  const [square, setSquare] = useState([]);
  const handelCreateSquare = (e) => {
    setSquare((prevSquare) => [
      ...prevSquare,
      {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: Konva.Util.getRandomColor(),
      },
    ]);
  };
  return (
    <div>
      <button onClick={handelCreateSquare}> create square</button>
      <Stage>
        <Layer>
          {square.map((eachSquare) => (
            <Rect
              width={50}
              height={50}
              x={eachSquare.x}
              y={eachSquare.y}
              fill={eachSquare.color}
              draggable
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
