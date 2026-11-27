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
| `clay-200`    | `#EAD5C3` | Bloque de color del hero                                         |
| `espresso-900` | `#1F1713` | Inicio del degradado de los banners de categoría                |
| `espresso-700` | `#4A382D` | Final del degradado de los banners de categoría                 |
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
| `ink-900`          | `clay-200`    | 12.99:1   | AA y AAA (titular, botón negro y foco)    |
| `ink-700`          | `clay-200`    | 6.25:1    | AA (categoría y subtítulo del hero)       |
| `white`            | `espresso-900` | 17.64:1  | AA y AAA (título del banner)              |
| `white`            | `espresso-700` | 11.08:1  | AA y AAA                                  |
| `white`            | trama `#58483E` | 8.71:1  | AA y AAA (punto más claro de la textura)  |
| `neutral-100`      | `espresso-700` | 10.16:1  | AA y AAA (descripción y nota del banner)  |
| `neutral-100`      | trama `#58483E` | 7.98:1  | AA y AAA                                  |
| `neutral-500`      | `ink-900`     | 5.34:1    | Bordes en el pie y separadores "/"        |
| `white`            | `ink-700`     | 8.86:1    | AA y AAA (hover del botón negro)          |
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
| `ink-700`          | `neutral-200` | 7.06:1    | AA y AAA (texto del botón no disponible)  |
| `neutral-200`      | `white`       | 1.26:1    | No apto: solo elementos decorativos; el botón no disponible se reconoce por su texto, no por el borde |
| `white`            | `clay-200`    | 1.42:1    | No apto: en el hero el texto es oscuro    |
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
| `h1` de la ficha  | `text-3xl md:text-4xl tracking-tight` | 1.875rem a 2.25rem  |
| `h2`              | `text-3xl md:text-4xl tracking-tight` | 1.875rem a 2.25rem  |
| `h3`              | `text-lg` o `text-xl`                 | 1.125rem a 1.25rem  |
| Texto destacado   | `text-lg` (`md:text-xl`)              | 1.125rem (1.25rem)  |
| Cuerpo            | `text-base`                           | 1rem, interlineado 1.6 en `body` |
| Pequeño           | `text-sm`                             | 0.875rem            |

Decisión: en la ficha de producto el `h1` es el nombre del producto y usa el tamaño de `h2`,
porque comparte columna con el precio y nombres largos como "Cafetera de espresso Ladera Pro"
ocuparían tres líneas a `text-6xl`. El precio de la ficha (`text-3xl`) sigue siendo el dato
más llamativo después del nombre.

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
| `--aspect-hero`            | 1 / 1 | Imagen de ambiente del hero desde `md`            |
| `--aspect-hero-compact`    | 4 / 3 | Imagen de ambiente del hero en celular            |

El espacio de imagen se reserva siempre con la proporción para evitar saltos de diseño.

## Imágenes

Las fotos viven en `public/imagenes/` y se muestran con `next/image`, siempre con su `width` y
`height` reales y un `alt` descriptivo en español. `images.unoptimized` hace que se sirvan tal
cual (sin el optimizador de Vercel), por lo que los archivos ya vienen en WebP (el más pesado, el cafetal, se recomprimió a 168 KB).

| Archivo                                   | Medidas    | Dónde se usa                         | Ajuste                                     |
| ----------------------------------------- | ---------- | ------------------------------------ | ------------------------------------------ |
| `portada/set-cafeteria-ladera.webp`       | 1200 x 1200 | Mitad de imagen del hero            | `object-cover object-[50%_65%]` en 4:3 (celular); completa en 1:1 (desde `md`) |
| `productos/cafe-bolsa-verde-chiapas.webp` | 1200 x 1200 | Tarjeta y ficha de Café de altura Chiapas | `object-contain` sobre `white` en 4:3 y 4:5 |
| `productos/cafe-lata-tueste-oscuro.webp`  | 1200 x 1200 | Tarjeta y ficha de Espresso Veracruz | `object-contain` sobre `white` en 4:3 y 4:5 |
| `productos/cafe-bolsa-ladera.webp`        | 1200 x 1200 | Tarjeta y ficha de Descafeinado Oaxaca | `object-contain` sobre `white` en 4:3 y 4:5 |
| `estilo/cafetal-4x3.webp`                 | 1200 x 900 | Sección "La diferencia" de la portada | Proporción natural (`h-auto w-full`), radio `lg` |
| `secciones/cafeteras-espresso.webp`       | 1200 x 1200 | Banner de Cafeteras y miniatura de Cafeteras | Recuadro blanco con `object-contain` (banner); círculo con `object-cover` al 125 % (miniatura) |
| `secciones/cafeteras-goteo.webp`          | 1200 x 1200 | Banner de Cafeteras                  | Recuadro blanco con `object-contain`       |
| `secciones/accesorios-tazas.webp`         | 1200 x 1200 | Banner y miniatura de Accesorios     | Igual que la cafetera de espresso          |
| `productos/cafe-bolsa-ladera.webp`        | 1200 x 1200 | Miniatura de Café (además de su producto) | Círculo con `object-cover` al 125 %   |

