import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  reactCompiler: true,
  serverExternalPackages: ["@supabase/supabase-js", "child_process", "util"]
};

export default nextConfig;
