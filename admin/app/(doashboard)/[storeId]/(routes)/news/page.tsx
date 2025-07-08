

"use client";
import { NewsClient } from "./components/client";
import { useEffect, useState } from "react";


const NewsPage =  () => {

  const [isMounted,setIsMounted] = useState(false);


  useEffect(()=>{
    setIsMounted(true)
  },[])
  if(!isMounted) return null;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewsClient  />
      </div>
    </div>
  );
};
export default NewsPage;
