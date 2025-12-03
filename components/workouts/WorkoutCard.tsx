'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { WorkoutIcon } from '@/components/dashboard/WorkoutIcon'
import type { Workout } from '@/lib/types/workout'

interface WorkoutCardProps {
  workout: Workout
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours} hr`
  }
  
  return `${hours} hr ${remainingMinutes} min`
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const router = useRouter()
  
  const handleClick = () => {
    router.push(`/workouts/${workout.id}`)
  }
  
  const formattedDate = format(new Date(workout.workout_date), 'MMM d, yyyy')
  
  return (
    <article 
      className="bg-primary-green text-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={`${workout.workout_type} workout on ${formattedDate}`}
    >
      <div className="flex items-start gap-4">
        <WorkoutIcon workoutType={workout.workout_type} size="lg" variant="default" />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-1">{workout.workout_type}</h3>
          <p className="text-sm opacity-90 mb-2">{formattedDate}</p>
          <p className="text-base font-medium">
            {formatDuration(workout.duration_minutes)}
          </p>
        </div>
      </div>
      {workout.notes && (
        <p className="text-sm mt-4 opacity-80 line-clamp-2">{workout.notes}</p>
      )}
    </article>
  )
}
