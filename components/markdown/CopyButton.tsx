"use client";

import React, { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { IoCheckmarkOutline } from "react-icons/io5";
import { on } from "next/dist/client/components/react-dev-overlay/pages/bus";

export default function CopyButton({ id }: { id: string }) {
  const [onCopy, setOnCopy] = useState(false);
  const [onDone, setOnDone] = useState(false);
  const handleCopy = async () => {
    const text = document.getElementById(id)?.textContent;
    setOnCopy(true);
    try {
      await navigator.clipboard.writeText(text!);
    } catch {
      console.log("error copied!");
    }
  };
  return (
    <div
      onClick={handleCopy}
      className="p-2 hover:scale-105 cursor-pointer hover:bg-zinc-700 rounded-md relative"
    >
      <IoCheckmarkOutline
        className={cn(
          "cursor-pointer transition-all w-5 h-5 text-green-500",
          onDone ? "scale-100" : "scale-0",
        )}
        onTransitionEnd={() => {
          setTimeout(() => {
            setOnCopy(false);
            setOnDone(false);
          }, 750);
        }}
      />
      <div className="h-full w-full flex items-center justify-center absolute left-0 top-0">
        <BsCopy
          className={cn("transition-all", onCopy ? "scale-0" : "scale-100")}
          onTransitionEnd={() => {
            if (onCopy) {
              setOnDone(true);
            }
          }}
        />
      </div>
    </div>
  );
}
