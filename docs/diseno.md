# Sistema de diseño

Referencia visual de Café Ladera. Los tokens viven en `src/app/globals.css` (bloque `@theme` de
Tailwind CSS v4) y este documento explica sus valores y cómo usarlos. Si cambia un token, se
actualizan ambos archivos en el mismo cambio.

## Principios

- Pensado primero para celular: se revisa en 375, 768 y 1280 px.
- Una acción principal por pantalla (botón `primary`); el resto son acciones secundarias.
- WCAG 2.2 AA: contraste suficiente, foco visible, navegación con teclado y áreas táctiles
  de al menos 44 px.
- Ningún componente usa colores, radios ni sombras fuera de los tokens. Los colores, radios y
  sombras por defecto de Tailwind están desactivados (`--color-*: initial` y equivalentes), por
  lo que una clase como `bg-zinc-100` no genera estilos.

## Paleta

Solo hay tema claro. Valores y contrastes calculados con la fórmula de luminancia relativa
de WCAG 2.x.

| Token        | Valor     | Uso                                                       |
| ------------ | --------- | --------------------------------------------------------- |
| `coffee-900` | `#2B1A12` | Texto principal; fondo del pie y del aviso de demostración |
| `coffee-700` | `#5A3A28` | Texto secundario, bordes de botones secundarios            |
| `coffee-500` | `#8A5A3B` | Texto terciario y metadatos (solo sobre `cream-50`)        |
| `cream-50`   | `#FBF7F0` | Fondo de la página; texto sobre fondos oscuros             |
| `cream-100`  | `#F3EADB` | Fondo de tarjetas y secciones alternas                     |
| `cream-200`  | `#E6D7BF` | Bordes suaves y espacio reservado de imágenes              |
| `cherry-700` | `#9E2F1C` | Acento: botón principal, foco, indicador de página actual  |
| `cherry-800` | `#7F2516` | Hover y estado activo del acento                           |

### Contrastes

| Texto (o elemento) | Fondo        | Contraste | Resultado                         |
| ------------------ | ------------ | --------- | --------------------------------- |
| `coffee-900`       | `cream-50`   | 15.62:1   | AA y AAA                          |
| `coffee-900`       | `cream-100`  | 13.98:1   | AA y AAA                          |
| `coffee-900`       | `cream-200`  | 11.78:1   | AA y AAA                          |
| `coffee-700`       | `cream-50`   | 9.50:1    | AA y AAA                          |
| `coffee-700`       | `cream-100`  | 8.50:1    | AA y AAA                          |
| `coffee-700`       | `cream-200`  | 7.17:1    | AA y AAA                          |
| `coffee-500`       | `cream-50`   | 5.45:1    | AA                                |
| `coffee-500`       | `cream-100`  | 4.88:1    | AA                                |
| `coffee-500`       | `cream-200`  | 4.11:1    | No apto para texto normal         |
| `cream-50`         | `cherry-700` | 6.83:1    | AA                                |
| `cream-50`         | `cherry-800` | 9.03:1    | AA y AAA                          |
| `cherry-700`       | `cream-50`   | 6.83:1    | AA (texto y anillo de foco)       |
| `cherry-700`       | `cream-100`  | 6.12:1    | AA                                |
| `cream-50`         | `coffee-900` | 15.62:1   | AA y AAA                          |
| `cherry-700`       | `coffee-900` | 2.28:1    | No apto: ni texto ni foco         |

Notas:

- El plan inicial estimaba 7.3:1 para el acento con texto `cream-50`; el valor real es 6.83:1.
  Sigue cumpliendo AA para texto normal.
- `coffee-500` no se usa sobre `cream-200`.
- Sobre fondos `coffee-900` (pie de página) el foco usa `cream-50`, porque el acento no alcanza
  el 3:1 exigido a indicadores de foco.

## Tipografía

Fuentes autoalojadas con `next/font/google` (se descargan en el build; el navegador no hace
peticiones a Google).

| Token            | Fuente  | Pesos         | Uso                                  |
| ---------------- | ------- | ------------- | ------------------------------------ |
| `--font-display` | Fraunces | 600          | Títulos (`h1`, `h2`, `h3`), marca    |
| `--font-sans`    | Geist   | 400, 500, 600 | Texto, interfaz, precios             |

Escala (pasos de Tailwind; celular, y desde `md` cuando cambia):

| Elemento          | Clase                     | Tamaño              |
| ----------------- | ------------------------- | ------------------- |
| `h1`              | `text-4xl md:text-6xl`    | 2.25rem a 3.75rem   |
| `h2`              | `text-3xl md:text-4xl`    | 1.875rem a 2.25rem  |
| `h3`              | `text-xl`                 | 1.25rem             |
| Texto destacado   | `text-lg` (`md:text-xl`)  | 1.125rem (1.25rem)  |
| Cuerpo            | `text-base`               | 1rem, interlineado 1.6 en `body` |
| Pequeño           | `text-sm`                 | 0.875rem            |

Reglas: un solo `h1` por página, sin saltos de nivel; el texto de 0.875rem nunca usa
`coffee-500`.

## Espacios

- Escala base de 4 px de Tailwind. Pasos permitidos: 1, 2, 3, 4, 6, 8, 12, 16 y 24
  (4 a 96 px).
- Tokens semánticos:

