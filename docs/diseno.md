# Sistema de diseño

Referencia visual de Café Ladera. Los tokens viven en `src/app/globals.css` (bloque `@theme` de
Tailwind CSS v4) y este documento explica sus valores y cómo usarlos. Si cambia un token, se
actualizan ambos archivos en el mismo cambio.

## Dirección visual

Boutique premium de café y cafeteras: mucho blanco, una sola familia sans geométrica (también
en los títulos), botones tipo píldora y color reservado para lo que tiene significado
comercial. El rojo solo marca promociones, el azul solo el precio de oferta y el verde el
precio normal y la acción de compra. Todo lo demás es negro, grises y blanco.

La estructura (franja de avisos, encabezado blanco con menú por categorías e iconos a la
derecha) sigue las convenciones de las tiendas de este tipo, pero la marca, los productos,
los textos y los iconos son propios. No se usan logos, nombres, fotos ni textos de otras marcas.

## Principios

- Pensado primero para celular: se revisa en 375, 768 y 1280 px.
- Una acción principal por pantalla (botón `primary`); el resto son acciones secundarias.
- WCAG 2.2 AA: contraste suficiente, foco visible, navegación con teclado y áreas táctiles
  de al menos 44 px.
- Ningún componente usa colores, radios ni sombras fuera de los tokens. Los colores, radios y
  sombras por defecto de Tailwind están desactivados (`--color-*: initial` y equivalentes), por
  lo que una clase como `bg-zinc-100` no genera estilos.

## Paleta

Solo hay tema claro.

| Token         | Valor     | Uso                                                              |
| ------------- | --------- | ---------------------------------------------------------------- |
| `white`       | `#FFFFFF` | Fondo de la página, del encabezado y de las tarjetas             |
| `neutral-100` | `#F5F5F4` | Secciones alternas, hover de botones secundarios e iconos        |
| `neutral-200` | `#E7E5E4` | Bordes decorativos (separadores) y espacio reservado de imágenes |
| `neutral-500` | `#8A8A8A` | Bordes de controles de formulario (3:1); nunca texto             |
| `sand-100`    | `#F3EBDF` | Franja de avisos (`AnnouncementBar`)                             |
| `ink-900`     | `#141414` | Texto principal, anillo de foco, fondo del pie y del aviso de demostración |
| `ink-700`     | `#4A4A4A` | Texto secundario y enlaces de navegación en reposo               |
| `ink-500`     | `#6B6B6B` | Metadatos y precio anterior tachado                              |
| `promo-600`   | `#C8102E` | Enlace "Promociones" e insignia de descuento                     |
| `promo-700`   | `#A00D25` | Hover del enlace "Promociones"                                   |
| `sale-700`    | `#1F4FB5` | Precio de oferta                                                 |
| `buy-700`     | `#1E6B3C` | Precio normal y botón de compra (`primary`)                      |
| `buy-800`     | `#16532E` | Hover y estado activo del botón de compra                        |

### Contrastes

Calculados con la fórmula de luminancia relativa de WCAG 2.x mediante un script que lee los
valores directamente de `globals.css` (no a ojo). Texto normal exige 4.5:1; texto grande, bordes
de componentes e indicadores de foco, 3:1.

| Texto (o elemento) | Fondo         | Contraste | Resultado                                 |
| ------------------ | ------------- | --------- | ----------------------------------------- |
| `ink-900`          | `white`       | 18.42:1   | AA y AAA (texto y anillo de foco)         |
| `ink-900`          | `neutral-100` | 16.89:1   | AA y AAA (texto y anillo de foco)         |
| `ink-900`          | `sand-100`    | 15.58:1   | AA y AAA (texto y anillo de foco)         |
| `ink-700`          | `white`       | 8.86:1    | AA y AAA                                  |
| `ink-700`          | `neutral-100` | 8.12:1    | AA y AAA                                  |
| `ink-700`          | `sand-100`    | 7.49:1    | AA y AAA                                  |
| `ink-500`          | `white`       | 5.33:1    | AA                                        |
| `ink-500`          | `neutral-100` | 4.89:1    | AA                                        |
| `ink-500`          | `sand-100`    | 4.51:1    | AA con margen mínimo: no se usa           |
| `neutral-500`      | `white`       | 3.45:1    | Solo bordes de controles (3:1), no texto  |
| `neutral-500`      | `neutral-100` | 3.16:1    | Solo bordes de controles (3:1), no texto  |
| `promo-600`        | `white`       | 5.88:1    | AA                                        |
| `promo-600`        | `neutral-100` | 5.39:1    | AA                                        |
| `promo-700`        | `white`       | 8.14:1    | AA y AAA                                  |
| `white`            | `promo-600`   | 5.88:1    | AA (insignia de descuento)                |
| `sale-700`         | `white`       | 7.38:1    | AA y AAA                                  |
| `sale-700`         | `neutral-100` | 6.77:1    | AA                                        |
| `buy-700`          | `white`       | 6.51:1    | AA                                        |
| `buy-700`          | `neutral-100` | 5.97:1    | AA                                        |
| `white`            | `buy-700`     | 6.51:1    | AA (botón de compra)                      |
| `white`            | `buy-800`     | 9.09:1    | AA y AAA (hover del botón de compra)      |
| `white`            | `ink-900`     | 18.42:1   | AA y AAA (texto y anillo de foco)         |
| `neutral-100`      | `ink-900`     | 16.89:1   | AA y AAA (texto del pie de página)        |
| `neutral-200`      | `white`       | 1.26:1    | No apto: solo elementos decorativos       |
| `promo-600`        | `ink-900`     | 3.13:1    | No apto para texto                        |
| `buy-700`          | `ink-900`     | 2.83:1    | No apto: ni texto ni foco                 |

