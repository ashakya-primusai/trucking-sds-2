import type { Metadata } from "next";
import enroutLogo from "@/assets/enrout_logo.png";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Inter,
  Playfair_Display,
  Poppins,
  DM_Serif_Display,
  Sora,
} from "next/font/google";
import "./globals.css";
import { LinkedInInsightTag } from "@/components/linkedin-insight-tag";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Enrout Ops — Make your dispatchers superhuman",
  description:
    "The AI-powered dispatch platform built for trucking teams who need to move faster, with less.",
  icons: {
    icon: enroutLogo.src,
    apple: enroutLogo.src,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${inter.variable} ${playfair.variable} ${dmSerif.variable} ${sora.variable} ${poppins.variable} antialiased`}
    >
      <body>
        {children}
        <LinkedInInsightTag />
      </body>
    </html>
  );
}
