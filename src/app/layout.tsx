import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { AnnouncementBar } from "@/components/AnnouncementBar";
import { DemoNotice } from "@/components/DemoNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { announcements } from "@/data/announcements";
import { resolveBrandLogo } from "@/lib/brand/logo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Café Ladera | Tienda de demostración",
  description:
    "Tienda de café de demostración de una marca ficticia. No se realizan ventas reales.",
};

/**
 * Estructura común a todas las páginas: idioma, tipografías, enlace para saltar al
 * contenido, aviso de demostración, franja de avisos, encabezado y pie de página.
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
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/*
          Al recibir foco, el enlace aparece como franja completa sobre fondo blanco y el
          contorno se dibuja hacia dentro: así el foco ink-900 nunca queda sobre el fondo
          oscuro del aviso de demostración, donde sería invisible.
        */}
        <a
          href="#contenido"
          className="sr-only bg-white font-semibold text-ink-900 underline underline-offset-4 focus:not-sr-only focus:flex focus:min-h-11 focus:items-center focus:px-gutter focus-visible:-outline-offset-4"
        >
          Saltar al contenido
        </a>
        <DemoNotice />
        <AnnouncementBar announcements={announcements} termsHref="/#terminos" />
        <Header logoSrc={logoSrc} />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
