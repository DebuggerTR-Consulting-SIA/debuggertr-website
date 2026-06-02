import Script from "next/script";
import tracking from "@/data/tracking.json";

export default function TrackingScripts() {
  // Source of truth is tracking.json (managed via the admin "SEO & Tracking" tab
  // and committed to the repo, so the value is baked in at build time). The env var
  // is only a fallback for when the JSON value is empty — it must NOT override the
  // committed ID, otherwise a stale Vercel env var (e.g. an old GA property) would
  // silently win and analytics would flow to the wrong account.
  //
  // googleAnalytics may hold several Measurement IDs separated by commas; the page
  // then sends events to every property (gtag's documented multi-property setup).
  const gaIds = Array.from(
    new Set(
      (tracking.googleAnalytics || process.env.NEXT_PUBLIC_GA_ID || "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    )
  );
  const ymId = (tracking.yandexMetrica || process.env.NEXT_PUBLIC_YM_ID)?.trim();

  return (
    <>
      {gaIds.length > 0 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaIds[0]}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${gaIds
              .map((id) => `gtag('config','${id}');`)
              .join("")}`}
          </Script>
        </>
      )}

      {ymId && (
        <Script id="ym-init" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ymId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
        </Script>
      )}
    </>
  );
}
