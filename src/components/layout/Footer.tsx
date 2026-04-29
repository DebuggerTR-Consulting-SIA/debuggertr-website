"use client";

import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function Footer() {
  const { messages } = useI18n();

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/images/logo-white.png"
                alt="DebuggerTR Consulting"
                width={160}
                height={43}
                style={{ width: "auto", height: "2.25rem" }}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {messages.footer.description}
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:info@debuggertr.com"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              {messages.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: messages.nav.home },
                { href: "/about", label: messages.nav.about },
                // { href: "/references", label: messages.nav.references }, // hidden until client permissions are confirmed
                { href: "/cvs", label: "Consultants" },
                { href: "/contact", label: messages.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              {messages.footer.servicesTitle}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/services/sap-ewm", label: messages.nav.sapEwm },
                { href: "/services/abap", label: messages.nav.abap },
                { href: "/services", label: messages.nav.services },
                { href: "/products/adisora", label: messages.nav.adisora },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              {messages.footer.contactTitle}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@debuggertr.com"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-primary-light transition-colors"
                >
                  <Mail size={16} />
                  info@debuggertr.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} />
                Riga, Latvia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} DebuggerTR Consulting SIA.{" "}
            {messages.footer.rights}
          </p>
          <p className="text-xs text-white/30">Reg. No: 50203500891 | Latvia</p>
        </div>
      </div>
    </footer>
  );
}