Notas:

- El color nunca es la única señal: el precio de oferta va acompañado del precio anterior
  tachado y de un texto para lectores de pantalla; la insignia dice el porcentaje y "Agotado"
  se escribe con palabras.
- Sobre fondos `ink-900` (pie de página y aviso de demostración) el foco usa `white`, porque el
  anillo `ink-900` global sería invisible.
- `neutral-200` no delimita controles interactivos; para eso se usa `neutral-500` o `ink-900`.

## Tipografía

Fuente autoalojada con `next/font/google` (se descarga en el build; el navegador no hace
peticiones a Google). Una sola familia geométrica, Geist, para todo: los títulos se distinguen
por peso (600) y por `tracking-tight`, no por cambiar de familia. Así se carga un solo archivo
de fuente variable.

| Token            | Fuente | Uso                                        |
| ---------------- | ------ | ------------------------------------------ |
| `--font-display` | Geist  | Títulos (`h1`, `h2`, `h3`) y nombre de la marca |
| `--font-sans`    | Geist  | Texto, interfaz y precios                  |

`--font-display` se conserva como token aparte para poder cambiar la fuente de títulos sin
tocar los componentes.

Escala (pasos de Tailwind; celular, y desde `md` cuando cambia):

| Elemento          | Clase                                 | Tamaño              |
| ----------------- | ------------------------------------- | ------------------- |
| `h1`              | `text-4xl md:text-6xl tracking-tight` | 2.25rem a 3.75rem   |
| `h2`              | `text-3xl md:text-4xl tracking-tight` | 1.875rem a 2.25rem  |
| `h3`              | `text-lg` o `text-xl`                 | 1.125rem a 1.25rem  |
| Texto destacado   | `text-lg` (`md:text-xl`)              | 1.125rem (1.25rem)  |
| Cuerpo            | `text-base`                           | 1rem, interlineado 1.6 en `body` |
| Pequeño           | `text-sm`                             | 0.875rem            |

Reglas: un solo `h1` por página, sin saltos de nivel; el texto de 0.875rem no usa `ink-500`
salvo el precio anterior tachado, que siempre acompaña al precio vigente.

## Espacios

- Escala base de 4 px de Tailwind. Pasos permitidos: 1, 2, 3, 4, 6, 8, 12, 16 y 24
  (4 a 96 px).
- Tokens semánticos:

| Token                 | Celular | Desde `md` (48rem) | Utilidades      | Uso                              |
| --------------------- | ------- | ------------------ | --------------- | -------------------------------- |
| `--spacing-gutter`    | 1rem    | 2rem               | `px-gutter`     | Margen lateral del contenedor    |
| `--spacing-section`   | 4rem    | 6rem               | `py-section`    | Separación vertical de secciones |
| `--container-content` | 80rem   | 80rem              | `max-w-content` | Ancho máximo del contenido       |

El ancho máximo pasó de 72rem a 80rem para dar aire a las rejillas de producto y a la
navegación por categorías en escritorio.

Decisión: `@theme` no admite valores responsivos, así que los tokens se declaran con el valor de
celular y se redefinen en `:root` dentro de `@media (width >= 48rem)`. Como las utilidades
generadas leen la variable (`padding-inline: var(--spacing-gutter)`), se adaptan solas y los
componentes no repiten variantes `md:`.

