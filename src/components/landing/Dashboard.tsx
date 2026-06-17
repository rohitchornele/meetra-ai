"use client";
import { useEffect, useState } from "react";
import EmailSidebar from "./EmailSidebar";
import ChatPanel from "./ChatPanel";
import CalendarPanel from "./CalendarPanel";
export default function Dashboard() {
  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x =
        (e.clientX / window.innerWidth - 0.5) * 8;
      const y =
        (e.clientY / window.innerHeight - 0.5) * 5;
      setRotate({
        x: x * 0.3,
        y: -y * 0.3,
      });
    };
    window.addEventListener(
      "mousemove",
      handleMove
    );
    return () =>
      removeEventListener(
        "mousemove",
        handleMove
      );
  }, []);
  return (
    <div className="relative h-[560px] lg:h-[560px] md:h-[420px] h-[300px]"
    >
      <div className="relative h-full grid lg:grid-cols-[160px_1fr_155px] gap-3 animate-[floatUp_6s_ease-in-out_infinite] transition-transform duration-200"
        style={{
          transform: `
            perspective(900px)
            rotateY(${rotate.x}deg)
            rotateX(${rotate.y}deg)
          `,
        }}
      >
        {/* Left */}
        <EmailSidebar />
        {/* Center */}
        <ChatPanel />
        {/* Right */}
        <CalendarPanel />
      </div>
    </div>
  );
}