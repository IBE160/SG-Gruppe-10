'use client'

import { Card, CardContent } from '@/components/ui/card'
import { WorkoutIcon } from './WorkoutIcon'
import { format } from 'date-fns'

export interface RecentActivityCardProps {
  workoutType: string
  date: Date | string
  duration: number
  title: string
  onClick?: () => void
}

export function RecentActivityCard({
  workoutType,
  date,
  duration,
  title,
  onClick
}: RecentActivityCardProps) {
  const formattedDate = format(new Date(date), 'MMM d, yyyy')

  return (
    <Card
      className="bg-white border-graphite-100 transition-shadow hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <WorkoutIcon workoutType={workoutType} size="md" variant="default" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-graphite-900 truncate">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-graphite-700">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{duration} min</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