Las fotos de la portada se declaran en `src/components/editorial-images.ts` (`HERO_IMAGE`,
`ORIGIN_IMAGE`, `COFFEE_SECTION_IMAGE`, `ESPRESSO_MACHINE_IMAGE`, `DRIP_MACHINE_IMAGE` y
`CUPS_IMAGE`). Las de `secciones/` son recursos gráficos de la página, no fotos de productos: no
se asignan a las cafeteras ni a los accesorios de ejemplo, cuyas fotos vendrán de Shopify;
 las de los cafés, una por producto, en los datos (`Product.image`). Los datos de cada
café (presentación, peso y notas de sabor) coinciden con lo que muestra su empaque.

Reglas:

- **Productos:** `object-contain` sobre fondo `white`, para que el producto nunca se corte sin
  importar la proporción del espacio (4:3 o 4:5). En la ficha, con foto, el marco lleva borde
  `neutral-200` porque el fondo de la foto y el de la página son iguales. Sin foto se conserva el
  espacio reservado `neutral-100` (cafeteras y accesorios, por ahora).
- **Ambiente y editorial:** `object-cover`. En el hero, en celular (4:3) la foto cuadrada pierde
  una cuarta parte de su alto y la barra de pestañas tapa además los 32 px inferiores. Decisión:
  el recorte se fija al 65 % vertical (`object-[50%_65%]`) y no al centro, porque con
  `object-center` la lata y el frasco quedaban bajo la barra. Así el grupo de productos queda
  centrado en la parte visible. Desde `md` la foto se ve completa.
- **Carga:** el hero y la foto de la ficha son el elemento principal de la primera pantalla:
  `loading="eager"` y `fetchPriority="high"`. Decisión: no se usa `preload` (que en Next.js 16
  sustituye a `priority`, ya obsoleto) porque la guía de `next/image` lo desaconseja cuando el
  elemento más grande cambia según el ancho; en celular, el más grande de la portada es el
  titular, no la foto. Todas las demás imágenes usan `loading="lazy"`.
- **Texto alternativo:** describe lo que se ve, sin transcribir el texto impreso de los
  empaques ni de los letreros. La foto del hero no se asocia a ningún producto ni a un origen.
  Una prueba lo vigila (`editorial-images.test.ts` y `sample-products.test.ts`), junto con las
  medidas reales de cada archivo.
- **Fotos reemplazadas:** las tres fotos provisionales, cuyos empaques decían "Landera", se
  sustituyeron por versiones con "Ladera" y se eliminaron del repositorio (`set-caja-lata`,
  `cafe-bolsa-microlote` y `bolsa-en-cocina`). Los originales recibidos están en
  `public/imagenes/recibidas/`, que está en `.gitignore` para que no se publiquen.
- **Pendientes de las imágenes (no del código):**
  - La etiqueta de la bolsa translúcida (Descafeinado Oaxaca) todavía dice "LANDERA MICRO-LOTE" junto al código QR.
  - La caja del hero tiene textos en inglés y "single origin".
  - El letrero del cafetal repite "CAFETERO".
- **Panorámica sin usar:** `cafetal-panoramica.webp` (1600 x 873) está en `recibidas/` porque
  ninguna sección de ancho completo la necesita; "La diferencia" usa media columna en 4:3.

## Texturas

- `banner-texture` (utilidad en `globals.css`): degradado a 135 grados de `espresso-900` a
  `espresso-700` con una trama de puntos blancos al 8 % cada 14 px. Solo CSS, sin imágenes.
  El contraste se midió contra el punto más claro de la trama (`#58483E`).

## Desplazamiento

- `html` tiene `scroll-padding-top: 5rem` y `scroll-padding-bottom: 5rem` para que el sub-header
  fijo y el botón de ayuda no tapen el destino de un ancla ni el elemento enfocado (WCAG 2.4.11).
