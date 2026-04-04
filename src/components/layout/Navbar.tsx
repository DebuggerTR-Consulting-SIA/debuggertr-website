"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Warehouse,
  Code,
  Link2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { locales } from "@/messages";
import type { Locale } from "@/messages";

const serviceIcons = [
  { icon: Warehouse, key: "sapEwm" as const, href: "/services/sap-ewm" },
  { icon: Code, key: "abap" as const, href: "/services/abap" },
];

const langLabels: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "EN" },
  tr: { flag: "🇹🇷", label: "TR" },
  lv: { flag: "🇱🇻", label: "LV" },
  de: { flag: "🇩🇪", label: "DE" },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { messages, locale, setLocale } = useI18n();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: messages.nav.home },
    { href: "/about", label: messages.nav.about },
    { href: "/references", label: messages.nav.references },
    { href: "/contact", label: messages.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image
              src={scrolled ? "/images/logo-dark.png" : "/images/logo-white.png"}
              alt="DebuggerTR Consulting"
              width={160}
              height={43}
              priority
              style={{ width: "auto", height: "2.25rem" }}
              className="object-contain transition-all duration-300"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary ${
                  scrolled ? "text-text" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary flex items-center gap-1 ${
                  scrolled ? "text-text" : "text-white"
                }`}
              >
                {messages.nav.services}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-light-2 overflow-hidden"
                  >
                    {serviceIcons.map(({ icon: Icon, key, href }) => (
                      <a
                        key={key}
                        href={href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-light transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">
                            {messages.nav[key]}
                          </p>
                        </div>
                      </a>
                    ))}
                    <a
                      href="/services"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-light transition-colors border-t border-light-2"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Link2 size={20} className="text-accent" />
                      </div>
                      <p className="text-sm font-medium text-accent">
                        {messages.nav.services} →
                      </p>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switcher Dropdown */}
            <div className="relative ml-2" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-primary/10 flex items-center gap-1.5 ${
                  scrolled ? "text-text" : "text-white"
                }`}
              >
                <Globe size={15} />
                <span>{langLabels[locale].flag}</span>
                <span>{langLabels[locale].label}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-28 bg-white rounded-xl shadow-xl border border-light-2 overflow-hidden z-10"
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLocale(l);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                          locale === l
                            ? "bg-primary/5 text-primary font-semibold"
                            : "text-text hover:bg-light"
                        }`}
                      >
                        <span>{langLabels[l].flag}</span>
                        <span>{langLabels[l].label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <a
              href="/contact"
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5"
            >
              {messages.hero.ctaSecondary}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-text" : "text-white"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 bg-white rounded-xl mb-4 shadow-lg px-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-text hover:bg-light rounded-lg font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="px-4 py-2">
                  <p className="text-xs uppercase tracking-wider text-text-light mb-2">
                    {messages.nav.services}
                  </p>
                  {serviceIcons.map(({ icon: Icon, key, href }) => (
                    <a
                      key={key}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-2.5 text-text hover:text-primary transition-colors"
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">
                        {messages.nav[key]}
                      </span>
                    </a>
                  ))}
                </div>
                {/* Mobile Language Switcher */}
                <div className="px-4 pt-2">
                  <p className="text-xs uppercase tracking-wider text-text-light mb-2">
                    Language
                  </p>
                  <div className="flex items-center gap-2">
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLocale(l);
                          setIsOpen(false);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                          locale === l
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-light-2 text-text hover:bg-light"
                        }`}
                      >
                        <span>{langLabels[l].flag}</span>
                        <span>{langLabels[l].label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-4 pt-2">
                  <a
                    href="/contact"
                    className="block text-center px-4 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-medium rounded-lg"
                  >
                    {messages.hero.ctaSecondary}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
