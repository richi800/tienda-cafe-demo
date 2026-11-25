/**
 * Productos de ejemplo de la marca ficticia, usados mientras no hay conexión con Shopify
 * y como datos estables para pruebas y desarrollo local.
 *
 * @packageDocumentation
 */

import type { Product } from "@/domain/product";

/** Catálogo de ejemplo. Los precios están en pesos mexicanos. */
export const sampleProducts: readonly Product[] = [
  {
    id: "sample-1",
    handle: "cafe-de-altura-chiapas",
    title: "Café de altura Chiapas",
    description: "Grano entero de tueste medio con notas de chocolate y nuez. Bolsa de 340 g.",
    flavorNotes: ["Chocolate", "Nuez"],
    price: { amount: "220.00", currencyCode: "MXN" },
    availableForSale: true,
  },
  {
    id: "sample-2",
    handle: "espresso-veracruz",
    title: "Espresso Veracruz",
    description: "Mezcla de tueste oscuro pensada para espresso, con cuerpo intenso. Bolsa de 340 g.",
    flavorNotes: ["Cacao", "Caramelo oscuro"],
    price: { amount: "195.00", currencyCode: "MXN" },
    availableForSale: true,
  },
  {
    id: "sample-3",
    handle: "descafeinado-oaxaca",
    title: "Descafeinado Oaxaca",
    description: "Descafeinado por proceso de agua, suave y dulce. Bolsa de 340 g.",
    flavorNotes: ["Panela", "Frutos rojos suaves"],
    price: { amount: "210.00", currencyCode: "MXN" },
    availableForSale: false,
  },
];
