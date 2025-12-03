'use client'

import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { Progress } from '@/components/ui/progress'
import type { Goal } from '@/lib/types/goal'

interface GoalCardProps {
  goal: Goal
  progress?: number
  daysRemaining?: number
}

export function GoalCard({ goal, progress = 0, daysRemaining }: GoalCardProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  
  return (
    <article 
      className="bg-white rounded-xl p-6 shadow-md"
    >
      <div className="flex items-start gap-4 mb-4">
        <MaterialIcon icon="flag" className="text-primary-green text-3xl" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-graphite-900">{goal.title}</h3>
          <p className="text-sm text-graphite-700">{goal.target}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-graphite-700">Progress</span>
          <span className="font-medium text-graphite-900">{clampedProgress}%</span>
        </div>
        <Progress value={clampedProgress} className="h-2 bg-graphite-200" />
      </div>
      
      {daysRemaining !== undefined && (
        <p className="text-sm text-graphite-600 mt-3">
          {daysRemaining} days remaining
        </p>
      )}
      
      {clampedProgress === 100 && (
        <div className="flex items-center gap-2 mt-3 text-primary-green">
          <MaterialIcon icon="check_circle" className="text-lg" />
          <span className="text-sm font-medium">Complete</span>
        </div>
      )}
    </article>
  )
}
