export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DebuggerTR Consulting SIA",
    url: "https://www.debuggertr.com",
    logo: "https://www.debuggertr.com/images/logo-dark.png",
    email: "info@debuggertr.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Latgales iela 190 - 47",
      postalCode: "LV-1019",
      addressLocality: "Riga",
      addressCountry: "LV",
    },
    sameAs: [
      "https://www.linkedin.com/company/debuggertrconsulting/",
    ],
    description:
      "SAP EWM (Extended Warehouse Management) and ABAP consulting services. Based in Riga, Latvia. SAP EWM Beratung, SAP EWM danışmanlık, SAP EWM konsultācijas.",
    foundingLocation: {
      "@type": "Place",
      name: "Riga, Latvia",
    },
    knowsAbout: ["SAP EWM", "ABAP Development", "SAP S/4HANA", "Warehouse Management"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DebuggerTR Consulting",
    url: "https://www.debuggertr.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.debuggertr.com/services?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "DebuggerTR Consulting SIA",
      url: "https://www.debuggertr.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Europe",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
