// src/components/utils/IntelligentCursor.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function IntelligentCursor() {
  // State to track if the component has mounted on the client
  const [isMounted, setIsMounted] = useState(false);
  // State to track if the mouse is clicking
  const [isClicking, setIsClicking] = useState(false);

  // Refs for cursor element and positions
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after the first render
    setIsMounted(true);

    const handleMouseMove = (ev: MouseEvent) => {
      targetPosition.current = { x: ev.clientX, y: ev.clientY };
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      const { x: tx, y: ty } = targetPosition.current;
      const { x: cx, y: cy } = currentPosition.current;

      // Lerp with easing factor
      currentPosition.current.x += (tx - cx) * 0.25;
      currentPosition.current.y += (ty - cy) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentPosition.current.x}px`;
        cursorRef.current.style.top = `${currentPosition.current.y}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    // Clean up the event listeners and animation frame when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []); // Empty dependency array means this runs only once

  // On the server, and on the very first client render, render nothing.
  // This guarantees no hydration mismatch.
  if (!isMounted) {
    return null;
  }

  // Once mounted on the client, render the cursor div
  return (
    <div
      ref={cursorRef}
      className={`intelligent-cursor ${isClicking ? 'clicking' : ''}`}
      style={{
        left: '0px',
        top: '0px',
      }}
    />
  );
}