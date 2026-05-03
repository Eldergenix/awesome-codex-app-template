import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Configure Your Template — Enterprise Monorepo",
  description:
    "Interactive setup wizard to configure your monorepo template based on your app type, layout, and design preferences.",
  robots: { index: false, follow: false },
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={inter.variable}
      style={{
        minHeight: "100vh",
        backgroundColor: "#010102",
        color: "#f7f8f8",
        fontFamily: "var(--font-inter), -apple-system, system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
