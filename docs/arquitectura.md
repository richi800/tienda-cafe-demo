# Arquitectura

Este documento describe cómo está organizado el proyecto, cómo fluyen los datos y por qué se
tomaron las decisiones técnicas principales.

## Estructura de carpetas

| Carpeta              | Responsabilidad                                                                 |
| -------------------- | ------------------------------------------------------------------------------- |
| `src/app`            | Rutas de Next.js (App Router): layouts, páginas y, más adelante, route handlers. |
| `src/components`     | Componentes de interfaz reutilizables. Reciben datos ya preparados por props.   |
| `src/domain`         | Tipos y reglas de negocio puras, sin React, sin Next.js y sin acceso a red.     |
| `src/lib`            | Clientes de APIs externas y utilidades de infraestructura (por ejemplo Shopify). |
| `src/data`           | Datos de ejemplo para desarrollo local y pruebas.                               |
| `public/brand`       | Recursos de marca servidos tal cual, como el logo (`logo.svg`).                 |
| `docs`               | Documentación técnica del proyecto.                                             |
| `.github/workflows`  | Integración continua.                                                           |

Las pruebas se ubican junto al archivo que prueban, con el sufijo `.test.ts`.

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
  directamente desde `tsconfig.json`.
- **GitHub Actions** ejecuta lint, pruebas y build en cada push y pull request.
- **Vercel (plan gratuito)** como destino de despliegue, por su integración directa con Next.js.
