/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function PostVisualizer({
  scale,
  setScale,
  position,
  setPosition,
  image,
  onImageRemove
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [positionMoved, setPositionMoved] = useState({ x: 0, y: 0 });
  const parentRef = useRef(null);

  const handleMove = (clientX, clientY) => {
    let mouseX = clientX;
    let mouseY = clientY;

    if (isDragging && parentRef.current) {
      setPositionMoved({ x: clientX, y: clientY });
    } else {
      setStartPosition({ x: mouseX, y: mouseY });
    }
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      // Only handle one finger touch
      const touch = e.touches[0];
      //console.log(touch.clientX, touch.clientY)
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    setPosition((currentPos) => {
      let newPosX = 0;
      let newPosY = 0;

      let diffX = Math.abs(positionMoved.x - startPosition.x);
      let diffY = Math.abs(positionMoved.y - startPosition.y);

      if (positionMoved.x > startPosition.x) {
        newPosX = currentPos.x + diffX;
      } else {
        newPosX = currentPos.x - diffX;
      }

      if (positionMoved.y > startPosition.y) {
        newPosY = currentPos.y + diffY;
      } else {
        newPosY = currentPos.y - diffY;
      }

      return { x: newPosX, y: newPosY };
    });

    return () => {
      setPosition({ x: 0, y: 0 });
    };
  }, [positionMoved]);

  useEffect(() => {
    // Stop dragging when mouse is released outside the container
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <>
      {/* Uploaded photo visualizer */}
      {image && (
        <div className="col-span-full rounded-lg border-2 border-dashed border-gray-900/25 mt-2 sm:mt-8">
          <div
            className="relative w-full overflow-hidden max-h-[500px]"
            ref={parentRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleStart}
            onTouchMove={handleTouchMove}
            onTouchStart={handleStart}
          >
            <button
              className="absolute top-0 right-0 p-4 z-30"
              type="button"
              onClick={() => onImageRemove()}
            >
              <MdDelete className="text-3xl text-red-700" />
            </button>
            <img
              src={image}
              onDragStart={(e) => e.preventDefault()}
              className={`object-cover ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              alt="Uploaded picture"
              style={{
                scale: scale,
                translate: `${position.x}px ${position.y}px`,
              }}
            />
          </div>
          <div className="w-full h-10 flex items-center justify-center bg-white">
            <label htmlFor="scale" className="font-medium">
              Scale
            </label>
            <div className="relative flex items-center h-full ms-2 w-52">
              <input
                type="range"
                name="scale"
                id="scale"
                className="w-full h-2 bg-gray-300 rounded-lg shadow appearance-none cursor-pointer accent-mainGreen focus:outline-none focus:ring-2 focus:ring-blue-300"
                min={1.0}
                max={2.0}
                step={0.01}
                defaultValue={1.0}
                onChange={(e) => setScale(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
