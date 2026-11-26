/**
 * Presentación principal de la portada.
 *
 * @packageDocumentation
 */

import { Button } from "./Button";
import { Container } from "./Container";

/**
 * Muestra el título de la página, la propuesta de valor y la acción principal
 * ("Ver café"), con un enlace secundario a las cafeteras.
 *
 * @returns La sección de bienvenida con el único `h1` de la portada.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="bg-neutral-100 py-section">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-ink-700 uppercase">
            Café de especialidad mexicano
          </p>
          <h1
            id="hero-titulo"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-balance text-ink-900 md:text-6xl md:leading-tight"
          >
            Recién tostado, directo de la ladera a tu taza
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-700 md:mt-6 md:text-xl">
            Granos de fincas de Chiapas, Veracruz y Oaxaca, tostados en pequeños lotes cada
            semana y enviados a todo México.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#cafe">Ver café</Button>
            <Button href="#cafeteras" variant="secondary">
              Ver cafeteras
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
