'use client'

import Link from 'next/link'
import { WorkoutCard } from './WorkoutCard'
import { Button } from '@/components/ui/button'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import type { Workout } from '@/lib/types/workout'

interface WorkoutListProps {
  workouts: Workout[]
}

export function WorkoutList({ workouts }: WorkoutListProps) {
  if (workouts.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-md">
        <MaterialIcon icon="fitness_center" className="text-graphite-300 text-6xl mb-4" />
        <p className="text-graphite-700 mb-6 text-lg">
          No workouts yet. Start logging your fitness journey!
        </p>
        <Link href="/workouts/new">
          <Button className="bg-primary-green hover:bg-primary-green/90 text-white h-12">
            <MaterialIcon icon="add" className="mr-2" />
            Log Your First Workout
          </Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  )
}