| Token               | Celular | Desde `md` (48rem) | Utilidades           | Uso                              |
| ------------------- | ------- | ------------------ | -------------------- | -------------------------------- |
| `--spacing-gutter`  | 1rem    | 2rem               | `px-gutter`          | Margen lateral del contenedor    |
| `--spacing-section` | 4rem    | 6rem               | `py-section`         | Separación vertical de secciones |
| `--container-content` | 72rem | 72rem              | `max-w-content`      | Ancho máximo del contenido       |

Decisión: `@theme` no admite valores responsivos, así que los tokens se declaran con el valor de
celular y se redefinen en `:root` dentro de `@media (width >= 48rem)`. Como las utilidades
generadas leen la variable (`padding-inline: var(--spacing-gutter)`), se adaptan solas y los
componentes no repiten variantes `md:`.

El componente `Container` aplica `mx-auto w-full max-w-content px-gutter`; todas las secciones
lo usan para quedar alineadas.

## Radios

| Token           | Valor  | Uso                                     |
| --------------- | ------ | --------------------------------------- |
| `--radius-sm`   | 4px    | Insignias, etiquetas de notas, enlaces  |
| `--radius-md`   | 8px    | Botones                                 |
| `--radius-lg`   | 16px   | Tarjetas y espacio de imagen            |
| `--radius-full` | 9999px | Contador del carrito                    |

## Sombras

Desactivadas por ahora (`--shadow-*: initial`). La separación entre superficies se logra con
fondos alternos (`cream-50` / `cream-100`) y bordes `cream-200`. Si más adelante hace falta
elevación (por ejemplo, un panel de carrito), se agregará un token específico aquí.

## Proporciones

| Token                      | Valor | Uso                                              |
| -------------------------- | ----- | ------------------------------------------------ |
| `--aspect-product`         | 4 / 5 | Imagen de producto en rejillas de varias columnas |
| `--aspect-product-compact` | 4 / 3 | Imagen de producto en celular (una columna)       |

El espacio de imagen se reserva siempre con la proporción para evitar saltos de diseño.

## Foco

- Regla global en `@layer base`: `:focus-visible` con contorno de 2 px `cherry-700` y
  separación de 2 px. Aplica a todo elemento interactivo sin código adicional.
- Sobre fondos oscuros se cambia el color con `focus-visible:outline-cream-50`.
- No se elimina el contorno en elementos interactivos. La única excepción es `<main>`, que
  recibe foco programático desde el enlace "Saltar al contenido" y no es interactivo.

## Estados

| Componente            | Reposo                         | Hover / activo                     | Otros                                  |
| --------------------- | ------------------------------ | ---------------------------------- | -------------------------------------- |
| Botón `primary`       | `bg-cherry-700 text-cream-50`  | `bg-cherry-800`                    | Foco global                            |
| Botón `secondary`     | Borde `coffee-700`, sin fondo  | `bg-cream-100` / `bg-cream-200`    | Foco global                            |
| Enlace de navegación  | `text-coffee-700`              | `text-coffee-900` y subrayado      | Página actual: subrayado `cherry-700` de 2 px y `aria-current="page"` |
| Producto agotado      | Insignia `coffee-900` / `cream-50` con el texto "Agotado" | — | El estado se comunica con texto, no solo con color |

Estados de datos por vista (carga, vacío, error y éxito): se definirán con cada módulo
(catálogo, ficha, carrito). La portada usa datos estáticos y no tiene estados de carga.

## Reglas de uso

- Áreas táctiles: `min-h-11` (44 px) en botones y enlaces de navegación.
- Una acción `primary` por pantalla.
- Textos de interfaz en español, breves y orientados a la acción.
- Imágenes: tamaño reservado (proporción o `width`/`height`), `loading="lazy"` fuera de la
  primera pantalla y sin el optimizador de Vercel (`images.unoptimized` en `next.config.ts`).
- Logo: `public/brand/logo.svg`, proporcionado por el dueño. Si no existe, el encabezado muestra
  "Café Ladera" en texto con `--font-display`. No se crean logos sustitutos.
- Antes de crear un componente, buscar uno reutilizable en `src/components`.

## Componentes disponibles

| Componente    | Archivo                          | Descripción                                          |
| ------------- | -------------------------------- | ---------------------------------------------------- |
| `Container`   | `src/components/Container.tsx`   | Ancho máximo y márgenes laterales                    |
| `Button`      | `src/components/Button.tsx`      | Variantes `primary` y `secondary`; enlace si recibe `href` |
| `Header`      | `src/components/Header.tsx`      | Marca, navegación principal y botón de carrito       |
| `Hero`        | `src/components/Hero.tsx`        | Presentación de la portada con el `h1`               |
| `Section`     | `src/components/Section.tsx`     | Sección con `h2`, descripción y fondo `default`/`muted` |
| `ProductCard` | `src/components/ProductCard.tsx` | Tarjeta de producto con notas, precio y disponibilidad |
| `Footer`      | `src/components/Footer.tsx`      | Aviso de demostración y enlaces del proyecto         |
| `DemoNotice`  | `src/components/DemoNotice.tsx`  | Franja superior de tienda de demostración            |

### Encabezado

- Celular: fila 1 con la marca y el carrito; fila 2 con la navegación.
- Desde `md`: una sola fila (marca, navegación centrada, carrito).
- Sin JavaScript de cliente. El orden de tabulación es marca, navegación y carrito en todos los
  tamaños.
- El carrito muestra el texto "Carrito" y un contador; su nombre accesible es, por ejemplo,
  "Carrito, 0 productos".
