/** @format */

"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

import { cn } from "@/lib/utils";
import { SquareArrowRightIcon } from "lucide-react";

interface ReadMoreProps {
  title: string;
  href: string;
  className?: string;
}
const ReadMoreButton: React.FC<ReadMoreProps> = ({
  title,
  href,
  className,
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(href);
      }}
      className={cn("cursor-pointer mt-[4]", className)}>
      <SquareArrowRightIcon />
      {title}
    </Button>
  );
};

export default ReadMoreButton;
