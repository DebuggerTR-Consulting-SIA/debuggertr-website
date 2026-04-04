import type { NextConfig } from "next";

// In development (npm run dev): no output:export → API routes work (admin panel)
// In production (npm run build): output:export → static files for deployment
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  ...(isDev ? {} : { output: "export" }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
