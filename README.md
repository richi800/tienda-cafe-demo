# Café Ladera: tienda de café de demostración

[![CI](https://github.com/richi800/tienda-cafe-demo/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/richi800/tienda-cafe-demo/actions/workflows/ci.yml)
[![CodeQL](https://github.com/richi800/tienda-cafe-demo/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/richi800/tienda-cafe-demo/actions/workflows/codeql.yml)

> **Tienda de demostración, no se realizan ventas reales.** Café Ladera es una marca ficticia.

**Demo:** <https://tienda-cafe-demo.vercel.app>

Proyecto de portafolio que construye una tienda en línea de café con Next.js. En las siguientes
etapas se conectará a la Storefront API de una tienda de desarrollo de Shopify y se publicará en
Vercel. Por ahora contiene la base del proyecto: estructura, herramientas de calidad y CI.

## Stack

- [Next.js](https://nextjs.org) con App Router y Server Components
- TypeScript en modo estricto
- Tailwind CSS
- ESLint
- Vitest para pruebas unitarias
- GitHub Actions para integración continua, CodeQL y Dependabot
- Shopify Storefront API (próximamente) y Vercel para el despliegue

## Requisitos

- Node.js 22 o superior
- npm

## Cómo correrlo

```bash
npm install
cp .env.example .env.local   # opcional por ahora: completa las variables de Shopify
npm run dev
```

Abre <http://localhost:3000> en el navegador.

## Scripts

| Comando              | Descripción                                    |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Servidor de desarrollo                         |
| `npm run build`      | Build de producción                            |
| `npm start`          | Sirve el build de producción                   |
| `npm run lint`       | Revisa el código con ESLint                    |
| `npm test`           | Ejecuta las pruebas una vez                    |
| `npm run test:watch` | Ejecuta las pruebas en modo observación        |

## Variables de entorno

Están documentadas en [`.env.example`](.env.example). El archivo `.env.local` está ignorado por git.

## Documentación

- [Arquitectura](docs/arquitectura.md): estructura de carpetas, flujo de datos y decisiones técnicas.
- [Integración y despliegue continuos](docs/ci-cd.md): flujo de ramas, pull requests, CI,
  vistas previas, despliegue a producción y protección de `main`.
