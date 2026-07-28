"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import HeroPage from "./components/HeroPage";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <main className="relative w-full min-h-screen">
      {loadingDone && <HeroPage />}
      <AnimatePresence>
        {!loadingDone && (
          <LoadingScreen onComplete={() => setLoadingDone(true)} />
        )}
      </AnimatePresence>
    </main>
  );
}
