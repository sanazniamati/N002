import React, { useState, useRef } from "react";
import { Stage, Layer, Circle,Rect } from "react-konva";
import Konva from 'konva'

export default function App() {
  const [circles, setCircles] = useState([]);
  const [square,setSquare]=useState([]);
  const handelCreateCircle=(e) => {
      setCircles((prevCircles) => [
          ...prevCircles,
          { x: Math.random() * window.innerWidth ,y: Math.random() * window.innerHeight, color: Konva.Util.getRandomColor() }
      ]);
  }
  const handelCreateSquare=(e)=>{setSquare((prevSquare) => [
      ...prevSquare,
      { x: Math.random() * window.innerWidth ,y: Math.random() * window.innerHeight, color: Konva.Util.getRandomColor() }
  ]);
  }
  const stageRef = useRef(null);
  //freecdrawing
    const [tool, setTool] = React.useState('pen');
     return (
      <div>
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

        <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
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
              {square.map((eachSquare)=>(
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