El componente `Container` aplica `mx-auto w-full max-w-content px-gutter`; todas las secciones
lo usan para quedar alineadas.

## Radios

| Token           | Valor  | Uso                                                        |
| --------------- | ------ | ---------------------------------------------------------- |
| `--radius-sm`   | 4px    | Enlaces de texto (forma del anillo de foco)                |
| `--radius-md`   | 8px    | Paneles y campos de formulario                             |
| `--radius-lg`   | 16px   | Espacio de imagen de producto                              |
| `--radius-pill` | 9999px | Botones, botones de icono, insignias, notas y contador del carrito |

`--radius-pill` sustituye a `--radius-full`: el nombre describe la forma que da a los botones.

## Sombras

| Token              | Valor                                  | Uso                                         |
| ------------------ | -------------------------------------- | ------------------------------------------- |
| `--shadow-overlay` | `0 12px 24px -12px rgb(20 20 20 / .25)` | Paneles superpuestos (menú en celular)     |

Es la única elevación. La separación entre superficies se logra con fondos alternos
(`white` / `neutral-100`) y bordes `neutral-200`.

## Proporciones

| Token                      | Valor | Uso                                              |
| -------------------------- | ----- | ------------------------------------------------ |
| `--aspect-product`         | 4 / 5 | Imagen de producto en rejillas de varias columnas |
| `--aspect-product-compact` | 4 / 3 | Imagen de producto en celular (una columna)       |

El espacio de imagen se reserva siempre con la proporción para evitar saltos de diseño.

## Foco

- Regla global en `@layer base`: `:focus-visible` con contorno de 2 px `ink-900` y separación
  de 2 px. Aplica a todo elemento interactivo sin código adicional y supera 15:1 sobre `white`,
  `neutral-100` y `sand-100`.
- Sobre fondos oscuros se cambia el color con `focus-visible:outline-white`.
- El enlace "Saltar al contenido" es el primer elemento tabulable. Al recibir foco aparece como
  franja completa de 44 px sobre `white`, por encima del aviso de demostración, y su contorno
  se dibuja hacia dentro (`focus-visible:-outline-offset-4`). Así el anillo `ink-900` siempre
  queda sobre blanco y nunca sobre el `ink-900` del aviso.
- No se elimina el contorno en elementos interactivos. La única excepción es `<main>`, que
  recibe foco programático desde el enlace "Saltar al contenido" y no es interactivo.

## Estados

| Componente            | Reposo                          | Hover / activo                      | Otros                                  |
| --------------------- | ------------------------------- | ----------------------------------- | -------------------------------------- |
| Botón `primary`       | `bg-buy-700 text-white`, píldora | `bg-buy-800`                       | Foco global                            |
| Botón `secondary`     | Borde `ink-900`, sin fondo, píldora | `bg-neutral-100` / `bg-neutral-200` | Foco global                       |
| Precio normal         | `text-buy-700`                  | —                                   | —                                      |
| Precio de oferta      | `text-sale-700` y precio anterior `ink-500` tachado (`<del>`) | — | Texto oculto "Precio de oferta" y "Precio anterior" |
| Insignia de descuento | `bg-promo-600 text-white`, por ejemplo "-18%" | —                     | Lectores de pantalla oyen "18% de descuento" |
| Producto agotado      | Insignia `ink-900` / `white` con el texto "Agotado" | —               | El estado se comunica con texto, no solo con color |

Estados de datos por vista (carga, vacío, error y éxito): se definirán con cada módulo
(catálogo, ficha, carrito). La portada usa datos estáticos; su único estado alterno es el
vacío de `ProductGrid` (por ejemplo, "Por ahora no hay promociones activas.").

## Reglas de uso

- Áreas táctiles: `min-h-11` (44 px) en botones, enlaces de navegación, botones de icono
  (`size-11`), enlaces del pie y enlace para saltar al contenido.
