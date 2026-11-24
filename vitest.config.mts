import { defineConfig } from "vitest/config";

/**
 * Configuración de Vitest.
 *
 * Usa el entorno `node` porque las pruebas actuales cubren lógica sin interfaz.
 * `resolve.tsconfigPaths` hace que Vite resuelva el alias `@/` definido en
 * tsconfig.json, para no duplicar la definición de rutas.
 */
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
