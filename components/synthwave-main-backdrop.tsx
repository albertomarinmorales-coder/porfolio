/**
 * Fondo del área central (XMB). Colocar en el contenedor flex-1 del menú.
 */
export function SynthwaveMainBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Capa de color: más atardecer / neón en la zona baja */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen bg-gradient-to-b from-transparent from-[15%] via-primary/25 to-secondary/20" />
      <div className="synthwave-main-horizon-mist pointer-events-none absolute inset-x-0 top-[12%] bottom-0 opacity-100" />
      <div className="synthwave-main-sun pointer-events-none absolute" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[min(78%,24rem)] max-h-96 [perspective:min(80vw,720px)] [perspective-origin:50%_100%] sm:[perspective:720px]">
        <div className="synthwave-floor-3d pointer-events-none absolute" />
      </div>
      <div className="scanlines pointer-events-none absolute inset-0 opacity-[0.2] sm:opacity-[0.28]" />
    </div>
  );
}
