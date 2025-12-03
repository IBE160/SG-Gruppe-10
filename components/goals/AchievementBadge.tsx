import { MaterialIcon } from '@/components/ui/MaterialIcon'

interface AchievementBadgeProps {
  achievement: {
    title: string
    icon: string
    earned: boolean
  }
  size?: 'small' | 'medium' | 'large'
}

export function AchievementBadge({ achievement, size = 'medium' }: AchievementBadgeProps) {
  const sizeClasses = {
    small: 'w-16 h-16 text-2xl',
    medium: 'w-20 h-20 text-3xl',
    large: 'w-24 h-24 text-4xl',
  }[size]
  
  const badgeClass = achievement.earned
    ? 'bg-primary-green text-white shadow-md'
    : 'bg-graphite-200 text-graphite-400'
  
  const titleClass = achievement.earned
    ? 'font-semibold text-graphite-900'
    : 'font-normal text-graphite-500'
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`${sizeClasses} ${badgeClass} rounded-full flex items-center justify-center transition`}
        aria-label={`Achievement: ${achievement.title} - ${achievement.earned ? 'Earned' : 'Locked'}`}
      >
        <MaterialIcon icon={achievement.icon} className="text-inherit" />
      </div>
      <p className={`text-sm text-center ${titleClass}`}>
        {achievement.title}
      </p>
    </div>
  )
}
