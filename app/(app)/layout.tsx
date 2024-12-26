import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import ProvidersWrapper from "./ProvidersWrapper";
import Navbar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Список ПЭВМ | Главная"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en,ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersWrapper>
        <Navbar />
    <div className="h-screen flex flex-col justify-between">
          {children}
    </div>
          </ProvidersWrapper>
      </body>
    </html>
  );
}