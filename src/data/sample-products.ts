/**
 * Productos de ejemplo de la marca ficticia, usados mientras no hay conexión con Shopify
 * y como datos estables para pruebas y desarrollo local.
 *
 * Todos los nombres son propios de Café Ladera; no corresponden a productos reales.
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
    category: "coffee",
    flavorNotes: ["Chocolate", "Nuez"],
    price: { amount: "220.00", currencyCode: "MXN" },
    compareAtPrice: { amount: "260.00", currencyCode: "MXN" },
    availableForSale: true,
  },
  {
    id: "sample-2",
    handle: "espresso-veracruz",
    title: "Espresso Veracruz",
    description: "Mezcla de tueste oscuro pensada para espresso, con cuerpo intenso. Bolsa de 340 g.",
    category: "coffee",
    flavorNotes: ["Cacao", "Caramelo oscuro"],
    price: { amount: "195.00", currencyCode: "MXN" },
    availableForSale: true,
  },
  {
    id: "sample-3",
    handle: "descafeinado-oaxaca",
    title: "Descafeinado Oaxaca",
    description: "Descafeinado por proceso de agua, suave y dulce. Bolsa de 340 g.",
    category: "coffee",
    flavorNotes: ["Panela", "Frutos rojos suaves"],
    price: { amount: "210.00", currencyCode: "MXN" },
    availableForSale: false,
  },
  {
    id: "sample-4",
    handle: "cafetera-espresso-ladera-pro",
    title: "Cafetera de espresso Ladera Pro",
    description:
      "Cafetera manual con bomba de 15 bares, portafiltro de 58 mm y vaporizador para leche.",
    category: "machines",
    flavorNotes: [],
    price: { amount: "8999.00", currencyCode: "MXN" },
    compareAtPrice: { amount: "10999.00", currencyCode: "MXN" },
    colorOptions: [
      { name: "Grafito", hex: "#3A3A3A" },
      { name: "Acero", hex: "#B8B8B8" },
      { name: "Crema", hex: "#EFE6D2" },
    ],
    availableForSale: true,
  },
  {
    id: "sample-5",
    handle: "cafetera-de-goteo-ladera-filtro",
    title: "Cafetera de goteo Ladera Filtro",
    description: "Prepara hasta 10 tazas con control de temperatura y jarra térmica de acero.",
    category: "machines",
    flavorNotes: [],
    price: { amount: "2499.00", currencyCode: "MXN" },
    colorOptions: [
      { name: "Negro", hex: "#1C1C1C" },
      { name: "Blanco", hex: "#F4F4F4" },
    ],
    availableForSale: true,
  },
  {
    id: "sample-6",
    handle: "espumador-ladera-nube",
    title: "Espumador de leche Ladera Nube",
    description: "Espuma fría o caliente en un minuto para capuchinos y lattes en casa.",
    category: "accessories",
    flavorNotes: [],
    price: { amount: "1299.00", currencyCode: "MXN" },
    compareAtPrice: { amount: "1599.00", currencyCode: "MXN" },
    availableForSale: true,
  },
  {
    id: "sample-7",
    handle: "molino-ladera-fino",
    title: "Molino de muelas Ladera Fino",
    description: "Molino eléctrico de muelas cónicas con 30 niveles, de espresso a prensa francesa.",
    category: "accessories",
    flavorNotes: [],
    price: { amount: "3299.00", currencyCode: "MXN" },
    availableForSale: true,
  },
  {
    id: "sample-8",
    handle: "juego-de-tazas-ladera",
    title: "Juego de tazas Ladera",
    description: "Dos tazas de cerámica de 90 ml con plato, pensadas para espresso.",
    category: "accessories",
    flavorNotes: [],
    price: { amount: "449.00", currencyCode: "MXN" },
    compareAtPrice: { amount: "549.00", currencyCode: "MXN" },
    availableForSale: false,
  },
];
