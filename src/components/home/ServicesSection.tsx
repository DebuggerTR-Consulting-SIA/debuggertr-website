"use client";

import { Warehouse, Code, Link2, GraduationCap, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import {
  StaggerContainer,
  MotionItem,
} from "@/components/animations/MotionWrapper";
import { MotionDiv } from "@/components/animations/MotionWrapper";

const services = [
  {
    key: "ewm" as const,
    icon: Warehouse,
    href: "/services/sap-ewm",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    key: "abap" as const,
    icon: Code,
    href: "/services/abap",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    key: "integration" as const,
    icon: Link2,
    href: "/services",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    key: "training" as const,
    icon: GraduationCap,
    href: "/services",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export default function ServicesSection() {
  const { messages } = useI18n();

  return (
    <section className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionDiv className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            {messages.services.title}
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            {messages.services.subtitle}
          </p>
        </MotionDiv>

        {/* Service Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map(({ key, icon: Icon, href, color, bgColor, iconColor }) => (
            <MotionItem key={key}>
              <a
                href={href}
                className="group block p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-light-2 hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={28} className={iconColor} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                      {messages.services[key].title}
                    </h3>
                    <p className="text-text-light leading-relaxed mb-4">
                      {messages.services[key].description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {messages.services.learnMore}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </div>
              </a>
            </MotionItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
