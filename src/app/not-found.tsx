import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark via-dark-light to-primary-dark">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 text-center">
        <Link href="/" className="inline-block mb-12">
          <Image
            src="/images/logo-white.png"
            alt="DebuggerTR Consulting"
            width={220}
            height={60}
            priority
          />
        </Link>

        <p className="text-[10rem] sm:text-[12rem] leading-none font-bold bg-gradient-to-r from-primary-light to-[#4FC3F7] bg-clip-text text-transparent">
          404
        </p>

        <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-2 mb-4">
          Page not found
        </h1>
        <p className="text-white/70 text-base sm:text-lg max-w-md mx-auto mb-10">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
