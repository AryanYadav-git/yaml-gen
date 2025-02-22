import React from "react";
import { PlaceholdersAndVanishInputDemo } from "./placeholderdemo";

export function BackgroundBeamsDemo() {
  return (
    <div 
    className="h-dvh w-full rounded-3xl bg-neutral-950 relative flex flex-col items-center justify-center antialiased "
    >
      <div className="max-w-2xl mx-auto p-4">
        <PlaceholdersAndVanishInputDemo />
      </div>
    </div>
  );
}
