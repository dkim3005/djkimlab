import type { Metadata } from "next";
import StarField from "./components/StarField";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dongjin Kim — AI & Infrastructure Engineer",
  description:
    "Portfolio and technical wiki by Dongjin Kim. AI/ML, DevOps, and full-stack projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <StarField />
        <div className="relative z-10 flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
