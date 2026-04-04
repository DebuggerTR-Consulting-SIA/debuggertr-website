"use client";

import {
  Warehouse,
  Code,
  Link2,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { MotionDiv, StaggerContainer, MotionItem } from "@/components/animations/MotionWrapper";
import type { Locale } from "@/messages";

const allServices = [
  {
    key: "ewm" as const,
    icon: Warehouse,
    href: "/services/sap-ewm",
    color: "from-blue-500 to-blue-600",
    features: {
      tr: ["EWM Implementasyon", "WM → EWM Migrasyon", "Süreç Optimizasyonu", "RF/MDE Entegrasyonu", "Depo Stratejileri", "Wave Management"],
      en: ["EWM Implementation", "WM → EWM Migration", "Process Optimization", "RF/MDE Integration", "Warehouse Strategies", "Wave Management"],
      lv: ["EWM Ieviešana", "WM → EWM Migrācija", "Procesu Optimizācija", "RF/MDE Integrācija", "Noliktavas Stratēģijas", "Wave Management"],
      de: ["EWM Implementierung", "WM → EWM Migration", "Prozessoptimierung", "RF/MDE Integration", "Lagerstrategien", "Wave Management"],
    },
  },
  {
    key: "abap" as const,
    icon: Code,
    href: "/services/abap",
    color: "from-emerald-500 to-emerald-600",
    features: {
      tr: ["Custom ABAP Geliştirme", "Enhancement & Modification", "BADI/BAPI Geliştirme", "Report & Form Geliştirme", "Performans Optimizasyonu", "Kod Analizi & Debug"],
      en: ["Custom ABAP Development", "Enhancement & Modification", "BADI/BAPI Development", "Report & Form Development", "Performance Optimization", "Code Analysis & Debug"],
      lv: ["Pielāgota ABAP Izstrāde", "Enhancement & Modification", "BADI/BAPI Izstrāde", "Atskaišu & Veidlapu Izstrāde", "Veiktspējas Optimizācija", "Koda Analīze & Debug"],
      de: ["Individuelle ABAP-Entwicklung", "Enhancement & Modification", "BADI/BAPI-Entwicklung", "Report- & Formularentwicklung", "Performanzoptimierung", "Code-Analyse & Debug"],
    },
  },
  {
    key: "integration" as const,
    icon: Link2,
    href: "/services",
    color: "from-purple-500 to-purple-600",
    features: {
      tr: ["SAP-WCS/WMS Entegrasyon", "API Geliştirme", "EDI/IDoc Entegrasyon", "Middleware Çözümleri", "Otomasyon Entegrasyonu", "3. Parti Sistem Bağlantıları"],
      en: ["SAP-WCS/WMS Integration", "API Development", "EDI/IDoc Integration", "Middleware Solutions", "Automation Integration", "3rd Party System Connectivity"],
      lv: ["SAP-WCS/WMS Integrācija", "API Izstrāde", "EDI/IDoc Integrācija", "Middleware Risinājumi", "Automatizācijas Integrācija", "3. Pušu Sistēmu Savienojumi"],
      de: ["SAP-WCS/WMS Integration", "API-Entwicklung", "EDI/IDoc Integration", "Middleware-Lösungen", "Automatisierungsintegration", "Drittanbieter-Systemanbindung"],
    },
  },
  {
    key: "training" as const,
    icon: GraduationCap,
    href: "/services",
    color: "from-amber-500 to-amber-600",
    features: {
      tr: ["SAP EWM Temel Eğitim", "İleri Seviye EWM", "ABAP Eğitimi", "Son Kullanıcı Eğitimi", "Teknik Dokümantasyon", "7/24 Teknik Destek"],
      en: ["SAP EWM Basic Training", "Advanced EWM", "ABAP Training", "End-User Training", "Technical Documentation", "24/7 Technical Support"],
      lv: ["SAP EWM Pamatapmācība", "Padziļināta EWM Apmācība", "ABAP Apmācība", "Gala Lietotāju Apmācība", "Tehniskā Dokumentācija", "24/7 Tehniskais Atbalsts"],
      de: ["SAP EWM Grundschulung", "Fortgeschrittenes EWM", "ABAP-Schulung", "Endanwender-Schulung", "Technische Dokumentation", "24/7 Technischer Support"],
    },
  },
];

export default function ServicesPage() {
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
              {messages.services.title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              {messages.services.subtitle}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {allServices.map(({ key, icon: Icon, href, color, features }, i) => (
            <MotionDiv key={key} delay={i * 0.1}>
              <div className="group p-8 lg:p-10 bg-white rounded-2xl border border-light-2 hover:shadow-xl transition-all">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-text">
                        {messages.services[key].title}
                      </h2>
                    </div>
                    <p className="text-text-light leading-relaxed mb-6">
                      {messages.services[key].description}
                    </p>
                    {href !== "/services" && (
                      <a
                        href={href}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                      >
                        {messages.services.learnMore}
                        <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                  <div className="lg:w-80">
                    <ul className="space-y-3">
                      {(features as Record<Locale, string[]>)[locale].map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-text">
                          <CheckCircle size={16} className="text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </section>
    </>
  );
}
