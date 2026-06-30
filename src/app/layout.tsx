import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zero Lifestyle — Premium Streetwear & Athleisure",
    template: "%s | Zero Lifestyle",
  },
  description:
    "Discover premium streetwear and athleisure designed for those who move differently. Built for comfort, styled for the culture.",
  keywords: [
    "streetwear",
    "athleisure",
    "premium clothing",
    "urban fashion",
    "hoodies",
    "joggers",
    "tees",
  authors: [{ name: "Zero Lifestyle" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zero Lifestyle",
    title: "Zero Lifestyle — Premium Streetwear & Athleisure",
    description:
      "Discover premium streetwear and athleisure designed for those who move differently.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Lifestyle — Premium Streetwear & Athleisure",
    description:
      "Discover premium streetwear and athleisure designed for those who move differently.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
