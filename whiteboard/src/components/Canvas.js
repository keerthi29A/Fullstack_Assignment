import React, { useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return; // Ensure nativeEvent exists
    const { offsetX, offsetY } = nativeEvent;
    
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const { nativeEvent } = e;
    if (!nativeEvent) return; // Ensure nativeEvent exists
    const { offsetX, offsetY } = nativeEvent;
    
    const context = canvasRef.current.getContext('2d');
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      width={800}
      height={600}
      style={{ border: '1px solid #000' }}
    />
  );
};

export default Canvas;
