/** @format */

"use client";
import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";

const FlashSaleComponent = () => {
  // Set initial countdown time (you can customize this)
  const [timeLeft, setTimeLeft] = useState({
    hours: 13,
    minutes: 13,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer has reached 00:00:00
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: any) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="flex items-center justify-between   rounded-md  overflow-hidden relative  w-[240px]">
      {/* Flash Sale Badge */}
      <div className="flex-1  bg-red-500 text-white px-3 py-1 flex items-center gap-1 text-sm font-medium">
        <span className="font-semibold">Flash Sale</span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <Zap className="w-6 h-6 fill-yellow-300 text-yellow-300" />
      </div>

      {/* Countdown Timer */}

      <div className="flex-1 flex items-center bg-[#fde4e9]  px-3 py-1 text-sm font-mono text-[#d7194d] font-semibold">
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
        {formatTime(timeLeft.seconds)}
      </div>
    </div>
  );
};

export default FlashSaleComponent;
