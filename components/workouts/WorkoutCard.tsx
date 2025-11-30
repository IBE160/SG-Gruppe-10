'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card 
      className="cursor-pointer transition-shadow hover:shadow-lg"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-lg">{workout.workout_type}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm text-gray-600">
          <p>{formattedDate}</p>
          <p className="font-medium text-gray-900">
            {formatDuration(workout.duration_minutes)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
