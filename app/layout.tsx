import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "./ProvidersWrapper";
import Navbar from "@/components/navbar";


const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
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
    <html lang="en">
      <body className={nunito.className}>

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
