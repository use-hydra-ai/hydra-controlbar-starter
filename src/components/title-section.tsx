'use client';

import { useEffect, useState } from "react";

export default function TitleSection() {
      const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);
  return (
    <div className="w-full max-w-3xl flex flex-col gap-4 justify-center items-center text-white text-center">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Natural Language Control
      </h1>
      <div className="flex flex-col justify-center items-center gap-4 mt-4">
        <h2 className="text-xl text-gray-300">
          Control your app using natural language with the Control Bar by Hydra AI
        </h2>
        <p className="text-gray-400 max-w-xl">
          Press <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">{isMac ? '⌘K' : 'Ctrl+K'}</kbd> or click below to start controlling components conversationally
        </p>
      </div>
    </div>
  );
}
