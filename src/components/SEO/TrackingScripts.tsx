"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface Tracking {
  googleAnalytics: string;
  yandexMetrica: string;
  customHeadCode: string;
  customBodyCode: string;
}

export default function TrackingScripts() {
  const [tracking, setTracking] = useState<Tracking | null>(null);

  useEffect(() => {
    fetch("/api/admin/tracking")
      .then((r) => r.json())
      .then(setTracking)
      .catch(() => null);
  }, []);

  if (!tracking) return null;

  const gaId = tracking.googleAnalytics.trim();
  const ymId = tracking.yandexMetrica.trim();

  return (
    <>
      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}

      {/* Yandex Metrica */}
      {ymId && (
        <Script id="ym-init" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ymId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
        </Script>
      )}

      {/* Custom body code */}
      {tracking.customBodyCode.trim() && (
        <div
          dangerouslySetInnerHTML={{ __html: tracking.customBodyCode }}
          style={{ display: "none" }}
        />
      )}
    </>
  );
}
