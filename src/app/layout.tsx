import type { Metadata } from "next";
import { Barlow, Geist_Mono, Noto_Serif, Headland_One } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const body = Barlow({
  display: "swap",
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const brand = Headland_One({
  display: "swap",
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400"],
});

const serif = Noto_Serif({
  display: "swap",
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inkwell",
  description:
    "Inkwell is a platform for writing, reading, and sharing ideas. Find inspiring stories, share your thoughts, and join a community of passionate writers and readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${body.variable} ${mono.variable} ${serif.variable} ${brand.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
