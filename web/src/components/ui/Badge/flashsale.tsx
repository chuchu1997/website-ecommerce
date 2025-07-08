/** @format */
"use client";
import { Zap } from "lucide-react";
import { Badge } from "../badge";
import { useEffect, useState } from "react";
import { PromotionInterface } from "@/types/promotion";
import { FlashSaleCountDown } from "../Flashsale/flashsale-countdown";
import { cn } from "@/lib/utils";

interface propsFlashSaleBadge {
  promotion: PromotionInterface;
  className?: string;
}

export const BadgeFlashSale = ({
  promotion,
  className,
}: propsFlashSaleBadge) => {
  return (
    <>
      {new Date(promotion.endDate).getTime() > Date.now() && (
        <span>
          <Badge
            className={cn(
              "bg-[#fdf0f7] text-price text-sm font-semibold flex items-center",
              className
            )}>
            <Zap />
            <FlashSaleCountDown promotion={promotion} />
          </Badge>
        </span>
      )}
    </>
  );
};
