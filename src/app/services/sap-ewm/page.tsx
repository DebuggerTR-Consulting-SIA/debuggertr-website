"use client";

import {
  Warehouse,
  CheckCircle,
  ArrowRight,
  Settings,
  RefreshCw,
  TrendingUp,
  Smartphone,
  Layers,
  BarChart3,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { MotionDiv, StaggerContainer, MotionItem } from "@/components/animations/MotionWrapper";
import type { Locale } from "@/messages";

const capabilities: Record<Locale, { icon: React.ElementType; title: string; desc: string }[]> = {
  tr: [
    { icon: Settings, title: "EWM Implementasyon", desc: "Sıfırdan SAP EWM kurulumu ve yapılandırması. İş süreçlerinize özel çözümler." },
    { icon: RefreshCw, title: "WM → EWM Migrasyon", desc: "Mevcut SAP WM sisteminizi EWM'ye sorunsuz geçiş." },
    { icon: TrendingUp, title: "Süreç Optimizasyonu", desc: "Depo operasyonlarınızın analizi ve iyileştirmesi." },
    { icon: Smartphone, title: "RF / MDE Entegrasyon", desc: "Mobil cihaz ve barkod tarayıcı entegrasyonları." },
    { icon: Layers, title: "Depo Stratejileri", desc: "Putaway, picking ve replenishment stratejileri tasarımı." },
    { icon: BarChart3, title: "Raporlama & Analitik", desc: "Depo performans göstergeleri ve dashboard çözümleri." },
  ],
  en: [
    { icon: Settings, title: "EWM Implementation", desc: "SAP EWM setup and configuration from scratch. Solutions tailored to your processes." },
    { icon: RefreshCw, title: "WM → EWM Migration", desc: "Seamless transition from SAP WM to EWM." },
    { icon: TrendingUp, title: "Process Optimization", desc: "Analysis and improvement of warehouse operations." },
    { icon: Smartphone, title: "RF / MDE Integration", desc: "Mobile device and barcode scanner integrations." },
    { icon: Layers, title: "Warehouse Strategies", desc: "Putaway, picking and replenishment strategy design." },
    { icon: BarChart3, title: "Reporting & Analytics", desc: "Warehouse KPI dashboards and reporting solutions." },
  ],
  lv: [
    { icon: Settings, title: "EWM Ieviešana", desc: "SAP EWM uzstādīšana un konfigurācija no nulles. Risinājumi, kas pielāgoti jūsu procesiem." },
    { icon: RefreshCw, title: "WM → EWM Migrācija", desc: "Nevainojama pāreja no SAP WM uz EWM." },
    { icon: TrendingUp, title: "Procesu Optimizācija", desc: "Noliktavas operāciju analīze un uzlabošana." },
    { icon: Smartphone, title: "RF / MDE Integrācija", desc: "Mobilo ierīču un svītrkoda skenera integrācijas." },
    { icon: Layers, title: "Noliktavas Stratēģijas", desc: "Putaway, picking un replenishment stratēģiju izstrāde." },
    { icon: BarChart3, title: "Atskaites & Analītika", desc: "Noliktavas KPI informācijas paneļi un atskaišu risinājumi." },
  ],
  de: [
    { icon: Settings, title: "EWM Implementierung", desc: "SAP EWM Einrichtung und Konfiguration von Grund auf. Lösungen, die auf Ihre Prozesse zugeschnitten sind." },
    { icon: RefreshCw, title: "WM → EWM Migration", desc: "Nahtloser Übergang von SAP WM zu EWM." },
    { icon: TrendingUp, title: "Prozessoptimierung", desc: "Analyse und Verbesserung der Lageroperationen." },
    { icon: Smartphone, title: "RF / MDE Integration", desc: "Mobile Geräte- und Barcode-Scanner-Integrationen." },
    { icon: Layers, title: "Lagerstrategien", desc: "Design von Einlagerungs-, Kommissionier- und Nachschubstrategien." },
    { icon: BarChart3, title: "Reporting & Analytik", desc: "Lager-KPI-Dashboards und Berichtslösungen." },
  ],
};

const content: Record<Locale, {
  title: string;
  subtitle: string;
  intro: string;
  whyTitle: string;
  whyItems: string[];
  capTitle: string;
  ctaText: string;
}> = {
  tr: {
    title: "SAP EWM Danışmanlık",
    subtitle: "Extended Warehouse Management çözümleriyle depo operasyonlarınızı dönüştürün",
    intro: "SAP EWM (Extended Warehouse Management), modern depo yönetiminin en kapsamlı çözümüdür. Gelen maldan sevkiyata kadar tüm süreçlerinizi optimize ederek, operasyonel verimliliğinizi maksimuma çıkarın.",
    whyTitle: "Neden SAP EWM?",
    whyItems: [
      "Gerçek zamanlı depo görünürlüğü",
      "Otomatik süreç yönetimi",
      "Esnek depo stratejileri",
      "Entegre kalite yönetimi",
      "İleri seviye picking optimizasyonu",
      "S/4HANA ile native entegrasyon",
    ],
    capTitle: "Hizmet Kapsamımız",
    ctaText: "Ücretsiz Danışmanlık",
  },
  en: {
    title: "SAP EWM Consulting",
    subtitle: "Transform your warehouse operations with Extended Warehouse Management solutions",
    intro: "SAP EWM (Extended Warehouse Management) is the most comprehensive solution for modern warehouse management. Maximize operational efficiency by optimizing all processes from goods receipt to shipping.",
    whyTitle: "Why SAP EWM?",
    whyItems: [
      "Real-time warehouse visibility",
      "Automated process management",
      "Flexible warehouse strategies",
      "Integrated quality management",
      "Advanced picking optimization",
      "Native S/4HANA integration",
    ],
    capTitle: "Our Service Scope",
    ctaText: "Free Consultation",
  },
  lv: {
    title: "SAP EWM Konsultācijas",
    subtitle: "Pārveidojiet savas noliktavas operācijas ar Extended Warehouse Management risinājumiem",
    intro: "SAP EWM (Extended Warehouse Management) ir visaptverošākais risinājums modernai noliktavas pārvaldībai. Maksimizējiet darbības efektivitāti, optimizējot visus procesus no preču saņemšanas līdz nosūtīšanai.",
    whyTitle: "Kāpēc SAP EWM?",
    whyItems: [
      "Reāllaika noliktavas pārredzamība",
      "Automatizēta procesu pārvaldība",
      "Elastīgas noliktavas stratēģijas",
      "Integrēta kvalitātes pārvaldība",
      "Uzlabota picking optimizācija",
      "Natīva S/4HANA integrācija",
    ],
    capTitle: "Mūsu pakalpojumu apjoms",
    ctaText: "Bezmaksas konsultācija",
  },
  de: {
    title: "SAP EWM Beratung",
    subtitle: "Transformieren Sie Ihre Lageroperationen mit Extended Warehouse Management Lösungen",
    intro: "SAP EWM (Extended Warehouse Management) ist die umfassendste Lösung für modernes Lagermanagement. Maximieren Sie die operative Effizienz durch Optimierung aller Prozesse vom Wareneingang bis zum Versand.",
    whyTitle: "Warum SAP EWM?",
    whyItems: [
      "Echtzeit-Lagertransparenz",
      "Automatisiertes Prozessmanagement",
      "Flexible Lagerstrategien",
      "Integriertes Qualitätsmanagement",
      "Erweiterte Kommissionieroptimierung",
      "Native S/4HANA-Integration",
    ],
    capTitle: "Unser Leistungsumfang",
    ctaText: "Kostenlose Beratung",
  },
};

export default function SapEwmPage() {
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
              <Warehouse size={16} />
              SAP EWM Expert
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

      {/* Intro + Why */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <MotionDiv variant="slideInLeft">
              <p className="text-lg text-text-light leading-relaxed">
                {t.intro}
              </p>
            </MotionDiv>
            <MotionDiv variant="slideInRight">
              <h2 className="text-2xl font-bold text-text mb-6">{t.whyTitle}</h2>
              <ul className="space-y-3">
                {t.whyItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text">
                    <CheckCircle size={18} className="text-primary shrink-0" />
                    {item}
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
                <div className="p-6 bg-white rounded-2xl border border-light-2 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
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
              className="group inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-primary to-primary-light text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
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
