"use client";

import {
  Code,
  CheckCircle,
  ArrowRight,
  Wrench,
  Zap,
  FileCode2,
  Bug,
  Database,
  Shield,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { MotionDiv, StaggerContainer, MotionItem } from "@/components/animations/MotionWrapper";
import type { Locale } from "@/messages";

const capabilities: Record<Locale, { icon: React.ElementType; title: string; desc: string }[]> = {
  tr: [
    { icon: FileCode2, title: "Custom Geliştirme", desc: "İş süreçlerinize özel ABAP programları, raporlar ve formlar." },
    { icon: Wrench, title: "Enhancement & BADI", desc: "Standart SAP süreçlerine özel iş mantığı ekleme." },
    { icon: Database, title: "BAPI & RFC Geliştirme", desc: "Sistem entegrasyonları için arayüz programlama." },
    { icon: Zap, title: "Performans Optimizasyonu", desc: "Yavaş çalışan programların analizi ve iyileştirilmesi." },
    { icon: Bug, title: "Debug & Problem Çözümü", desc: "Karmaşık hataların tespiti ve çözümü." },
    { icon: Shield, title: "Kod Kalitesi & Review", desc: "Clean ABAP prensipleriyle kod kalite kontrolü." },
  ],
  en: [
    { icon: FileCode2, title: "Custom Development", desc: "ABAP programs, reports, and forms tailored to your business processes." },
    { icon: Wrench, title: "Enhancement & BADI", desc: "Adding custom business logic to standard SAP processes." },
    { icon: Database, title: "BAPI & RFC Development", desc: "Interface programming for system integrations." },
    { icon: Zap, title: "Performance Optimization", desc: "Analysis and improvement of slow-running programs." },
    { icon: Bug, title: "Debug & Troubleshooting", desc: "Detection and resolution of complex issues." },
    { icon: Shield, title: "Code Quality & Review", desc: "Code quality control with Clean ABAP principles." },
  ],
  lv: [
    { icon: FileCode2, title: "Pielāgota Izstrāde", desc: "ABAP programmas, atskaites un veidlapas, kas pielāgotas jūsu biznesa procesiem." },
    { icon: Wrench, title: "Enhancement & BADI", desc: "Pielāgotas biznesa loģikas pievienošana standarta SAP procesiem." },
    { icon: Database, title: "BAPI & RFC Izstrāde", desc: "Saskarnes programmēšana sistēmu integrācijām." },
    { icon: Zap, title: "Veiktspējas Optimizācija", desc: "Lēni strādājošo programmu analīze un uzlabošana." },
    { icon: Bug, title: "Debug & Problēmu Risināšana", desc: "Sarežģītu kļūdu noteikšana un novēršana." },
    { icon: Shield, title: "Koda Kvalitāte & Review", desc: "Koda kvalitātes kontrole ar Clean ABAP principiem." },
  ],
  de: [
    { icon: FileCode2, title: "Custom Entwicklung", desc: "ABAP-Programme, Berichte und Formulare, maßgeschneidert für Ihre Geschäftsprozesse." },
    { icon: Wrench, title: "Enhancement & BADI", desc: "Hinzufügen benutzerdefinierter Geschäftslogik zu Standard-SAP-Prozessen." },
    { icon: Database, title: "BAPI & RFC Entwicklung", desc: "Schnittstellenprogrammierung für Systemintegrationen." },
    { icon: Zap, title: "Performance-Optimierung", desc: "Analyse und Verbesserung langsam laufender Programme." },
    { icon: Bug, title: "Debug & Fehlerbehebung", desc: "Erkennung und Behebung komplexer Fehler." },
    { icon: Shield, title: "Codequalität & Review", desc: "Codequalitätskontrolle nach Clean ABAP-Prinzipien." },
  ],
};

const content: Record<Locale, {
  title: string;
  subtitle: string;
  intro: string;
  techTitle: string;
  techItems: string[];
  capTitle: string;
  ctaText: string;
}> = {
  tr: {
    title: "ABAP Geliştirme",
    subtitle: "Uzman ABAP geliştiricileriyle SAP sisteminizi özelleştirin",
    intro: "ABAP (Advanced Business Application Programming), SAP ekosisteminin temel programlama dilidir. Standart SAP çözümlerini iş ihtiyaçlarınıza göre özelleştirmek, entegrasyonlar geliştirmek ve performans optimizasyonu yapmak için uzman ABAP hizmetleri sunuyoruz.",
    techTitle: "Teknoloji Uzmanlığımız",
    techItems: [
      "ABAP Objects (OOP)",
      "ABAP RESTful Application Programming (RAP)",
      "CDS Views & AMDP",
      "ALV & Fiori Elements",
      "IDoc & ALE",
      "Clean ABAP & S/4HANA Ready",
    ],
    capTitle: "Hizmet Kapsamımız",
    ctaText: "Ücretsiz Danışmanlık",
  },
  en: {
    title: "ABAP Development",
    subtitle: "Customize your SAP system with expert ABAP developers",
    intro: "ABAP (Advanced Business Application Programming) is the core programming language of the SAP ecosystem. We offer expert ABAP services to customize standard SAP solutions, develop integrations, and optimize performance according to your business needs.",
    techTitle: "Our Technical Expertise",
    techItems: [
      "ABAP Objects (OOP)",
      "ABAP RESTful Application Programming (RAP)",
      "CDS Views & AMDP",
      "ALV & Fiori Elements",
      "IDoc & ALE",
      "Clean ABAP & S/4HANA Ready",
    ],
    capTitle: "Our Service Scope",
    ctaText: "Free Consultation",
  },
  lv: {
    title: "ABAP Izstrāde",
    subtitle: "Pielāgojiet savu SAP sistēmu ar ekspertu ABAP izstrādātājiem",
    intro: "ABAP (Advanced Business Application Programming) ir SAP ekosistēmas galvenā programmēšanas valoda. Mēs piedāvājam ekspertu ABAP pakalpojumus, lai pielāgotu standarta SAP risinājumus, izstrādātu integrācijas un optimizētu veiktspēju atbilstoši jūsu biznesa vajadzībām.",
    techTitle: "Mūsu tehniskā kompetence",
    techItems: [
      "ABAP Objects (OOP)",
      "ABAP RESTful Application Programming (RAP)",
      "CDS Views & AMDP",
      "ALV & Fiori Elements",
      "IDoc & ALE",
      "Clean ABAP & S/4HANA Ready",
    ],
    capTitle: "Mūsu pakalpojumu apjoms",
    ctaText: "Bezmaksas konsultācija",
  },
  de: {
    title: "ABAP Entwicklung",
    subtitle: "Passen Sie Ihr SAP-System mit erfahrenen ABAP-Entwicklern an",
    intro: "ABAP (Advanced Business Application Programming) ist die Kernprogrammiersprache des SAP-Ökosystems. Wir bieten professionelle ABAP-Dienstleistungen zur Anpassung von Standard-SAP-Lösungen, Entwicklung von Integrationen und Performance-Optimierung nach Ihren Geschäftsanforderungen.",
    techTitle: "Unsere technische Expertise",
    techItems: [
      "ABAP Objects (OOP)",
      "ABAP RESTful Application Programming (RAP)",
      "CDS Views & AMDP",
      "ALV & Fiori Elements",
      "IDoc & ALE",
      "Clean ABAP & S/4HANA Ready",
    ],
    capTitle: "Unser Leistungsumfang",
    ctaText: "Kostenlose Beratung",
  },
};

export default function AbapPage() {
  const { locale } = useI18n();
  const t = content[locale];

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6">
              <Code size={16} />
              ABAP Expert
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              {t.subtitle}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Intro + Tech */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <MotionDiv variant="slideInLeft">
              <p className="text-lg text-text-light leading-relaxed">
                {t.intro}
              </p>
            </MotionDiv>
            <MotionDiv variant="slideInRight">
              <h2 className="text-2xl font-bold text-text mb-6">{t.techTitle}</h2>
              <ul className="space-y-3">
                {t.techItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                    <span className="font-mono text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text">{t.capTitle}</h2>
          </MotionDiv>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities[locale].map(({ icon: Icon, title, desc }, i) => (
              <MotionItem key={i}>
                <div className="p-6 bg-white rounded-2xl border border-light-2 hover:shadow-lg hover:border-emerald-500/20 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-text mb-2">{title}</h3>
                  <p className="text-sm text-text-light leading-relaxed">{desc}</p>
                </div>
              </MotionItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionDiv>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1"
            >
              {t.ctaText}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}
