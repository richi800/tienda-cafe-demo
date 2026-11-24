@AGENTS.md

# Guía del proyecto tienda-cafe-demo

Tienda de café de demostración (marca ficticia "Café Ladera") para portafolio. Next.js con App
Router, TypeScript estricto, Tailwind CSS, ESLint, Vitest y npm. Se conectará a la Storefront API
de una tienda de desarrollo de Shopify y se desplegará en Vercel (plan gratuito). No se realizan
ventas reales.

## Estructura de carpetas

- `src/app`: rutas de Next.js (layouts, páginas, route handlers).
- `src/components`: componentes de interfaz; reciben datos por props.
- `src/domain`: tipos y reglas de negocio puras, sin React, Next.js ni red. No importa de otras carpetas.
- `src/lib`: clientes de APIs externas (por ejemplo `src/lib/shopify`) e infraestructura.
- `src/data`: datos de ejemplo.
- `public/brand`: logo de la marca (`logo.svg`), proporcionado por el dueño del proyecto.
- `docs`: documentación técnica (`docs/arquitectura.md`). Actualízala si cambian la estructura,
  el flujo de datos o una decisión técnica.
- Las pruebas van junto al archivo probado con sufijo `.test.ts` / `.test.tsx`.

## Idioma

- Nombres de código en inglés: variables, funciones, tipos, componentes y archivos
  (por ejemplo `Product`, `Money`, `formatPrice`, `DemoNotice`, `sample-products.ts`).
- En español: comentarios, TSDoc, mensajes de error, textos de la interfaz, README, `docs/` y este archivo.

## Reglas de documentación del código

- Código autoexplicativo: nombres claros y funciones pequeñas con una sola responsabilidad.
- Documenta con TSDoc las funciones, tipos y módulos públicos: qué hacen, `@param`, `@returns`
  y `@throws` cuando aplique. Los módulos llevan un bloque `@packageDocumentation`.
- Comentarios en línea solo para explicar el porqué de una decisión, nunca para repetir lo que
  el código ya dice.
- Texto plano y profesional: sin emojis, iconos, dibujos ni arte ASCII.

## Agentes

- Todo trabajo de interfaz (páginas, componentes, estilos y flujos) se delega al subagente
  `ui-ux-designer`, definido en `.claude/agents/ui-ux-designer.md`.
- El subagente mantiene el sistema de diseño en `docs/diseno.md` y sigue las reglas de este archivo.

## Seguridad y configuración

- Variables de entorno documentadas en `.env.example`, sin valores reales. `.env.local` está ignorado.
- El token de Shopify solo se usa en el servidor; nunca con prefijo `NEXT_PUBLIC_`.
- El build no debe requerir secretos (la CI corre sin ellos).

## Git

- Mensajes de commit claros (estilo Conventional Commits, en español).
- No agregar la línea `Co-Authored-By` en los commits.
- No subir a GitHub ni hacer push salvo que se pida.

## Verificación

Antes de dar un paso por terminado deben pasar:

```bash
npm run lint
npm test
npm run build
```
