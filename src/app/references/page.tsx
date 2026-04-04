"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Factory,
  Truck,
  ShoppingBag,
  Pill,
  Package,
  Filter,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { MotionDiv } from "@/components/animations/MotionWrapper";
import referencesData from "@/data/references.json";
import type { Locale } from "@/messages";

const iconMap: Record<string, LucideIcon> = {
  Truck, Pill, ShoppingBag, Factory, Package, Building2,
};

const filters = [
  { key: "all", label: { en: "All", tr: "Tümü", lv: "Visi", de: "Alle" } },
  { key: "ewm", label: { en: "SAP EWM", tr: "SAP EWM", lv: "SAP EWM", de: "SAP EWM" } },
  { key: "abap", label: { en: "ABAP", tr: "ABAP", lv: "ABAP", de: "ABAP" } },
];

export default function ReferencesPage() {
  const { messages, locale } = useI18n();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? referencesData
      : referencesData.filter((r) => r.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-dark via-dark-light to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {messages.references.title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              {messages.references.subtitle}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-12 flex-wrap">
            <Filter size={18} className="text-text-light" />
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f.key
                    ? "bg-primary text-white"
                    : "bg-light text-text-light hover:bg-light-2"
                }`}
              >
                {(f.label as Record<Locale, string>)[locale]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((ref) => {
                const Icon = iconMap[ref.iconKey] ?? Building2;
                const industry = (ref.industry as Record<Locale, string>)[locale] ?? ref.industry.en;
                const description = (ref.description as Record<Locale, string>)[locale] ?? ref.description.en;
                return (
                  <motion.div
                    key={ref.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group p-6 bg-white rounded-2xl border border-light-2 hover:border-primary/20 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <Icon
                          size={24}
                          className="text-primary group-hover:text-white transition-colors"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-text">{ref.name}</h3>
                        <p className="text-xs text-text-light uppercase tracking-wider">
                          {industry}
                        </p>
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
