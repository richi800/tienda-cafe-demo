/**
 * Lectura de las medidas de un archivo WebP desde su cabecera, sin dependencias.
 *
 * Se usa en las pruebas para comprobar que el `width` y el `height` declarados de cada foto
 * coinciden con el archivo real, de modo que el espacio reservado no provoque saltos.
 *
 * @packageDocumentation
 */

/** Medidas en píxeles de una imagen. */
export type ImageSize = {
  width: number;
  height: number;
};

/**
 * Lee el ancho y el alto de un WebP (formatos VP8, VP8L y VP8X).
 *
 * @param file - Contenido completo del archivo.
 * @returns Las medidas en píxeles.
 * @throws {Error} Si el contenido no es un WebP reconocible.
 */
export function readWebpSize(file: Uint8Array): ImageSize {
  const view = new DataView(file.buffer, file.byteOffset, file.byteLength);
  const ascii = (start: number, end: number) =>
    String.fromCharCode(...file.subarray(start, end));
  const uint24 = (offset: number) =>
    view.getUint8(offset) | (view.getUint8(offset + 1) << 8) | (view.getUint8(offset + 2) << 16);

  if (file.byteLength < 30 || ascii(0, 4) !== "RIFF" || ascii(8, 12) !== "WEBP") {
    throw new Error("El archivo no es un WebP");
  }

  const chunk = ascii(12, 16);
  if (chunk === "VP8 ") {
    return {
      width: view.getUint16(26, true) & 0x3fff,
      height: view.getUint16(28, true) & 0x3fff,
    };
  }
  if (chunk === "VP8L") {
    const bits = view.getUint32(21, true);
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") {
    return { width: uint24(24) + 1, height: uint24(27) + 1 };
  }
  throw new Error(`Formato WebP no reconocido: ${chunk}`);
}
