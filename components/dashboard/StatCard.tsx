import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  icon: string
  label: string
  value: string | number
  unit?: string
  variant?: 'default' | 'highlighted'
}

export function StatCard({ icon, label, value, unit, variant = 'default' }: StatCardProps) {
  return (
    <Card
      className={cn(
        'transition-shadow',
        variant === 'highlighted'
          ? 'bg-primary-green text-white border-primary-green'
          : 'bg-white border-graphite-100'
      )}
    >
      <CardContent className="flex items-center gap-4 p-6">
        <MaterialIcon
          icon={icon}
          className={cn(
            'text-3xl',
            variant === 'highlighted' ? 'text-white' : 'text-primary-green'
          )}
        />
        <div className="flex flex-col">
          <span
            className={cn(
              'text-sm',
              variant === 'highlighted' ? 'text-white/90' : 'text-graphite-700'
            )}
          >
            {label}
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                'text-2xl font-semibold',
                variant === 'highlighted' ? 'text-white' : 'text-graphite-900'
              )}
            >
              {value}
            </span>
            {unit && (
              <span
                className={cn(
                  'text-sm',
                  variant === 'highlighted' ? 'text-white/90' : 'text-graphite-700'
                )}
              >
                {unit}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
