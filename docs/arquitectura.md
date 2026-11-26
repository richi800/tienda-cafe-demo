# Arquitectura

Este documento describe cómo está organizado el proyecto, cómo fluyen los datos y por qué se
tomaron las decisiones técnicas principales.

## Estructura de carpetas

| Carpeta              | Responsabilidad                                                                 |
| -------------------- | ------------------------------------------------------------------------------- |
| `src/app`            | Rutas de Next.js (App Router): layouts, páginas y, más adelante, route handlers. |
| `src/components`     | Componentes de interfaz reutilizables. Reciben datos ya preparados por props.   |
| `src/domain`         | Tipos y reglas de negocio puras, sin React, sin Next.js y sin acceso a red.     |
| `src/lib`            | Clientes de APIs externas y utilidades de infraestructura (por ejemplo Shopify y la resolución del logo en `src/lib/brand`). |
| `src/data`           | Datos de ejemplo para desarrollo local y pruebas.                               |
| `public/brand`       | Recursos de marca servidos tal cual, como el logo (`logo.svg`).                 |
| `docs`               | Documentación técnica del proyecto.                                             |
| `.github`            | Workflows de CI y CodeQL, Dependabot y plantilla de pull request.               |

Las pruebas se ubican junto al archivo que prueban, con el sufijo `.test.ts` (o `.test.tsx` para
componentes).

### Reglas de dependencia

- `src/domain` no importa de ninguna otra carpeta del proyecto.
- `src/lib` y `src/data` pueden importar de `src/domain`, pero no de `src/components` ni `src/app`.
- `src/components` puede importar de `src/domain`.
- `src/app` compone todo lo anterior.

Así las reglas de negocio se prueban sin levantar la aplicación, y cambiar la fuente de datos
no obliga a tocar la interfaz.

## Flujo de datos

1. Una página de `src/app` (Server Component) solicita datos, por ejemplo la lista de productos.
2. Un módulo de `src/lib/shopify` hace la consulta GraphQL a la Storefront API usando la
   configuración que entrega `readShopifyConfig` (`src/lib/shopify/config.ts`).
3. La respuesta se adapta a los tipos de `src/domain` (`Product`, `Money`).
4. La página pasa esos objetos a los componentes de `src/components`, que solo se encargan de
   mostrarlos; por ejemplo, el precio se muestra con `formatPrice` de `src/domain/money.ts`.

Mientras no exista la conexión con Shopify, `src/data/sample-products.ts` ofrece productos con la
misma forma, de modo que la interfaz se puede construir sin depender de la API.

`Product` incluye `flavorNotes` (notas de sabor como lista de textos). En Shopify provendrán de un
metafield del producto; el adaptador de `src/lib/shopify` deberá convertirlo a esta forma.

Además, `Product` tiene:

- `category` (`"coffee" | "machines" | "accessories"`): familia del producto. En Shopify se
  derivará del tipo de producto o de la colección.
- `compareAtPrice` opcional: precio antes del descuento; equivale a `compareAtPrice` de la
  variante en la Storefront API.
- `colorOptions` opcional: colores disponibles (`name` y `hex`). En Shopify vendrán de la opción
  "Color" de las variantes y de un metafield con el valor hexadecimal.

`getDiscountPercentage` (`src/domain/product.ts`) calcula el porcentaje de descuento como regla
pura: redondea hacia abajo para no anunciar más descuento del real, devuelve 0 si no hay precio
anterior mayor que el actual y lanza `RangeError` si los montos no son numéricos o las monedas no
coinciden. Valida los montos con `parseAmount` de `src/domain/money.ts`, la misma función que usa
`formatPrice`.

Los avisos de la franja superior siguen el mismo patrón: el tipo `Announcement` vive en
`src/domain/announcement.ts` y los datos de ejemplo en `src/data/announcements.ts`, junto con las
constantes de las promociones (umbral de envío gratis y descuento de suscripción) que reutiliza
la sección de términos de la portada.

Las preguntas frecuentes siguen el mismo patrón: tipo `FaqItem` en `src/domain/faq.ts` y datos en
`src/data/faqs.ts`. Las secciones a las que saltan el hero y el sub-header se definen una sola vez
en `src/components/store-sections.ts`, igual que el menú principal en `main-navigation.ts`.

### Logo de la marca

El layout raíz llama a `resolveBrandLogo` (`src/lib/brand/logo.ts`), que comprueba con
`fs.existsSync` si existe `public/brand/logo.svg` y entrega la ruta o `null` al `Header` por
props. La comprobación es síncrona, por lo que con `cacheComponents` se resuelve durante el
prerenderizado y queda en el contenido estático: si el dueño agrega el logo, aparece en el
siguiente build. La función de existencia se inyecta para probarla sin tocar el disco.

## Decisiones técnicas

- **App Router y Server Components.** Las consultas a Shopify se hacen en el servidor; el token
  de la Storefront API nunca llega al navegador y se envía menos JavaScript al cliente.
- **Dominio independiente.** Los tipos del dominio reflejan la forma de la Storefront API
  (`Money` equivale a `MoneyV2`) para minimizar transformaciones, pero no dependen de ella.
- **Configuración validada al usarse.** `readShopifyConfig` recibe el entorno como parámetro y
  lista todas las variables faltantes en un solo error. Solo se invoca cuando hace falta hablar
  con Shopify, por lo que el build y la CI funcionan sin secretos.
- **TypeScript estricto** con `noUncheckedIndexedAccess` para detectar accesos inseguros en tiempo
  de compilación.
- **Vitest** por su velocidad y compatibilidad nativa con TypeScript y ESM; resuelve el alias `@/`
  directamente desde `tsconfig.json`. El entorno por defecto es `node`: los componentes sin
  estado se prueban con `renderToStaticMarkup` de `react-dom/server` revisando el HTML.
- **jsdom y Testing Library solo donde hay interacción.** Los archivos que prueban clics, teclado
  o foco (`MobileMenu.interaction.test.tsx`, `Faq`, `SectionNav`, `HelpWidget`) declaran
  `// @vitest-environment jsdom` al inicio y usan `@testing-library/react` y `user-event`. Así el
  resto de la suite sigue en `node`, que es más rápido. `IntersectionObserver` se simula en la
  prueba cuando hace falta.
- **Componentes de cliente mínimos.** Llevan `"use client"` solo las hojas interactivas:
  `AnnouncementBar`, `MobileMenu`, `HeroTabs` y `SectionNav` (sección visible con
  `useActiveSection`), `Faq` (Mostrar más) y `HelpWidget` (diálogo). `Header`, `Hero`,
  `CategorySection`, `ProductCard` y `Footer` siguen siendo Server Components. La portada
  sigue prerenderizándose como contenido estático.
- **Sistema de diseño con tokens de Tailwind CSS v4.** Colores, radios, espacios semánticos y
  tipografías se definen en `@theme` de `src/app/globals.css`, con los colores por defecto
  desactivados. La referencia completa está en [`diseno.md`](diseno.md).
- **Imágenes sin optimizador.** `images.unoptimized` en `next.config.ts` evita consumir la cuota
  del optimizador de imágenes de Vercel en el plan gratuito; el espacio de cada imagen se reserva
  para evitar saltos de diseño.
- **GitHub Actions** ejecuta lint, pruebas, build y CodeQL en cada pull request y en cada push a
  `main`. El flujo completo está en [`ci-cd.md`](ci-cd.md).
- **Vercel (plan gratuito)** como destino de despliegue, por su integración directa con Next.js.
