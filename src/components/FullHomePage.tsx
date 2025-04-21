"use client";

import { useEffect, useState } from "react";
import CoverflowCarousel from "@/components/CoverflowCarousel";
import SDGCardGrid from "@/components/SDGCardGrid";
import SdgGroupedLayout from "@/components/SdgGroupedLayout";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  <CoverflowCarousel key="carousel" bgColor="bg-green-100" intervalMs={2000} />,
  <SDGCardGrid key="grid" />,
  <SdgGroupedLayout key="group" />,
  <SiteFooter key="footer" />,
];

export default function FullPageScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < sections.length) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 50) scrollToIndex(currentIndex + 1);
      else if (e.deltaY < -50) scrollToIndex(currentIndex - 1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") scrollToIndex(currentIndex + 1);
      else if (e.key === "ArrowUp") scrollToIndex(currentIndex - 1);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
      >
        {sections.map((Component, index) => (
          <div key={index} className="h-screen w-screen">
            {Component}
          </div>
        ))}
      </div>
    </div>
  );
}
