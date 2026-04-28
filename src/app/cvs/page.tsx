import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import cvsData from "@/data/cvs.json";

export const dynamic = "force-static";

interface CvEntry {
  id: string;
  name: string;
  slug: string;
  module: string;
  rate?: string;
  rateCurrency?: string;
  ratePeriod?: string;
  uploadedAt?: string;
}

const currencySymbol = (code?: string) =>
  code === "EUR" ? "€" : code === "USD" ? "$" : code === "GBP" ? "£" : code ?? "";

const periodLabel = (period?: string) =>
  period === "hourly" ? "/ hour" : period === "daily" ? "/ day" : period === "monthly" ? "/ month" : "";

export default function CvsIndexPage() {
  const cvs = (cvsData as CvEntry[])
    .slice()
    .sort((a, b) => (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? ""));

  return (
    <>
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Consultants
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Senior SAP EWM and ABAP specialists ready for your next project.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cvs.length === 0 ? (
            <p className="text-center text-text-light">
              No consultant profiles available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvs.map((cv) => (
                <Link
                  key={cv.id}
                  href={`/cvs/${cv.slug}`}
                  className="group flex flex-col p-6 rounded-2xl bg-white border border-light-2 hover:border-primary/40 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shrink-0">
                      <Briefcase size={22} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-text truncate">
                        {cv.name}
                      </h2>
                      <p className="text-xs uppercase tracking-wider text-text-light">
                        SAP {cv.module}
                      </p>
                    </div>
                  </div>

                  {cv.rate && (
                    <div className="mb-5">
                      <p className="text-2xl font-bold text-primary">
                        {currencySymbol(cv.rateCurrency)}
                        {cv.rate}
                        <span className="text-sm font-medium text-text-light ml-1">
                          {periodLabel(cv.ratePeriod)}
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    View profile
                    <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
