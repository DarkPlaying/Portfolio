"use client";
import React from "react";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";

export function Loading({ screenHFull = true, percentage = 0 }: { screenHFull?: boolean; percentage?: number }) {
  const [state, setState] = React.useState("_");
  const [loadText, setLoadText] = React.useState("Fetching");

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (state === "_") {
        setState("__");
        setLoadText("Fetching");
      } else if (state === "__") {
        setState(".");
        setLoadText("Loading");
      } else if (state === ".") {
        setState("..");
        setLoadText("Updating");
      } else if (state === "..") {
        setState("...");
        setLoadText("Fixing");
      } else {
        setState("_");
        setLoadText("Fetching");
      }
    }, 400);

    return () => clearInterval(interval);
  }, [state]);

  const getBorderColor = (text: string) => {
    switch (text) {
      case "Fetching":
        return "border-lime-400 text-lime-400";
      case "Loading":
        return "border-sky-400 text-sky-400";
      case "Updating":
        return "border-yellow-400 text-yellow-400";
      case "Fixing":
        return "border-orange-400 text-orange-400";
      default:
        return "border-lime-400 text-lime-400";
    }
  };

  const colorClass = getBorderColor(loadText);

  return (
    <div className={`${screenHFull ? "min-h-screen" : ""} relative flex flex-col items-center justify-center`}>
      <div className={`p-1 border border-dashed rounded-full animate-spin ${colorClass}`}>
        <div className={`w-16 h-16 border-4 border-dashed rounded-full flex justify-center items-center animate-spin ${colorClass}`}>
          <PlusIcon />
        </div>
      </div>

      <div className="mt-4 text-center w-48">
        <p className="text-sm font-bold uppercase tracking-widest">
          {loadText}
          <span className={`ml-1 ${colorClass}`}>{state}</span>
        </p>
        
        {/* Progress Bar Container */}
        <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r from-lime-400 via-sky-400 to-yellow-400`}
          />
        </div>

        <p className="text-[10px] font-mono mt-2 opacity-60 tracking-widest">
          {Math.round(percentage)}% COMPLETED
        </p>
      </div>
    </div>
  );
}