- El desplazamiento suave (`scroll-behavior: smooth`) solo se activa con
  `prefers-reduced-motion: no-preference`. Las transiciones de movimiento usan `motion-safe:`.

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
| Botón `dark`          | `bg-ink-900 text-white`, píldora | `bg-ink-700`                       | Acción del hero                        |
| Botón no disponible   | `bg-neutral-200 text-ink-700` (7.06:1), píldora, `cursor-not-allowed`; en la ficha dice "Agregar al carrito" | Sin cambios: no tiene hover ni estado activo | `aria-disabled="true"`, enfocable y descrito por una nota visible |
| Precio normal         | `text-buy-700`                  | —                                   | —                                      |
| Precio de oferta      | `text-sale-700` y precio anterior `ink-500` tachado (`<del>`) | — | Texto oculto "Precio de oferta" y "Precio anterior" |
| Cinta de descuento    | Banda diagonal `bg-promo-600 text-white`, por ejemplo "-18%" | —     | Lectores de pantalla oyen "18% de descuento" |
| Pestaña o chip activo | Subrayado `ink-900` (pestaña) o píldora `ink-900` con texto `white` (chip) | — | `aria-current="true"` solo si la sección está a la vista |
| Producto agotado      | Insignia `ink-900` / `white` con el texto "Agotado" | —               | El estado se comunica con texto, no solo con color; en la ficha la nota del botón dice "Agotado" |
| Opción de color       | Círculo de 32 px con borde `neutral-500` dentro de un área de 44 px | Hover: anillo `neutral-500`; elegida: anillo `ink-900` de 2 px y nombre junto a la leyenda | Foco: contorno exterior `ink-900` separado 2 px, distinto del anillo de selección |

Estados de datos por vista (carga, vacío, error y éxito):

- **Portada:** se prerenderiza con el catálogo de Shopify o, sin variables de entorno, con los
  datos de ejemplo, así que no tiene estado de carga. Cada sección de catálogo tiene dos estados
  que decide `buildHomeCatalog` (`src/components/home-catalog.ts`), una función pura probada:
  - **Con productos:** tarjetas (`ProductGrid`); Cafeteras y Accesorios muestran además sus fotos
    editoriales en el banner.
  - **Sin productos:** `CatalogNoticePanel` en el lugar de las tarjetas. Promociones dice "Sin
    promociones por ahora" con la acción "Ver café". Cafeteras y Accesorios dicen
    "Próximamente", con un texto breve, sus fotos editoriales (que salen del banner para no
    repetirse) y "Ver café". Si tampoco hubiera café, su aviso no lleva acción, porque enlazaría a
    sí mismo.
  - **Decisión: ninguna sección se oculta.** Se consideró ocultar Promociones, su pestaña y su
    chip, pero el menú principal (en el layout, que no conoce el catálogo), el sub-header y el
    botón "Ver promociones" del 404 enlazan a `/#promociones`; ocultarla obligaría a ocultar
    esos enlaces según los datos y cualquier olvido dejaría un ancla rota. Un aviso cuidado
    mantiene la navegación estable y le da a la persona un siguiente paso.
  - El estado de error de la fuente lo cubre el repositorio: si Shopify falla, la portada usa los
    datos de ejemplo.
- **Ficha de producto:** se prerenderiza, así que no tiene estado de carga. Éxito: la ficha
  completa. No encontrado: el 404 de la tienda ("No encontramos este producto"). Sin
  relacionados: la sección "También te puede interesar" no se muestra. La compra está "no
  disponible" mientras no exista el carrito, o "Agotado" si no hay existencias. El estado de
  error (falla de la fuente de datos) se definirá con la conexión a Shopify.
- **Carrito y catálogo:** se definirán con su módulo.

## Reglas de uso

- Áreas táctiles: `min-h-11` (44 px) en botones, enlaces de navegación, botones de icono
  (`size-11`), enlaces del pie y enlace para saltar al contenido.
