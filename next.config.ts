import type { NextConfig } from "next";

const canonicalHost = "worldhorse.org";

/**
 * Legacy domains still attached in Vercel → send all traffic to the canonical host.
 * (Vercel "Bulk redirects" / `vercel redirects` CLI require Pro+; this works on Hobby.)
 */
const legacyHosts = [
  "worldhorseorganization.org",
  "www.worldhorseorganization.org",
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `https://${canonicalHost}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
