'use client'

import { GoalCard } from './GoalCard'
import type { Goal } from '@/lib/types/goal'

interface GoalsListProps {
  goals: Goal[]
}

export function GoalsList({ goals }: GoalsListProps) {
  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">
          No goals yet. Create your first goal!
        </p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  )
}