- Una acción `primary` por pantalla. Excepción: en listados de producto cada tarjeta lleva su
  botón de compra verde, porque cada uno es la acción principal de su tarjeta.
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
| `Button`      | `src/components/Button.tsx`      | Píldora `primary` (compra), `secondary` o `dark`; enlace si recibe `href`; estado no disponible |
| `AnnouncementBar` | `src/components/AnnouncementBar.tsx` | Franja de avisos con flechas, "Compra ahora" y términos |
| `Header`      | `src/components/Header.tsx`      | Marca, menú por categorías e iconos (favoritos, búsqueda, cuenta, carrito) |
| `MobileMenu`  | `src/components/MobileMenu.tsx`  | Menú colapsable por debajo de `xl`                   |
| `IconButton`  | `src/components/IconButton.tsx`  | Botón o enlace circular de 44 px con icono y contador opcional |
| Iconos        | `src/components/icons.tsx`       | SVG propios en línea: interfaz (corazón, lupa, persona, bolsa, menú, cerrar, flechas), secciones (grano, cafetera, taza, hoja, etiqueta), ayuda y redes genéricas |
| `Breadcrumb`  | `src/components/Breadcrumb.tsx`  | Ruta de navegación para páginas interiores           |
| `ProductDetail` | `src/components/ProductDetail.tsx` | Contenido de la ficha: foto, nombre, precio, color, compra y descripción |
| `ProductMedia` | `src/components/ProductMedia.tsx` | Espacio de la imagen con cinta de descuento e insignia de agotado (tarjeta y ficha) |
| `ProductPrice` | `src/components/ProductPrice.tsx` | Precio normal en verde o de oferta con tachado y nota (tarjeta y ficha) |
| `ColorSelector` | `src/components/ColorSelector.tsx` | Grupo de opciones de color con círculos (componente cliente) |
| `NotFoundContent` | `src/components/NotFoundContent.tsx` | Aviso 404 con acciones para volver a la portada |
| `Hero`        | `src/components/Hero.tsx`        | Hero partido con el `h1` y la barra de pestañas      |
| `HeroTabs`    | `src/components/HeroTabs.tsx`    | Barra "Filtro" con pestañas a las secciones          |
| `SectionNav`  | `src/components/SectionNav.tsx`  | Sub-header fijo con desplegable y chips de categoría |
| `SectionIcon` | `src/components/SectionIcon.tsx` | Icono de cada sección (`store-sections.ts`)          |
| `SectionThumbnail` | `src/components/SectionThumbnail.tsx` | Miniatura redonda de 32 px con la foto de la categoría o su icono |
| `CategorySection` | `src/components/CategorySection.tsx` | Banner oscuro con título, fotos editoriales opcionales y tarjetas montadas encima |
| `Section`     | `src/components/Section.tsx`     | Sección con `h2`, descripción y fondo `default`/`muted` |
| `ProductCard` | `src/components/ProductCard.tsx` | Tarjeta blanca con cinta de descuento, colores, precio y botón de compra |
| `ProductGrid` | `src/components/ProductGrid.tsx` | Rejilla de `ProductCard` con estado vacío             |
| `CatalogNoticePanel` | `src/components/CatalogNoticePanel.tsx` | Aviso de sección de catálogo vacía ("Próximamente" o "Sin promociones por ahora") |
| `Faq`         | `src/components/Faq.tsx`         | Acordeón `details`/`summary` con "Mostrar más"      |
| `Footer`      | `src/components/Footer.tsx`      | Pagos de demostración, redes, país, enlaces, volver arriba y aviso |
| `HelpWidget`  | `src/components/HelpWidget.tsx`  | Botón flotante "¿Te ayudamos?" con diálogo de accesos |
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
- **Props:** `children`; `variant` (`primary` por defecto, `secondary` o `dark`); `href`
  opcional; `unavailable` y `describedBy` para acciones que aún no existen; `className` para
  el ancho.
- **Variantes:** `primary` (píldora `buy-700`, texto `white`) para comprar; `dark` (píldora
  `ink-900`, texto `white`) para la acción de un bloque editorial como el hero; `secondary`
  (píldora con borde `ink-900`, sin fondo).
- **Estados:** reposo, hover y activo según la tabla de estados; foco con el contorno global.
  **No disponible:** `<button aria-disabled="true">` que sigue siendo enfocable y se describe
  con `aria-describedby`; no navega aunque reciba `href`. Ignora la variante y se ve atenuado
  (`neutral-200` con texto `ink-700`, 7.06:1), sin hover ni estado activo y con cursor
  `not-allowed`. Aún no hay estado de carga.
- **Celular y escritorio:** alto mínimo de 44 px y relleno lateral de 24 px. Quien lo usa decide
  el ancho (`w-full` en tarjetas y en el hero en celular).
- **Accesibilidad:** con `href` renderiza un enlace de `next/link` (navega); sin `href` o no
  disponible, un `<button type="button">` (actúa), para que se anuncie el rol correcto.

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
  la portada. En la ficha la ruta es Inicio > categoría (enlace al ancla de su sección en la
  portada, por ejemplo `/#cafe`, según `CATEGORY_SECTIONS` de `store-sections.ts`) > producto.
- **Celular:** si el nombre del producto no cabe, el último nivel pasa a una segunda línea.
- **Props:** `items` (`{ label, href? }[]`), de la portada a la página actual.
- **Contenido:** niveles anteriores como enlaces `ink-700` (hover `ink-900` subrayado);
  separadores con la flecha derecha en `ink-500`; el último nivel en `ink-900`, sin enlace.
- **Accesibilidad:** `<nav aria-label="Ruta de navegación">` con `<ol>`; el último nivel lleva
  `aria-current="page"`. Los separadores son decorativos. Cada nivel mide 44 px de alto.

### Hero

- **Propósito:** presentar la novedad de la tienda y repartir a las secciones.
- **Props:** ninguna; el texto es fijo. Exporta `HERO_ID` (`inicio`), que observa el sub-header.
- **Contenido:** bloque `clay-200` con categoría pequeña en mayúsculas (`ink-700`), titular
  en negritas (`h1`), subtítulo de producto nuevo y botón `dark` "Conoce la Ladera Pro"
  (a `#cafeteras`); a la derecha, la foto de ambiente (`HERO_IMAGE`, ver Imágenes) sobre un
  espacio reservado `neutral-200`.
