₢export function GridBackground() {
  return (
    <div
      className={
        'pointer-events-none fixed left-0 top-0 -z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-orange-600/[.01] bg-dot-black/20 dark:bg-dot-white/[.075]'
      }
    >
      <div
        className={
          'pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black)] dark:bg-black'
        }
      />
    </div>
  )
}
