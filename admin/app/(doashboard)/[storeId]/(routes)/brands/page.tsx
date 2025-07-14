"use client";
import { useEffect, useState } from "react";

import { BrandClient } from "./components/client";
const BrandPage =  () => {
  const [isMounted,setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  },[])
  if(!isMounted) return null
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandClient />
      </div>
    </div>
  );
};

export default BrandPage;
