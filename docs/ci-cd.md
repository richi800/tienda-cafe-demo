# Integración y despliegue continuos

Este documento describe el recorrido de un cambio desde la rama de trabajo hasta producción, qué
verifica cada etapa y cómo se protege la rama `main`.

## Resumen del flujo

1. **Rama.** Todo cambio se hace en una rama creada desde `main`.
2. **Pull request.** La rama se publica en GitHub y se abre un pull request hacia `main` con la
   plantilla del proyecto.
3. **CI.** GitHub Actions ejecuta lint, pruebas, build y el análisis de CodeQL.
4. **Vista previa en Vercel.** Vercel despliega la rama en una URL temporal y la enlaza en el
   pull request.
5. **Revisión.** Se revisan el código, los resultados de la CI y la vista previa.
6. **Merge a main.** Con todas las verificaciones en verde se hace el merge.
7. **Producción.** El push a `main` vuelve a correr la CI y Vercel despliega a producción en
   <https://tienda-cafe-demo.vercel.app>.

## 1. Rama

- Se crea desde un `main` actualizado: `git switch main && git pull && git switch -c tipo/descripcion`.
- El prefijo indica el tipo de cambio, igual que en los commits: `feat/`, `fix/`, `docs/`,
  `refactor/`, `test/`, `ci/` o `chore/`.
- Los commits siguen Conventional Commits en español, por ejemplo
  `feat: agrega la página de producto`.
- Antes de publicar la rama se corre en local lo mismo que correrá la CI:

  ```bash
  npm run lint
  npm test
  npm run build
  ```

Los push a una rama que todavía no tiene pull request no disparan la CI; la verificación empieza
al abrir el pull request.

## 2. Pull request

- Se abre hacia `main` y se completa la plantilla `.github/pull_request_template.md`: resumen,
  tipo de cambio, cómo se probó y capturas si cambia la interfaz.
- Cada push nuevo a la rama actualiza el pull request y vuelve a disparar las verificaciones.

## 3. Integración continua

Dos workflows de GitHub Actions verifican el pull request.

### CI (`.github/workflows/ci.yml`)

Un job, **Lint, pruebas y build**, que instala dependencias con `npm ci` y ejecuta
`npm run lint`, `npm test` y `npm run build`.

| Aspecto           | Configuración                                                                     |
| ----------------- | --------------------------------------------------------------------------------- |
| Disparadores      | `pull_request` hacia cualquier rama y `push` solo a `main`.                       |
| Caché             | `actions/setup-node` guarda la caché de npm según `package-lock.json`.            |
| Concurrencia      | Un push nuevo al mismo pull request cancela la ejecución anterior. En `main` no se cancela, para que cada commit de producción quede verificado. |
| Permisos          | `contents: read`; el token de la ejecución no puede escribir en el repositorio.   |
| Secretos          | Ninguno. El build no depende de las variables de Shopify.                         |
| Tiempo máximo     | 15 minutos.                                                                       |

Limitar el `push` a `main` evita que cada pull request ejecute la CI dos veces: una por el push a
la rama y otra por el pull request.

### CodeQL (`.github/workflows/codeql.yml`)

Un job, **Analizar (javascript-typescript)**, que busca vulnerabilidades con el análisis estático
de GitHub. Corre en cada pull request, en cada push a `main` y los lunes a las 06:00 UTC, para
detectar reglas nuevas sobre código que no ha cambiado. Los hallazgos aparecen en la pestaña
**Security > Code scanning** y como anotaciones en el pull request.

Usa `build-mode: none` porque JavaScript y TypeScript se analizan sin compilar. Además de
`contents: read`, necesita `security-events: write` para publicar resultados y `actions: read`
para leer el estado del workflow.

### Dependabot (`.github/dependabot.yml`)

Cada lunes revisa las dependencias de npm y las versiones de las GitHub Actions y abre pull
requests de actualización, que pasan por el mismo flujo que cualquier otro cambio. Las
actualizaciones menores y de parche se agrupan en un solo pull request por ecosistema; las
mayores llegan por separado para revisarlas con cuidado.

## 4. Vista previa en Vercel

El proyecto está conectado a Vercel mediante su integración con GitHub; no hay un workflow de
despliegue en el repositorio.

- Cada push a una rama con pull request genera un **Preview Deployment** con su propia URL.
  Vercel publica un comentario y un check en el pull request con el enlace.
- La vista previa usa las variables de entorno del ambiente *Preview* configuradas en Vercel.
  Los secretos viven en Vercel, nunca en el repositorio.
- Es el lugar para revisar los cambios de interfaz en escritorio y en móvil antes del merge.

## 5. Revisión

Antes de aprobar se comprueba:

- Que los checks **Lint, pruebas y build** y **Analizar (javascript-typescript)** estén en verde,
  así como el despliegue de vista previa de Vercel.
- Que el código respete las reglas de `CLAUDE.md`: estructura de carpetas, idioma y TSDoc.
- Que `docs/` refleje cualquier cambio de estructura, flujo de datos o decisión técnica.
- Que la vista previa funcione como se describe en el pull request.

Todas las conversaciones del pull request deben quedar resueltas.

## 6. Merge a main

- Se usa **Squash and merge**: cada pull request queda como un solo commit en `main`, con el
  título del pull request en formato Conventional Commits.
- GitHub borra la rama después del merge.

## 7. Despliegue a producción

- El merge produce un push a `main`, que dispara de nuevo la CI y CodeQL sobre el resultado final.
- En paralelo, Vercel construye `main` y lo publica como **Production Deployment** en
  <https://tienda-cafe-demo.vercel.app>, con las variables del ambiente *Production*.
- Si algo falla en producción, se puede volver al despliegue anterior desde el panel de Vercel
  (**Instant Rollback**) mientras se prepara la corrección en una rama nueva.

## Protección de la rama main

En GitHub, **Settings > Branches > Add branch protection rule**, con el patrón `main`:

| Opción                                                     | Valor                                         |
| ---------------------------------------------------------- | --------------------------------------------- |
| Require a pull request before merging                      | Activada                                      |
| Require approvals                                          | Desactivada mientras el proyecto tenga un solo mantenedor (GitHub no permite aprobar el propio pull request). Con más colaboradores: 1 aprobación. |
| Dismiss stale pull request approvals when new commits are pushed | Activada                                |
| Require status checks to pass before merging               | Activada                                      |
| Checks requeridos                                          | `Lint, pruebas y build` y `Analizar (javascript-typescript)` |
| Require branches to be up to date before merging           | Activada                                      |
| Require conversation resolution before merging             | Activada                                      |
| Require linear history                                     | Activada                                      |
| Do not allow bypassing the above settings                  | Activada                                      |
| Allow force pushes                                         | Desactivada                                   |
| Allow deletions                                            | Desactivada                                   |

Los checks solo aparecen en el buscador de GitHub después de haber corrido al menos una vez, así
que conviene configurar la regla cuando el primer pull request con estos workflows ya se haya
verificado.

En **Settings > General > Pull Requests** se recomienda dejar habilitado solo
**Allow squash merging** y activar **Automatically delete head branches**.
