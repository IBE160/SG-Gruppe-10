'use client'

import Link from 'next/link'
import { useWorkouts } from '@/hooks/useWorkouts'
import { WorkoutList } from '@/components/workouts/WorkoutList'
import { WorkoutListSkeleton } from '@/components/workouts/WorkoutListSkeleton'
import { Button } from '@/components/ui/button'
import { AppHeader } from '@/components/common/AppHeader'
import { MaterialIcon } from '@/components/ui/MaterialIcon'

export function WorkoutHistoryClient() {
  const { data: workouts, isLoading, isError, error } = useWorkouts()
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-graphite-50">
        <AppHeader title="Workouts" />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Workout History</h1>
            <Link href="/workouts/new">
              <Button className="bg-primary-green hover:bg-primary-green/90 text-white">
                <MaterialIcon icon="add" className="mr-1" />
                Log Workout
              </Button>
            </Link>
          </div>
          <WorkoutListSkeleton />
        </main>
      </div>
    )
  }
  
  if (isError) {
    return (
      <div className="min-h-screen bg-graphite-50">
        <AppHeader title="Workouts" />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="mb-6 text-3xl font-bold">Workout History</h1>
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <MaterialIcon icon="error" className="text-red-500 text-5xl mb-4" />
            <p className="text-red-600 mb-4">
              {error instanceof Error ? error.message : 'Failed to load workouts'}
            </p>
            <Button onClick={() => window.location.reload()}>
              <MaterialIcon icon="refresh" className="mr-1" />
              Try Again
            </Button>
          </div>
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-graphite-50">
      <AppHeader title="Workouts" />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Workout History</h1>
          <Link href="/workouts/new">
            <Button className="bg-primary-green hover:bg-primary-green/90 text-white">
              <MaterialIcon icon="add" className="mr-1" />
              Log Workout
            </Button>
          </Link>
        </div>
        <WorkoutList workouts={workouts || []} />
      </main>
    </div>
  )
}
