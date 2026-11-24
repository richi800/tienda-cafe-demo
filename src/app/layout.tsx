import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { DemoNotice } from "@/components/DemoNotice";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Café Ladera | Tienda de demostración",
  description:
    "Tienda de café de demostración de una marca ficticia. No se realizan ventas reales.",
};

/**
 * Estructura común a todas las páginas: idioma, tipografías y aviso de demostración.
 *
 * @param props - Propiedades del layout raíz.
 * @param props.children - Contenido de la página activa.
 * @returns El documento HTML de la aplicación.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <DemoNotice />
        {children}
      </body>
    </html>
  );
}
