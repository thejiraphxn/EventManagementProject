import React, { useState, useRef } from 'react';

const ImageWithRectangleCoords = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [rectCoords, setRectCoords] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const imageRef = useRef(null);

  // Function to handle mouse down event (start drawing)
  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const rect = imageRef.current.getBoundingClientRect();
    setStartCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  // Function to handle mouse move event (draw rectangle)
  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const rect = imageRef.current.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;
    setRectCoords({
      startX: startCoords.x,
      startY: startCoords.y,
      width: currentX - startCoords.x,
      height: currentY - startCoords.y
    });
  };

  // Function to handle mouse up event (stop drawing)
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      className='container-xxl bg-black'
      style={{ position: 'relative' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        ref={imageRef}
        src="https://www.first-school.ws/imagestn/crafts/house-1-350w.png"
        alt="example"
        style={{ width: '100%', height: 'auto' }}
      />
      {rectCoords && (
        <div
          style={{
            position: 'absolute',
            top: rectCoords.startY,
            left: rectCoords.startX,
            width: Math.abs(rectCoords.width),
            height: Math.abs(rectCoords.height),
            border: '2px solid red',
            pointerEvents: 'none',
          }}
        ></div>
      )}
      {rectCoords && (
        <div className='text-black' style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }}>
          Coordinates: X1: {rectCoords.startX}, Y1: {rectCoords.startY}, X2: {rectCoords.startX + rectCoords.width}, Y2: {rectCoords.startY + rectCoords.height}
        </div>
      )}
    </div>
  );
};

export default ImageWithRectangleCoords;
