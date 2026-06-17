"use client";
import { useEffect, useState } from "react";
export default function BackgroundCanvas() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);
  return (
    <>
      {/* Cursor Glow */}
      <div className=" pointer-events-none fixed z-0 w-[400px] h-[400px] rounded-full opacity-100 transition-all duration-200"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, var(--glow1) 0%, transparent 70%)",
        }}
      />
      {/* Background Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Grid Lines */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg,var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              radial-gradient(
                circle,
                var(--text2) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "36px 36px",
          }}
        />
        {/* Orb 1 */}
        <div
          className="absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full blur-[80px] opacity-50"
          style={{
            background: "var(--glow1)",
          }}
        />
        {/* Orb 2 */}
        <div
          className="absolute bottom-[-60px] left-[10%] w-[350px] h-[350px] rounded-full blur-[80px] opacity-50"
          style={{
            background: "var(--glow2)",
          }}
        />
      </div>
    </>
  );
}