import Footer from "@/components/footer";
import PathnameFilter from "@/components/pathname-filter";
import type { SimpleLink } from "@/components/link";
import Navbar from "@/components/navbar";
import PreviewBanner from "@/components/preview-banner";
import { jetbrainsMono, pretendardStdVariable } from "@/components/text";
import { DOCS_DIRECTORY } from "@/lib/docs/config";
import { loadDocsNavTreeData } from "@/lib/docs/navigation";
import "@/styles/globals.css";
import classNames from "classnames";
import type { Metadata } from "next";
import s from "./layout.module.css";

// Navigation links for our nav bars. This currently applies to both
// the sidebar and footer links equally.
const navLinks: Array<SimpleLink> = [
  {
    text: "ドキュメント",
    href: "/docs",
  },
  {
    text: "Discord",
    href: "https://discord.gg/ghostty",
  },
  {
    text: "GitHub",
    href: "https://github.com/ghostty-org/ghostty",
  },
];

// SITE_TITLE names this site as an unofficial translation of the Ghostty docs.
const SITE_TITLE = "Ghostty ドキュメント 日本語訳（非公式）";

// SITE_URL is this deployment's public URL, taken from Vercel's build env.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// OFFICIAL_DOWNLOAD_URL points downloads at the official Ghostty site.
const OFFICIAL_DOWNLOAD_URL = "https://ghostty.org/download";

// The paths that don't have the navbar/footer "chrome".
const NO_CHROME_PATHS = ["/"];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description:
    "Ghostty は、プラットフォームネイティブの UI と GPU アクセラレーションを使う、高速で多機能なクロスプラットフォームのターミナルエミュレーターです。",
  openGraph: {
    type: "website",
    siteName: SITE_TITLE,
    url: SITE_URL,
    images: [
      {
        url: "/social-share-card.jpg",
        width: 1800,
        height: 3200,
      },
    ],
  },
  twitter: {
    images: ["/social-share-card.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  other: {
    "darkreader-lock": "",
  },
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load the docs tree once at the root so navbar/mobile docs navigation
  // can be rendered across the site.
  const docsNavTree = await loadDocsNavTreeData(DOCS_DIRECTORY, "");
  const currentYear = new Date().getFullYear();

  return (
    <html lang="ja">
      <body
        className={classNames(
          s.rootLayout,
          pretendardStdVariable.variable,
          jetbrainsMono.variable,
        )}
      >
        <PreviewBanner />
        <PathnameFilter paths={NO_CHROME_PATHS} mode="exclude">
          <Navbar
            links={navLinks}
            docsNavTree={docsNavTree}
            cta={{
              href: OFFICIAL_DOWNLOAD_URL,
              text: "ダウンロード（公式）",
            }}
          />
        </PathnameFilter>
        {children}
        <PathnameFilter paths={NO_CHROME_PATHS} mode="exclude">
          <Footer
            links={[
              ...navLinks,
              {
                text: "ダウンロード（公式）",
                href: OFFICIAL_DOWNLOAD_URL,
              },
            ]}
            copyright={`原文 © ${currentYear} Ghostty（MIT License）。このサイトは非公式の日本語訳です。`}
          />
        </PathnameFilter>
      </body>
    </html>
  );
}
