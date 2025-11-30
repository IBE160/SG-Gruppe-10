'use client'

import Link from 'next/link'
import { useWorkouts } from '@/hooks/useWorkouts'
import { WorkoutList } from '@/components/workouts/WorkoutList'
import { WorkoutListSkeleton } from '@/components/workouts/WorkoutListSkeleton'
import { Button } from '@/components/ui/button'

export function WorkoutHistoryClient() {
  const { data: workouts, isLoading, isError, error } = useWorkouts()
  
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Workout History</h1>
          <Link href="/workouts/new">
            <Button>Log Workout</Button>
          </Link>
        </div>
        <WorkoutListSkeleton />
      </div>
    )
  }
  
  if (isError) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold">Workout History</h1>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load workouts'}
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workout History</h1>
        <Link href="/workouts/new">
          <Button>Log Workout</Button>
        </Link>
      </div>
      <WorkoutList workouts={workouts || []} />
    </div>
  )
}
