"use client";

import { useI18n } from "@/lib/i18n-context";
import { CounterAnimation } from "@/components/animations/CounterAnimation";
import { MotionDiv } from "@/components/animations/MotionWrapper";
import statsData from "@/data/stats.json";

const statsKeys = ["experience", "projects", "clients", "countries"] as const;
type StatKey = (typeof statsKeys)[number];

const stats = statsKeys.map((key) => ({
  key,
  value: (statsData as Record<StatKey, { value: number; suffix: string }>)[key].value,
  suffix: (statsData as Record<StatKey, { value: number; suffix: string }>)[key].suffix,
}));

export default function StatsSection() {
  const { messages } = useI18n();

  return (
    <section className="relative py-20 bg-gradient-to-r from-primary to-primary-light overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <MotionDiv key={stat.key} delay={i * 0.1} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                <CounterAnimation
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <p className="text-sm sm:text-base text-white/80 font-medium uppercase tracking-wider">
                {messages.stats[stat.key]}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
