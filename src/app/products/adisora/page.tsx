"use client";

import {
  Store,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Building2,
  Shield,
  Globe2,
  ChefHat,
  Receipt,
  Users,
  ClipboardList,
  Smartphone,
  Apple,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { MotionDiv, StaggerContainer, MotionItem } from "@/components/animations/MotionWrapper";
import type { Locale } from "@/messages";

const ADISORA_URL = "https://www.adisora.com";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.debuggertr.adisorabusiness";
const APP_STORE_URL =
  "https://apps.apple.com/lv/app/adisora-business-app/id6763128028";

const features: Record<Locale, { icon: React.ElementType; title: string; desc: string }[]> = {
  tr: [
    { icon: Building2, title: "Çok Şubeli Yönetim", desc: "Tüm şubelerinizin operasyonlarını tek panelden takip edin ve yönetin." },
    { icon: ClipboardList, title: "Menü Yöneticisi", desc: "Menü, kategori ve fiyatlandırmayı merkezi olarak güncelleyin; tüm şubelere anında yansısın." },
    { icon: ChefHat, title: "Mutfak Bileti", desc: "Sipariş akışını mutfağa dijital olarak iletin, hazırlık sürelerini optimize edin." },
    { icon: Receipt, title: "Abonelik Faturalandırma", desc: "Esnek planlar ve abonelik bazlı faturalandırma ile müşterilerinizi yönetin." },
    { icon: Users, title: "Roller ve İzinler", desc: "Yönetici, kasa, mutfak rolleri ile yetki bazlı erişim kontrolü." },
    { icon: Shield, title: "Banka Düzeyinde Güvenlik", desc: "Şifrelenmiş veri saklama, denetim kayıtları ve uyumluluk kontrolleri." },
    { icon: Globe2, title: "Çok Dilli Arayüz", desc: "Operatörler ve müşterileriniz için çoklu dil desteği." },
    { icon: Smartphone, title: "Mobil Uyumlu", desc: "Web panel ve Android Adisora Business uygulaması ile sahada her an erişim." },
  ],
  en: [
    { icon: Building2, title: "Multi-branch by design", desc: "Operate every branch from a single source of truth." },
    { icon: ClipboardList, title: "Menu builder", desc: "Update menus, categories and pricing centrally and roll out instantly." },
    { icon: ChefHat, title: "Kitchen ticketing", desc: "Stream orders to the kitchen digitally and shorten ticket times." },
    { icon: Receipt, title: "Subscription billing", desc: "Flexible plans and subscription-based billing for your customers." },
    { icon: Users, title: "Roles & permissions", desc: "Granular access control across admin, cashier, kitchen and waitstaff roles." },
    { icon: Shield, title: "Bank-grade security", desc: "Encrypted storage, audit trails and compliance controls out of the box." },
    { icon: Globe2, title: "Multilingual UI", desc: "Built for operators and guests in multiple languages." },
    { icon: Smartphone, title: "Web + Mobile", desc: "Browser-based admin panel and the Adisora Business Android app for the floor." },
  ],
  lv: [
    { icon: Building2, title: "Daudzfiliāļu pārvaldība", desc: "Vadiet visas filiāles no viena patiesības avota." },
    { icon: ClipboardList, title: "Ēdienkartes veidotājs", desc: "Atjauniniet ēdienkartes, kategorijas un cenas centrāli un izvērsiet visās filiālēs." },
    { icon: ChefHat, title: "Virtuves biļetes", desc: "Pārsūtiet pasūtījumus uz virtuvi digitāli un saīsiniet sagatavošanas laiku." },
    { icon: Receipt, title: "Abonementa norēķini", desc: "Elastīgi plāni un abonementa norēķini jūsu klientiem." },
    { icon: Users, title: "Lomas un atļaujas", desc: "Granulēta piekļuves kontrole administratora, kasiera, virtuves un viesmīļa lomām." },
    { icon: Shield, title: "Bankas līmeņa drošība", desc: "Šifrēta uzglabāšana, audita pieraksti un atbilstības kontroles." },
    { icon: Globe2, title: "Daudzvalodu saskarne", desc: "Veidots operatoriem un viesiem vairākās valodās." },
    { icon: Smartphone, title: "Web + Mobile", desc: "Pārlūkprogrammas administrācijas panelis un Adisora Business Android lietotne." },
  ],
  de: [
    { icon: Building2, title: "Mehrere Filialen auf Designebene", desc: "Steuern Sie jede Filiale über eine einzige Quelle der Wahrheit." },
    { icon: ClipboardList, title: "Menü-Editor", desc: "Aktualisieren Sie Speisekarten, Kategorien und Preise zentral und rollen Sie sie sofort aus." },
    { icon: ChefHat, title: "Küchen-Ticketing", desc: "Bestellungen digital an die Küche übermitteln und Ticketzeiten verkürzen." },
    { icon: Receipt, title: "Abonnement-Abrechnung", desc: "Flexible Pläne und abonnementbasierte Abrechnung für Ihre Kunden." },
    { icon: Users, title: "Rollen & Berechtigungen", desc: "Feingranulare Zugriffskontrolle für Admin-, Kassen-, Küchen- und Service-Rollen." },
    { icon: Shield, title: "Sicherheit auf Bankniveau", desc: "Verschlüsselte Speicherung, Audit-Trails und Compliance-Kontrollen ab Werk." },
    { icon: Globe2, title: "Mehrsprachige Oberfläche", desc: "Entwickelt für Betreiber und Gäste in mehreren Sprachen." },
    { icon: Smartphone, title: "Web + Mobile", desc: "Browserbasiertes Admin-Panel und die Adisora Business Android-App für den Servicebereich." },
  ],
};

const content: Record<Locale, {
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  whoTitle: string;
  whoText: string;
  capTitle: string;
  platformTitle: string;
  platformWeb: string;
  platformWebDesc: string;
  platformAndroid: string;
  platformAndroidDesc: string;
  platformIos: string;
  platformIosDesc: string;
  mobileAvailability: string;
  ctaTitle: string;
  ctaText: string;
  visitWebsite: string;
  getOnPlay: string;
  getOnAppStore: string;
}> = {
  tr: {
    badge: "Restoran SaaS",
    title: "Adisora",
    subtitle: "Restoran operasyonlarının tamamı tek bir yerde.",
    intro:
      "Adisora, menü, sipariş, mutfak ve faturalandırma operasyonlarını tek bir platforma taşıyan modern, çok dilli bir restoran yönetim çözümüdür. Kontrolü kaybetmeden büyümek isteyen restoran zincirleri için tasarlandı.",
    whoTitle: "Kimler için?",
    whoText:
      "Birden fazla şubesi olan restoran grupları, kafe zincirleri ve operasyonlarını dijitalleştirmek isteyen yiyecek-içecek işletmeleri için ideal. DebuggerTR'nin SAP ekosistemi dışındaki ilk B2B SaaS ürünüdür.",
    capTitle: "Öne çıkan özellikler",
    platformTitle: "Hangi platformlarda?",
    platformWeb: "Web Yönetim Paneli",
    platformWebDesc: "Tarayıcı üzerinden tüm şubelerinizi yönetin.",
    platformAndroid: "Android",
    platformAndroidDesc: "Adisora Business — Google Play'de.",
    platformIos: "iOS",
    platformIosDesc: "Adisora Business App — App Store'da.",
    mobileAvailability: "Mobil uygulamalar şu an Letonya ve Türkiye'de indirilebilir.",
    ctaTitle: "Adisora'yı keşfedin",
    ctaText:
      "Demo talep edin ya da uygulamayı doğrudan App Store veya Google Play'den indirip test edin.",
    visitWebsite: "adisora.com'u ziyaret et",
    getOnPlay: "Google Play'den indir",
    getOnAppStore: "App Store'dan indir",
  },
  en: {
    badge: "Restaurant SaaS",
    title: "Adisora",
    subtitle: "Restaurant operations, all in one place.",
    intro:
      "Adisora is the modern, multilingual platform that brings menu, ordering, kitchen and billing operations into one place — built for restaurant groups that want to grow without losing control.",
    whoTitle: "Who it's for",
    whoText:
      "Restaurant groups, café chains and F&B operators with more than one branch who want to digitize day-to-day operations. It's our first B2B SaaS product outside the SAP ecosystem.",
    capTitle: "Key capabilities",
    platformTitle: "Where it runs",
    platformWeb: "Web admin panel",
    platformWebDesc: "Manage every branch from your browser.",
    platformAndroid: "Android",
    platformAndroidDesc: "Adisora Business — on Google Play.",
    platformIos: "iOS",
    platformIosDesc: "Adisora Business App — on the App Store.",
    mobileAvailability: "Mobile apps are currently downloadable in Latvia and Turkey.",
    ctaTitle: "Take Adisora for a spin",
    ctaText:
      "Request a demo or grab the app on the App Store or Google Play and try it end-to-end.",
    visitWebsite: "Visit adisora.com",
    getOnPlay: "Get it on Google Play",
    getOnAppStore: "Download on the App Store",
  },
  lv: {
    badge: "Restorānu SaaS",
    title: "Adisora",
    subtitle: "Restorāna operācijas — vienuviet.",
    intro:
      "Adisora ir moderna, daudzvalodu platforma, kas apvieno ēdienkartes, pasūtījumu, virtuves un norēķinu operācijas vienā vietā — radīta restorānu grupām, kuras vēlas augt, nezaudējot kontroli.",
    whoTitle: "Kam paredzēts",
    whoText:
      "Restorānu grupām, kafejnīcu tīkliem un F&B operatoriem ar vairāk nekā vienu filiāli, kas vēlas digitalizēt ikdienas darbību. Tas ir mūsu pirmais B2B SaaS produkts ārpus SAP ekosistēmas.",
    capTitle: "Galvenās iespējas",
    platformTitle: "Kur tas darbojas",
    platformWeb: "Web administrācijas panelis",
    platformWebDesc: "Pārvaldiet katru filiāli no pārlūkprogrammas.",
    platformAndroid: "Android",
    platformAndroidDesc: "Adisora Business — Google Play veikalā.",
    platformIos: "iOS",
    platformIosDesc: "Adisora Business App — App Store veikalā.",
    mobileAvailability: "Mobilās lietotnes pašlaik ir lejupielādējamas Latvijā un Turcijā.",
    ctaTitle: "Izmēģiniet Adisora",
    ctaText:
      "Pieprasiet demonstrāciju vai lejupielādējiet lietotni no App Store vai Google Play un izmēģiniet pilnībā.",
    visitWebsite: "Apmeklēt adisora.com",
    getOnPlay: "Lejupielādēt no Google Play",
    getOnAppStore: "Lejupielādēt no App Store",
  },
  de: {
    badge: "Restaurant-SaaS",
    title: "Adisora",
    subtitle: "Gastronomie-Betrieb — alles an einem Ort.",
    intro:
      "Adisora ist die moderne, mehrsprachige Plattform, die Speisekarte, Bestellungen, Küche und Abrechnung in einer Anwendung vereint — entwickelt für Gastronomie-Gruppen, die wachsen wollen, ohne die Kontrolle zu verlieren.",
    whoTitle: "Für wen",
    whoText:
      "Restaurantgruppen, Café-Ketten und F&B-Betreiber mit mehr als einer Filiale, die ihren Tagesbetrieb digitalisieren möchten. Es ist unser erstes B2B-SaaS-Produkt außerhalb des SAP-Ökosystems.",
    capTitle: "Kernfunktionen",
    platformTitle: "Wo es läuft",
    platformWeb: "Web-Adminpanel",
    platformWebDesc: "Verwalten Sie jede Filiale aus dem Browser.",
    platformAndroid: "Android",
    platformAndroidDesc: "Adisora Business — bei Google Play.",
    platformIos: "iOS",
    platformIosDesc: "Adisora Business App — im App Store.",
    mobileAvailability: "Die mobilen Apps sind derzeit in Lettland und der Türkei verfügbar.",
    ctaTitle: "Adisora ausprobieren",
    ctaText:
      "Demo anfragen oder die App direkt aus dem App Store oder Google Play laden und durchtesten.",
    visitWebsite: "adisora.com besuchen",
    getOnPlay: "Bei Google Play laden",
    getOnAppStore: "Im App Store laden",
  },
};

export default function AdisoraPage() {
  const { locale } = useI18n();
  const t = content[locale];

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6">
              <Store size={16} />
              {t.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">{t.subtitle}</p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              <a
                href={ADISORA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              >
                {t.visitWebsite}
                <ExternalLink size={18} />
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                <Apple size={18} />
                {t.getOnAppStore}
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                <Smartphone size={18} />
                {t.getOnPlay}
              </a>
            </div>
            <p className="mt-4 text-sm text-white/50">{t.mobileAvailability}</p>
          </MotionDiv>
        </div>
      </section>

      {/* Intro + Who */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <MotionDiv variant="slideInLeft">
              <p className="text-lg text-text-light leading-relaxed">{t.intro}</p>
            </MotionDiv>
            <MotionDiv variant="slideInRight">
              <h2 className="text-2xl font-bold text-text mb-6">{t.whoTitle}</h2>
              <p className="text-text-light leading-relaxed mb-6">{t.whoText}</p>
              <a
                href={ADISORA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                {t.visitWebsite}
                <ArrowRight size={16} />
              </a>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text">
              {t.capTitle}
            </h2>
          </MotionDiv>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features[locale].map(({ icon: Icon, title, desc }, i) => (
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

      {/* Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text">
              {t.platformTitle}
            </h2>
          </MotionDiv>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <MotionItem>
              <a
                href={ADISORA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-8 bg-white rounded-2xl border border-light-2 hover:shadow-xl hover:border-primary/30 transition-all h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Globe2 size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text">{t.platformWeb}</h3>
                </div>
                <p className="text-text-light mb-4">{t.platformWebDesc}</p>
                <span className="inline-flex items-center gap-2 text-primary font-medium">
                  adisora.com
                  <ExternalLink size={14} />
                </span>
              </a>
            </MotionItem>
            <MotionItem>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-8 bg-white rounded-2xl border border-light-2 hover:shadow-xl hover:border-primary/30 transition-all h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                    <Apple size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text">{t.platformIos}</h3>
                </div>
                <p className="text-text-light mb-4">{t.platformIosDesc}</p>
                <span className="inline-flex items-center gap-2 text-primary font-medium">
                  App Store
                  <ExternalLink size={14} />
                </span>
              </a>
            </MotionItem>
            <MotionItem>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-8 bg-white rounded-2xl border border-light-2 hover:shadow-xl hover:border-primary/30 transition-all h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <Smartphone size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text">{t.platformAndroid}</h3>
                </div>
                <p className="text-text-light mb-4">{t.platformAndroidDesc}</p>
                <span className="inline-flex items-center gap-2 text-primary font-medium">
                  Google Play
                  <ExternalLink size={14} />
                </span>
              </a>
            </MotionItem>
          </StaggerContainer>
          <p className="mt-8 text-center text-sm text-text-light">
            {t.mobileAvailability}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionDiv>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-text-light mb-8 max-w-2xl mx-auto">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a
                href={ADISORA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-primary to-primary-light text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
              >
                {t.visitWebsite}
                <ExternalLink size={20} />
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-primary text-primary text-lg font-bold rounded-xl hover:bg-primary/5 transition-all"
              >
                <Apple size={20} />
                {t.getOnAppStore}
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-primary text-primary text-lg font-bold rounded-xl hover:bg-primary/5 transition-all"
              >
                <Smartphone size={20} />
                {t.getOnPlay}
              </a>
            </div>
            <p className="mt-6 text-sm text-text-light">{t.mobileAvailability}</p>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}
