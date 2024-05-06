import { cn } from '@/lib/utils'

export function GradientText({ className, children }) {
  return (
    <span
      className={cn(
        'inline-flex min-h-fit min-w-fit items-center bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-lg font-extrabold text-transparent',
        className,
      )}
    >
      {children}
    </span>
  )
}
