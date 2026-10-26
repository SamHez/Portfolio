import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL, pageMetadata } from "@/lib/seo";
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
import { isPreviewDeployment } from "@/lib/deployment";
import "./globals.css";
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});
const verification = process.env.GOOGLE_SITE_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
export const metadata: Metadata = {
  ...pageMetadata("/"),
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  ...(verification && /^[A-Za-z0-9_-]{10,200}$/.test(verification)
    ? { verification: { google: verification } }
    : {}),
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* Extensions such as Grammarly add body attributes before hydration.
          Scope this escape hatch to the body; descendants still report mismatches. */}
      <body
        className={`${outfit.variable} ${space.variable} ${mono.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ScrollToTop />
          {!isPreviewDeployment && gaId && /^G-[A-Z0-9]{6,20}$/.test(gaId) && (
            <AnalyticsConsent measurementId={gaId} />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
