import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://djkimlab.com";
const TITLE = "Dongjin Kim — Healthcare AI & Digital Health Engineer";
const DESCRIPTION =
  "Dongjin Kim builds grounded, evaluated AI tools for frontline operations and healthcare — production systems, medical imaging AI, and LLM workflows. M.S. CS (AI), Georgia Tech. Toronto.";

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
    "healthcare AI",
    "digital health",
    "clinical informatics",
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
  jobTitle: "Healthcare AI & Digital Health Engineer",
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
        <div className="relative z-10 flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
