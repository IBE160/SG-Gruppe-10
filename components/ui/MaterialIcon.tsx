import { cn } from '@/lib/utils'

export interface MaterialIconProps {
  icon: string
  className?: string
  filled?: boolean
}

export function MaterialIcon({ icon, className, filled = false }: MaterialIconProps) {
  return (
    <span
      className={cn(
        filled ? 'material-symbols-filled' : 'material-symbols-outlined',
        className
      )}
    >
      {icon}
    </span>
  )
}
