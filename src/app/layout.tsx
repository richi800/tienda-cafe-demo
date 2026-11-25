import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";

import { DemoNotice } from "@/components/DemoNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { resolveBrandLogo } from "@/lib/brand/logo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Café Ladera | Tienda de demostración",
  description:
    "Tienda de café de demostración de una marca ficticia. No se realizan ventas reales.",
};

/**
 * Estructura común a todas las páginas: idioma, tipografías, enlace para saltar al
 * contenido, aviso de demostración, encabezado y pie de página.
 *
 * @param props - Propiedades del layout raíz.
 * @param props.children - Contenido de la página activa.
 * @returns El documento HTML de la aplicación.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  // La comprobación del archivo es síncrona, así que se resuelve al prerenderizar y
  // queda incluida en el contenido estático de la página.
  const logoSrc = resolveBrandLogo();

  return (
    <html lang="es" className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only rounded-md bg-cream-50 px-4 py-3 font-semibold text-coffee-900 focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10"
        >
          Saltar al contenido
        </a>
        <DemoNotice />
        <Header logoSrc={logoSrc} />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
