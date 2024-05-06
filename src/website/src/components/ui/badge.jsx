import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const badgeVariants = cva(
  'select-none inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-secondary/20 bg-secondary/60 text-secondary-foreground hover:bg-background/60',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
      micro: { true: 'px-1 py-0 font-medium' },
    },
    defaultVariants: {
      variant: 'default',
      micro: false,
    },
  },
)

function Badge({ className, variant, micro, ...props }) {
  return (
    <div
      className={cn(badgeVariants({ variant, micro }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