- Una acción `primary` por pantalla.
- Rojo, azul y verde solo con su significado (promoción, oferta, compra). No se usan como
  decoración.
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
| `Button`      | `src/components/Button.tsx`      | Píldora `primary` (compra) o `secondary`; enlace si recibe `href` |
| `AnnouncementBar` | `src/components/AnnouncementBar.tsx` | Franja de avisos con flechas, "Compra ahora" y términos |
| `Header`      | `src/components/Header.tsx`      | Marca, menú por categorías e iconos (favoritos, búsqueda, cuenta, carrito) |
| `MobileMenu`  | `src/components/MobileMenu.tsx`  | Menú colapsable por debajo de `xl`                   |
| `IconButton`  | `src/components/IconButton.tsx`  | Botón o enlace circular de 44 px con icono y contador opcional |
| Iconos        | `src/components/icons.tsx`       | SVG propios en línea: corazón, lupa, persona, bolsa, menú, cerrar y flechas |
| `Breadcrumb`  | `src/components/Breadcrumb.tsx`  | Ruta de navegación para páginas interiores           |
| `Hero`        | `src/components/Hero.tsx`        | Presentación de la portada con el `h1`               |
| `Section`     | `src/components/Section.tsx`     | Sección con `h2`, descripción y fondo `default`/`muted` |
| `ProductCard` | `src/components/ProductCard.tsx` | Tarjeta con imagen, notas, precio, descuento y disponibilidad |
| `ProductGrid` | `src/components/ProductGrid.tsx` | Rejilla de `ProductCard` con estado vacío             |
| `Footer`      | `src/components/Footer.tsx`      | Aviso de demostración y enlaces del proyecto         |
| `DemoNotice`  | `src/components/DemoNotice.tsx`  | Franja superior de tienda de demostración            |

### Container

- **Propósito:** centrar el contenido y alinear todas las secciones al mismo ancho.
- **Props:** `children`; `className` opcional para añadir disposición (rejilla, flex).
- **Variantes y estados:** ninguno.
- **Celular y escritorio:** ancho completo con margen `--spacing-gutter` (16 px en celular,
  32 px desde `md`); el ancho máximo es `--container-content` (80rem).
- **Accesibilidad:** es un `div` sin semántica; la estructura la aportan `header`, `section`,
  `footer` y `nav` que lo envuelven.

### Button

- **Propósito:** acción o enlace con aspecto de botón.
- **Props:** `children` (texto que describe la acción); `variant` (`primary` por defecto o
  `secondary`); `href` opcional.
- **Variantes:** `primary` (píldora `buy-700`, texto `white`), solo una por pantalla;
  `secondary` (píldora con borde `ink-900`, texto `ink-900`, sin fondo).
- **Estados:** reposo, hover y activo según la tabla de estados; foco con el contorno global.
  Aún no tiene estado deshabilitado ni de carga: se añadirán con el carrito.
- **Celular y escritorio:** alto mínimo de 44 px y relleno lateral de 24 px. Quien lo usa decide
  el ancho; en la portada ocupa todo el ancho en celular y se ajusta al texto desde `sm`.
- **Accesibilidad:** con `href` renderiza un enlace de `next/link` (navega); sin `href`, un
  `<button type="button">` (actúa), para que lectores de pantalla anuncien el rol correcto.

### AnnouncementBar

- **Propósito:** comunicar promociones vigentes (envío gratis, descuentos, suscripción) sin
  competir con el contenido.
- **Props:** `announcements` (`Announcement[]` del dominio: `id`, `message`, `href`) y
  `termsHref`.
- **Contenido:** flecha anterior, aviso actual, flecha siguiente, botón con borde "Compra ahora"
  (lleva al destino del aviso actual) y enlace "*Términos y condiciones" (a `/#terminos`).
- **Comportamiento:** no rota sola; solo cambia con las flechas y da la vuelta en los extremos
  (`getWrappedIndex`). Decisión: así no hace falta botón de pausa (WCAG 2.2.2), no hay
  movimiento que adaptar a `prefers-reduced-motion` y el texto no cambia mientras se lee.
- **Estados:** varios avisos (con flechas), un aviso (sin flechas ni "Aviso 1 de 1") y sin
  avisos (no se renderiza).
- **Celular:** dos filas de 44 px (aviso con flechas; acciones). **Desde `md`:** una sola fila
  centrada. La píldora "Compra ahora" se ve baja (`py-1`), pero su enlace mide 44 px de alto,
  para que la franja se perciba delgada sin perder área táctil.
- **Accesibilidad:** `<section aria-roledescription="carrusel" aria-label="Avisos de la
  tienda">`. El aviso es una región `aria-live="polite"` con el prefijo oculto "Aviso 1 de 3:".
  Las flechas son botones de 44 px con `aria-label` y `aria-controls` hacia el aviso. El
  asterisco de los términos se oculta a lectores de pantalla. Fondo `sand-100`: texto `ink-900`
  a 15.58:1 y foco `ink-900` igual.

### Header

