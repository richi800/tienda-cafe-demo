# Pendientes de la página de inicio

Punto de guardado de la rama `feature/homepage`. El trabajo se detuvo antes de terminar la
revisión final del plan aprobado (sistema de diseño mínimo y página de inicio).

## Hecho

- Tokens del sistema de diseño en `src/app/globals.css` y documentación en `docs/diseno.md`.
- Campo `flavorNotes` en `Product` y en los datos de ejemplo.
- Componentes `Button`, `Container`, `Header`, `Hero`, `Section`, `ProductCard` y `Footer`,
  `DemoNotice` migrado a los tokens y `resolveBrandLogo` en `src/lib/brand`.
- Página de inicio y layout con enlace para saltar al contenido, encabezado y pie de página.
- `images.unoptimized` en `next.config.ts`.
- Lint, 21 pruebas y build en verde.

## Falta del plan aprobado

1. **Revisión visual.** Se tomaron capturas a 375, 768 y 1280 px, pero no se confirmó que
   correspondan al estado final ni se corrigió lo que muestren. Volver a generarlas con
   `npm start` y Edge sin interfaz, y revisar desbordes horizontales, espaciados y jerarquía.
2. **Revisión manual de accesibilidad (WCAG 2.2 AA):**
   - orden de tabulación: saltar al contenido, marca, navegación, carrito y "Ver productos";
   - foco visible en todos los elementos interactivos;
   - un solo `h1` y jerarquía `h2`/`h3` correcta;
   - áreas táctiles de al menos 44 px;
   - contrastes de la tabla de `docs/diseno.md`.
3. **Revisar `docs/diseno.md`.** El agente lo escribía cuando se detuvo. El documento termina
   bien, pero de los componentes solo describe el encabezado; falta comprobar que no le falte
   nada más.
4. **Resumen final** de cómo se ve en celular y en escritorio, con las capturas.

## Fuera del alcance de esta rama

- Páginas Productos y Nosotros: hoy la navegación apunta a `/#productos` y `/#nosotros`.
- Funcionalidad del carrito: el botón muestra el contador en 0 y no hace nada todavía.
- `public/brand/logo.svg`: lo entrega el dueño del proyecto; mientras tanto se muestra el texto.
- Fotos de producto: por ahora hay un espacio neutro con proporción fija.
- Tema oscuro.
