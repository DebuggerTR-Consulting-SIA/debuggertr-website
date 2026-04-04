"use client";

import { Mail, MapPin, Clock, Building2, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { MotionDiv } from "@/components/animations/MotionWrapper";
import companyData from "@/data/company.json";

const LINKEDIN_URL = "https://www.linkedin.com/company/debuggertrconsulting/";

export default function ContactPage() {
  const { messages, locale } = useI18n();
  const c = messages.contact;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-dark via-dark-light to-primary-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {c.title}
            </h1>
            <p className="text-xl text-white/70">{c.subtitle}</p>
          </MotionDiv>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Primary contact cards */}
          <MotionDiv>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Email */}
              <a
                href={`mailto:${companyData.email}`}
                className="group flex flex-col gap-4 p-8 bg-white rounded-2xl border border-light-2 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={28} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-1">
                    {c.emailLabel}
                  </p>
                  <p className="text-lg font-bold text-primary group-hover:underline break-all">
                    {companyData.email}
                  </p>
                  <p className="text-sm text-text-light mt-2">{c.emailDesc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-xs text-primary font-medium">
                  <span>mailto</span>
                  <ExternalLink size={12} />
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 p-8 bg-white rounded-2xl border border-light-2 shadow-sm hover:shadow-md hover:border-[#0077B5]/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0077B5]/10 flex items-center justify-center group-hover:bg-[#0077B5]/20 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="#0077B5"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-1">
                    {c.linkedinLabel}
                  </p>
                  <p className="text-lg font-bold text-[#0077B5]">
                    DebuggerTR Consulting
                  </p>
                  <p className="text-sm text-text-light mt-2">{c.linkedinDesc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-xs text-[#0077B5] font-medium">
                  <span>linkedin.com</span>
                  <ExternalLink size={12} />
                </div>
              </a>
            </div>
          </MotionDiv>

          {/* Info row */}
          <MotionDiv delay={0.1}>
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Location */}
              <div className="p-6 bg-white rounded-2xl border border-light-2">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-accent" />
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider">
                    {c.locationTitle}
                  </p>
                </div>
                <p className="font-semibold text-text">{companyData.location}</p>
              </div>

              {/* Working Hours */}
              <div className="p-6 bg-white rounded-2xl border border-light-2">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-primary" />
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider">
                    {c.hoursTitle}
                  </p>
                </div>
                <p className="font-semibold text-text">{c.weekdays}</p>
                <p className="text-sm text-text-light">{companyData.workingHours.weekdays}</p>
                <p className="text-xs text-text-light mt-1">{companyData.workingHours.weekend}</p>
              </div>

              {/* Legal */}
              <div className="p-6 bg-white rounded-2xl border border-light-2">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={16} className="text-text-light" />
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider">
                    {c.legalTitle}
                  </p>
                </div>
                <p className="font-semibold text-text text-sm">{companyData.name}</p>
                <p className="text-xs text-text-light mt-1">Reg. No: {companyData.regNumber}</p>
                {companyData.legalAddress && (
                  <p className="text-xs text-text-light mt-2 pt-2 border-t border-light-2">
                    {companyData.legalAddress}
                  </p>
                )}
              </div>
            </div>
          </MotionDiv>

        </div>
      </section>
    </>
  );
}
