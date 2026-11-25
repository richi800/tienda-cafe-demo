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
de WCAG 2.x (con un script, no a ojo). Texto normal exige 4.5:1; texto grande, bordes de
componentes e indicadores de foco, 3:1.

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
| `cream-50`         | `coffee-900` | 15.62:1   | AA y AAA (texto y anillo de foco) |
| `cream-100`        | `coffee-900` | 13.98:1   | AA y AAA                          |
| `cherry-700`       | `cream-200`  | 5.16:1    | Apto como anillo de foco          |
| `cherry-700`       | `coffee-900` | 2.28:1    | No apto: ni texto ni foco         |

Notas:

- El plan inicial estimaba 7.3:1 para el acento con texto `cream-50`; el valor real es 6.83:1.
  Sigue cumpliendo AA para texto normal.
- `coffee-500` no se usa sobre `cream-200`.
- Sobre fondos `coffee-900` (pie de página) el foco usa `cream-50`, porque el acento no alcanza
  el 3:1 exigido a indicadores de foco.
- El texto del pie de página usa `cream-100` sobre `coffee-900`.

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
- El enlace "Saltar al contenido" es el primer elemento tabulable. Al recibir foco aparece como
  franja completa de 44 px sobre `cream-50`, por encima del aviso de demostración, y su contorno
  se dibuja hacia dentro (`focus-visible:-outline-offset-4`). Así el anillo `cherry-700` siempre
  queda sobre `cream-50` (6.83:1) y nunca sobre el `coffee-900` del aviso (2.28:1).
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

- Áreas táctiles: `min-h-11` (44 px) en botones, enlaces de navegación, carrito, enlaces del
  pie y enlace para saltar al contenido.
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

### Container

- **Propósito:** centrar el contenido y alinear todas las secciones al mismo ancho.
- **Props:** `children`; `className` opcional para añadir disposición (rejilla, flex).
- **Variantes y estados:** ninguno.
- **Celular y escritorio:** ancho completo con margen `--spacing-gutter` (16 px en celular,
  32 px desde `md`); el ancho máximo es `--container-content` (72rem).
- **Accesibilidad:** es un `div` sin semántica; la estructura la aportan `header`, `section`,
  `footer` y `nav` que lo envuelven.

### Button

- **Propósito:** acción o enlace con aspecto de botón.
- **Props:** `children` (texto que describe la acción); `variant` (`primary` por defecto o
  `secondary`); `href` opcional.
- **Variantes:** `primary` (fondo `cherry-700`, texto `cream-50`), solo una por pantalla;
  `secondary` (borde `coffee-700`, texto `coffee-900`, sin fondo).
- **Estados:** reposo, hover y activo según la tabla de estados; foco con el contorno global.
  Aún no tiene estado deshabilitado ni de carga: se añadirán con el carrito.
- **Celular y escritorio:** alto mínimo de 44 px y relleno lateral de 24 px. Quien lo usa decide
  el ancho; en la portada ocupa todo el ancho en celular y se ajusta al texto desde `sm`.
- **Accesibilidad:** con `href` renderiza un enlace de `next/link` (navega); sin `href`, un
  `<button type="button">` (actúa), para que lectores de pantalla anuncien el rol correcto.

### Header

- **Propósito:** marca, navegación principal y acceso al carrito.
- **Props:** `logoSrc` (ruta del logo o `null`); `cartCount` opcional (0 por defecto).
- **Variantes:** con logo (`next/image` de 40 px de alto, `alt="Café Ladera"`) o con el nombre
  en texto con `--font-display` si no existe `public/brand/logo.svg`.
- **Estados:** enlace de la página actual con subrayado `cherry-700` y `aria-current="page"`;
  hover de enlaces y del carrito según la tabla de estados.
- **Celular:** fila 1 con la marca y el carrito; fila 2 con la navegación, alineada con el borde
  del contenido. **Desde `md`:** una sola fila (marca, navegación centrada, carrito).
