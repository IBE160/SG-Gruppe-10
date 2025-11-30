'use client'

import Link from 'next/link'
import { WorkoutCard } from './WorkoutCard'
import { Button } from '@/components/ui/button'
import type { Workout } from '@/lib/types/workout'

interface WorkoutListProps {
  workouts: Workout[]
}

export function WorkoutList({ workouts }: WorkoutListProps) {
  if (workouts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">
          No workouts yet. Click &quot;Log Workout&quot; to get started.
        </p>
        <Link href="/workouts/new">
          <Button>Log Workout</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  )
}
