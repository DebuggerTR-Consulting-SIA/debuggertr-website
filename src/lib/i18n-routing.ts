import { locales, type Locale } from "@/messages";

export const BASE_URL = "https://www.debuggertr.com";
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Absolute URL for a path in a given locale. The default locale (en) is served
 * without a prefix (/about); other locales are prefixed (/tr/about).
 * `path` starts with "/" or is "" for the home page.
 */
export function localizedUrl(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  // Non-default locale roots must NOT carry a trailing slash (the route is
  // /tr, not /tr/ — the latter 308-redirects, which would make canonical +
  // hreflang point at a redirecting URL).
  return locale === DEFAULT_LOCALE
    ? `${BASE_URL}${clean || "/"}`
    : `${BASE_URL}/${locale}${clean}`;
}

/**
 * `alternates` metadata (canonical + hreflang languages + x-default) for a
 * localized page. `path` is the locale-independent path, e.g. "/about" or "/".
 */
export function alternatesFor(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localizedUrl(l, path);
  languages["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  return {
    canonical: localizedUrl(locale, path),
    languages,
  };
}

// Root routes that live OUTSIDE app/[locale] and must never be locale-prefixed.
const NON_LOCALIZED_PREFIXES = ["/cvs", "/admin"];

/**
 * Locale-aware relative href for an internal path. External/anchor/mailto hrefs
 * and non-localized root routes (/cvs, /admin) are returned unchanged. The
 * default locale (en) is unprefixed.
 */
export function localeHref(locale: Locale, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href) || href.startsWith("//")) {
    return href;
  }
  if (
    NON_LOCALIZED_PREFIXES.some(
      (p) => href === p || href.startsWith(`${p}/`),
    )
  ) {
    return href;
  }
  const clean = href === "/" ? "" : href;
  return locale === DEFAULT_LOCALE ? clean || "/" : `/${locale}${clean || "/"}`;
}

export { locales };
export type { Locale };
