import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
}

const assetPrefix = isGithubActions ? `/${repo}/` : "";
const basePath = isGithubActions ? `/${repo}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  reactCompiler: true,
  serverExternalPackages: ["@supabase/supabase-js", "child_process", "util"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  ...(process.env.STATIC_EXPORT === "true" && {
    output: "export",
    assetPrefix,
    basePath,
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;
