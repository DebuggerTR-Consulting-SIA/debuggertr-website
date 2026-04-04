"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Factory, Truck, ShoppingBag, Pill, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { MotionDiv, StaggerContainer, MotionItem } from "@/components/animations/MotionWrapper";
import referencesData from "@/data/references.json";
import type { Locale } from "@/messages";

const iconMap: Record<string, LucideIcon> = {
  Truck, Pill, ShoppingBag, Factory, Package, Building2,
};

export default function ReferencesSection() {
  const { messages, locale } = useI18n();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionDiv className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            {messages.references.title}
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            {messages.references.subtitle}
          </p>
        </MotionDiv>

        {/* References Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referencesData.map((ref) => {
            const Icon = iconMap[ref.iconKey] ?? Building2;
            const industry = (ref.industry as Record<Locale, string>)[locale] ?? ref.industry.en;
            const description = (ref.description as Record<Locale, string>)[locale] ?? ref.description.en;
            return (
              <MotionItem key={ref.id}>
                <div className="group h-full p-6 bg-white rounded-2xl border border-light-2 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon size={24} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text">{ref.name}</h3>
                      <p className="text-xs text-text-light uppercase tracking-wider">{industry}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-light leading-relaxed mb-4">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ref.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-light rounded-full text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </MotionItem>
            );
          })}
        </StaggerContainer>

        {/* View All */}
        <MotionDiv delay={0.4} className="text-center mt-12">
          <a
            href="/references"
            className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all"
          >
            {messages.references.viewAll}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </MotionDiv>
      </div>
    </section>
  );
}