- **Propósito:** marca, navegación por categorías y accesos rápidos.
- **Props:** `logoSrc` (ruta del logo o `null`); `cartCount` opcional (0 por defecto).
- **Contenido:** marca a la izquierda (logo con `next/image` o "Café Ladera" en texto con
  `--font-display`); menú Promociones (en `promo-600`), Café, Cafeteras, Accesorios,
  Suscripción y ¿Necesitas ayuda?, definido una sola vez en `main-navigation.ts`; a la derecha,
  botones de icono de favoritos, búsqueda, cuenta y carrito con contador.
- **Enlaces:** apuntan a secciones de la portada (`/#promociones`, `/#cafe`, ...) hasta que
  existan las páginas de catálogo; una prueba impide publicar otro tipo de destino.
- **Celular y tableta (menos de 1280 px):** una fila de 64 px con botón de menú, marca e
  iconos. En 375 px caben los cuatro iconos (el logo se limita a 112 px de ancho). **Desde `xl`
  (1280 px):** fila de 80 px con marca, menú en línea centrado e iconos. Decisión: el menú en
  línea se muestra desde `xl` y no desde `lg` porque los seis enlaces (unos 650 px) no caben
  junto a la marca y los iconos en 1024 px sin partirse en dos líneas.
- **Estados:** hover de enlaces (subrayado y color más oscuro; Promociones pasa a `promo-700`) y
  de iconos (`bg-neutral-100`). Sin indicador de página actual mientras todos los enlaces sean
  anclas de la misma página.
- **Accesibilidad:** el orden del DOM es menú (en celular), marca, navegación e iconos. Ambas
  navegaciones usan `nav aria-label="Principal"`; solo una es visible en cada tamaño, la otra
  tiene `display: none` y queda fuera del árbol de accesibilidad. El carrito se nombra
  "Carrito, 0 productos" y el contador visible es `aria-hidden`.

### MobileMenu

- **Propósito:** dar acceso a la navegación principal por debajo de `xl`.
- **Props:** `items` (`NavItem[]`) y `panelId`.
- **Comportamiento:** botón de 44 px con icono de menú o de cerrar; abre un panel blanco a lo
  ancho bajo el encabezado, con `--shadow-overlay`, enlaces de 48 px y separadores
  `neutral-200`. Se cierra con el mismo botón, con Escape (el foco vuelve al botón) o al elegir
  un enlace.
- **Accesibilidad:** patrón de divulgación: `aria-expanded`, `aria-controls` y `aria-label`
  "Abrir menú" o "Cerrar menú". El panel cerrado usa el atributo `hidden`. Va justo después del
  botón en el DOM, por lo que el siguiente Tab entra en los enlaces. No atrapa el foco porque no
  es modal.

### IconButton

- **Propósito:** acción o enlace representado solo por un icono.
- **Props:** `label` (nombre accesible, obligatorio), `children` (icono), `href` y `badge`
  opcionales.
- **Variantes:** botón (`<button type="button">`) o enlace (`next/link`), con o sin contador.
- **Estados:** hover `bg-neutral-100`, activo `bg-neutral-200`, foco global.
- **Tamaño:** 44 x 44 px (`size-11`), forma píldora. El contador es una píldora `ink-900` con
  texto `white` de 12 px (`text-xs`), única excepción a la escala de texto porque es un dato
  visual repetido en el nombre accesible.

### Iconos

- SVG propios de 24 x 24 con trazo de 1.5 px, `currentColor`, `aria-hidden="true"` y
  `focusable="false"`. El control que los contiene aporta el nombre. Tamaño por defecto
  `size-6`; las flechas de la franja usan `size-5` y los separadores de la ruta `size-4`.

### Breadcrumb

- **Propósito:** ubicar a la persona en páginas interiores (catálogo, ficha). No se muestra en
  la portada.
- **Props:** `items` (`{ label, href? }[]`), de la portada a la página actual.
- **Contenido:** niveles anteriores como enlaces `ink-700` (hover `ink-900` subrayado);
  separadores con la flecha derecha en `ink-500`; el último nivel en `ink-900`, sin enlace.
- **Accesibilidad:** `<nav aria-label="Ruta de navegación">` con `<ol>`; el último nivel lleva
  `aria-current="page"`. Los separadores son decorativos. Cada nivel mide 44 px de alto.

### Hero

