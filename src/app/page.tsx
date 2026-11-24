/**
 * Portada provisional de la tienda. El catálogo se agregará en pasos posteriores.
 *
 * @returns La página de inicio.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Café Ladera</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        Café de especialidad tostado en pequeños lotes. Marca ficticia creada como
        proyecto de portafolio.
      </p>
    </main>
  );
}
