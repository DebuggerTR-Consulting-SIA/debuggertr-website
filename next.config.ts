import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/references",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/cvs/:file(.*\\.docx)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noarchive",
          },
          {
            key: "Content-Disposition",
            value: 'attachment; filename=":file"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
