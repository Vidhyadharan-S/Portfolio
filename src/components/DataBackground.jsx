import React, { useRef, useEffect } from 'react';

export default function DataBackground({ speedMultiplier = 1 }) {
  const canvasRef = useRef(null);
  const targetSpeed = useRef(speedMultiplier);
  const currentSpeed = useRef(speedMultiplier);

  useEffect(() => {
    targetSpeed.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const characters = '01';
    const fontSize = 16;
    let columns = width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * height;
    }

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(255, 255, 0, 0.8)'; // Yellow color
      ctx.font = fontSize + 'px monospace';

      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.1;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += currentSpeed.current;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = width / fontSize;
      if (drops.length < columns) {
        for (let x = drops.length; x < columns; x++) {
          drops[x] = Math.random() * height;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#050505'
      }}
    />
  );
}
