import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import CustomCursor from "@/components/shared/CustomCursor";
import Chatbot from "@/components/shared/Chatbot";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "BabyBloom — Modern Maternal & Child Healthcare",
  description:
    "Track vaccinations, manage health records, predict risks with AI, and monitor your child's growth — all in one beautiful dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmSerifDisplay.variable} antialiased bg-[#FDF7F8] text-[#1A0A0D]`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Providers>
          <CustomCursor />
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
