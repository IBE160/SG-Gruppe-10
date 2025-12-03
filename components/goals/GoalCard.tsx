'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Goal } from '@/lib/types/goal'

interface GoalCardProps {
  goal: Goal
}

export function GoalCard({ goal }: GoalCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{goal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm text-gray-600">
          <p className="font-medium text-gray-900">{goal.target}</p>
        </div>
      </CardContent>
    </Card>
  )
}