- **Celular:** texto arriba e imagen abajo con proporción 4:3 (`--aspect-hero-compact`); botón a
  ancho completo. **Desde `md`:** dos columnas iguales a todo el ancho de la ventana; la imagen
  es cuadrada (`--aspect-hero`) y el bloque de color se estira a su altura.
- **Barra de pestañas:** `HeroTabs` dentro de `Container`, subida 32 px (`-mt-8`) para montarse
  sobre el borde inferior del hero.
- **Accesibilidad:** único `h1` de la portada; la sección se nombra con él. La foto lleva un
  `alt` descriptivo.

### HeroTabs

- **Propósito:** saltar desde el hero a Café, Cafeteras, Accesorios y La diferencia.
- **Props:** `sections` (`SectionLink[]` de `store-sections.ts`).
- **Contenido:** "Filtro" en negritas con separador vertical `neutral-200` y una pestaña por
  sección con su miniatura redonda (`SectionThumbnail`). Barra blanca con borde `neutral-200`, radio `lg` y
  `--shadow-overlay`.
- **Estados:** la pestaña de la sección visible lleva subrayado `ink-900` de 2 px. Antes de que
  haya una sección a la vista se subraya la primera solo de forma visual.
- **Celular:** "Filtro" queda fijo y las pestañas se desplazan en horizontal. **Escritorio:** todas
  caben en una fila.
- **Accesibilidad:** decisión: `<nav aria-label="Filtrar por categoría">` con enlaces a anclas y
  no `role="tablist"`, porque desplazan la página en lugar de cambiar paneles. La sección visible
  se marca con `aria-current="true"`; el subrayado inicial de la primera no lo lleva, para no
  anunciar una ubicación falsa. El contorno de foco se dibuja hacia dentro porque la lista recorta
  lo que sobresale. Pestañas de 56 px de alto.

### SectionNav

- **Propósito:** sub-header que permite cambiar de sección sin volver arriba.
- **Props:** `sections` (Promociones, Café, Cafeteras y Accesorios) y `triggerId`.
- **Comportamiento:** fijo arriba; aparece cuando el hero sale por el borde superior
  (`IntersectionObserver`). Mientras está oculto queda fuera de la pantalla y con `inert`. La
  entrada se anima solo con `motion-safe:`.
- **Contenido:** desplegable de categoría hecho con `<details>` (muestra la sección actual) y
  chips píldora con la miniatura redonda de 32 px (`SectionThumbnail`); el chip de la sección visible se rellena de
  `ink-900`. Cuando la zona de lectura está en una sección que no es de catálogo (La diferencia,
  Suscripción, preguntas frecuentes, Términos o el pie), ningún chip queda marcado ni lleva
  `aria-current` y el desplegable muestra la opción neutra "Categoría". `useActiveSection` lleva
  la cuenta de qué secciones observadas cruzan la banda y vuelve a `null` cuando ninguna lo hace.
- **Celular:** desplegable a la izquierda y chips con desplazamiento horizontal.
- **Accesibilidad:** `<nav aria-label="Secciones del catálogo">`. El desplegable abre con Enter o
  Espacio, se cierra con Escape (el foco vuelve al resumen) o al elegir una sección. Decisión: se
  usa `<details>` con enlaces y no un `<select>` que navegue al cambiar, porque con flechas del
  teclado algunos navegadores disparan el cambio en cada opción. `scroll-padding-top` evita que
  la barra tape el destino o el foco.

### SectionThumbnail

- **Propósito:** identificar cada categoría con una imagen en las pestañas del hero y en los chips
  del sub-header.
- **Props:** `section` (`SectionLink`, con `image` opcional).
- **Contenido:** círculo de 32 px. Con foto (Café, Cafeteras y Accesorios): fondo `white`, borde
  `neutral-200` y la foto con `object-cover` ampliada al 125 %, porque las fotos tienen mucho
  margen blanco y a 32 px el producto no se reconocería. Sin foto (Promociones y La diferencia):
  fondo `neutral-100` con el icono de 16 px, para que todas las pestañas queden alineadas.
- **Carga:** siempre diferida, también en las pestañas del hero aunque estén en la primera
  pantalla. Decisión: con `loading="eager"` React agrega un `<link rel="preload">` por miniatura
  que compite con la foto del hero; en diferido el navegador las pide en cuanto calcula que están
  a la vista. Una prueba de `HeroTabs` impide que vuelvan a precargarse.
