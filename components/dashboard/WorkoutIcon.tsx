import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { cn } from '@/lib/utils'

export interface WorkoutIconProps {
  workoutType: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled'
}

const workoutIconMap: Record<string, string> = {
  'Cardio': 'directions_run',
  'Strength': 'fitness_center',
  'Yoga': 'self_improvement',
  'Flexibility': 'accessibility',
  'Sports': 'sports_soccer',
  'Other': 'sports'
}

const sizeMap = {
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-[32px]'
}

export function WorkoutIcon({ workoutType, size = 'md', variant = 'default' }: WorkoutIconProps) {
  const iconName = workoutIconMap[workoutType] || workoutIconMap['Other']
  
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        variant === 'filled' && 'rounded-full bg-primary-green p-2'
      )}
    >
      <MaterialIcon
        icon={iconName}
        className={cn(
          sizeMap[size],
          variant === 'filled' ? 'text-white' : 'text-primary-green'
        )}
      />
    </div>
  )
}