- **Accesibilidad:** sin JavaScript de cliente. El orden de tabulación es marca, navegación y
  carrito en todos los tamaños. `nav` con `aria-label="Principal"`. El carrito muestra
  "Carrito" y un contador oculto a lectores de pantalla; su nombre accesible es, por ejemplo,
  "Carrito, 0 productos". Todos los enlaces y el carrito miden al menos 44 px de alto.

### Hero

- **Propósito:** presentar la tienda y llevar a la compra con la acción principal.
- **Props:** ninguna; el texto es fijo de la portada.
- **Contenido:** antetítulo `cherry-700` en mayúsculas, `h1`, texto destacado y dos botones:
  "Ver productos" (`primary`, lleva a `#productos`) y "Conocer el origen" (`secondary`).
- **Celular:** botones apilados a ancho completo. **Escritorio:** botones en fila y texto
  limitado a `max-w-3xl` para que las líneas no sean demasiado largas.
- **Accesibilidad:** contiene el único `h1` de la portada y la sección se nombra con él
  (`aria-labelledby`). Fondo `cream-100`; foco `cherry-700` a 6.12:1.

### Section

- **Propósito:** bloque de página con título y contenido, separado por `--spacing-section`.
- **Props:** `id` (ancla de navegación), `title` (`h2`), `description` opcional, `tone`
  (`default` con `cream-50` o `muted` con `cream-100`) y `children`.
- **Variantes:** `default` y `muted`, que se alternan para separar secciones sin sombras.
- **Celular y escritorio:** relleno vertical de 64 px en celular y 96 px desde `md`; título
  `text-3xl` que sube a `text-4xl` desde `md`.
- **Accesibilidad:** `<section>` nombrada por su `h2` (`aria-labelledby`), por lo que aparece
  como región en lectores de pantalla. El contenido interno empieza en `h3`.

### ProductCard

- **Propósito:** mostrar un producto en listados y destacados.
- **Props:** `product` (`Product` del dominio).
- **Contenido:** espacio de imagen, nombre (`h3`), notas de sabor, descripción, precio con
  `formatPrice` e insignia "Agotado" si `availableForSale` es falso.
- **Estados:** disponible y agotado. Aún no es interactiva: el enlace a la ficha y el botón de
  compra llegarán con el catálogo.
- **Celular:** una columna; imagen 4:3 (`--aspect-product-compact`) para que cada tarjeta no
  ocupe toda la pantalla. **Desde `md`:** tres columnas e imagen 4:5 (`--aspect-product`). El
  precio queda alineado al pie de la tarjeta (`mt-auto`) aunque las descripciones difieran.
- **Accesibilidad:** `<article>`; el espacio de imagen es decorativo (`aria-hidden`). Las notas
  son una lista con `aria-label="Notas de sabor"`. El agotado se comunica con texto, no solo con
  color.

### Footer

- **Propósito:** aviso de proyecto de demostración y enlaces al código y la documentación.
- **Props:** ninguna.
- **Celular:** marca, texto y enlaces apilados. **Desde `md`:** texto a la izquierda y enlaces
  alineados a la derecha.
- **Accesibilidad:** `<footer>` con `nav aria-label="Proyecto"`. Fondo `coffee-900` con texto
  `cream-100` (13.98:1) y enlaces `cream-50` subrayados; el foco usa `cream-50` (15.62:1) porque
  `cherry-700` no alcanza 3:1. Enlaces de 44 px de alto. La marca es un párrafo, no un
  encabezado, para no alterar la jerarquía de la página.

### DemoNotice

- **Propósito:** recordar en todas las páginas que no se realizan ventas reales.
- **Props:** ninguna.
- **Celular y escritorio:** franja `coffee-900` de texto centrado `text-sm`; en 375 px ocupa dos
  líneas.
- **Accesibilidad:** texto `cream-50` sobre `coffee-900` (15.62:1) y `role="status"`. No contiene
  elementos interactivos; el enlace para saltar al contenido aparece por encima de él al recibir
  foco (ver la sección Foco).
