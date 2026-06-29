import { ReactNode } from "react";
import "./globals.css";
import AppHeader from "@/components/app-header";
import { ClerkProvider } from "@clerk/nextjs";
import { Comic_Neue } from "next/font/google";

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={comicNeue.className}>
      <ClerkProvider>
        <body className="scheme-dark bg-[#1c1c1e] text-white">
          <AppHeader />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
