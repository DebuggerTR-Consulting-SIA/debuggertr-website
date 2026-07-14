"use client";

import { Target, Eye, Shield, Users, Lightbulb, Award, CheckCircle, Building2, Hash, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { MotionDiv, StaggerContainer, MotionItem } from "@/components/animations/MotionWrapper";
import companyData from "@/data/company.json";

const valueIcons = [Award, Users, Lightbulb, Shield, CheckCircle];

const legalAddressLabel: Record<string, string> = {
  en: "Legal Address",
  tr: "Tescilli Adres",
  lv: "Juridiskā adrese",
  de: "Rechtliche Adresse",
};

export default function AboutPage() {
  const { messages, locale } = useI18n();

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
              {messages.about.title}
            </h1>
            <p className="text-xl text-primary-light font-medium">
              {messages.about.subtitle}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Description */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionDiv variant="slideInLeft">
              <p className="text-lg text-text-light leading-relaxed mb-8">
                {messages.about.description}
              </p>
              <div className="p-6 bg-light rounded-2xl border border-light-2">
                <h3 className="font-bold text-text mb-4">{messages.about.legal.title}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-light uppercase tracking-wider mb-0.5">Company</p>
                      <p className="font-medium text-text">{companyData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Hash size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-light uppercase tracking-wider mb-0.5">{messages.about.legal.regNumber.split(":")[0]}</p>
                      <p className="font-medium text-text">{companyData.regNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-light uppercase tracking-wider mb-0.5">{legalAddressLabel[locale] ?? legalAddressLabel.en}</p>
                      <p className="font-medium text-text">{(companyData as { legalAddress?: string }).legalAddress ?? companyData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>

            <div className="space-y-6">
              {/* Mission */}
              <MotionDiv variant="slideInRight" delay={0.1}>
                <div className="p-8 bg-white rounded-2xl border border-light-2 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Target size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-text">
                      {messages.about.mission.title}
                    </h3>
                  </div>
                  <p className="text-text-light leading-relaxed">
                    {messages.about.mission.text}
                  </p>
                </div>
              </MotionDiv>

              {/* Vision */}
              <MotionDiv variant="slideInRight" delay={0.2}>
                <div className="p-8 bg-white rounded-2xl border border-light-2 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Eye size={24} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-text">
                      {messages.about.vision.title}
                    </h3>
                  </div>
                  <p className="text-text-light leading-relaxed">
                    {messages.about.vision.text}
                  </p>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text">
              {messages.about.values.title}
            </h2>
          </MotionDiv>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {messages.about.values.items.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <MotionItem key={value}>
                  <div className="text-center p-6 bg-white rounded-2xl border border-light-2 hover:border-primary/20 hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <p className="font-semibold text-text text-sm">{value}</p>
                  </div>
                </MotionItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