- **Accesibilidad:** decorativa: `alt=""` y `aria-hidden`, porque el texto del enlace ya nombra
  la sección. El área táctil la da el enlace (56 px en pestañas, 44 px en chips).

### SectionIcon

- Traduce el nombre de icono de `store-sections.ts` (`bean`, `machine`, `cup`, `leaf`, `tag`)
  a su SVG decorativo. Lo usan `HeroTabs` y `SectionNav`.

### CategorySection

- **Propósito:** sección de catálogo con presencia de boutique.
- **Props:** `id`, `title`, `description`, `note` opcional (recibe el id `<id>-nota`) y
  `children`. La portada ya no pasa `note`: la nota de "Vista previa" desapareció cuando las
  tarjetas empezaron a enlazar a la ficha.
- **Contenido:** banner `banner-texture` con título `h2` en mayúsculas blancas, descripción y
  nota en `neutral-100`; debajo, el contenido sube 96 px (112 px desde `md`) para que las
  tarjetas blancas se monten sobre la franja oscura.
- **Fotos editoriales (`images`, opcional):** Cafeteras muestra la cafetera de espresso y la de
  goteo; Accesorios, las tazas. Decisión: como las fotos tienen fondo blanco, van en recuadros
  blancos con radio `lg` y `object-contain`, como piezas en vitrina sobre la franja oscura. Se
  descartó el círculo porque recortaría la cafetera de espresso, que es alta, y porque el círculo
  ya identifica a las miniaturas de navegación. **Celular:** recuadros de 64 px bajo el texto,
  para que el banner crezca solo unos 88 px y las tarjetas sigan montándose sobre él. **Desde
  `md`:** a la derecha del texto, de 128 px (176 px desde `lg`). Carga diferida (están lejos de la
  primera pantalla) y `alt` descriptivo, porque ilustran la categoría. Solo aparecen cuando la
  sección tiene productos; si está vacía, las fotos pasan a `CatalogNoticePanel`.
- **Accesibilidad:** `<section>` nombrada por su `h2`. Las mayúsculas son de CSS, así que los
  lectores de pantalla leen el texto normal.

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

- **Propósito:** mostrar un producto en listados.
- **Props:** `product` (`Product` del dominio).
- **Contenido (centrado):** `ProductMedia` (imagen reservada `neutral-100`, cinta diagonal
  `promo-600` con el porcentaje de `getDiscountPercentage` e insignia "Agotado"); círculos de
  `colorOptions`; nombre en negritas (`h3`); notas de sabor en píldoras si las hay; frase
  corta; `ProductPrice`; botón `primary` "Ver detalles y comprar" a ancho completo, que enlaza
  a `/productos/<handle>` (`productHref` de `product-links.ts`).
- **Colores:** círculos de 20 px con borde `neutral-500` (3:1) para que se distingan los tonos
  claros. El color viene del producto, no de la paleta: es la única excepción a los tokens. En la
  tarjeta son informativos; se eligen en la ficha.
- **Botón:** siempre es el enlace verde, también si el producto está agotado, porque la ficha
  explica el estado y ofrece relacionados. El estado "Próximamente" y la prop `purchaseNoteId`
  se retiraron al existir la ficha.
- **Estados:** disponible, en oferta y agotado (combinables).
- **Celular:** imagen 4:3. **Desde `md`:** imagen 4:5. Tarjeta blanca con borde `neutral-200` y
  radio `lg`; el bloque de precio y botón queda al pie aunque las descripciones difieran.
- **Accesibilidad:** `<article>`; imagen decorativa. La cinta "-18%" se lee "18% de descuento";
  los colores son una lista `aria-label="Colores disponibles"` con el nombre de cada color en
  texto oculto (y en `title` para quien usa ratón).

### ProductMedia

- **Propósito:** reservar el espacio de la foto de un producto y mostrar sus marcas.
- **Props:** `product` y `variant` (`card` o `detail`). La foto sale de `product.image`; el
  componente no conoce rutas de archivos.
- **Con foto:** `next/image` con `object-contain` sobre `white` (ver Imágenes); en `detail`, carga
  inmediata y prioritaria y borde `neutral-200`. **Sin foto:** espacio reservado `neutral-100`.
- **Proporciones:** `card` usa 4:3 en celular y 4:5 desde `md`. `detail` usa 4:3 hasta `lg` y
  4:5 desde `lg` (dos columnas). Decisión: en tableta la foto de la ficha ocupa todo el ancho y a
  4:5 mediría unos 900 px de alto, lo que alejaría el precio y el botón de la primera pantalla.
- **Marcas:** cinta diagonal `promo-600` con el descuento (más ancha en `detail`) e insignia
  píldora `ink-900` "Agotado" arriba a la derecha.
- **Accesibilidad:** la foto lleva el `alt` de los datos; el espacio reservado sin foto es
  `aria-hidden`. La cinta se lee "18% de
  descuento".

