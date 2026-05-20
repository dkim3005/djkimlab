import type { Metadata } from "next";
import StarField from "./components/StarField";
import "./globals.css";

const SITE_URL = "https://djkimlab.com";
const TITLE = "Dongjin Kim — AI & Infrastructure Engineer";
const DESCRIPTION =
  "Portfolio and technical wiki by Dongjin Kim. AI & ML Engineer — MLOps, LLM pipelines, and full-stack ML applications. M.S. CS (AI), Georgia Tech.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · djkimlab",
  },
  description: DESCRIPTION,
  applicationName: "djkimlab",
  authors: [{ name: "Dongjin Kim", url: SITE_URL }],
  creator: "Dongjin Kim",
  keywords: [
    "Dongjin Kim",
    "djkimlab",
    "AI engineer",
    "ML engineer",
    "MLOps",
    "LLM pipelines",
    "DevOps",
    "Georgia Tech",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "djkimlab",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dongjin Kim",
  url: SITE_URL,
  email: "djkim3005@gmail.com",
  jobTitle: "AI & ML Engineer",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Georgia Institute of Technology" },
    { "@type": "CollegeOrUniversity", name: "Korea National Open University" },
    { "@type": "CollegeOrUniversity", name: "Kyung Hee University" },
  ],
  sameAs: [
    "https://github.com/dkim3005",
    "https://linkedin.com/in/dongjink",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="alternate"
          type="application/atom+xml"
          title="djkimlab wiki"
          href="/wiki/feed.xml"
        />
      </head>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <StarField />
        <div className="relative z-10 flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
