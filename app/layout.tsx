// import type { Metadata } from "next";
// import { Inter, Noto_Sans_Thai } from "next/font/google";
// import "./globals.css";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   display: "swap",
// });

// const notoSansThai = Noto_Sans_Thai({
//   variable: "--font-noto-thai",
//   subsets: ["thai", "latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "LEWLEW / CGM48 — Official Website",
//   description:
//     "Official artist showcase for LEWLEW / CGM48. Music, works, gallery and moments.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="th" data-scroll-behavior="smooth">
//       <body className={`${inter.variable} ${notoSansThai.variable}`}>
//         {children}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEWLEW / CGM48 — Official Website",
  description:
    "Official artist showcase for LEWLEW / CGM48. Music, works, gallery and moments.",
};

const themeInitScript = `
(function () {
  try {
    var savedTheme = localStorage.getItem("lewlew-theme");
    var theme;

    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
    } else {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" data-scroll-behavior="smooth" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} ${notoSansThai.variable}`}>
        {children}
      </body>
    </html>
  );
}