- **Propósito:** presentar la tienda y llevar a la compra con la acción principal.
- **Props:** ninguna; el texto es fijo de la portada.
- **Contenido:** antetítulo `ink-700` en mayúsculas, `h1`, texto destacado y dos botones:
  "Ver café" (`primary`, lleva a `#cafe`) y "Ver cafeteras" (`secondary`, lleva a `#cafeteras`).
- **Celular:** botones apilados a ancho completo. **Escritorio:** botones en fila y texto
  limitado a `max-w-3xl` para que las líneas no sean demasiado largas.
- **Accesibilidad:** contiene el único `h1` de la portada y la sección se nombra con él
  (`aria-labelledby`). Fondo `neutral-100`.

### Section

- **Propósito:** bloque de página con título y contenido, separado por `--spacing-section`.
- **Props:** `id` (ancla de navegación), `title` (`h2`), `description` opcional, `tone`
  (`default` con `white` o `muted` con `neutral-100`) y `children`.
- **Variantes:** `default` y `muted`, que se alternan para separar secciones sin sombras.
- **Celular y escritorio:** relleno vertical de 64 px en celular y 96 px desde `md`; título
  `text-3xl` que sube a `text-4xl` desde `md`.
- **Accesibilidad:** `<section>` nombrada por su `h2` (`aria-labelledby`), por lo que aparece
  como región en lectores de pantalla. El contenido interno empieza en `h3`.

### ProductCard

- **Propósito:** mostrar un producto en listados y destacados.
- **Props:** `product` (`Product` del dominio).
- **Contenido:** espacio de imagen `neutral-200` con insignias superpuestas (descuento y
  agotado), nombre (`h3`), notas de sabor en píldoras (solo si el producto tiene), descripción
  y precio.
- **Precio:** sin descuento, en `buy-700`. Con descuento real (`getDiscountPercentage` mayor que
  0), precio vigente en `sale-700` seguido del precio anterior tachado en `ink-500`.
- **Estados:** disponible, en oferta y agotado (combinables). Aún no es interactiva: el enlace a
  la ficha y el botón de compra llegarán con el catálogo.
- **Celular:** imagen 4:3 (`--aspect-product-compact`). **Desde `md`:** imagen 4:5
  (`--aspect-product`). El precio queda alineado al pie de la tarjeta (`mt-auto`) aunque las
  descripciones difieran. Tarjeta sin borde ni fondo: el blanco de la página hace de marco.
- **Accesibilidad:** `<article>`; el espacio de imagen es decorativo (`aria-hidden`). Las notas
  son una lista con `aria-label="Notas de sabor"`. La insignia "-18%" se lee como "18% de
  descuento"; el precio anterior usa `<del>` y textos ocultos "Precio de oferta:" y "Precio
  anterior:" para no depender del color ni del tachado.

### ProductGrid

- **Propósito:** listar productos con la misma rejilla en toda la tienda.
- **Props:** `products`; `emptyMessage` opcional.
- **Estados:** con productos (lista) y vacío (párrafo con el mensaje, sin lista vacía).
- **Celular:** una columna. **Desde `sm`:** dos columnas. **Desde `lg`:** tres columnas.
  Separación de 24 px entre columnas y 48 px entre filas.
- **Accesibilidad:** `<ul>` con un `<li>` por tarjeta, para que se anuncie el número de productos.

### Footer

- **Propósito:** aviso de proyecto de demostración y enlaces al código y la documentación.
- **Props:** ninguna.
- **Celular:** marca, texto y enlaces apilados. **Desde `md`:** texto a la izquierda y enlaces
  alineados a la derecha.
- **Accesibilidad:** `<footer>` con `nav aria-label="Proyecto"`. Fondo `ink-900` con texto
  `neutral-100` (16.89:1) y enlaces `white` subrayados; el foco usa `white` (18.42:1). Enlaces
  de 44 px de alto. La marca es un párrafo, no un encabezado, para no alterar la jerarquía.

### DemoNotice

- **Propósito:** recordar en todas las páginas que no se realizan ventas reales.
- **Props:** ninguna.
- **Celular y escritorio:** franja `ink-900` de texto centrado `text-sm`; en 375 px ocupa dos
  líneas.
- **Accesibilidad:** texto `white` sobre `ink-900` (18.42:1) y `role="status"`. No contiene
  elementos interactivos; el enlace para saltar al contenido aparece por encima de él al recibir
  foco (ver la sección Foco).

## Orden de la cabecera de página

De arriba abajo, en todas las páginas: enlace "Saltar al contenido" (solo visible con foco),
`DemoNotice`, `AnnouncementBar` y `Header`. El orden de tabulación sigue el mismo orden.
