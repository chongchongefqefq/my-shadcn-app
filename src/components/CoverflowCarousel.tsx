"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Image from "next/image"; // 替换为自定义 logo 图片组件

const images = [
  "/images/E-WEB-Goal-01.png",
  "/images/E-WEB-Goal-02.png",
  "/images/E-WEB-Goal-03.png",
  "/images/E-WEB-Goal-04.png",
  "/images/E-WEB-Goal-05.png",
  "/images/E-WEB-Goal-06.png",
  "/images/E-WEB-Goal-07.png",
  "/images/E-WEB-Goal-08.png",
  "/images/E-WEB-Goal-09.png",
  "/images/E-WEB-Goal-10.png",
  "/images/E-WEB-Goal-11.png",
  "/images/E-WEB-Goal-12.png",
  "/images/E-WEB-Goal-13.png",
  "/images/E-WEB-Goal-14.png",
  "/images/E-WEB-Goal-15.png",
  "/images/E-WEB-Goal-16.png",
  "/images/E-WEB-Goal-17.png",
];

interface CoverflowCarouselProps {
  intervalMs?: number;
  /** 整个页面及导航栏背景色，可传入 Tailwind 类名 */
  bgColor?: string;
}

export default function CoverflowCarousel({
  intervalMs = 3000,
  bgColor = "bg-white",
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  // 触摸滑动切换
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (deltaX > 50) {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (deltaX < -50) {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
      touchStartX.current = null;
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const getTransform = (index: number) => {
    const offset = index - activeIndex;
    if (offset === 0) {
      return "scale-100 z-10 shadow-2xl";
    } else if (
      offset === -1 ||
      (offset === images.length - 1 && activeIndex === 0)
    ) {
      return "-translate-x-[120%] rotate-y-6 scale-90 z-0 opacity-80";
    } else if (
      offset === 1 ||
      (offset === -(images.length - 1) && activeIndex === images.length - 1)
    ) {
      return "translate-x-[120%] -rotate-y-6 scale-90 z-0 opacity-80";
    } else if (offset === -2 || offset === images.length - 2) {
      return "-translate-x-[240%] rotate-y-12 scale-75 z-0 opacity-60";
    } else if (offset === 2 || offset === -(images.length - 2)) {
      return "translate-x-[240%] -rotate-y-12 scale-75 z-0 opacity-60";
    } else {
      return "opacity-0 scale-75 z-0 hidden md:block";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col text-black ${bgColor}`}>
      {/* 顶部导航栏，背景同页面可动态传入 */}
      <header className={`w-full ${bgColor} shadow`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* 左侧图标 */}
          <Image
            src="/images/group.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />{" "}
          {/* 中间 Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">About Us</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">SDG 17 Goals</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">SDG Act Now</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">References</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* 右侧按钮 */}
          <div className="flex space-x-2">
            <Button variant="ghost">Act Now</Button>
            <Button>Home</Button>
          </div>
        </div>
      </header>

      {/* 主内容：轮播 */}
      <main className="flex-grow flex flex-col items-center justify-center touch-none overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-12">
          <p className="text-5xl md:text-5lg font-semibold leading-snug">
            17 Goals. One Global Mission.
          </p>
          <p className="text-5xl md:text-5lg font-semibold leading-snug">
            Build a sustainable future for all
          </p>
        </div>

        <div className="relative w-full flex items-center justify-center h-[360px] overflow-hidden">
          <div className="relative w-[1000px] h-[300px] flex items-center justify-center">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`img-${i}`}
                onClick={() => setActiveIndex(i)}
                className={`cursor-pointer absolute transition-all duration-700 ease-in-out rounded-xl object-cover w-[300px] h-[300px] ${getTransform(
                  i
                )}`}
              />
            ))}
          </div>
        </div>
        <section className="py-12 px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            What Are the Sustainable Development Goals (SDGs)?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            The SDGs are a set of 17 global goals set by the United Nations in
            2015, aiming to end poverty, protect the planet, and ensure peace
            and prosperity for all by 2030.
          </p>
        </section>

        <Button className="mt-4">action today</Button>
      </main>
    </div>
  );
}
