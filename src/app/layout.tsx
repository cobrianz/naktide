import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const jost = localFont({
  src: [
    {
      path: "../../public/fonts/jost-latin.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/fonts/jost-latin-ext.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NakTide Expeditions",
  description: "Curating Kenya and East Africa's most intentional safari experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${jost.className}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-on-background" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
