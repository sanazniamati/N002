import React, { useState, useRef } from "react";
import { Stage, Layer, Circle, Rect, Line } from "react-konva";
import Konva from "konva";

//component
import CreateCircle from "./CreateCircle";
import CreateSquare from "./CreateSquare";

export default function App() {
  const [circles, setCircles] = useState([]);
  const [square, setSquare] = useState([]);
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
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
  const stageRef = useRef(null);
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };
  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  return (
    <div>
      {/*<CreateCircle />*/}
      {/*<CreateSquare />*/}
      <button onClick={handelCreateSquare}> create square</button>
      <button onClick={handelCreateCircle}>create circle</button>

      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
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
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
