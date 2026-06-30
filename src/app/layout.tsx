import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SUSPENDED — Premium Streetwear & Athleisure",
    template: "%s | SUSPENDED",
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
  ],
  authors: [{ name: "SUSPENDED" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SUSPENDED",
    title: "SUSPENDED — Premium Streetwear & Athleisure",
    description:
      "Discover premium streetwear and athleisure designed for those who move differently.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUSPENDED — Premium Streetwear & Athleisure",
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
