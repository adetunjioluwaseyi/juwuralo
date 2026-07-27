import { cn } from '@/lib/utils'

function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn('text-primary', className)}
    >
      <g stroke="currentColor" strokeWidth="1.6">
        <circle cx="24" cy="13" r="7.5" />
        <circle cx="24" cy="35" r="7.5" />
        <circle cx="13" cy="24" r="7.5" />
        <circle cx="35" cy="24" r="7.5" />
      </g>
      <circle cx="24" cy="24" r="2.4" fill="currentColor" />
    </svg>
  )
}

export function BrandLogo({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const marks = {
    sm: 'size-7',
    md: 'size-8',
    lg: 'size-16',
  }
  const titles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-3xl',
  }
  const subs = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-base',
  }

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <Monogram className={marks[size]} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-serif font-semibold tracking-[0.14em] text-cream',
            titles[size],
          )}
        >
          JUWURALO
        </span>
        <span
          className={cn(
            'mt-1 font-sans tracking-brand text-primary',
            subs[size],
          )}
        >
          ALASOOKE
        </span>
      </span>
    </span>
  )
}
