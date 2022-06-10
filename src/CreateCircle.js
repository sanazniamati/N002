import React, { useState, useRef } from "react";
import { Stage, Layer, Circle, Rect } from "react-konva";
import Konva from "konva";

export default function CreateCircle() {
  const [circles, setCircles] = useState([]);
  const handelCreateCircle = (e) => {
    setCircles((prevCircles) => [
      ...prevCircles,
      {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: Konva.Util.getRandomColor(),
      },
    ]);
  };
  return (
    <div>
      <button onClick={handelCreateCircle}>create circle</button>
      <Stage>
        <Layer>
          {circles.map((eachCircle) => (
            <Circle
              x={eachCircle.x}
              y={eachCircle.y}
              radius={25}
              fill={eachCircle.color}
              draggable
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
