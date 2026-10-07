import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEWLEW / CGM48 — Official Website",
  description:
    "Official artist showcase for LEWLEW / CGM48. Music, works, gallery and moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}