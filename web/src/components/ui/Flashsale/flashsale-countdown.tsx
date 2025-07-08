/** @format */

"use client";
import { cn } from "@/lib/utils";
import { PromotionInterface } from "@/types/promotion";
import { useEffect, useState } from "react";

interface propsFlashSaleCountDown {
  promotion: PromotionInterface;
  className?: string;
}
export const FlashSaleCountDown = ({
  promotion,
  className,
}: propsFlashSaleCountDown) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    initialize();
  }, []);
  const initialize = () => {
    const now = new Date().getTime();
    const end = new Date(promotion.endDate).getTime();
    const secondsLeft = Math.floor((end - now) / 1000);
    setTimeLeft(secondsLeft > 0 ? secondsLeft : 0);
  };
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      secs: secs.toString().padStart(2, "0"),
    };
  };
  const timeObject = formatTime(timeLeft);

  return (
    <>
      {timeLeft > 0 && (
        <div className={cn("text-xs flex items-center", className)}>
          <span className="">{timeObject.hours}:</span>
          <span className="">{timeObject.minutes}:</span>
          <span className="">{timeObject.secs}</span>
        </div>
      )}
    </>
  );
};
