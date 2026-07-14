"use client";

import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
// import ReferencesSection from "@/components/home/ReferencesSection"; // hidden until client permissions are confirmed
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      {/* <ReferencesSection /> */}
      <CTASection />
    </>
  );
}