### ProductPrice

- **Propósito:** mostrar el precio con el mismo tratamiento en toda la tienda.
- **Props:** `product` y `size` (`card`, centrado, `text-xl`; `detail`, alineado a la
  izquierda, `text-3xl`).
- **Estados:** sin descuento, `buy-700` en negritas. Con descuento real, precio anterior tachado
  (`<del>`, `ink-500`), precio de oferta `sale-700` en negritas y la nota "*Reflejado al final
  de tu compra".
- **Accesibilidad:** textos ocultos "Precio anterior:" y "Precio de oferta:"; el asterisco de la
  nota se oculta.

### ColorSelector

- **Propósito:** elegir el color de un producto en la ficha.
- **Props:** `colors` y `name` (nombre del grupo, `color-<handle>`).
- **Comportamiento:** componente cliente con el color elegido en estado local; el primero queda
  elegido al cargar. El nombre del color elegido se muestra junto a la leyenda ("Color:
  Grafito"). Aún no cambia precio ni existencias porque los datos de ejemplo no tienen variantes
  por color.
- **Estados:** reposo, hover, elegido y foco (ver la tabla de estados).
- **Accesibilidad:** `<fieldset>` con `<legend>` "Color" y `<input type="radio">` nativos
  visualmente ocultos, por lo que el navegador aporta el rol, el nombre del grupo, Tab para
  entrar y las flechas para cambiar. Cada opción se nombra con el color en texto oculto; el
  nombre repetido junto a la leyenda es `aria-hidden` para no anunciarlo dos veces. Áreas de
  44 px y foco con contorno exterior visible además del anillo de selección.

### ProductDetail

- **Propósito:** contenido principal de la ficha de producto.
- **Props:** `product`.
- **Contenido (en orden):** `ProductMedia` (`detail`); nombre como `h1`; notas de sabor en
  píldoras si las hay; `ProductPrice` (`detail`); `ColorSelector` si hay colores; botón
  "Agregar al carrito" con su nota; separador `neutral-200` y "Descripción" (`h2`).
- **Compra:** decisión: la tienda aún no tiene carrito (el contador del encabezado es fijo), así
  que el botón es `Button unavailable` (`aria-disabled`, enfocable) descrito por la nota visible
  "La compra aún no está disponible en esta demostración.". Si el producto está agotado, la nota
  dice "Agotado" en `ink-900` y negritas. No se simula un carrito.
- **Celular y tableta:** una columna; foto, nombre, precio, color y botón quedan seguidos para
  que la decisión de compra no requiera recorrer la descripción. **Desde `lg`:** dos columnas
  iguales, foto a la izquierda y datos a la derecha.
- **Accesibilidad:** `<article>`; un solo `h1`. El botón se anuncia como no disponible y lee el
  motivo con `aria-describedby`.

### NotFoundContent

- **Propósito:** que una dirección inexistente no deje a la persona sin salida.
- **Props:** `title` (`h1`) y `description`.
- **Contenido:** "Error 404" pequeño en mayúsculas, título, explicación, botón `dark` "Ir a la
  portada" (acción principal) y botón `secondary` "Ver promociones". Lo usan `app/not-found.tsx`
  ("No encontramos esta página") y `app/productos/[handle]/not-found.tsx` ("No encontramos este
  producto"). Encabezado y pie del layout siguen visibles.
- **Celular:** botones apilados a ancho completo. **Desde `sm`:** en una fila.

### ProductGrid

- **Propósito:** listar productos con la misma rejilla en toda la tienda.
- **Props:** `products`; `emptyMessage` opcional.
- **Estados:** con productos (lista) y vacío (tarjeta blanca con el mensaje, sin lista vacía).
  En la portada el vacío no llega a usarse: `buildHomeCatalog` muestra `CatalogNoticePanel` en su
  lugar. Se conserva para otros listados (por ejemplo, los relacionados).

### CatalogNoticePanel

- **Propósito:** que una sección de catálogo sin productos se vea intencional y ofrezca un
  siguiente paso, en lugar de un texto plano.
- **Props:** `notice` (`CatalogNotice`: `title`, `text`, `images` y `action` opcional).
- **Contenido:** panel blanco con borde `neutral-200` y radio `lg` que se monta sobre el banner
  como lo harían las tarjetas; fotos editoriales en recuadros blancos con borde `neutral-200` y
  `object-contain`; título `h3` (`text-xl`), texto `ink-700` y botón `dark` con la acción.
- **Qué no es:** no se parece a un producto a la venta. No tiene precio, ni botón de compra verde,
  ni enlace a una ficha, ni es un `<article>`.
- **Celular:** fotos de 112 px arriba y texto debajo; botón a ancho completo. **Desde `md`:** fotos
  a la izquierda (160 px; 192 px desde `lg`) y texto a la derecha.
- **Accesibilidad:** las fotos llevan su `alt` descriptivo y carga diferida; el título queda
  bajo el `h2` de la sección.
- **Celular:** una columna. **Desde `sm`:** dos. **Desde `lg`:** tres. Separación de 24 px.
- **Accesibilidad:** `<ul>` con un `<li>` por tarjeta, para que se anuncie el número de productos.

### Faq

- **Propósito:** resolver dudas sobre café, cafeteras, envíos y la demostración.
- **Props:** `items` (`FaqItem[]` del dominio) e `initialCount` (4 por defecto).
- **Comportamiento:** cada pregunta es `<details>`/`<summary>` (abre sin JavaScript); solo las
  primeras cuatro se ven y "Mostrar más (n)" revela el resto y lleva el foco a la primera nueva;
  "Mostrar menos" las vuelve a ocultar. La flecha gira solo con `motion-safe:`.
- **Accesibilidad:** el botón usa `aria-expanded` y `aria-controls`. Cada pregunta tiene el id
  `faq-<id>` para enlazarla (el pie enlaza `faq-envios` y `faq-facturacion`, que están entre
  las cuatro visibles). Resúmenes de al menos 56 px.

### Footer

- **Propósito:** cierre de la página con información, confianza y aviso de demostración.
- **Props:** ninguna.
- **Contenido:** marca, aviso y enlaces del proyecto (código y documentación); "Métodos de pago
  (demostración)" con etiquetas de texto genéricas (sin logos ni promesas de seguridad); redes
  sociales con iconos propios genéricos que no son enlaces porque aún no hay perfiles; selector
  "País e idioma" con la única opción México (Español); enlaces de información en mayúsculas
  separados por "/" (todos a anclas de la portada); botón "Desplazarse hasta arriba" (`#top`,
  que HTML define como inicio del documento, sin JavaScript); aviso de derechos con año fijo
  para que la página siga siendo estática.
- **Celular:** bloques apilados y relleno inferior de 96 px para que el botón flotante no tape el
  final. **Desde `md`:** dos columnas; **desde `lg`:** tres.
- **Accesibilidad:** fondo `ink-900` con texto `neutral-100` (16.89:1), enlaces `white` y foco
  `white` (18.42:1). Bordes `neutral-500` (5.34:1). Los separadores "/" son `aria-hidden` y van
  detrás de cada enlace para no encabezar una línea. Navegaciones "Proyecto" e "Información"
  nombradas; títulos `h2` pequeños.

### HelpWidget

- **Propósito:** ayuda siempre a mano sin simular un chat.
- **Props:** `links` (texto y ancla).
- **Comportamiento:** botón flotante abajo a la derecha; abre un diálogo no modal con accesos a
  la FAQ, a envíos y al contacto de demostración. Al abrir, el foco pasa al botón de cerrar;
  Escape o "Cerrar ayuda" lo cierran y devuelven el foco al botón flotante.
- **Celular:** solo el icono en un círculo de 48 px (el texto queda para lectores de pantalla),
  para no tapar precios ni botones; el diálogo ocupa el ancho disponible. **Desde `md`:**
  píldora con icono y "¿Te ayudamos?"; diálogo de 320 px.
- **Accesibilidad:** `aria-haspopup="dialog"`, `aria-expanded` y `aria-controls`; el panel es
  `role="dialog"` nombrado por su título. No atrapa el foco porque no es modal. El borde
  `white` mantiene visible el botón sobre el pie oscuro. El contenedor fijo deja pasar los clics
  salvo en sus hijos.

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

## Franja "Prepara tu café en casa"

Decisión: no se agregó. Mostraría las mismas dos cafeteras que el banner de Cafeteras, que está
justo debajo, y alargaría una portada que ya tiene ocho secciones. Si más adelante hay una foto
de ambiente distinta (por ejemplo, una barra de café en una cocina), puede ir como franja
editorial entre Accesorios y La diferencia, con un enlace a `#cafeteras`.

## Orden de la ficha de producto

Ruta de navegación, `ProductDetail` (foto y datos) y, si hay otros productos de la misma
categoría, la sección `muted` "También te puede interesar" con hasta tres `ProductCard`.

## Orden de la portada

Hero con `HeroTabs`, `SectionNav` (fijo, aparece tras el hero), cuatro `CategorySection`
(Promociones, Café, Cafeteras y Accesorios), La diferencia (foto de ambiente y los tres
puntos; en celular apilados, desde `lg` en dos columnas), Suscripción, ¿Necesitas ayuda? (FAQ
y contacto) y Términos y condiciones. `HelpWidget` está en el layout y aparece en todas las
páginas.
