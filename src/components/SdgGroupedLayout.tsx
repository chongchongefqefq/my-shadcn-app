"use client";

import { cn } from "@/lib/utils"; // 如果你用了 shadcn 的 class 合并工具

interface GoalGroupProps {
  title: string;
  color: string;
  goals: number[];
  description: string;
}

function GoalGroup({ title, color, goals, description }: GoalGroupProps) {
  return (
    <div className="text-center mb-12">
      <h3 className={cn("text-xl font-bold mb-2", color)}>{title}</h3>
      <p className="text-sm text-gray-600 max-w-xl mx-auto mb-4">
        {description}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {goals.map((i) => (
          <img
            key={i}
            src={`/images/E-WEB-Goal-${String(i).padStart(2, "0")}.png`}
            alt={`SDG ${i}`}
            className="w-20 hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
}

export default function SdgGroupedLayout() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-gray-100 py-16 px-6">
      {/* Title + Introduction */}
      <div className="text-center max-w-3xl mb-12">
        <h2 className="text-4xl font-bold text-green-600 mb-4">
          Sustainable Development Goals Structure
        </h2>
        <p className="text-lg text-gray-700">
          The 17 SDGs are interconnected and grouped into key dimensions that
          reflect the foundations of a sustainable world: environmental
          protection, social progress, and economic growth.
        </p>
      </div>

      {/* SDG 17 - Top level */}
      <div className="flex justify-center mb-10">
        <img
          src="/images/E-WEB-Goal-17.png"
          alt="SDG 17"
          className="w-24 hover:scale-110 transition-transform"
        />
      </div>

      {/* Economy Layer */}
      <GoalGroup
        title="Economy"
        color="text-orange-500"
        goals={[8, 9, 10, 12]}
        description="These goals aim to drive inclusive economic growth, promote innovation, and ensure sustainable industry and production."
      />

      {/* Society Layer */}
      <GoalGroup
        title="Society"
        color="text-blue-500"
        goals={[1, 11, 16, 7, 3, 4, 5, 2, 6]}
        description="Social goals target the needs of people: ending poverty, improving education and healthcare, achieving equality, and ensuring peace and justice."
      />

      {/* Biosphere Layer */}
      <GoalGroup
        title="Biosphere"
        color="text-green-600"
        goals={[15, 14, 13]}
        description="Environmental goals focus on preserving natural resources, protecting ecosystems, and combating climate change to sustain life on Earth."
      />

      {/* APA 引用区 */}
    </section>
  );
}
